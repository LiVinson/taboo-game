import React from 'react'
import RoundInfo from 'components/RoundInfo'
import GameInfo from 'components/GameInfo'
import PreRound from 'components/PreRound'
import InRound from 'components/InRound'
import PostRound from 'components/PostRound'

class PlayGame extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			roundStatus: 'preRound',
		}
	}

	startRound = () => {
		console.log('start round')
	}

	render() {
		const dummyRoundData = {
			role: 'watcherTeam',
			giver: { name: 'Danielle', playerId: 123 },
			watcher: { name: 'Stephen', playerId: 345 },
			startRound: this.startRound,
		}

		const dummyPostRoundData = [
			{
				word: 'Simba',
				taboo: ['something', 'something', 'something', 'something', 'something'],
				status: 'correct',
			},
			{
				word: 'Mufasa',
				taboo: ['something', 'something', 'something', 'something', 'something'],
				status: 'correct',
			},
			{
				word: 'Scar',
				taboo: ['something', 'something', 'something', 'something', 'something'],
				status: 'correct',
			},
			{
				word: 'Voldemort',
				taboo: ['something', 'something', 'something', 'something', 'something'],
				status: 'skip',
			},
			{
				word: 'American Revolution',
				taboo: ['something', 'something', 'something', 'something', 'something'],
				status: 'discard',
			},
		]

		return (
			<React.Fragment>
				<GameInfo />
				<RoundInfo round={1} watcher="Stephen" giver="Danielle" />
				{this.state.roundStatus === 'preRound' && <PreRound {...dummyRoundData} />}
				{this.state.roundStatus === 'inProgress' && <InRound {...dummyRoundData} />}
				{this.state.roundStatus === 'postRound' && <PostRound cardsPlayed={dummyPostRoundData} />}
				{/* Links for Rules and Teams*/}
			</React.Fragment>
		)
	}
}

export default PlayGame
