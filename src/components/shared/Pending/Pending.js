import React from 'react'
import PropTypes from 'prop-types'
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

		this.setPendingMessage(message, speed)
	}

	setPendingMessage = (message, speed) => {
		this.interval = window.setInterval(() => {
			this.state.message === message + '...'
				? this.setState({ message: message })
				: this.setState(({ message }) => ({ message: message + '.' }))
		}, speed)
	}
	componentDidUpdate(prevProps) {
		if (prevProps.message !== this.props.message) {
			window.clearInterval(this.interval)
			this.setState(
				{
					message: this.props.message,
				},
				this.setPendingMessage(this.props.message, this.props.speed)
			)
		}
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

Pending.propTypes = {
	message: PropTypes.string.isRequired,
	speed: PropTypes.number.isRequired,
	large: PropTypes.bool.isRequired,
}
