import React from "react"
import RoundInfo from "components/RoundInfo"
import GameInfo from "components/GameInfo"
import ScoreCard from "components/ScoreCard"

class PlayGame extends React.Component {
  render() {
    return (
      <React.Fragment>
        <RoundInfo round={1} watcher="Stephen" giver="Danielle" />
        <GameInfo />
        <ScoreCard teamScores={[2,3]} />
      </React.Fragment>
    )
  }
}

export default PlayGame
