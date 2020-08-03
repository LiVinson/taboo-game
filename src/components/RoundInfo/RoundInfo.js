import React from 'react'
import PropTypes from "prop-types"
import { StyledRoundInfo, RoundNumber, Role } from './style'

const RoundInfo = ({ round, giver, watcher }) => {
	return (
		<StyledRoundInfo>
			<RoundNumber>Round: {round}</RoundNumber>
			<div>
                <Role>Giver: {giver}</Role>
                <Role>Watcher: {watcher}</Role>
			</div>
		</StyledRoundInfo>
	)
}

RoundInfo.propTypes = {
	round: PropTypes.string.isRequired,
	giver: PropTypes.string.isRequired,
	watcher: PropTypes.string.isRequired
}

export default RoundInfo
