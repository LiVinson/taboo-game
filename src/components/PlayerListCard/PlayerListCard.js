import React from 'react'
import PropTypes from 'prop-types'
import { ButtonTabooCard, TabooCard } from 'components/shared/TabooCard'
import TeamList from 'components/TeamList'

const PlayerListCard = ({ players, currentPlayer, buttonInfo, tabooWord = 'Players', team1Score, team2Score }) => {
	const team1 = players.filter((player) => player.team === 'team 1')
	const team2 = players.filter((player) => player.team === 'team 2')
	const unassigned = players.filter((player) => !player.team)
	console.log(players)
	console.log(currentPlayer)
	const list = (
		<React.Fragment>
			{unassigned.length > 0 ? (
				<TeamList title="Unassigned" players={unassigned} currentPlayer={currentPlayer} />
			) : null}
			<TeamList
				title={team1Score ? `Team 1 - ${team1Score} points` : 'Team 1'}
				players={team1}
				currentPlayer={currentPlayer}
			/>

			<TeamList
				title={team2Score ? `Team 2 - ${team2Score} points` : 'Team 2'}
				players={team2}
				currentPlayer={currentPlayer}
			/>
		</React.Fragment>
	)

	if (buttonInfo) {
		return (
			<ButtonTabooCard tabooWord={tabooWord} buttons={buttonInfo}>
				{list}
			</ButtonTabooCard>
		)
	} else {
		return <TabooCard tabooWord={tabooWord}> {list}</TabooCard>
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
