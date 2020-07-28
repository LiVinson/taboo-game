import React from "react"
import { ProgressBar, Bar } from "./style"

const TimeCard = ({endTime, totalTime}) => {

    //pass in ending Time based on when giver clicked Start (stored in firebase)
    //Use moment to get difference between now and endTime
    //pass in (endTime-now)/totalTime converted to perentage for the width.
    //add additional styling for when time is < 50% and less than 10%
    //look into adding svg timer inside bar

    return (
        <ProgressBar>
            <Bar width="80%"></Bar>
        </ProgressBar>
    )
}

export default TimeCard