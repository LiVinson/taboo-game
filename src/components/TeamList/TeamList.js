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
        {players.length > 0 ?
          players.map((player, index) => (
            // Players will see a start next to their own name
            <Player key={index}>{player.name} {currentPlayer.playerId === player.playerId ? <StyledStar/> : null}</Player>          
          )) :
            <p>No players added</p>

          
          }

      </PlayerList>
    </StyledTeamList>
  )
}

TeamList.propTypes = {
  title: PropTypes.string.isRequired,
  players: PropTypes.array.isRequired,
  currentPlayer: PropTypes.object.isRequired
}




export default TeamList
