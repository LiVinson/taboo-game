import React from "react"
import {StyledErrorMessage, StyledSuccessMessage} from "./style"

export const ErrorMessage = ({error, large, light}) => {
    return <StyledErrorMessage light={light} large={large}>{error}</StyledErrorMessage>
}

export const SuccessMessage = ({message}) => {
    return <StyledSuccessMessage>{message}</StyledSuccessMessage>

}

ErrorMessage.defaultProp = {
    large: false,
    error: "A problem has occured. Please try again."
}