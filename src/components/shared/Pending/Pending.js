import React from 'react'
import { StyledPending, StyledLargePending } from './style'

export class Pending extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			message: this.props.message,
		}
	}

	componentDidMount() {
		const { speed, message } = this.props

		this.interval = window.setInterval(() => {
			this.state.message === message + '...'
				? this.setState({ message: message })
				: this.setState(({ message }) => ({ message: message + '.' }))
		}, speed)
	}

	componentWillUnmount() {
		window.clearInterval(this.interval)
	}

	render() {
		const { large } = this.props
		const pending = large ? (
			<StyledLargePending>{this.state.message}</StyledLargePending>
		) : (
			<StyledPending>{this.state.message}</StyledPending>
		)
		return pending 
	}
}

Pending.defaultProps = {
	speed: 300,
	large: false,
}
