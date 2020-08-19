import React from 'react'
import moment from 'moment'
import { ProgressBar, Bar, TimeText } from './style'

class TimeCard extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: true,
            timeRemaining: 60,
            
		}
	}

	componentDidMount() {
		const { roundEndTime } = this.props
		let timeRemaining = moment(roundEndTime).diff(moment(), 'second')
		this.intervalId = setInterval(() => {
            console.log('time left', timeRemaining)
            if (timeRemaining >= 0) {
                this.setState(
                    {
                        timeRemaining: timeRemaining,
                    },
                    () => {
                        timeRemaining--
                    }
                )
            } else {
                console.log("time up")
                clearInterval(this.intervalId)
            }
			
		}, 1000)

	}
	render() {
        const width = Math.round((this.state.timeRemaining / 60) * 100)
        console.log(width)
		return (
			<ProgressBar>
                <Bar width={width}></Bar>
                <TimeText width={width}>{this.state.timeRemaining > 0 ? this.state.timeRemaining : "Time's Up!"}</TimeText>
			</ProgressBar>
		)
	}
}
export default TimeCard
