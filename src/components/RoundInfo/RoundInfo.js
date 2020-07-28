import React from 'react'
import { StyledRoundInfo, RoundNumber, RoundRoles, Role } from './style'

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

export default RoundInfo
