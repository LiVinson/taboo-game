import React from "react"
import { Redirect } from "react-router-dom"
import PlayerInfoForm from "../components/PlayerInfoForm"
import Team from "../components/Team"
import {
  convertFBObjectToArray,
  includedInArrayOfObjects,
  setupListenerRequest
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
      listenersSet: false,
      players: [],
      redirect: false,
      // gameStatus: "pending",
    }

    this.listenerTypes = ["gameStatus", "players"]

    this.handleDBChange = this.handleDBChange.bind(this)
    this.updateListenerStatus = this.updateListenerStatus.bind(this)

    this.handlePlayersChange = this.handlePlayersChange.bind(this)
    this.handleGameStatusChange = this.handleGameStatusChange.bind(this)
    this.determineDBChangeType = this.determineDBChangeType.bind(this)

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleInputSubmit = this.handleInputSubmit.bind(this)

    this.toggleTeam = this.toggleTeam.bind(this)
    this.startGame = this.startGame.bind(this)
  }

  componentDidMount() {
    const { gamecode } = this.state
    setupListenerRequest 
    (this.listenerTypes, 0, gamecode, attachListener, this.handleDBChange)
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
  handleDBChange(changeType, value) {
    const index = this.listenerTypes.findIndex(
      (listener) => listener === changeType
    )
    if (this.state.listenersSet) {
      console.log("listeners previously set!")
      //if listeners are already true, take 'usual' action based on which listener was fired
      this.determineDBChangeType(changeType, value)
    } else if (index !== -1 && index < this.listenerTypes.length - 1) {
      //in process of setting listeners
      console.log("more listeners to set")
      setupListenerRequest
      (this.listenerTypes, index + 1, this.state.gamecode, attachListener, this.handleDBChange)
    } else {
      console.log("all listeners set for the first time")
      this.updateListenerStatus()
    }
  }

  determineDBChangeType(type, value) {
    switch (type) {
      case "gameStatus":
        this.handleGameStatusChange(value)
        break
      case "players":
        this.handlePlayersChange(value)
        break
      default:
        break
    }
  }

  //Called after component mounts, once both game and player listeners are set
  updateListenerStatus() {
    this.setState({
      listenersSet: true,
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
      listenersSet,

      redirect,
    } = this.state

    if (redirect) {
      return (
        <Redirect
          to={`/play/${this.state.gamecode}/${currentPlayer.playerId}`}
        />
      )
    } else if (!listenersSet) {
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
