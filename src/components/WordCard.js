import React from "react"

export default function WordCard({ word, tabooList }) {
  return (
    <div>
      <Word />
      {tabooList.map((word) => (
        <TabooWord word={word} />
      ))}
    </div>
  )
}

function Word({ word }) {
  return <div>{word}</div>
}

function TabooWord({ word }) {
  return <div>{word}</div>
}
