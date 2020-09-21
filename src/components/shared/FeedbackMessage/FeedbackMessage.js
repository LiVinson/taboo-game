import React from "react"
import PropTypes from "prop-types"
import {StyledErrorMessage, StyledSuccessMessage} from "./style"

export const ErrorMessage = ({error, large, light}) => {
    return <StyledErrorMessage light={light} large={large}>{error}</StyledErrorMessage>
}

ErrorMessage.propTypes = {
    error: PropTypes.string,
    large: PropTypes.bool,
    light: PropTypes.bool
}

ErrorMessage.defaultProp = {
    large: false,
    error: "A problem has occured. Please try again."
}

export const SuccessMessage = ({message}) => {
    return <StyledSuccessMessage>{message}</StyledSuccessMessage>
}



SuccessMessage.propTypes = {
    message: PropTypes.string.isRequired,
}
