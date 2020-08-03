import React from "react"
import PropTypes from "prop-types"
import { TabooCard, ButtonTabooCard } from "components/shared/TabooCard"
import { InstructionsText, KeyWord } from "./style"

const RoundInstructionsCard = ({ role, giver, watcher, startRound }) => {
  switch (role) {
    case "giver":
      return displayGiverInstructions(watcher, startRound)
    case "watcher":
      return displayWatcherInstructions(giver)

    case "giverTeam":
      return displayGiverTeamInstructions(giver, watcher)

    case "watcherTeam":
      return displayWatcherTeamInstructions(giver, watcher)

    default:
      return
  }
}

RoundInstructionsCard.propTypes = {
  role: PropTypes.string.isRequired,
  giver: PropTypes.object.isRequired,
  watcher: PropTypes.object.isRequired,
  startRound: PropTypes.func
}
const displayGiverInstructions = (watcher, startRound) => {
  const buttonInfo = [
    {
      text: "Start Round!",
      onClick: startRound,
    },
  ]
  return (
    <ButtonTabooCard tabooWord="Get Ready!" buttons={buttonInfo}>
      <InstructionsText>
        It’s your turn to give clues to your team!{" "}
        {<KeyWord>{watcher.name}</KeyWord>} will be making sure you don’t say
        any taboo words.
      </InstructionsText>

      <InstructionsText>
        Select NEXT if your team guesses the word correctly or SKIP to go to the
        next card. Make sure to keep an eye on your time!
      </InstructionsText>
    </ButtonTabooCard>
  )
}

const displayWatcherInstructions = (giver) => {
  return (
    <TabooCard tabooWord="Get Ready!">
      <InstructionsText>
        It’s the other team’s turn to give clues! You are the watcher for this
        round! If {<KeyWord>{giver.name}</KeyWord>} says any words from the
        taboo list or gives any illegal clues, hit the buzzer!
      </InstructionsText>
    </TabooCard>
  )
}

const displayGiverTeamInstructions = (giver, watcher) => {
  return (
    <TabooCard tabooWord="Get Ready!">
      <InstructionsText>
        It's your turn to guess! {<KeyWord>{giver.name}</KeyWord>} will be
        giving the clues, and {<KeyWord>{watcher.name}</KeyWord>} will be
        checking for any illegal clues. Good luck!
      </InstructionsText>
    </TabooCard>
  )
}

const displayWatcherTeamInstructions = (giver, watcher) => {
  return (
    <TabooCard tabooWord="Just Relax!">
      <InstructionsText>
        It's the other team's turn to guess! {<KeyWord>{giver.name}</KeyWord>}{" "}
        will be giving the clues, and {<KeyWord>{watcher.name}</KeyWord>} will be checking for any illegal clues.
      </InstructionsText>
    </TabooCard>
  )
}
export default RoundInstructionsCard
