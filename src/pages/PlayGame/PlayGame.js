import React from "react"
import RoundInfo from "components/RoundInfo"
import GameInfo from "components/GameInfo"
import PreRound from "components/PreRound"
import InRound from "components/InRound"


class PlayGame extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      roundStatus: "inProgress",
    }
  }

  startRound = () => {
    console.log("start round")
  }

  render() {
    const dummyRoundData = {
      role: "watcherTeam",
      giver: { name: "Danielle", playerId: 123 },
      watcher: { name: "Stephen", playerId: 345 },
      startRound: this.startRound,
    }

    return (
      <React.Fragment>
        <RoundInfo round={1} watcher="Stephen" giver="Danielle" />
        <GameInfo />
        {this.state.roundStatus === "preRound"  && <PreRound {...dummyRoundData} /> }
        {this.state.roundStatus === "inProgress" && <InRound {...dummyRoundData} /> }
      </React.Fragment>
    )
  }
}

export default PlayGame
