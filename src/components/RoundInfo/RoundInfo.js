import React from 'react'
import PropTypes from "prop-types"
import { StyledRoundInfo, RoundNumber, Role } from './style'

const RoundInfo = ({ round, giver, watcher }) => {

	return (
		<StyledRoundInfo>
			<RoundNumber>Round: {round}</RoundNumber>
			<div>
                <Role>Giver: {giver.name}</Role>
                <Role>Watcher: {watcher.name}</Role>
			</div>
		</StyledRoundInfo>
	)
}

RoundInfo.propTypes = {
	round: PropTypes.number.isRequired,
	giver: PropTypes.object.isRequired,
	watcher: PropTypes.object.isRequired
}

export default RoundInfo
