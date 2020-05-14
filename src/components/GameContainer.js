import React from "react"
import PreRound from "./PreRound.js"
import InRound from "./InRound"

export default function GameContainer({
  round,
  onGuessingTeam,
  getActivePlayers,
  currentPlayerId,
  startRound,
  word,
  nextCard
}) {
  let msg = ""
  const { giver, watcher } = getActivePlayers()
  

  switch (round) {
    case "pre":
      msg = preRoundMsg(
        onGuessingTeam,       
        startRound,
        giver,
        watcher,
        currentPlayerId
      )
      return <PreRound
               message={msg} 
               isGiver={giver.playerId === currentPlayerId}
               startRound = {startRound}
               />
    case "in progress":
      
      return <InRound
         wordInfo={word}
         isGiver={giver.playerId === currentPlayerId}
         isWatcher={watcher.playerId === currentPlayerId}
         nextCard={nextCard}
         />      
    default:
  }


}

//Preround message based on current player's team and giver/watcher status:
function preRoundMsg(
  guessingTeam,
  startRound,
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
