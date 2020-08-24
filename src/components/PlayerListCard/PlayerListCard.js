import React from 'react'
import PropTypes from 'prop-types'
import { ButtonTabooCard, TabooCard } from 'components/shared/TabooCard'
import TeamList from 'components/TeamList'

const PlayerListCard = ({ buttonInfo, tabooWord = 'Players', children }) => {
	
	if (buttonInfo) {
		return (
			<ButtonTabooCard tabooWord={tabooWord} buttons={buttonInfo}>{children}</ButtonTabooCard>

		)
	} else {
		return <TabooCard tabooWord={tabooWord}> {children}</TabooCard>
	}
}

PlayerListCard.propTypes = {
	players: PropTypes.array.isRequired,
	currentPlayer: PropTypes.object.isRequired,
	buttonInfo: PropTypes.array,
	tabooWord: PropTypes.string,
	team1Score: PropTypes.string,
	team2Score: PropTypes.string,
}

export default PlayerListCard
