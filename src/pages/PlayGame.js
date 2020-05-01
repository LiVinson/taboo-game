import React from "react"
import Team from "../components/Team"
import { getDeck, retrieveGameInformation } from "../utils/API"
import { convertFBObjectToArray } from "../utils/helpers"
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
      loading: true,
      gamecode: props.match.params.gamecode,
      currentPlayerId: props.match.params.playerId,
      round: {
        number: 1,
        turn: 1,
        speaker: null,
        watcher: null,
        cardsPlayed: [],
      },
      deck: {
        deckNumber: 1,
        cards: [],
        currentCardIndex: 0,
      },

      Team1: {
        players: [],
        playerTurnIndex: 0,
        score: 0,
      },
      Team2: {
        players: [],
        playerTurnIndex: 0,
        score: 0,
      },
    }

    // this.getNextDeck = this.getNextDeck.bind(this)
  }

  componentDidMount() {
    //get game information
    //setRoundInfo

    retrieveGameInformation(this.state.gamecode).then((response) => {
      const players = convertFBObjectToArray(response)
      const Team1Players = players.filter((player) => player.team === "Team 1")
      const Team2Players = players.filter((player) => player.team === "Team 2")

      this.setState((state) => ({
        Team1: {
          ...state.Team1,
          players: Team1Players,
        },
        Team2: {
          ...state.Team2,
          players: Team2Players,
        },
      }))
    })
  }

  // getNextDeck() {
  //   const currentDeck = this.state.deck.deckNumber
  //   getDeck(currentDeck + 1).then((newDeck) => {
  //     console.log(newDeck)
  //     this.setState((state) => ({
  //       deck: {
  //         deckNumber: state.deck.deckNumber + 1,
  //         cards: newDeck,
  //       },
  //     }))
  //   })
  // }

  // setNextCard() {}

  render() {
    const { loading, Team1, Team2 } = this.state
    if (loading) {
      return <p>Loading Works</p>
    } else {
      return (
        <div>
          <div>
            {/*Add score*/}

            <Team players={Team1.players} teamName="Team 1" />
            <Team players={Team2.players} teamName="Team 2" />
          </div>
          <div>
            {/*Round Information w/ speaker watcher*/}
            {/*game div - pre round:
              //button to start round
              //you are speaker message
              //you are watcher message            
            */}
            {/*game div - in round round:
                  //timer 
                  //speaker:
                    //current card
                    //next button
                  watcher: 
                    //current card
                  
                    
            */}
          </div>
        </div>
      )
    }
  }
}
