import React from "react"
import PlayerInfoForm from "../components/PlayerInfoForm"
import Teams from "../components/Teams"
import { convertFBObjectToArray, includedInArray } from "../utils/helpers"
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
      players: [],
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handlePlayersChange = this.handlePlayersChange.bind(this)
    this.toggleTeam = this.toggleTeam.bind(this)
  }

  componentDidMount() {
    const { playersListener, gamecode } = this.state
    const path = `games/${gamecode}/players`

    //Confirm there is a "unassigned" path in firebase. Required to attach a listner
    confirmPathExists(path).then((exists) => {
      //If the players path exists and listener has not already been attached:
      if (exists && !playersListener) {
        attachListenerToPath(gamecode, "players", this.handlePlayersChange)
          .then((res) => {
            this.setState({
              playersListener: true,
              host: true,
              loading: false,
            })
          })
          .catch((err) =>
            console.warn("There was a problem attaching the listener")
          )
      }
    })
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
    //Converts object with player objects for properties to array with player objects
    const playersArray = convertFBObjectToArray(playersSnapshotObj)

    this.setState((state) => ({
      loading: false,
      players: playersArray,
      playersListener:
        state.unassignedListener === false ? true : state.unassignedListener,
    }))
  }

  toggleTeam(team, playerId) {
    console.log(team, playerId)
    const { gamecode } = this.state
    updatePlayerInfo(gamecode, playerId, "team", team)
  }
  render() {
    const { players, currentPlayer, currentPlayerName, loading } = this.state
    if (loading) {
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
          <h2>Unassigned Players</h2>
          <Teams
            players={players}
            teamName="unassigned"
            toggleTeam={this.toggleTeam}
          />
        </div>
      )
    }
  }
}

/*return (
        <ul>
          {unassignedPlayers.map((player) => {
            return (
              <li key={player.playerId}>
                {player.name}
                <span>
                  {player.playerId === currentPlayer.playerId
                    ? "Me!"
                    : "Not Me"}
                </span>
              </li>
            )
          })}
        </ul>
        )*/
