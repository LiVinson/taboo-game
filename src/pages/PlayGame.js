import React from "react"
import { Redirect } from "react-router-dom"
import Team from "../components/Team"
import { retrieveGameInformation, attachListener, updateRoundStatus, updateCardInfo, updateTeamScores} from "../utils/API"
import { convertFBObjectToArray, setupListenerRequest } from "../utils/helpers"
import ScoreCard from "../components/ScoreCard"
import RoundInfo from "../components/RoundInfo"
import GameContainer from "../components/GameContainer"

export default class PlayGame extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      endType: {
        type:"numberOfTurns",
        value: {
          numberOfTurns: 2,
          team1Rotations: 0,
          team2Rotations: 0
        },
        
      },
      endGame: false,
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
        cards: [],
        currentCardIndex: 0
      },
      team1: {
        players: [],
        playerTurnIndex: 0,
        scorePerRound:[],
        score: 0,
      },
      team2: {
        players: [],
        playerTurnIndex: 0,
        scorePerRound:[],
        score: 0,
      }      
    }

    this.listenerTypes = [
      "roundStatus",
      "roundNumber",
      "currentCardIndex",
      "currentCards",   
      "score"   
    ]

    this.determineActivePlayers = this.determineActivePlayers.bind(this)
    this.startRound = this.startRound.bind(this)
    this.handleDBChange = this.handleDBChange.bind(this)
    this.determineDBChangeType = this.determineDBChangeType.bind(this)
    this.requestGameInformation = this.requestGameInformation.bind(this)   
    this.nextCard = this.nextCard.bind(this)
    this.setRoundState = this.setRoundState.bind(this)
    this.cardIndexUpdated = this.cardIndexUpdated.bind(this)
    this.confirmRoundEnd = this.confirmRoundEnd.bind(this)
    this.endRound = this.endRound.bind(this)
    this.checkEndGame = this.checkEndGame.bind(this)
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

  //Fires each time and PlayGame listener fires dur to change from firebase
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
      case "score":
        console.log("score changed")
        this.handleScoreChange(value)
        break
      default:
        console.log("something went wrong. listener type: ", type)
      break
    }
  }
  
  //retreives game data and deck and saves in state.
  // Called when all firebase listeners have been set for the first time
  requestGameInformation() {
    const {gamecode} = this.state

    retrieveGameInformation(gamecode)
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

  //Called when a change in database to the round status or round number.
  setRoundState(type, value) {
    console.log("round change type fired")
    console.log(type, value)

    if (value === "pre") {
      
      

        //update turn
        //update round number
        //update round status
        //set loading false
        //determine next player's turn
        this.setState(state => {
          const { turn, roundNumber } = this.state.round

          const index = {
            team1: null,
            team2: null
          }

          //turn 1: team 1 was the giver team 2 was the watcher
          //Should set to turn 2, and giver and watcher swap (same index)
          //If turn 2: team 2 was the giver and team 1 was the watcher
          //Should set turn to 1, and increment playerTurnIndex.
          if (turn === 2) {
            const { playerTurnIndex: team1playerTurn, players: team1Players } = this.state.team1
            const { playerTurnIndex: team2playerTurn, players: team2Players } = this.state.team2

            index.team1 = team1playerTurn + 1 < team1Players.length
            ? team1playerTurn + 1 : 0
            index.team2 = team2playerTurn + 1 < team2Players.length
            ? team2playerTurn + 1 : 0
          } else {
            index.team1 = this.state.team1.playerTurnIndex
            index.team2 = this.state.team1.playerTurnIndex
          }
         
          console.log("new indexes: ", index)
          
          //When to rotate Team 1: If turn was 2 (Team 1 was the watcher) and the index for Team 1 'next' is 0.
          //When to rotate Team 2: If turn was 2 (Team 2 was the giver) and the index for Team 2 'next' is 0.

          return {
            loading:false,
            endType: {
              ...state.endType,
              value: {
                ...state.endType.value,
                team1Rotations: turn === 2 && index.team1 === 0 ? state.endType.value.team1Rotations + 1 : state.endType.value.team1Rotations, 
                team2Rotations: turn === 2 && index.team2 === 0 ? state.endType.value.team2Rotations + 1 : state.endType.value.team2Rotations 
              }
            },
            round: {
              ...state.round,
              roundNumber: turn === 1 ? roundNumber : roundNumber + 1,
              turn: turn === 1 ? 2 : 1,
              cardsPlayed: [],
              roundStatus: "pre"
            },
            team1: {
              ...state.team1,
               playerTurnIndex: index.team1
            },
            team2: {
              ...state.team2,
               playerTurnIndex: index.team2
            }
        }
      }, this.checkEndGame)

    } else if(value === "in progress" || value === "post") {  
      console.log("round status: ", value)
      this.setState((state) => {
      console.log("loading status: ", state.loading)
      return {
        loading: state.loading === true ? false : state.loading,
        round : {
          ...state.round,
          [type]: value,
          
        }
      }})
   }
  }

  //Determines which team is fiving clues, and which player on team is giver and which is watcher
  determineActivePlayers() {
    const {team1, team2 } = this.state
    const {turn } = this.state.round

    const activePlayers = {
      giver: null,
      watcher: null,
    }

    console.log(team1, turn)
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

  //Called when player that is giving clues selects 'Start'. 
  //Makes request to change status of thr round from "pre" to "in progress" in the firebase.
  //Round status change will trigger display of taboo card to the screen.
  startRound() {
    console.log("start round")
    const { gamecode } = this.state
    //change in firebase
    updateRoundStatus(gamecode, "in progress")
  }

  //Called when active player selects 'next' or 'skip' on current card.
  //Makes request to firebase to update the currentCardIndex, and to save whether card was skipped or correct.
  //Saving card status in firebase allows it to be accesible in the CardIndex event listener fires when the card
  //status is changed.
  nextCard(status) {
    console.log("next card clicked")
   const {gamecode} = this.state
   const {currentCardIndex} = this.state.deck

   console.log(status, currentCardIndex)
   //Updates firebase with the next card index to display, and the skip/next status of currently displayed card
    updateCardInfo(gamecode, currentCardIndex, status)
  }

  //Called when there is a change to the 'cardInfo' path. Retreives new value for card index and the status of the card
  //that active player just clicked Next/Skip on. Creates an object of the card that is being removed w/ status to use
  //at end of active player's turn.
  cardIndexUpdated(cardInfo) {
    console.log("card Info updated")
    console.log(cardInfo)
    const {lastCardStatus, currentCardIndex} = cardInfo
    const currentCard = this.state.deck.cards[this.state.deck.currentCardIndex]

   
    //Contains card details, and if 'correct' or 'skip' selected
      cardInfo = {
        ...currentCard,
        status: lastCardStatus  
    } 
    //push in current Card to 'played' array
    //update current index
    //account for round status (later)
    

    console.log("none?", cardInfo.status)
    console.log("in progress?", this.state.round.roundStatus)
    console.log(this.state.round.cardsPlayed)
   //If state of card is none, this means round ended. Set loading to true.
    this.setState((state) => ({
      loading: cardInfo.status === "none" && this.state.round.roundStatus === "in progress",
      round: {
        ...state.round,
        cardsPlayed: [...this.state.round.cardsPlayed, cardInfo]
      
      },
      deck: {
        ...this.state.deck,        
          currentCardIndex          
      }
    }))

    if (cardInfo.status === "none" && this.state.round.roundStatus === "in progress") {
      console.log("round ended - update to post")
      const { gamecode } = this.state 
      updateRoundStatus(gamecode, "post")

    }  
  }
 
  //Called when time is up.Calls nextCard with none to make sure card currently showing is not 
  //displayed on next cards turn
   endRound(){
      console.log("end round function")    // const { gamecode } = this.state
    //Sets the cards that was last displayed on screen to status of none
     this.nextCard("none")

    
    //set the status of the current card
    // updateRoundStatus(gamecode, "post")
  }

  //Called when watcher saves status of cards from previous round. Determines the score for the round and
  //total team score and requests updates to firebase
  confirmRoundEnd(playedCards){
    console.log(playedCards)
    const giverTeamRoundScore = playedCards.filter(card => card.status === "correct").length
    const watcherTeamRoundScore =  playedCards.filter(card => card.status === "skipped").length
    console.log("giverTeamRoundScore: ", giverTeamRoundScore)
    console.log("watcherTeamRoundScore: ", watcherTeamRoundScore)
    let team1UpdatedScore
    let team2UpdatedScore
    console.log(this.state.team1.score)
    console.log(this.state.team2.score)
    if (this.state.round.turn === 1) {
      team1UpdatedScore = giverTeamRoundScore + this.state.team1.score
      team2UpdatedScore = watcherTeamRoundScore + this.state.team2.score
      console.log("updated scores: ")
      console.log(team1UpdatedScore)
      console.log(team2UpdatedScore)

    } else {
      team1UpdatedScore = watcherTeamRoundScore + this.state.team1.score
      team2UpdatedScore = giverTeamRoundScore + this.state.team2.score
      console.log("updated scores: ")
      console.log(team1UpdatedScore)
      console.log(team2UpdatedScore)
    }

    updateTeamScores(this.state.gamecode, team1UpdatedScore, team2UpdatedScore)
  }

  //Called when a change to the scores in firebase. Sets scores for both teams. Calls to check if game is over
  //pickle - determine how to handle no score change - i.e. giver does not score any points. This will not fire.
  handleScoreChange({team1, team2}){
    console.log("scores from FB: ", team1, team2)
    const team1PrevRoundScore = team1 - this.state.team1.score    
    const team2PrevRoundScore = team2 - this.state.team2.score

    this.setState((state) => (
      {
        team1 : {
          ...state.team1,
          scorePerRound: state.team1.scorePerRound.concat([team1PrevRoundScore]),
          score: team1,
          // playerTurnIndex: state.team1.playerTurnIndex + 1 < state.team1.players.length 
          // ? state.team1.playerTurnIndex + 1 : 0
        },
        team2 : {
          ...state.team2,
          scorePerRound: state.team2.scorePerRound.concat([team2PrevRoundScore]),
          score: team2,
          // playerTurnIndex: state.team2.playerTurnIndex + 1 < state.team2.players.length 
          // ? state.team2.playerTurnIndex + 1 : 0
        }
     }
    ), updateRoundStatus(this.state.gamecode, "pre")) 
    //pickle - add functionalty to change to pre
  }


  checkEndGame(){    
    const { type: endType, value } = this.state.endType
    switch(endType) {
      case "numberOfTurns":
        console.log("checking endgame: number of turns ")
        //Checks if the number of times the game has reseted back to first player on each team
       console.log("team1 rotations:", value.team1Rotations)
       console.log("team2 rotations:", value.team2Rotations)
       console.log("total turns: ", value.numberOfTurns)
        if (value.team1Rotations >= value.numberOfTurns &&  value.team2Rotations >= value.numberOfTurns) {
          this.setState({
            endGame: true
          })
        } else {
          this.setState({
            loading: false
          })
        }
        break
      case "maxScore":
        break
      case "cardsPlayed":
        break
      default:
        console.log("error with game ending")
    }
  
    }
      
    //check that both teams still have at least 2 players
    //Check type of endGame

    //If based on rounds, compare number of rounds to max.
    //If meets condition, call endGame
    //otherwise, call start nextround

  render() {
    const { loading, team1, team2, round, currentPlayer, deck } = this.state
    const { roundNumber, giver, watcher, turn, roundStatus, cardsPlayed } = round
    const currentWord = deck.cards[deck.currentCardIndex]



    console.log(currentWord)
    if (this.state.endGame) {
      console.log(currentPlayer.playerId)
      return <Redirect
        to={{
          pathname: `/end/${this.state.gamecode}/${currentPlayer.playerId}`,
          state: {
            team1Score: this.state.team1.score,
            team2Score: this.state.team2.score
          }
        }}
        />
    } else if (loading) {
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
                this.determineActivePlayers()
              }
              word={currentWord}
              nextCard = {this.nextCard}
              endRound={this.endRound}
              cardsPlayed = {cardsPlayed}
              confirmRoundEnd = {this.confirmRoundEnd}
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
