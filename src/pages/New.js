import React from "react"
import { Link, Redirect } from "react-router-dom"
import PlayerInfoForm from "../components/PlayerInfoForm"
import Teams from "../components/Teams"
import { convertFBObjectToArray, includedInArray } from "../utils/helpers"
import LinkButton from "../components/LinkButton"
import {
  confirmPathExists,
  attachListenerToPath,
  addPlayerToPath,
  updatePlayerInfo,
} from "../utils/API"

export default class New extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
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
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handlePlayersChange = this.handlePlayersChange.bind(this)
    this.handleGameStatusChange = this.handleGameStatusChange.bind(this)
    this.toggleTeam = this.toggleTeam.bind(this)
  }

  componentDidMount() {
    const { playersListener, gamecode } = this.state
    const path = `games/${gamecode}/players`

    const playerListener = {
      pathToAttach: "players",
      onChange: this.handlePlayersChange,
      initialValue: "none",
    }

    const gameStatusListener = {
      pathToAttach: "status",
      onChange: this.handleGameStatusChange,
      initialValue: "pending",
    }

    attachListenerToPath(gamecode, [playerListener, gameStatusListener]).then(
      (val) => {
        console.log("In attachListerner promise response in componentDidMont.")
        if (val[0] === "none" && val[1] === "pending") {
          this.setState({
            loading: false,
            playerListener: true,
            gameStatusListener: true,
          })
        }
        console.log("return from listener promises value")
        console.log(val)
      }
    )
  }

  componentWillUnmount() {
    //remove listeners
    console.log("remove listeners")
  }

  handleChange(e) {
    const { name, value } = e.target
    this.setState({
      [name]: value,
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    const { gamecode, currentPlayerName, currentPlayer } = this.state
    // const playerId = createNewCode()
    //If listener could not be set on mount, this is first player so they are assigned host
    console.log(currentPlayer)
    const player = {
      ...currentPlayer,
      name: currentPlayerName,
      team: "unassigned",
    }
    console.log(player)
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
  handlePlayersChange(playersSnapshotObj) {
    console.log("player fired")
    console.log(playersSnapshotObj)

    //Converts object with player objects for properties to array with player objects
    const playersArray = convertFBObjectToArray(playersSnapshotObj)

    this.setState((state) => ({
      loading: false,
      players: playersArray,
      playersListener:
        state.unassignedListener === false ? true : state.unassignedListener,
    }))
  }

  handleGameStatusChange(gameStatusSnapshot) {
    if (gameStatusSnapshot === "pending") {
      console.log("pending")
    } else if (gameStatusSnapshot === "in progress") {
      this.setState({
        redirect: true,
      })
    } else {
      console.log("not sure how we got here///")
    }
  }

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
      loading,
      redirect,
    } = this.state

    if (redirect) {
      return (
        <Redirect
          to={`/play/${this.state.gamecode}/${currentPlayer.playerId}`}
        />
      )
    } else if (loading) {
      return <p>Loading Game</p>
    } else if (
      //Requests name if current player is not already added to players path in FB
      players.length === 0 ||
      !includedInArray(players, "playerId", currentPlayer.playerId)
    ) {
      // console.log("Player not created yet")
      return (
        <PlayerInfoForm
          name={currentPlayerName}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        />
      )
    } else {
      //Lists all currently waiting players
      return (
        <div>
          <Teams
            players={players}
            teamName="unassigned"
            toggleTeam={this.toggleTeam}
          />
          <LinkButton
            to={`/play/${this.state.gamecode}/${currentPlayer.playerId}`}
            disabled={allPlayersAssigned(this.state.players)}
          >
            Start Game
          </LinkButton>
        </div>
      )
    }
  }
}

function allPlayersAssigned(players) {
  const team1 = players.filter((player) => player.team === "Team 1")
  const team2 = players.filter((player) => player.team === "Team 2")
  const unassigned = players.filter((player) => player.team === "unassigned")
  return unassigned.length > 0 || team1.length < 2 || team2.length < 2
}
