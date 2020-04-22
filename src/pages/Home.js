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
      playerId: null,
      redirect: false,
    }

    this.style = {
      width: "400px",
      height: "200px",
      fontSize: "50px",
    }
    this.toggleInstructions = this.toggleInstructions.bind(this)
    this.createGame = this.createGame.bind(this)
    this.createPlayerCode = this.createPlayerCode.bind(this)
  }

  //Controls whether game instructions display in middle of Homepage
  toggleInstructions() {
    this.setState((state) => {
      return {
        ...state,
        showInstructions: !state.showInstructions,
      }
    })
  }

  /*Called when "Create Game" selected
    Generates a game code.
    Users code to create a game object in firebase
    Passes gamecode to function to create player id
  */
  createGame(e) {
    e.target.disabled = true
    createNewCode().then((gamecode) => {
      createNewGame(gamecode)
        .then((res) => this.createPlayerCode(gamecode))
        .catch((err) => {
          console.log(
            "There was an error creating a new game with gamecode: ",
            gamecode
          )
        })
    })
  }

  /*Generates a player id
  sets state and redirects to Game "Waiting room"
  */
  createPlayerCode(gamecode) {
    createNewCode().then((playerId) => {
      this.setState((state) => ({
        ...state,
        redirect: true,
        gamecode,
        playerId,
      }))
    })
  }

  render() {
    const { redirect, gamecode, playerId } = this.state
    if (gamecode && redirect) {
      return (
        <Redirect
          push //Keeps home location on the history stack
          to={{
            pathname: "new",
            search: `?gamecode=${gamecode}&playerId=${playerId}`,
          }}
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
        <button onClick={(e) => this.createGame(e)} style={this.style}>
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
