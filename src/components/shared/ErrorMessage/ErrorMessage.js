import React from "react"
import {StyledErrorMessage} from "./style"

export const ErrorMessage = ({error, large}) => {
    return <StyledErrorMessage large={large}>{error}</StyledErrorMessage>
}

ErrorMessage.defaultProp = {
    large: false,
    error: "A problem has occured. Please try again."
}