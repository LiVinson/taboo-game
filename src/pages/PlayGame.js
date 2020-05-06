import React from "react"
import Team from "../components/Team"
import { getDeck, retrieveGameInformation, attachListener} from "../utils/API"
import { convertFBObjectToArray, handleListenerCallbacks } from "../utils/helpers"
import ScoreCard from "../components/ScoreCard"
import RoundInfo from "../components/RoundInfo"
import GameContainer from "../components/GameContainer"


export default class PlayGame extends React.Component {
  /*
    Information needed:

    Number of rounds, 
    teams, 
    players on each team
     Current round. 
     Selected Giver  and Watcher 
     "this" user and their team and current role.
    */

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      listenersSet: false,
      gamecode: props.match.params.gamecode,
      currentPlayer: null,
      round: {
        number: 1,
        turn: 1,
        giverId: null,
        watcherId: null,
        cardsPlayed: [],
        status: "pre", //keeps track of if it is before round, or round in progress
      },
      deck: {
        deckNumber: 1,
        cards: [],
        currentCardIndex: 0,
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

    this.listenerTypes = ["roundStatus", "roundNumber", "cardIndex", "currentCards"]

    this.determineActivePlayers = this.determineActivePlayers.bind(this)
    this.startRound = this.startRound.bind(this)
    this.requestListeners = this.requestListeners.bind(this)
    // this.getNextDeck = this.getNextDeck.bind(this)
    // this.setRoundStatusListener = this.setRoundStatusListener.bind(this)
    this.handleDBChange = this.handleDBChange.bind(this)
    this.requestGameInformation = this.requestGameInformation.bind(this)
  }

   componentDidMount() {    
     this.requestListeners(this.listenerTypes, 0, this.state.gamecode) 
   }

  
   requestListeners(listeners, index, gamecode){ 
     //pickle - clean up switch to only call attachListener at the end with a variable for the path
    switch (listeners[index]) {
      case "roundStatus":
        console.log("set roundStatus")
        attachListener(`games/${gamecode}/round/status`, this.handleDBChange, listeners[index])
        break;  
      case "roundNumber":
        console.log("set roundStroundNumberatus")
        attachListener(`games/${gamecode}/round/number`, this.handleDBChange, listeners[index])
        break;
      case "cardIndex":
        console.log("set cardIndex")
        attachListener(`games/${gamecode}/deck/currentCardIndex`, this.handleDBChange, listeners[index])
        break;
      case "currentCards":
        console.log("set currentCards")
        attachListener(`games/${gamecode}/deck/cards`, this.handleDBChange, listeners[index])       
        break
      default:
        console.log("something broke :/")
        break;
    }     
  } 

   handleDBChange(dbValue, changeType) {    
    const index = this.listenerTypes.findIndex((listener) => listener === changeType)
    if (this.state.listenersSet) {
      console.log("listeners previously set!")
      //if listeners are already true, take 'usual' action based on which listener was fired
    } else if (index !== -1 && index < this.listenerTypes.length -1) {
      //in process of setting listeners
      console.log("more listeners to set")
      this.requestListeners(this.listenerTypes, index + 1, this.state.gamecode)
    } else {
      console.log("all listeners set for the first time")
      this.requestGameInformation()
    }
  }

  
  requestGameInformation() {
     retrieveGameInformation(this.state.gamecode)
     .then((response) => {
      const players = convertFBObjectToArray(response)
      const team1Players = players.filter((player) => player.team === "Team 1")
      const team2Players = players.filter((player) => player.team === "Team 2")
      const currentPlayer = players.filter(player => player.playerId === this.props.match.params.playerId)
      // console.log(this.props.match.params.playerId)
      console.log(currentPlayer)
      this.setState((state) => ({
        listenersSet: true,
        round : {
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
        currentPlayer: currentPlayer[0]
      }))
    })
  }

  determineActivePlayers(turn, team1, team2) {
    const activePlayers = {
      giver: null,
      watcher: null
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

    //change in firebase

    this.setState((state) => ({
      round: {
        ...state.round,
        status: "in progress",
      },
    }))
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
    const { loading, team1, team2, round, currentPlayer } = this.state
    const { number, giver, watcher, turn, status } = round

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
            round={number}
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
              round={status}
              startRound={this.startRound}
              currentPlayerId={currentPlayer.playerId}
              getActivePlayers ={() => this.determineActivePlayers(turn, team1, team2)}
           
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