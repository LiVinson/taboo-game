import React from "react"

export default function TeamButton({ playerId, team, toggleTeam }) {
  if (team === "Team 1") {
    return (
      <button onClick={() => toggleTeam("Team 2", playerId)}>
        Join Team 2
      </button>
    )
  } else if (team === "Team 2") {
    return (
      <button onClick={() => toggleTeam("Team 1", playerId)}>
        Join Team 1
      </button>
    )
  } else {
    return (
      <React.Fragment>
        <button onClick={() => toggleTeam("Team 1", playerId)}>
          Join Team 1
        </button>
        <button onClick={() => toggleTeam("Team 2", playerId)}>
          Join Team 2
        </button>
      </React.Fragment>
    )
  }
}
