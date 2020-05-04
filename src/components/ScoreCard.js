import React from "react"

export default function ScoreCard({ score1, score2 }) {
  return (
    <div>
      <p>
        Team 1:<span>{score1}</span>
      </p>
      <p>
        Team 2:<span>{score2}</span>
      </p>
    </div>
  )
}
