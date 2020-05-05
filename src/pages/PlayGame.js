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
      listeners: {
        roundStatus: false,
        currentCards: false,
        currentCardIndex: false
      },
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

    this.determineActivePlayers = this.determineActivePlayers.bind(this)
    this.startRound = this.startRound.bind(this)
    this.requestListeners = this.requestListeners.bind(this)
    // this.getNextDeck = this.getNextDeck.bind(this)
    this.setRoundListener = this.setRoundListener.bind(this)
  }


  requestListeners(listeners, gamecode){

    const { roundStatus, currentCards, currentCardIndex } = this.state.listeners
    if (!roundStatus) {
        this.setRoundListener(gamecode, currentCards)
    } else if (!currentCards) {
      console.log("current  card listener is not set")
    } else if (currentCardIndex) {
              console.log("current  card index listener is not set")
    } else {
      console.log("all listeners have been set")
    } 
  }

    setRoundListener(gamecode, currentCardListener) {
      const listenerPath = `games/${gamecode}/round/status`
      const action = {
      check: currentCardListener,
      cb_true: function(){ console.log("current card listener was already set")} ,
      cb_false: function(){ console.log("current card listener was not set.")},
    }

    attachListener(listenerPath, handleListenerCallbacks, "round_status", action, "child_changed" )
    }
  
  componentDidMount() {
    //get game information
    //setRoundInfo
    const {listeners} = this.state.listeners
    
    this.requestListeners(listeners, this.state.gamecode)

    // retrieveGameInformation(this.state.gamecode).then((response) => {
    //   const players = convertFBObjectToArray(response)
    //   const team1Players = players.filter((player) => player.team === "Team 1")
    //   const team2Players = players.filter((player) => player.team === "Team 2")
    //   const currentPlayer = players.filter(player => player.playerId === this.props.match.params.playerId)
    //   // console.log(this.props.match.params.playerId)
    //   // console.log(currentPlayer)
    //   this.setState((state) => ({
    //     round : {
    //       ...state.round,
    //       // giverId: this.setActivePlayers("giver", state.round.turn, team1Players, team2Players),
    //       // watcherId: this.setActivePlayers("watcher", state.round.turn,team1Players, team2Players)
          
    //     },
    //     team1: {
    //       ...state.team1,
    //       players: team1Players,
    //     },
    //     team2: {
    //       ...state.team2,
    //       players: team2Players,
    //     },
    //     loading: false,
    //     currentPlayer: currentPlayer[0]
    //   }))
    // })
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