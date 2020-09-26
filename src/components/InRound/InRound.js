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
	return (
		<React.Fragment>
			<TimeCard roundEndTime={roundEndTime} endRound={endRound} role={role} />
			{/*Render GameCard as long as current time is before round ends other wise check for error and render otherwise display Loading until round status changes*/}
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
	roundEndTime: PropTypes.number.isRequired,
	deck: PropTypes.object.isRequired,
	cardIndex: PropTypes.number.isRequired,
	isPending: PropTypes.bool.isRequired,
	error: PropTypes.object.isRequired,
	changeCardStatus: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
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
	const { cardIndex, gamecode, round, giver } = prevProps
	const half = giver.team === "team 1" ? "top" : "bottom"
	return {
		changeCardStatus: (cardStatus) => dispatch(changeCardStatus(gamecode, cardStatus, cardIndex, "in progress", round, half, ))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(InRound)
