import React from "react"
import PropTypes from "prop-types"
import { StyledTeamList, PlayerTitle, PlayerList, Player, StyledStar } from "./style"


//players will need to be array of objects with player names and id.
//Compare playerId to currentPlayer to determine if style and icon
const TeamList = ({ title, players, currentPlayer }) => {
  return (
    <StyledTeamList>
      <PlayerTitle>{title}</PlayerTitle>
      <PlayerList>
        {players.map((player, index) => (
          // Players will see a start next to their own name
          <Player key={index}>{player.name} {currentPlayer === player.id ? <StyledStar/> : null}</Player>          

        ))}
      </PlayerList>
    </StyledTeamList>
  )
}

TeamList.propTypes = {
  title: PropTypes.string.isRequired,
  players: PropTypes.array.isRequired,
  currentPlayer: PropTypes.string.isRequired
}




export default TeamList
