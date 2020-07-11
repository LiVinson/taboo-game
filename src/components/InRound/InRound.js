import React from "react"
import TimeCard from "components/TimeCard"

/*
Information needed:
- Who is current player
- Who is the giver
- WHo is the watcher
- Who is giverTeam
- Who is watcherTeam
- Time remaining
- Skip handler
- Next handler
- Buzzer Handler
- timeup callback

*/
const InRound = (dummyRoundData) => {
    
    return (
        <TimeCard timeRemaining={"2:00"} timeUp={()=> console.log("time up")} />
    )
}

export default InRound