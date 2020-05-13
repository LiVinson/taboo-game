import React from "react"

export default function WordCard({ word, tabooWords }) {
 console.log(tabooWords)
  return (
    <div>
      <Word word={word}/>
      {tabooWords.map((word) => (
        <TabooWord key={word} word={word} />
      ))}
    </div>
  )
}

function Word({ word }) {
  return <div>{word}</div>
}

function TabooWord({ word }) {
  return <div >{word}</div>
}
