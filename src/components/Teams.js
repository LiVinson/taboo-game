import React from "react"
import Team from "./Team"

export default function Teams({ team, players, toggleTeam }) {
  return (
    <div>
      <Team
        teamName="Unassigned"
        players={filterByTeam(players, "unassigned")}
        toggleTeam={toggleTeam}
      />
      <Team
        teamName="Team 1"
        players={filterByTeam(players, "Team 1")}
        toggleTeam={toggleTeam}
      />
      <Team
        teamName="Team 2"
        players={filterByTeam(players, "Team 2")}
        toggleTeam={toggleTeam}
      />
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
