import React from 'react'
import { connect } from 'react-redux'
import GameInfo from 'components/GameInfo'
import PreRound from 'components/PreRound'
import InRound from 'components/InRound'
import PostRound from 'components/PostRound'
import RoundInfo from 'components/RoundInfo'
import { updateRoundStatus } from 'store/actions/roundActions'

class Round extends React.Component {
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

	startRound = () => {
		console.log('Start round')
		this.props.updateRoundStatus(this.props.gamecode, 'in progress')
	}

	endRound = () => {
		console.log('ending round')
		this.props.updateRoundStatus(this.props.gamecode, 'postround')
	}


	render() {
		const { gamecode, isPending } = this.props
		const { round, half, status, cardIndex, deck, roundEndTime, score } = this.props.gameplay
		console.log(score)
		const activeTeam = half === 'top' ? 'team 1' : 'team 2'
		const giver = this.determineActivePlayer('giver')
		const watcher = this.determineActivePlayer('watcher')
		const currentPlayer = this.props.players.find((player) => player.playerId === this.props.playerId)
		// console.log(currentPlayer)
		let role
		if (activeTeam === currentPlayer.team) {
			role = currentPlayer.playerId === giver.playerId ? 'giver' : 'giverTeam'
		} else {
			role = currentPlayer.playerId === watcher.playerId ? 'watcher' : 'watcherTeam'
		}
		return (
			<React.Fragment>
				<GameInfo players={this.props.players} currentPlayer={currentPlayer} />
				<RoundInfo round={round} watcher={watcher} giver={giver} />
				{status === 'preround' && (
					<PreRound
						teamScores={score}						
						currentPlayer={currentPlayer}
						role={role}
						giver={giver}
						watcher={watcher}						
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
						cardIndex={cardIndex}
						endRound={this.endRound}
						isPending={isPending}
					/>
				)}
				{status === 'postround' && (
					<PostRound
						gamecode={gamecode}
						role={role}
						isPending={isPending}
						//Convert deck object into array of objects. Add index to each card to track it's firestore deck.propertyName. Filters only for cards played this round
						cardsPlayed={Object.values(deck)
							.map((card, index) => ({ ...card, index }))
							.filter((card) => card.roundPlayed === `${round}-${half}`)}
					/>
				)}
			</React.Fragment>
		)
	}
}

const mapStateToProps = (state) => {
	console.log(state.cards)
	console.log(state.round)
	return {
		//errors caused by changing rounds
		error: state.round.error ? state.round.error.errorMessage : state.round.error,
		isPending: state.cards.pending,
	}
}

const mapDispatchToProps = (dispatch, prevProps) => {
	const { gameplay } = prevProps
	// console.log("Index to be updated:") 
	// console.log(gameplay.cardIndex)
	return {
		updateRoundStatus: (gamecode, newStatus) => {
			dispatch(updateRoundStatus(gamecode, newStatus, gameplay.cardIndex))
		},
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Round)
