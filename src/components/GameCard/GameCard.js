import React from "react"
import { ButtonTabooCard, TabooCard } from "components/shared/TabooCard"
import { InstructionsText, KeyWord } from "./style"

//current card object, skip and next callback.
export const GiverGameCard = () => {
  const buttonInfo = [
    {
      text: "Skip!",
      onClick: () => {
        console.log("skip card")
      },
    },
    {
      text: "Next!",
      onClick: () => {
        console.log("Next card")
      },
    },
  ]

  const card = {
    tabooWord: "Simba",
    words: ["Lion King", "Disney", "Mufasa", "Pride Rock", "Nala"],
  }

  return (
    <ButtonTabooCard
      buttons={buttonInfo}
      tabooWord={card.tabooWord}
      list={card.words}
    />
  )
}

export const WatcherGameCard = () => {
  const buttonInfo = [
    {
      text: "Buzzer!",
      onClick: () => {
        console.log("Buzz")
      },
    },
  ]

  const card = {
    tabooWord: "Simba",
    words: ["Lion King", "Disney", "Mufasa", "Pride Rock", "Nala"],
  }

  return (
    <ButtonTabooCard
      buttons={buttonInfo}
      tabooWord={card.tabooWord}
      list={card.words}
    />
  )
}

export const TeamGameCard = ({ role, giver, watcher }) => {
  return (
    <React.Fragment>
      {role === "giverTeam" ? (
        <TabooCard tabooWord="Relax!">
          <InstructionsText>
            It’s the other team’s turn to give clues and guess!{" "}
            <KeyWord>{watcher.name}</KeyWord> will be watching to make sure{" "}
            <KeyWord>{giver.name}</KeyWord> doesn’t say any Taboo words.
          </InstructionsText>
        </TabooCard>
      ) : (
        <TabooCard tabooWord="Relax!">
          <InstructionsText>
            It’s the other team’s turn to give clues and guess!
            <KeyWord>{watcher.name}</KeyWord> will be watching to make sure{" "}
            <KeyWord>{giver.name}</KeyWord> doesn’t say any Taboo words.
          </InstructionsText>
        </TabooCard>
      )}
    </React.Fragment>
  )
}
