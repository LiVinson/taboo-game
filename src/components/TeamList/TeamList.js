import React from "react"
import { StyledTeamList, PlayerTitle, PlayerList, Player } from "./style"

//players will need to be array of objects with player names and id.
//Compare playerId to currentPlayer to determine if style and icon
const TeamList = ({ title, players, currentPlayer }) => {
  return (
    <StyledTeamList>
      <PlayerTitle>{title}</PlayerTitle>
      <PlayerList>
        {players.map((player, index) => (
          <Player key={index}>{player.name}</Player>
        ))}
      </PlayerList>
    </StyledTeamList>
  )
}





export default TeamList
