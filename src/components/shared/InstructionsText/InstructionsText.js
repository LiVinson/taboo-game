import React from 'react'
import PropTypes from 'prop-types'
import { StyledInstructionsText } from './style.js'

export const InstructionsText = ({ children, align }) => {
	return <StyledInstructionsText align={align}>{children}</StyledInstructionsText>
}

InstructionsText.propTypes = {
	children: PropTypes.node.isRequired,
}
