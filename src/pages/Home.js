import React from "react"
import Modal from "../components/Modal"
import { Redirect } from "react-router-dom"
import JoinForm from "../components/JoinForm"
import { createNewCode } from "../utils/helpers"
import { createNewGame } from "../utils/API"

export default class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showInstructions: false,
      gamecode: null,
      redirect: false,
    }

    this.style = {
      width: "400px",
      height: "200px",
      fontSize: "50px",
    }
    this.toggleInstructions = this.toggleInstructions.bind(this)
    this.createGameCode = this.createGameCode.bind(this)
  }

  toggleInstructions() {
    this.setState((state) => {
      return {
        ...state,
        showInstructions: !state.showInstructions,
      }
    })
  }

  createGameCode(e) {
    e.target.disabled = true
    const gamecode = createNewCode()
    createNewGame(gamecode)
      .then((res) => {
        //Redirect to waiting room.
        this.setState((state) => ({
          ...state,
          redirect: true,
          gamecode,
        }))
      })
      .catch((err) => {
        console.log(
          "There was an error creating a new game with gamecode: ",
          gamecode
        )
      })
  }

  render() {
    const { redirect, gamecode } = this.state
    if (gamecode && redirect) {
      return (
        <Redirect
          push //Keeps home location on the history stack
          to={{ pathname: "new", search: `?gamecode=${gamecode}` }}
        />
      )
    }

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          paddingTop: "20px",
        }}
      >
        <button onClick={(e) => this.createGameCode(e)} style={this.style}>
          Create New Game
        </button>

        <button
          onClick={() => {
            this.toggleInstructions()
          }}
          style={this.style}
        >
          Join Game
        </button>
        {this.state.showInstructions ? (
          <Modal
            display={this.state.showInstructions}
            toggleDisplay={this.toggleInstructions}
            header="Join a Game of Taboo"
            buttonText=""
          >
            {<JoinForm confirmGame={(code) => {}} />}
          </Modal>
        ) : null}
      </div>
    )
  }
}
