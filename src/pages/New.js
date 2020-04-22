import React from "react"
import queryString from "query-string"
import PlayerInfoForm from "../components/PlayerInfoForm"
import { convertFBObjectToArray, includedInArray } from "../utils/helpers"
import {
  confirmPathExists,
  attachListenerToPath,
  addPlayerToPath,
} from "../utils/API"

export default class New extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      gamecode: queryString.parse(this.props.location.search).gamecode,
      playerId: queryString.parse(this.props.location.search).playerId,
      currentPlayer: {
        playerId: queryString.parse(this.props.location.search).playerId,
      },
      host: false,
      currentPlayerName: "",
      unassignedListener: false, //determines if FB listener has been set on unassigned players
      unassignedPlayers: [],
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleUnassignedChange = this.handleUnassignedChange.bind(this)
  }

  componentDidMount() {
    const { unassignedListener, gamecode } = this.state
    const path = `games/${gamecode}/unassigned`

    //Confirm there is a "unassigned" path in firebase. Required to attach a listner
    confirmPathExists(path).then((exists) => {
      //If the unassigned path exists and listener has not already been attached:
      if (exists && !unassignedListener) {
        attachListenerToPath(
          gamecode,
          "unassigned",
          this.handleUnassignedChange
        )
          .then((res) => {
            this.setState({
              waitingListener: true,
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
    const { playerId, gamecode, currentPlayerName, currentPlayer } = this.state
    // const playerId = createNewCode()
    //If listener could not be set on mount, this is first player so they are assigned host
    const player = {
      ...currentPlayer,
      name: currentPlayerName,
    }
    const unassignedPath = `games/${gamecode}/unassigned/${player.playerId}`

    try {
      //Adds player object as a property on the unassigned FB path
      //Will cause listener to fire, which calls handleUnassignedChange
      addPlayerToPath(player, unassignedPath)
    } catch (err) {
      console.log("there was a problem adding player")
    }
  }

  //Called when any change is detected to the unassigned FB path, passing current value of path
  handleUnassignedChange(unassignedSnapshotObj) {
    //Converts object with player objects for properties to array with player objects
    const unassignedArray = convertFBObjectToArray(unassignedSnapshotObj)

    this.setState((state) => ({
      loading: false,
      unassignedPlayers: unassignedArray,
      unassignedListener:
        state.unassignedListener === false ? true : state.unassignedListener,
      currentPlayer: "player with player Id = " + this.state.playerId,
    }))
  }

  render() {
    const {
      unassignedPlayers,
      playerId,
      currentPlayer,
      currentPlayerName,
      loading,
    } = this.state
    if (loading) {
      return <p>Loading Game</p>
    } else if (
      //Requests name if current player is not already added to unassigned path in FB
      unassignedPlayers.length === 0 ||
      !includedInArray(unassignedPlayers, "playerId", currentPlayer.playerId)
    ) {
      console.log("Player not created yet")
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
        <ul>
          {unassignedPlayers.map((player) => {
            return (
              <li key={player.playerId}>
                {player.name}
                <span>{player.playerId === playerId ? "Me!" : "Not Me"}</span>
              </li>
            )
          })}
        </ul>
      )
    }
  }
}
