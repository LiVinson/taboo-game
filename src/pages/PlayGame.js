import React from "react"
import Team from "../components/Team"
import { retrieveGameInformation, attachListener, updateRoundStatus, updateCardInfo } from "../utils/API"
import { convertFBObjectToArray, setupListenerRequest } from "../utils/helpers"
import ScoreCard from "../components/ScoreCard"
import RoundInfo from "../components/RoundInfo"
import GameContainer from "../components/GameContainer"

export default class PlayGame extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      listenersSet: false,
      gamecode: props.match.params.gamecode,
      currentPlayer: null,
      round: {
        roundNumber: 1,
        turn: 1,
        giverId: null,
        watcherId: null,
        cardsPlayed: [],
        roundStatus: "pre", //keeps track of if it is before round, or round in progress
      },
      deck: {
        deckId: 1000,
        cards: [],
        currentCardIndex: 0
      },

      team1: {
        players: [],
        playerTurnIndex: 0,
        score: 0,
      },
      team2: {
        players: [],
        playerTurnIndex: 0,
        score: 0,
      },
    }

    this.listenerTypes = [
      "roundStatus",
      "roundNumber",
      "currentCardIndex",
      "currentCards",
      
    ]

    this.determineActivePlayers = this.determineActivePlayers.bind(this)
    this.startRound = this.startRound.bind(this)
    // this.getNextDeck = this.getNextDeck.bind(this)
    this.handleDBChange = this.handleDBChange.bind(this)
    this.determineDBChangeType = this.determineDBChangeType.bind(this)
   
    this.requestGameInformation = this.requestGameInformation.bind(this)
   
    this.nextCard = this.nextCard.bind(this)

    this.setRoundState = this.setRoundState.bind(this)
    this.cardIndexUpdated = this.cardIndexUpdated.bind(this)
  }

  componentDidMount() {
    const { gamecode } = this.state
    setupListenerRequest(
      this.listenerTypes,
      0,
      gamecode,
      attachListener,
      this.handleDBChange
    )
  }
  
  handleDBChange(changeType, value, details) {
    console.log("handleDBChange")
    const index = this.listenerTypes.findIndex(
      (listener) => listener === changeType
    )
    if (this.state.listenersSet) {
      console.log("listeners previously set!")
      //if listeners are already true, take 'usual' action based on which listener was fired
      this.determineDBChangeType(changeType, value, details)
    } else if (index !== -1 && index < this.listenerTypes.length - 1) {
      //in process of setting listeners
      console.log("more listeners to set")
      setupListenerRequest(
        this.listenerTypes,
        index + 1,
        this.state.gamecode,
        attachListener,
        this.handleDBChange
      )
    } else {
      console.log("all listeners set for the first time")
      this.requestGameInformation()
    }
  }

  determineDBChangeType(type, value) {
    switch (type) {
      case "roundStatus":
        this.setRoundState(type, value)
        break
      case "roundNumber":
        console.log("round number fired")
        break
      case "currentCardIndex":
        console.log("card index fired")
        this.cardIndexUpdated(value)
        break
      case "currentCards":
        console.log("currentCard fired")
        break
      default:
        console.log("something went wrong. listener type: ", type)
      break
    }
  }
  
  //retreives game data and deck
  requestGameInformation() {
    const {gamecode} = this.state
    const { deckId } = this.state.deck
    console.log(deckId)
    retrieveGameInformation(gamecode, deckId)
    .then((response) => {
      console.log(response)
      const players = convertFBObjectToArray(response[0])
      const team1Players = players.filter((player) => player.team === "Team 1")
      const team2Players = players.filter((player) => player.team === "Team 2")
      const currentPlayer = players.filter(
        (player) => player.playerId === this.props.match.params.playerId
      )
      const cards=response[1]
      // console.log(this.props.match.params.playerId)
      console.log(currentPlayer)
      this.setState((state) => ({
        listenersSet: true,
        round: {
          ...state.round,
        },
        team1: {
          ...state.team1,
          players: team1Players,
        },
        team2: {
          ...state.team2,
          players: team2Players,
        },
        loading: false,
        currentPlayer: currentPlayer[0],
        deck: {
          ...state.deck,
          cards: cards
        }
      }))
    })
  }

  setRoundState(type, value) {
    console.log("round change type fired")
    console.log(type, value)
    this.setState((state) => ({
      round : {
        ...state.round,
        [type]: value
      }
    }))
  }
  

  determineActivePlayers(turn, team1, team2) {
    const activePlayers = {
      giver: null,
      watcher: null,
    }

    console.log(team1)
    if (turn === 1) {
      activePlayers.giver = team1.players[team1.playerTurnIndex]
      activePlayers.watcher = team2.players[team2.playerTurnIndex]
    } else {
      activePlayers.giver = team2.players[team2.playerTurnIndex]
      activePlayers.watcher = team1.players[team1.playerTurnIndex]
    }

    console.log(activePlayers)
    return activePlayers
  }

  startRound() {
    console.log("start round")
    const { gamecode } = this.state
    //change in firebase
    updateRoundStatus(gamecode, "in progress")
  }

  //Called when user selects 'next' or 'skip' on current card.
  nextCard(status) {
   const {gamecode} = this.state
   const {currentCardIndex} = this.state.deck

   console.log(status, currentCardIndex)
   //Updates firebase with the next card index to display, and the skip/next status of currently displayed card
    updateCardInfo(gamecode, currentCardIndex, status)
  }

  cardIndexUpdated(cardInfo) {
    console.log("card Info updated")
    console.log(cardInfo)
    const {lastCardStatus, currentCardIndex} = cardInfo
    const currentCard = this.state.deck.cards[this.state.deck.currentCardIndex]
   
    //Contains card details, and if 'next' or 'skip' select
      cardInfo = {
        ...currentCard,
        status: lastCardStatus  
    } 
    //push in current Card to 'played' array
    //update current index
    //account for round status (later)
    
    this.setState((state) => ({
      round: {
        ...state.round,
        cardsPlayed: [...this.state.round.cardsPlayed, cardInfo]
      
      },
      deck: {
        ...this.state.deck,        
         currentCardIndex
        
      }
    }))
  }
 

  render() {
    const { loading, team1, team2, round, currentPlayer, deck } = this.state
    const { roundNumber, giver, watcher, turn, roundStatus } = round
    const currentWord = deck.cards[deck.currentCardIndex]


    console.log(currentWord)
    if (loading) {
      return <p>Loading Works</p>
    } else {
      return (
        <div style={{ height: "100%" }}>
          {/*Add score*/}
          <div style={{ width: "33%", float: "left", height: "100%" }}>
            <ScoreCard score1={team1.score} score2={team2.score} />
            <Team players={team1.players} teamName="Team 1" />
            <Team players={team2.players} teamName="Team 2" />
          </div>
          <RoundInfo
            round={roundNumber}
            giver={giver}
            watcher={watcher}
            turn={turn}
          />
          <div
            style={{
              float: "left",
              border: "2px solid black",
              height: "100%",
              width: "65%",
            }}
          >
            <p>{currentPlayer.playerId}</p>
            <GameContainer
              onGuessingTeam={() => onCurrentTeam(currentPlayer, turn)}
              round={roundStatus}
              startRound={this.startRound}
              currentPlayerId={currentPlayer.playerId}
              getActivePlayers={() =>
                this.determineActivePlayers(turn, team1, team2)
              }
              word={currentWord}
              nextCard = {this.nextCard}
            />
          </div>
          {/*game div - pre round:
              //button to start round
              //you are giver message
              //you are watcher message            
            */}
          {/*game div - in round round:
                  //timer 
                  //giver:
                    //current card
                    //next button
                  watcher: 
                    //current card
                  
                    
            */}
        </div>
      )
    }
  }
}

//returns a boolean indicated if current player is on the team that will be giving clues this round
function onCurrentTeam(player, turn) {
  console.log(player)
  console.log(turn)
  return player.team === "Team " + turn
}

//Returns a boolean to indicating if the current player is the 'active' player (giver/watcher)
function currentActivePlayer(player, activeId) {
  return player.playerId === activeId
}
