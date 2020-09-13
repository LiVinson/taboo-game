import React from "react"
import {StyledErrorMessage} from "./style"

export const ErrorMessage = ({error, large, light}) => {
    return <StyledErrorMessage light={light} large={large}>{error}</StyledErrorMessage>
}

ErrorMessage.defaultProp = {
    large: false,
    error: "A problem has occured. Please try again."
}