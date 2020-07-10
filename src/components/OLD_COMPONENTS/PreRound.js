import React from "react";

export default function PreRound({message, isGiver, startRound}) {
    return (
        <React.Fragment>
            <p>{message}</p>
            {isGiver
             ?  <button onClick={startRound}>Start Game</button>
             : null}
        </React.Fragment>
    )
}