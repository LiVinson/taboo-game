import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'
import TimeCard from 'components/TimeCard'
import LoadingCard from 'components/shared/LoadingCard'
import { ErrorCard } from 'components/shared/ErrorCard'
import { GameCard } from 'components/GameCard'
import { changeCardStatus } from 'store/actions/cardActions'


export const InRound = ({ roundEndTime, endRound, role, error, ...props }) => {
	// export const InRound = ({ roundEndTime, deck, cardIndex, role, giver, watcher, cardsPending, changeCardStatus, endRound }) => {

	return (
		<React.Fragment>
			<TimeCard roundEndTime={roundEndTime} endRound={endRound} role={role} />

			{moment().isBefore(roundEndTime, 'second') ? (
				<GameCard role={role} error={error.cardError} {...props} />
			) : error.roundError ? (
				<ErrorCard error={error.roundError} />
			) : (
				<LoadingCard message="Checking cards played" />
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
	return {
		isPending: state.cards.pending,
		error: {
			cardError: state.cards.error && state.cards.error.errorMessage,
			roundError: state.round.error && state.round.error.errorMessage
		},
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
