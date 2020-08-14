import React from 'react'
import GameInfo from 'components/GameInfo'
import PreRound from 'components/PreRound'
import InRound from 'components/InRound'
import PostRound from 'components/PostRound'
import RoundInfo from 'components/RoundInfo'
import Pending from 'components/shared/Pending'
import ErrorMessage from 'components/shared/ErrorMessage'
class Round extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			loading: true,
			team1: [],
			team2: [],
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
		console.log(activePlayer)
		return activePlayer
	}

	startRound = () => {
		console.log('start round')
	}

	render() {
		console.log(this.props)

		if (this.state.loading) {
			//Update with actual loading component
			return <p>Loading Firestore/Firebase</p>
		} else {
            console.log(this.props)
			const { round, half, status } = this.props.gameplay
			const activeTeam = half === 'top' ? 'team 1' : 'team 2'
			const giver = this.determineActivePlayer('giver')
            const watcher = this.determineActivePlayer('watcher')
            const currentPlayer = this.props.players.find((player) => player.playerId === this.props.playerId )
			return (
				<>
					<GameInfo players={this.props.players} currentPlayer={currentPlayer}/>
					<RoundInfo round={round} watcher={watcher} giver={giver} />

					{status === 'preround' && (
						<PreRound
							activeTeam={activeTeam}
							startRound={this.startRound}
							currentPlayer={currentPlayer}
							giver={giver}
							watcher={watcher}
						/>
					)}
					{/* {gameplay.status === 'inprogress' && <InRound {...dummyRoundData} />}
				{gameplay.status === 'postround' && <PostRound cardsPlayed={dummyPostRoundData} />}
                */}
				</>
			)
		}
	}
}

export default Round
