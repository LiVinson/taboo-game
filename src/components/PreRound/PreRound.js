import React from 'react'
import PropTypes from 'prop-types'
import RoundInstructionsCard from 'components/RoundInstructionsCard'
import ScoreCard from 'components/ScoreCard'
import { TabooCard } from 'components/shared/TabooCard'
import InstructionsText from 'components/shared/InstructionsText'
import Pending from 'components/shared/Pending'
import { generateSkipText, generateEndGameText } from 'utils/helpers'

class PreRound extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			displayGameRules: false,
			timeRemaining: 15,
		}
	}

	componentDidMount() {
		//If it is the very beginning of the game, display the game information for all users for a few seconds.
		if (this.props.round === 1 && this.props.half === 'top') {
			this.setState(
				{
					displayGameRules: true,
				},
				() => {
					this.intervalId = setInterval(() => {
						this.decrementTimer()
					}, 1000)
				}
			)
		}
	}

	componentWillUnmount() {
		if (this.intervalId) {
			clearInterval(this.intervalId)
		}
	}

	decrementTimer = () => {
		if (this.state.timeRemaining > 0) {
			this.setState({
				timeRemaining: this.state.timeRemaining - 1,
			})
		} else {
			clearInterval(this.intervalId)
			this.setState({
				displayGameRules: false,
			})
		}
	}

	render() {
		const { teamScores, skipPenalty, endValue, ...rest } = this.props
		const scoresArr = [teamScores.team1, teamScores.team2]
		const { timeRemaining } = this.state
		const gameRulesText = timeRemaining > 7 ? generateSkipText(skipPenalty) : generateEndGameText('turns', endValue)
		const pendingMsg = timeRemaining > 7 ? 'shuffling cards' : 'preparing the timer'
		return this.state.displayGameRules ? (
			<TabooCard tabooWord="Game Rules">
				<InstructionsText>{gameRulesText}</InstructionsText>
				<Pending message={pendingMsg} speed={400}/>
			</TabooCard>
		) : (
			<React.Fragment>
				<ScoreCard teamScores={scoresArr} />
				<RoundInstructionsCard {...rest} />
			</React.Fragment>
		)
	}
}

PreRound.propTypes = {
	teamScores: PropTypes.object.isRequired,
	currentPlayer: PropTypes.object.isRequired,
	role: PropTypes.string.isRequired,
	giver: PropTypes.object.isRequired,
	watcher: PropTypes.object.isRequired,
	startRound: PropTypes.func.isRequired,
	error: PropTypes.string,
}

export default PreRound
