import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'
import TimeCard from 'components/TimeCard'
import { GiverGameCard, WatcherGameCard, TeamGameCard } from 'components/GameCard'
import { changeCardStatus } from 'store/actions/roundActions'

export const GameCard = (props) => {
	const currentCard = props.deck[props.cardIndex]
	switch (props.role) {
		case 'giver':
			return <GiverGameCard {...props} currentCard={currentCard} />
		case 'watcher':
			return <WatcherGameCard {...props} currentCard={currentCard} />
		case 'giverTeam':
		case 'watcherTeam':
			return <TeamGameCard {...props} />
		default:
			return null
	}
}

export const InRound = ({ roundEndTime, endRound, role, cardsPending, ...props }) => {
	// export const InRound = ({ roundEndTime, deck, cardIndex, role, giver, watcher, cardsPending, changeCardStatus, endRound }) => {

	// console.log(currentCard)
	// console.log(moment().isBefore(roundEndTime, 'second'))
	return (
		<React.Fragment>
			<TimeCard roundEndTime={roundEndTime} endRound={endRound} role={role} />

			{moment().isBefore(roundEndTime, 'second') ? (
				<GameCard role={role} {...props} />
			) : (
				<p>Preparing to change rounds</p>
			)}
		</React.Fragment>
	)
}

InRound.propTypes = {
	gamecode: PropTypes.string.isRequired,
	giver: PropTypes.object.isRequired,
	watcher: PropTypes.object.isRequired,
	role: PropTypes.string.isRequired,
	round: PropTypes.number.isRequired,
	// roundEndTime: PropTypes.
	deck: PropTypes.object.isRequired,
	cardIndex: PropTypes.number.isRequired,
	isPending: PropTypes.bool.isRequired,
	changeCardStatus: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
	console.log(state)

	// console.log(state.firestore.data)
	return {
		isPending: state.cards.pending,
		error: state.round.error,
	}
}

const mapDispatchToProps = (dispatch, prevProps) => {
	//The index of the currently displayed card, current round and gamecode
	const { cardIndex, gamecode } = prevProps
	return {
		changeCardStatus: (status) => {
			dispatch(changeCardStatus(gamecode, status, cardIndex))
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(InRound)
