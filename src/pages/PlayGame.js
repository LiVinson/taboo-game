import React from "react"
import { getDeck, updateGameStatus } from "../utils/API"

// function assignTurn() {}

export default class PlayGame extends React.Component {
  /*
    Information needed:

    Number of rounds, 
    teams, 
    players on each team
     Current round. 
     Selected Speaker and Watcher 
     "this" user and their team and current role.
    */

  constructor(props) {
    super(props)
    this.state = {
      round: 1,
      turn: "Team 1",
      currentCardIndex: 0,
      deck: {
        deckNumber: 1,
        cards: [],
      },
      playedCards: [],
      scores: {
        Team1: 0,
        Team2: 0,
      },
      Team1: {
        players: [],
        status: "speak", //speak/watch
        player: 0,
      },
      Team2: {
        players: [],
        status: "watch", //speak/watch
        player: 0,
      },
    }

    this.getNextDeck = this.getNextDeck.bind(this)
  }

  componentDidMount() {
    //change game state to "in progress"
    updateGameStatus(this.props.match.params.gamecode, "in progress")
    // this.getNextDeck()
  }

  getNextDeck() {
    const currentDeck = this.state.deck.deckNumber
    getDeck(currentDeck + 1).then((newDeck) => {
      console.log(newDeck)
      this.setState((state) => ({
        deck: {
          deckNumber: state.deck.deckNumber + 1,
          cards: newDeck,
        },
      }))
    })
  }

  setNextCard() {}

  render() {
    const cards = this.state.deck.cards
    const currentCardIndex = this.state.currentCardIndex
    const currentCard = cards[currentCardIndex]
    const invalidWords = currentCard ? currentCard.invalidWords : []
    console.log(cards)
    console.log(currentCard)
    console.log(invalidWords)
    return (
      <div>
        <h1>Play Taboo!</h1>
        {currentCard ? (
          <div>
            {currentCard.word}
            <ul>
              {invalidWords.map((wrongWord, index) => (
                <li key={index}>{wrongWord}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p>"Loading Words"</p>
        )}
      </div>
    )
  }
}
