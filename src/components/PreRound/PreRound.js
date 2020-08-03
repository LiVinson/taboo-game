import React from "react"
import PropTypes from "prop-types"
import RoundInstructionsCard from "components/RoundInstructionsCard"
import ScoreCard from "components/ScoreCard"

const PreRound = (props) => {
  return (
    <React.Fragment>
      <ScoreCard teamScores={[2, 3]} />
      <RoundInstructionsCard {...props} />
    </React.Fragment>
  )
}


PreRound.propTypes = {
  role:PropTypes.string.isRequired,
  giver:PropTypes.object.isRequired,
  watcher:PropTypes.object.isRequired,
  startRound : PropTypes.func.isRequired
}

export default PreRound
