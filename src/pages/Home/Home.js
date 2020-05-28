import React from "react"
import { Redirect } from "react-router-dom"
import "./Home.scss"

import Modal from "../../components/Modal"
import JoinForm from "../../components/JoinForm"
import { createNewCode } from "../../utils/helpers"
import { createNewGame } from "../../utils/API"

export default function Home() {
  return (
    /*Components:
      Wrapper
      Header w/ and w/o subheading
      Taboo cards with type property: null, home, middle, or bottom
    */

    <div className="wrapper">
      <header>
        <h1 className="header header--large">Taboo!</h1>
        <p className="subheading">
          The team game that’s all about what you{" "}
          <span className="subheading__focus-text">say,</span> and what you{" "}
          <span className="subheading__focus-text">don’t!</span>
        </p>
      </header>

      <div className="taboo-card taboo-card--home">
        <div className="taboo-card__word-container">
          <p className="taboo-card__word">Menu</p>
        </div>
        <div className="taboo-card__list-container">
          <ul className="taboo-card__list">
            <li className="taboo-card__list-item">Create New Game</li>
            <li className="taboo-card__list-item">Join Game</li>
            <li className="taboo-card__list-item">How to Play</li>
            <li className="taboo-card__list-item">Submit a Card</li>
          </ul>
        </div>
      </div>

      <div className="taboo-card taboo-card--middle">
        <div className="taboo-card__word-container">
          <p className="taboo-card__word">Taboo!</p>
        </div>
        <div className="taboo-card__list-container">
          <ul className="taboo-card__list">
            <li className="taboo-card__list-item">Taboo!</li>
            <li className="taboo-card__list-item">Taboo!</li>
            <li className="taboo-card__list-item">Taboo!</li>
            <li className="taboo-card__list-item">Taboo!</li>
          </ul>
        </div>
      </div>

      <div className="taboo-card taboo-card--bottom">
        <div className="taboo-card__word-container">
          <p className="taboo-card__word">Taboo!</p>
        </div>
        <div className="taboo-card__list-container">
          <ul className="taboo-card__list">
            <li className="taboo-card__list-item">Taboo!</li>
            <li className="taboo-card__list-item">Taboo!</li>
            <li className="taboo-card__list-item">Taboo!</li>
            <li className="taboo-card__list-item">Taboo!</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export class Home2 extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showGameCodeForm: false,
      gamecode: null,
      playerId: null,
      redirect: false,
      validGame: false,
    }

    this.style = {
      width: "400px",
      height: "200px",
      fontSize: "50px",
    }
    this.toggleGameCodeForm = this.toggleGameCodeForm.bind(this)
    this.createGame = this.createGame.bind(this)
    this.createPlayerCode = this.createPlayerCode.bind(this)
    this.validGameCode = this.validGameCode.bind(this)
  }

  //Controls whether game code input displays in middle of Homepage
  toggleGameCodeForm() {
    this.setState((state) => {
      return {
        ...state,
        showGameCodeForm: !state.showGameCodeForm,
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
      console.log(playerId)
      this.setState({
        gamecode,
        redirect: true,
        playerId,
        showGameCodeForm: false,
      })
    })
  }

  validGameCode(gamecode) {
    this.createPlayerCode(gamecode)
  }

  render() {
    const { redirect, gamecode, playerId } = this.state
    if (gamecode && redirect) {
      return (
        <Redirect
          push //Keeps home location on the history stack
          to={{
            pathname: `new/${gamecode}/${playerId}`,
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
            this.toggleGameCodeForm()
          }}
          style={this.style}
        >
          Join Game
        </button>
        {this.state.showGameCodeForm ? (
          <Modal
            display={this.state.showGameCodeForm}
            toggleDisplay={this.toggleGameCodeForm}
            header="Join a Game of Taboo"
            buttonText=""
          >
            {<JoinForm validGameCode={this.createPlayerCode} />}
          </Modal>
        ) : null}
      </div>
    )
  }
}
