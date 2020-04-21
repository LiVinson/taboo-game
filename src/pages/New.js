import React from "react"
import queryString from "query-string"
import { database } from "../utils/firebase_conn"
import { createNewCode } from "../utils/helpers"
import {
  confirmPathExists,
  attachListenerToPath,
  addPlayerToPath,
} from "../utils/API"

export default class New extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      gamecode: queryString.parse(this.props.location.search).gamecode,
      currentPlayer: null,
      currentPlayerName: "",
      unassignedPlayers: [],
      waitingListener: false,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    //check if there are players waiting in the room.
    //If yes: attach a listener.
    const { waitingListener, gamecode } = this.state
    const path = `games/${gamecode}/unassigned`

    confirmPathExists(path).then((exists) => {
      console.log("path exists: ", exists)
      if (exists && !waitingListener) {
        console.log("add listener")
        attachListenerToPath(gamecode, "unassigned")
          .then((res) => {
            console.log("waiting attached. Response:")
            console.log(res)
            //convert res to array for easier looping
            this.setState({
              waitingListener: true,
              unassignedPlayers: res,
            })
          })
          .catch((err) => {
            console.warn("There as an error attaching the listerner")
          })
      } else {
        console.log("add listener later")
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
    const { gamecode, currentPlayerName, waitingListener } = this.state
    const playerId = createNewCode()
    //If listener could not be set on mount, this is first player so they are assigned host
    const player = {
      name: currentPlayerName,
      host: !waitingListener,
    }
    const unassignedPath = `games/${gamecode}/unassigned/${playerId}`

    addPlayerToPath(player, unassignedPath)
      .then((res) => {
        if (res) {
          console.log("returned from addPlayer")
          this.setState({
            currentPlayer: {
              ...player,
              playerId,
            },
          })
        }
      })
      .catch((err) => {
        console.warn("Something went wrong creating the player")
      })
  }

  render() {
    const { currentPlayer, currentPlayerName } = this.state
    if (!currentPlayer) {
      console.log("Player not created yet")
      return (
        <PlayerInfoForm
          name={currentPlayerName}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        />
      )
    } else {
      return <p>{currentPlayer.name}</p>
    }
  }
}

function PlayerInfoForm({ name, onChange, onSubmit }) {
  return (
    <form>
      <label>Enter your display name</label>
      <input
        type="text"
        placeholder="Name"
        name="currentPlayerName"
        value={name}
        onChange={(e) => onChange(e)}
      />
      <button
        type="submit"
        onClick={(e) => {
          onSubmit(e)
        }}
        disabled={!name.length}
      >
        Save Name
      </button>
    </form>
  )
}
