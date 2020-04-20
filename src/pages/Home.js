import React from "react"
import PropTypes from "prop-types"
import Modal from "../components/Modal"
import { Redirect } from "react-router-dom"
import JoinForm from "../components/JoinForm"
import { database } from "../utils/firebase_conn"
import { v4 as uuidv4 } from "uuid"

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
    this.createNewGame = this.createNewGame.bind(this)
  }

  toggleInstructions() {
    this.setState((state) => {
      return {
        ...state,
        showInstructions: !state.showInstructions,
      }
    })
  }

  createNewGame(e) {
    e.target.disabled = true
    const id = uuidv4()
    const gamecode = id.split("-")[0]
    console.log("gamecode: ", gamecode)

    const game = {
      status: "pending",
      unassigned: [],
      team1: {
        teamName: "Team 1",
        players: [],
        score: 0,
      },
      team2: {
        teamName: "Team 2",
        players: [],
        score: 0,
      },
    }
    database
      .ref(`games/${gamecode}`)
      .set(game)
      .then(() => {
        console.log(gamecode, "created")
        this.setState((state) => {
          return {
            ...state,
            redirect: true,
            gamecode,
          }
        })
        //Redirect to waiting room.
      })
      .catch((err) =>
        console.log(
          "There was an error creating a new game with gamecode: ",
          gamecode
        )
      )
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
        <button onClick={(e) => this.createNewGame(e)} style={this.style}>
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
