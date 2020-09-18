import React from 'react'
import PropTypes from "prop-types"
import { StyledInstructionsCard } from './style.js'

export const InstructionsCard = ({ children }) => {
	return <StyledInstructionsCard>{children}</StyledInstructionsCard>
}

InstructionsCard.propTypes = {
	children: PropTypes.node.isRequired
}