import React from 'react'
import { connect } from 'react-redux'
import GameInfo from 'components/GameInfo'
import PreRound from 'components/PreRound'
import InRound from 'components/InRound'
import PostRound from 'components/PostRound'
import RoundInfo from 'components/RoundInfo'
import Pending from 'components/shared/Pending'
import ErrorMessage from 'components/shared/ErrorMessage'
import { updateRoundStatus } from 'store/actions/roundActions'
// import { convertOBjectToArray } from "utils/helpers"
class Round extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			loading: true,
			team1: [],
			team2: [],
			cardsPlayed: [],
		}
	}

	componentDidMount() {
		//Get the initial giver and watcher
		console.log('mounting...')

		this.setState({
			loading: false,
			team1: this.props.players.filter((player) => player.team === 'team 1'),
			team2: this.props.players.filter((player) => player.team === 'team 2'),
		})
	}

	determineActivePlayer = (role) => {
		let activePlayer
		const { half, team1Turn, team2Turn } = this.props.gameplay
		if (role === 'giver') {
			activePlayer = half === 'top' ? this.state.team1[team1Turn] : this.state.team2[team2Turn]
		} else {
			activePlayer = half === 'top' ? this.state.team2[team2Turn] : this.state.team1[team1Turn]
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

	confirmRoundEnd = () => {
		console.log('confirming round scores')
	}

	render() {
	
		if (this.state.loading) {
			// if (this.state.loading || this.props.pending) {
			//Update with actual loading component
			return <p>Loading Firestore/Firebase</p>
		} else {
			const { gamecode } = this.props
			const { round, half, status, cardIndex, deck, roundEndTime } = this.props.gameplay
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
					<RoundInfo round={round} watcher={watcher} giver={giver} />
					{status === 'preround' && (
						<PreRound
							startRound={this.startRound}
							currentPlayer={currentPlayer}
							giver={giver}
							watcher={watcher}
							role={role}
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
						/>
					)}
					{status === 'postround' && (
						<PostRound
							gamecode={gamecode}
							role={role}
							cardsPlayed={Object.values(deck).filter((card) => card.roundPlayed === `${round}-${half}`)}
						/>
					)}
				</React.Fragment>
			)
		}
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		updateRoundStatus: (gamecode, newStatus) => {
			dispatch(updateRoundStatus(gamecode, newStatus))
		},
	}
}
export default connect(null, mapDispatchToProps)(Round)
