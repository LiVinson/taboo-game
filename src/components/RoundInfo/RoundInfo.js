import React from "react"
import { StyledRoundInfo, RoundData } from "./style"

const RoundInfo = ({ round, giver, watcher}) => {
    return (
        <StyledRoundInfo>
            <RoundData width="100%">Round: <span>{round}</span></RoundData>
            <RoundData >Giver: <span>{giver}</span></RoundData>
            <RoundData >Watcher: <span>{watcher}</span></RoundData>
        </StyledRoundInfo>
    )
}

export default RoundInfo