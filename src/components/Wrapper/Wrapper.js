import React from "react"
import PropTypes from "prop-types"

import { StyledWrapper } from "./style"

const Wrapper = ({ children }) => {
    return (
        <StyledWrapper>
            {children}
        </StyledWrapper>
    )
}

Wrapper.propTypes = {
    children: PropTypes.node.isRequired
}

export default Wrapper