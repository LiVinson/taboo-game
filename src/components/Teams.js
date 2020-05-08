import React from "react"
import Team from "./Team"

export default function Teams({
  teamNames,
  players,
  filterTeam = false,
  toggleTeam = null,
}) {
  return (
    <div>
      {teamNames.map((team) => (
        <Team
          teamName={team}
          players={filterTeam ? filterByTeam(players, { team }) : players}
          toggleTeam={toggleTeam}
        />
      ))}
    </div>
  )
}

function filterByTeam(players, team) {
  const filteredPlayers = players.filter((player) => {
    // console.log(player.team, team)
    return player.team === team
  })
  console.log(filteredPlayers)
  return filteredPlayers
}
