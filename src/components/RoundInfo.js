import React from "react"

export default function RoundInfo({ round, giver, watcher }) {
  return (
    <div>
      <p>Round: {round}</p>
      <p>
        Giver: {giver.name} ({giver.team})
      </p>
      <p>
        Watcher: {watcher.name} ({watcher.team})
      </p>
    </div>
  )
}

// function RoundCard({ text, value }) {}
