import React from "react"
import { TabooCard } from "components/shared/TabooCard"
import { Scores } from "./style"

const ScoreCard = ({teamScores}) => {
  return (
    <TabooCard tabooWord="Score">
      <Scores>
        {teamScores.map((score, index) => (
          <li key={index}>
            Team {index + 1}: <span>{score}</span>
          </li>
        ))}
      </Scores>
    </TabooCard>
  )
}

export default ScoreCard
