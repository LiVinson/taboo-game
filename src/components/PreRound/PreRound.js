import React from "react"
import RoundInstructionsCard from "components/RoundInstructionsCard"
import ScoreCard from "components/ScoreCard"

const PreRound = (dummyRoundData) => {
  return (
    <React.Fragment>
      <ScoreCard teamScores={[2, 3]} />
      <RoundInstructionsCard {...dummyRoundData} />
    </React.Fragment>
  )
}

export default PreRound
