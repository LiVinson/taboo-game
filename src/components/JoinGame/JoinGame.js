import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { ButtonTabooCard } from 'components/shared/TabooCard'
import JoinGameForm from 'components/JoinGameForm'
import Pending from 'components/shared/Pending'
import {ErrorMessage} from 'components/shared/FeedbackMessage'
import { joinNewGame } from 'store/actions/gameActions'
import { clearErrors } from 'store/actions/errorActions'

export class JoinGame extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			name: '',
			gamecode: '',
			redirect: false,
		}
	}

	//Update to creating player id, validating gamecode, redirecting to 'Waiting Room'
	handleSubmit = (values, setSubmitting) => {
		this.setState(
			{
				playerName: values.name.toUpperCase(),
				gamecode: values.gamecode.toUpperCase(),
			},
			() => {
				const { gamecode, playerName } = this.state
				this.props.joinNewGame({ gamecode, playerName }).then(() => {
					//Finishes Formik submission process
					setSubmitting(false)
					//redirect to Waiting
					this.setState({
						redirect: true,
					})
				})
			}
		)
	}

	handleBackClick = () => {
		this.props.history.push('/home')
	}

	//Needed in case user gets game error and opens component that references same error property without clearing
	componentWillUnmount() {
		this.props.clearGameErrors()
	}

	render() {
		const { name, gamecode } = this.state
		const buttonInfo = [
			{ text: 'Back', onClick: this.handleBackClick },
			{
				form: 'joinGameForm',
				text: 'Join',
				type: 'submit',
				disabled: this.props.isPending,
			},
		]

		return this.state.redirect ? (
			<Redirect to={`/waiting/${this.state.gamecode}`} />
		) : (
			<ButtonTabooCard tabooWord="Join Game" buttons={buttonInfo}>
				<JoinGameForm initialValues={{ name, gamecode }} handleSubmit={this.handleSubmit} />
				{this.props.isPending ? <Pending speed={300} message={`Joining game ${this.state.gamecode}`} /> : null}
				{this.props.error ? <ErrorMessage error={this.props.error} /> : null}
			</ButtonTabooCard>
		)
	}
}

JoinGame.propTypes = {
	history: PropTypes.object.isRequired,
	error: PropTypes.string,
	isPending: PropTypes.bool.isRequired,
	joinNewGame: PropTypes.func.isRequired,
	clearGameErrors: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
	// console.log(state)
	return {
		error: state.game.error ? state.game.error.errorMessage : state.game.error,
		isPending: state.game.pending,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		joinNewGame: (gameData) => dispatch(joinNewGame(gameData)),
		clearGameErrors: () => dispatch(clearErrors("CLEAR_GAME_ERRORS"))
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(JoinGame)
