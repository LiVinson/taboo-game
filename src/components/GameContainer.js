import React from "react"

export default function GameContainer({
  round,
  guessingTeam,
  giver,
  watcher,
  giverName,
  watcherName,
}) {
  let msg = ""
  if (round === "pre") {
    msg = preRoundMsg(guessingTeam, giver, watcher, giverName, watcherName)
  }
  return (
    <div
      style={{
        float: "left",
        border: "2px solid black",
        height: "100%",
        width: "65%",
      }}
    >
      {round === "pre" ? (
        <div dangerouslySetInnerHTML={{ __html: msg }} />
      ) : //   guessingTeam={guessingTeam}
      //   giver={giver}
      //   watcher={watcher}
      //   giverName={giverName}
      //   watcherName={watcherName}
      // />
      null}
    </div>
  )
}

//Preround:
function preRoundMsg(
  guessingTeam,
  giver = false,
  watcher = false,
  giverName,
  watcherName
) {
  let preRoundMsg = ""

  if (guessingTeam) {
    preRoundMsg += giver
      ? `<p>It's your turn to give clues to your team. ${watcherName} will be making sure you don't say any taboo words! Select the start button to begin!</p><button>Start Round!</button>`
      : `<p>It's your team's turn to guess the words, and ${giverName} will be giving the clues. Get Ready!</p>`
  } else {
    preRoundMsg += watcher
      ? `<p>It's the other team's turn to give the clues! You are the watcher for this round! Make sure ${giverName} does not say any taboo words!</p>`
      : `<p>Sit back and relax! It's the other team's turn to guess the words.</p>`
  }
  console.log(preRoundMsg)
  return preRoundMsg
}
