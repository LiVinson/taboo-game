import React from "react"
import RoundInfo from "components/RoundInfo"
import GameInfo from "components/GameInfo"

class PlayGame extends React.Component {
  render() {
    return (
      <React.Fragment>
        <RoundInfo round={1} watcher="Stephen" giver="Danielle" />
        <GameInfo />
      </React.Fragment>
    )
  }
}

export default PlayGame