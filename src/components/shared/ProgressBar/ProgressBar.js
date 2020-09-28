import React from "react"
import { StyledProgressBar, Bar } from './style'

export const ProgressBar = ({width}) => {
    return (
        <StyledProgressBar>
            <Bar width={width}/>
        </StyledProgressBar>
        )
}
