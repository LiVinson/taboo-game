import React from "react"
import PreRound from "./PreRound.js"
import InRound from "./InRound"
import PostRound from "./PostRound"
import Timer from "./Timer"

//pickle - separate into 3 nested routes with 3 different components displayed in the PlayGame component
export default function GameContainer({
  round,
  onGuessingTeam,
  getActivePlayers,
  currentPlayerId,
  startRound,
  word,
  nextCard,
  endRound,
  cardsPlayed,
  confirmRoundEnd
}) {
  let msg = ""
  const { giver, watcher } = getActivePlayers()
  console.log(giver, watcher)
  

  switch (round) {
    case "pre":
      msg = preRoundMsg(
        onGuessingTeam,       
        giver,
        watcher,
        currentPlayerId
      )
      return (
          <React.Fragment>
              <Timer
               runTimer={false}
               />
              <PreRound
               message={msg} 
               isGiver={giver.playerId === currentPlayerId}
               isWatcher={watcher.playerId === currentPlayerId}
               startRound = {startRound}
               />
          </React.Fragment>)
    case "in progress":      
      return (
        <React.Fragment>
            <Timer 
              runTimer={true}
              endofTimer={endRound}/>
            <InRound
            wordInfo={word}
            isGiver={giver.playerId === currentPlayerId}
            isWatcher={watcher.playerId === currentPlayerId}
            nextCard={nextCard}
            runTimer={true}
            />      
        </React.Fragment>)
        case "post":      
          return (
            <PostRound
              cardsPlayed={cardsPlayed}
              confirmRoundEnd={confirmRoundEnd}
              isWatcher={watcher.playerId === currentPlayerId}
            />
          )

    default:
  }


}

//Preround message based on current player's team and giver/watcher status:
function preRoundMsg(
  guessingTeam, 
  giver,
  watcher,
  currentPlayerId
) {
  let preRoundMsg = ""


  console.log(giver, watcher)
  const isGiver = giver.playerId === currentPlayerId
  const isWatcher = watcher.playerId === currentPlayerId

  console.log(currentPlayerId + " is giver: " + isGiver)  
  console.log(currentPlayerId + " is watcher: " + isWatcher)
  if (guessingTeam()) {
    preRoundMsg += isGiver
      ? `It's your turn to give clues to your team. ${watcher.name} will be making sure you don't say any taboo words! Select the start button to begin!`
      : `It's your team's turn to guess the words, and ${giver.name} will be giving the clues. Get Ready!`
  } else {
    preRoundMsg += isWatcher
      ? `It's the other team's turn to give the clues! You are the watcher for this round! Make sure ${giver.name} does not say any taboo words!`
      : `Sit back and relax! It's the other team's turn to guess the words.`
  }
  console.log(preRoundMsg)
  return preRoundMsg
}
