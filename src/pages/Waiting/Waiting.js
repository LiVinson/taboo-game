import React from "react"
import TabooCard, { TabooCardTop } from "components/TabooCard"
import { Instructions, StyledTeamList, PlayerList, PlayerTitle, Player } from "./style"

const Waiting = (props) => {
  const { gamecode } = props.match.params
  const { playerId } = props.match.params
  const buttonInfo = [
    {
      text: "Team 1",
      onClick: () => {
        console.log("Join Team 1")
      },
    },
    {
      text: "Team 2",
      onClick: () => {
        console.log("Join Team 2")
      },
    },
    {
        text: "Play!",
        onClick: () => { 
            console.log("Start Game")
        },
        disabled:false
    }
  ]
  return (
    <React.Fragment>
      <Instructions>
        Share the game code below with friends! Once all players have joined and
        picked a team, select PLAY to start!
      </Instructions>
      <TabooCardTop margin={true} tabooWord={gamecode} />
      <TabooCard tabooWord="Players" buttons={buttonInfo}>
        <TeamList
          title="Unassigned"
          players={["Lisa", "Alexa"]}
          currentPlayerId={playerId}
        />
        <TeamList
          title="Team 1"
          players={["Faith", "Stephen"]}
          currentPlayerId={playerId}
        />
        <TeamList
          title="Team 2"
          players={["Danielle", "Yumani"]}
          currentPlayerId={playerId}
        />
      </TabooCard>
    </React.Fragment>
  )
}

//players will need to be array of objects with player names and id.
//Compare playerId to currentPlayer to determine if style and icon
const TeamList = ({ title, players, currentPlayer }) => {
  return (
    <StyledTeamList>
      <PlayerTitle>{title}</PlayerTitle>
      <PlayerList>
        {players.map((player, index) => (
          <Player key={index}>{player}</Player>
        ))}
      </PlayerList>
    </StyledTeamList>
  )
}

export default Waiting
