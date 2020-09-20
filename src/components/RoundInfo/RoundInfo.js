import React from 'react'
import PropTypes from 'prop-types'
import { StyledRoundInfo, RoundNumber, Role } from './style'
import Star from 'components/shared/Star'

const RoundInfo = ({ round, giver, watcher, currentPlayerId }) => {
	return (
		<StyledRoundInfo>
			<RoundNumber>Round: {round}</RoundNumber>
			<div>
				<Role>
					Giver: {giver.name}
					{currentPlayerId === giver.playerId && <Star/>}{' '}
				</Role>
				<Role>
					Watcher: {watcher.name}
					{currentPlayerId === watcher.playerId && <Star/>}
				</Role>
			</div>
		</StyledRoundInfo>
	)
}

RoundInfo.propTypes = {
	round: PropTypes.number.isRequired,
	giver: PropTypes.object.isRequired,
	watcher: PropTypes.object.isRequired,
}

export default RoundInfo
