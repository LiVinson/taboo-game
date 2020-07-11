import React from "react"
import { TabooCardTop } from "components/shared/TabooCard"

const TimeCard = ({timeRemaining, timeUp}) => {

    //calcuate difference between date.now and ending time in seconds
    //display difference.
    //every second, check if now = ending time: timeUp and display "Time's Up"
        //not: display new difference

    return (
        <TabooCardTop tabooWord={timeRemaining} />
            
 
    )
}

export default TimeCard