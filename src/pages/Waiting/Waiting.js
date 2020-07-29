import React from "react"
import { TabooCardTop } from "components/shared/TabooCard"
import PlayerListCard from "components/PlayerListCard"
import { Instructions } from "./style"

const Waiting = (props) => {
  const { gamecode } = props.match.params
  const { playerId } = props.match.params
  const buttonInfo = [
    {
      text: "Team 1",
      onClick: () => {
        console.log("Join Team 1")
      },
    },
    {
      text: "Team 2",
      onClick: () => {
        console.log("Join Team 2")
      },
    },
    {
        text: "Play!",
        onClick: () => { 
            console.log("Start Game")
        },
        disabled:false
    }
  ]
  //dummy data - to be retrieved from firebase using gamecode
  const players = [{id:"123", name: "Alexa", team: "unassigned" }, {id:"456", name: "Stephen", team: "team1" }, {id:"789", name: "Yumani", team: "team2" },{id:"012", name: "Faith", team: "team1" },{id:"345", name: "Lisa", team: "unassigned" }, {id: "678", name: "Danielle", team: "team2" }]

  return (
    <React.Fragment>
      <Instructions>
        Share the game code below with friends! Once all players have joined and
        picked a team, select PLAY to start!
      </Instructions>
      <TabooCardTop margin={true} tabooWord={gamecode} />
     
      <PlayerListCard players={players} currentPlayer={playerId} buttonInfo={buttonInfo} />
    </React.Fragment>
  )
}


export default Waiting
