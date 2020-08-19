import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TimeCard from 'components/TimeCard'
import { GiverGameCard, WatcherGameCard, TeamGameCard } from 'components/GameCard'
import { changeCardStatus } from 'store/actions/roundActions'

export const InRound = ({ roundEndTime, deck, cardIndex, role, giver, watcher, isPending, changeCardStatus, endRound }) => {
	const currentCard = deck[cardIndex]
	// console.log(currentCard)
	return (
		<React.Fragment>
			<TimeCard roundEndTime={roundEndTime}  endRound={endRound} role={role}/>
			{role === 'giver' && (
				<GiverGameCard currentCard={currentCard} changeCardStatus={changeCardStatus} isPending={isPending} />
			)}
			{role === 'watcher' && (
				<WatcherGameCard currentCard={currentCard} changeCardStatus={changeCardStatus} isPending={isPending} />
			)}
			{(role === 'giverTeam' || role === 'watcherTeam') && (
				<TeamGameCard role={role} giver={giver} watcher={watcher} />
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
		isPending: state.round.pending,
		error: state.round.error,
	}
}

const mapDispatchToProps = (dispatch, prevProps) => {
	//The index of the currently displayed card, current round and gamecode
	const { cardIndex, round, gamecode } = prevProps
	return {
		changeCardStatus: (status) => {
			dispatch(changeCardStatus(gamecode, status, round, cardIndex))
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(InRound)
