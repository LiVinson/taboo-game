import React from "react"
import queryString from "query-string"
import PlayerInfoForm from "../components/PlayerInfoForm"
import {
  createNewCode,
  convertFBObjectToArray,
  includedInArray,
} from "../utils/helpers"
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
      currentPlayer: null,
      host: false,
      currentPlayerName: "",
      unassignedPlayers: [],
      waitingListener: false,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleUnassignedChange = this.handleUnassignedChange.bind(this)
  }

  async componentDidMount() {
    //check if there are players waiting in the room.
    //If yes: attach a listener.
    const { waitingListener, gamecode } = this.state
    const path = `games/${gamecode}/unassigned`

    confirmPathExists(path).then((exists) => {
      console.log("path exists?: ", exists)
      if (exists && !waitingListener) {
        // console.log("add listener")
        attachListenerToPath(
          gamecode,
          "unassigned",
          waitingListener,
          this.handleUnassignedChange
        ).then((res) => {
          //only gets here for attaching listener
          //   //convert res to array for easier looping

          this.setState({
            waitingListener: true,
            host: true,
            loading: false,
          })
          // })
          // .catch((err) => {
          //   console.warn("There as an error attaching the listerner")
          // })
        })
        // else {
        //   console.log("lister not attached.")
        // }
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
    const {
      host,
      playerId,
      gamecode,
      currentPlayerName,
      waitingListener,
    } = this.state
    // const playerId = createNewCode()
    //If listener could not be set on mount, this is first player so they are assigned host
    const player = {
      playerId,
      name: currentPlayerName,
    }
    const unassignedPath = `games/${gamecode}/unassigned/${playerId}`

    try {
      addPlayerToPath(player, unassignedPath)
    } catch (err) {
      console.log("there was a problem adding player")
    }
    // .then((res) => {
    //   console.log(res)
    // if (res && !this.state.waitingListener) {
    //   console.log("returned from addPlayer, need to add listener")
    //   attachListenerToPath(
    //     gamecode,
    //     "unassigned",
    //     this.handleUnassignedChange
    //   )
    // }
    // this.setState((state) => ({
    //   ...this.state,
    //   currentPlayer: player,
    // }))
    // })
    // .catch((err) => {
    //   console.warn("Something went wrong creating the player")
    // })
  }

  //Called when nonhost joins, or player added to unassigned
  handleUnassignedChange(unassignedSnapshotObj) {
    console.log("handle unassigned")

    // const { waitingListener } = this.state
    console.log("value: ")
    console.log(unassignedSnapshotObj)
    const unassignedArray = convertFBObjectToArray(unassignedSnapshotObj)

    this.setState((state) => ({
      loading: false,
      unassignedPlayers: unassignedArray,
      waitingListener:
        state.waitingListener === false ? true : state.waitingListener,
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
      unassignedPlayers.length === 0 ||
      !includedInArray(unassignedPlayers, "playerId", playerId)
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
