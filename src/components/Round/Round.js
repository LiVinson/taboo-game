import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import GameInfo from 'components/GameInfo'
import RoundInfo from 'components/RoundInfo'
import PreRound from 'components/PreRound'
import InRound from 'components/InRound'
import PostRound from 'components/PostRound'
import { updateRoundStatus } from 'store/actions/roundActions'

export class Round extends React.Component {
	//Receives either 'giver' or 'watcher. Based on half (top = team 1, bottom = team 2) and the teamTurn index, returns
	//player object for the giver and watcher.
	determineActivePlayer = (role) => {
		let activePlayer
		const { half, team1Turn, team2Turn } = this.props.gameplay
		const team1 = this.props.players.filter((player) => player.team === 'team 1')
		const team2 = this.props.players.filter((player) => player.team === 'team 2')
		if (role === 'giver') {
			activePlayer = half === 'top' ? team1[team1Turn] : team2[team2Turn]
		} else {
			activePlayer = half === 'top' ? team2[team2Turn] : team1[team1Turn]
		}
		return activePlayer
	}

	//Can only be called by giver. Changes round status so all screens update.
	startRound = () => {
		this.props.updateRoundStatus(this.props.gamecode, 'in progress')
	}

	//Called automatically when time ends during the round
	endRound = () => {
		this.props.updateRoundStatus(this.props.gamecode, 'postround')
	}

	render() {
		const { gamecode } = this.props
		const { round, half, status, roundEndTime, score } = this.props.gameplay
		const { deck, skipPenalty, endValue } = this.props
		const activeTeam = half === 'top' ? 'team 1' : 'team 2'
		const giver = this.determineActivePlayer('giver')
		const watcher = this.determineActivePlayer('watcher')
		const currentPlayer = this.props.players.find((player) => player.playerId === this.props.playerId)
		let role
		if (activeTeam === currentPlayer.team) {
			role = currentPlayer.playerId === giver.playerId ? 'giver' : 'giverTeam'
		} else {
			role = currentPlayer.playerId === watcher.playerId ? 'watcher' : 'watcherTeam'
		}
		return (
			<React.Fragment>
				<GameInfo players={this.props.players} currentPlayer={currentPlayer} />
				<RoundInfo round={round} watcher={watcher} giver={giver} currentPlayerId={currentPlayer.playerId} />
				{status === 'preround' && (
					<PreRound
						round={round}
						half={half}
						teamScores={score}
						currentPlayer={currentPlayer}
						role={role}
						giver={giver}
						watcher={watcher}
						endValue={endValue}
						skipPenalty={skipPenalty}
						startRound={this.startRound}
						error={this.props.error}
					/>
				)}
				{status === 'in progress' && (
					<InRound
						gamecode={gamecode}
						giver={giver}
						watcher={watcher}
						role={role}
						round={round}
						roundEndTime={roundEndTime}
						deck={deck}
						cardIndex={deck[gamecode].cardIndex}
						endRound={this.endRound}
					/>
				)}
				{status === 'postround' && (
					<PostRound
						gamecode={gamecode}
						role={role}
						//Convert deck object into array of objects. Add index to each card to track it's firestore deck.propertyName. Filters only for cards played this round
						cardsPlayed={Object.values(deck)
							.map((card, index) => ({ ...card, index }))
							.filter((card) => card.roundPlayed === `${round}-${half}`)}
						round={round}
						half={half}
					/>
				)}
			</React.Fragment>
		)
	}
}

Round.propTypes = {
	deck: PropTypes.object.isRequired,
	gamecode: PropTypes.string.isRequired,
	players: PropTypes.array.isRequired,
	gameplay: PropTypes.object.isRequired,
	playerId: PropTypes.string.isRequired,
	error: PropTypes.string,
	updateRoundStatus: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
	return {
		//errors caused by changing rounds
		error: state.round.error ? state.round.error.errorMessage : state.round.error,
	}
}

const mapDispatchToProps = (dispatch, prevProps) => {
	const { cardIndex } = prevProps.deck[prevProps.gamecode]
	const { round, half } = prevProps.gameplay
	return {
		updateRoundStatus: (gamecode, newRoundStatus) => {
			dispatch(updateRoundStatus(gamecode, newRoundStatus, cardIndex, round, half))
		},
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Round)
