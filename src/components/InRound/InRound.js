import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
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
const InRound = ({ role, giver, watcher, changeCardStatus }) => {
	//  ({ giver, watcher, role, changeCardStatus }) => {

	// changeCardStatus = (status) => {
	// 	//get current index
	// 	//update status based on status and store round number
	// 	//store in cardsPlayed array?
	// 	//increment index
	// 	console.log(status)
	// 	console.log(props)

	// 	// const {gamecode} = this.props.match.params
	// 	// const { cardIndex, round } = this.props.gameplay

	// 	// this.props.changeCardStatus(gamecode, status, round, cardIndex)
	// }

	
	return (
		<React.Fragment>
			<TimeCard timeRemaining={'2:00'} timeUp={() => console.log('time up')} />
			{role === 'giver' && <GiverGameCard changeCardStatus={changeCardStatus} />}
			{role === 'watcher' && <WatcherGameCard changeCardStatus={changeCardStatus} />}
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
/*
const mapStateToProps = (state, prevProps) => {
	const game = state.firestore.data?.games?.[prevProps.match.params.gamecode]
	console.log(game)
	// console.log(state.firestore.data)
	return {
		gamecode: state.game.gamecode, //tbd if adding this
		game: game ? game : {}, //from firestore
		gameDataReceived: state.firestore.status.requested[`games/${prevProps.match.params.gamecode}`],
	}
}*/

const mapDispatchToProps = (dispatch, prevProps) => {
	console.log(prevProps)
	const { cardIndex, round, gamecode } = prevProps
	return {
		changeCardStatus: (status) => {
			dispatch(changeCardStatus(gamecode, status, round, cardIndex))
		},
	}
}

export default connect(null, mapDispatchToProps)(InRound)
