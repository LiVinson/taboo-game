import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TimeCard from 'components/TimeCard'
import { GiverGameCard, WatcherGameCard, TeamGameCard } from 'components/GameCard'
import { changeCardStatus } from 'store/actions/roundActions'

/*
Information needed:
- Who is current player
- Who is the giver
- WHo is the watcher
- Who is giverTeam
- Who is watcherTeam
- Time remaining
- Skip handler
- Next handler
- Buzzer Handler
- timeup callback

*/
const InRound = ({ deck, cardIndex, role, giver, watcher, isPending, changeCardStatus }) => {
	const currentCard = deck[cardIndex]
	console.log(currentCard)
	return (
		<React.Fragment>
			<TimeCard timeRemaining={'2:00'} timeUp={() => console.log('time up')} />
			{role === 'giver' && <GiverGameCard currentCard={currentCard} changeCardStatus={changeCardStatus} isPending={isPending} />}
			{role === 'watcher' && <WatcherGameCard currentCard={currentCard} changeCardStatus={changeCardStatus} isPending={isPending} />}
			{(role === 'giverTeam' || role === 'watcherTeam') && (
				<TeamGameCard role={role} giver={giver} watcher={watcher} />
			)}
		</React.Fragment>
	)
}

InRound.propTypes = {
	giver: PropTypes.object.isRequired,
	watcher: PropTypes.object.isRequired,
	role: PropTypes.string,
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
