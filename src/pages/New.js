import React from "react"
import { Redirect } from "react-router-dom"
import PlayerInfoForm from "../components/PlayerInfoForm"
import Team from "../components/Team"
import {
  convertFBObjectToArray,
  includedInArrayOfObjects,
} from "../utils/helpers"

import {
  attachListener,
  addPlayerToPath,
  updatePlayerInfo,
  updateGameStatus,
} from "../utils/API"

export default class New extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      gamecode: props.match.params.gamecode,
      currentPlayer: {
        playerId: props.match.params.playerId,
      },
      host: false,
      currentPlayerName: "",
      playersListener: false, //determines if FB listener has been set on players path
      gameStatusListener: false,
      players: [],
      redirect: false,
      // gameStatus: "pending",
    }

    this.handleDBChange = this.handleDBChange.bind(this)
    this.updateListenerStatus = this.updateListenerStatus.bind(this)

    this.handlePlayersChange = this.handlePlayersChange.bind(this)
    this.handleGameStatusChange = this.handleGameStatusChange.bind(this)

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleInputSubmit = this.handleInputSubmit.bind(this)

    this.toggleTeam = this.toggleTeam.bind(this)
    this.startGame = this.startGame.bind(this)
  }

  componentDidMount() {
    const { gamecode } = this.state
    //attaches a listener to the status of the game to check for when to start
    attachListener(`games/${gamecode}/status`, this.handleDBChange, "game")
      //attaches a listener to the list of players, to check when new players join game
      .then((val) => {
        console.log("gamestatus listener attached:", val)
        attachListener(
          `games/${gamecode}/players`,
          this.handleDBChange,
          "players"
        )
          //Set that both listeners are true, to allow player form to display
          .then((val) => {
            console.log("players listener attached: ", val)

            this.setState({
              gameStatusListener: true,
              playersListener: true,
            })
          })
      })
  }

  componentWillUnmount() {
    //remove listeners
    console.log("remove player listeners")
  }

  handleInputChange(e) {
    const { name, value } = e.target
    this.setState({
      [name]: value,
    })
  }

  handleInputSubmit(e) {
    e.preventDefault()
    const { gamecode, currentPlayerName, currentPlayer } = this.state
    // const playerId = createNewCode()
    //If listener could not be set on mount, this is first player so they are assigned host
    // console.log(currentPlayer)
    const player = {
      ...currentPlayer,
      name: currentPlayerName,
      team: "unassigned",
    }
    // console.log(player)
    const playersPath = `games/${gamecode}/players/${player.playerId}`

    try {
      //Adds player object as a property on the players FB path
      //Will cause listener to fire, which calls handlePlayersChange
      addPlayerToPath(player, playersPath)
    } catch (err) {
      console.log("there was a problem adding player")
    }
  }

  //Called when any change is detected to the players FB path, passing current value of path
  async handlePlayersChange(playersSnapshotObj) {
    console.log("player fired")
    console.log(playersSnapshotObj)

    //Converts object with player objects for properties to array with player objects
    const playersArray = convertFBObjectToArray(playersSnapshotObj)

    this.setState({
      players: playersArray,
    })
  }

  //cb for any changes to the game status or players. Determines if another
  //listener needs to be applied, if state of listeners should be updated
  //or functions to handle game/player changes should be fired.
  handleDBChange(value, type, cb) {
    switch (type) {
      case "game":
        if (!this.state.playersListener) {
          console.log("players listener false resolve promise")
          cb(value)
        } else {
          this.handleGameStatusChange(value)
        }
        break
      case "players":
        if (!this.state.playersListener) {
          this.updateListenerStatus()
        } else {
          this.handlePlayersChange(value)
        }
        break
      default:
        console.log("something went terrible wrong...")
        break
    }
  }

  //Called after component mounts, once both game and player listeners are set
  updateListenerStatus() {
    this.setState({
      playersListener: true,
      gameStatusListener: true,
    })
  }

  //Called when game status in FB changes to In Progress to indicate game should start
  handleGameStatusChange(gameStatusSnapshot) {
    console.log("game status change fired")
    console.log(gameStatusSnapshot)

    if (gameStatusSnapshot === "in progress") {
      console.log("in progress - set redirect")
      this.setState({
        redirect: true,
      })
    } else {
      console.log("not sure how we got here///")
    }
  }

  //Called on click of Start Game, once enough players assigned to each team. Changes status in database to in progress
  startGame() {
    updateGameStatus(this.state.gamecode, "in progress")
  }

  //Switches player to new team.
  toggleTeam(team, playerId) {
    console.log(team, playerId)
    const { gamecode } = this.state
    updatePlayerInfo(gamecode, playerId, "team", team)
  }

  render() {
    const {
      players,
      currentPlayer,
      currentPlayerName,
      gameStatusListener,
      playersListener,
      redirect,
    } = this.state

    if (redirect) {
      return (
        <Redirect
          to={`/play/${this.state.gamecode}/${currentPlayer.playerId}`}
        />
      )
    } else if (!gameStatusListener || !playersListener) {
      return <p>Loading Game</p>
    } else if (
      //Requests name if current player is not already added to players path in FB
      players.length === 0 ||
      !includedInArrayOfObjects(players, "playerId", currentPlayer.playerId)
    ) {
      // console.log("Player not created yet")
      return (
        <PlayerInfoForm
          name={currentPlayerName}
          onChange={this.handleInputChange}
          onSubmit={this.handleInputSubmit}
        />
      )
    } else {
      //Lists all players divided by team
      return (
        <div>
          <Team
            players={players.filter((player) => player.team === "unassigned")}
            teamName="unassigned"
            toggleTeam={this.toggleTeam}
          />
          <Team
            players={players.filter((player) => player.team === "Team 1")}
            teamName="Team 1"
            toggleTeam={this.toggleTeam}
          />
          <Team
            players={players.filter((player) => player.team === "Team 2")}
            teamName="Team 2"
            toggleTeam={this.toggleTeam}
          />
          <button
            //Selecting button only allowed if all players assigned and 2+ per team
            disabled={determineTeamsReady(players)}
            onClick={this.startGame}
          >
            Start Game
          </button>
        </div>
      )
    }
  }
}

//Checks if all players have been assigned to a team, and at least 2/team.
function determineTeamsReady(players) {
  const team1 = players.filter((player) => player.team === "Team 1")
  const team2 = players.filter((player) => player.team === "Team 2")
  const unassigned = players.filter((player) => player.team === "unassigned")
  return unassigned.length > 0 || team1.length < 2 || team2.length < 2
}
