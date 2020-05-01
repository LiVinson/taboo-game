import React from "react"
import TeamButton from "./TeamButton"

export default function Team({ players, teamName, toggleTeam }) {
  return players.length > 0 ? (
    <div style={{ border: "solid 1 px" }}>
      <h2>{teamName}</h2>
      <ul>
        {players.map((player) => (
          <li key={player.playerId}>
            <p>{player.name}</p>

            {toggleTeam ? (
              <TeamButton
                team={player.team}
                playerId={player.playerId}
                toggleTeam={toggleTeam}
              />
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <h3>There are no {teamName} players.</h3>
  )
}
