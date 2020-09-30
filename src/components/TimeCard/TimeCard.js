import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { ProgressBar, Bar, TimeText } from './style'

class TimeCard extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			timeRemaining: 60,
		}
	}

	//Calculates the difference between current time and time round ends in seconds
	//Updates state with the amount of time remaining every second until 0, then giver
	//calld method to endRound and change to PostRound.
	componentDidMount() {
		const { roundEndTime } = this.props
		let timeRemaining = moment(roundEndTime).diff(moment(), 'second')
		this.intervalId = setInterval(() => {
			if (timeRemaining >= 0) {
				timeRemaining--
				this.setState({
					timeRemaining,
				})
			} else {
				clearInterval(this.intervalId)
				//Only one player needs to update the round for everyone
				if (this.props.role === 'giver') {
					this.props.endRound()
				}
			}
		}, 1000)
	}

	componentWillUnmount() {
		if (this.intervalId) {
			clearInterval(this.intervalId)
		}
	}
	
	render() {
		const width = Math.round((this.state.timeRemaining / 60) * 100)
		return (
			<ProgressBar>
				<Bar width={width}></Bar>
				<TimeText width={width}>
					{this.state.timeRemaining > 0 ? this.state.timeRemaining : "Time's Up!"}
				</TimeText>
			</ProgressBar>
		)
	}
}

TimeCard.propTypes = {
	roundEndTime: PropTypes.number,
	role: PropTypes.string.isRequired,
	endRound: PropTypes.func.isRequired,
}
export default TimeCard
