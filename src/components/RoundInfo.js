import React from "react"

export default function RoundInfo({ round, giver, watcher, turn }) {
  const giverTeam = turn === 1 ? "Team 1" : "Team 2"
  const watcherTeam = turn === 2 ? "Team 1" : "Team 2"

  return (
    <div>
      <p>Round: {round}</p>
      <p>
        Giver: {giver} ({giverTeam}) Watcher: {watcher} ({watcherTeam})
      </p>
    </div>
  )
}

// function RoundCard({ text, value }) {}
