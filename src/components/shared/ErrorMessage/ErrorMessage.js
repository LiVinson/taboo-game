import React from "react"
import {StyledErrorMessage} from "./style"

export const ErrorMessage = ({error}) => {
    return <StyledErrorMessage>{error}</StyledErrorMessage>
}

ErrorMessage.defaultProp = {
    error: "A problem has occured. Please try again."
}