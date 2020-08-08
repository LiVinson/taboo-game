import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { ButtonTabooCard } from 'components/shared/TabooCard'
import JoinGameForm from 'components/JoinGameForm'
import { joinNewGame } from 'store/actions/gameActions'

class JoinGame extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			name: '',
			gamecode: '',
			redirect: false,
			submitting: false,
			error: null,
		}
	}

	//Update to creating player id, validating gamecode, redirecting to 'Waiting Room'
	handleSubmit = (values, setSubmitting) => {
		console.log("submitted", values)
		this.setState(
			{
				name: values.name.toUpperCase(),
				gamecode: values.gamecode.toUpperCase(),
				submitting: true,
				error: null, //clear any previous form message if resubmitted
			},
			() => {
				const { gamecode, playerName } = this.state
				this.props
					.joinNewGame({ gamecode, playerName })
					.then((response) => {
						console.log(response)
						console.log('promise done: player has joined game. Redirecting.')
						//Finishes Formik submission process
						setSubmitting(false)
						this.setState({
							redirect: true,
						})
					})
					.catch((error) => {
						console.log('promise error')
						console.log(error)
					})
			}
		)
	}

	handleBackClick = () => {
		this.props.history.push('/home')
	}

	render() {
		const { name, gamecode, error, submitting } = this.state
		const buttonInfo = [
			{ text: 'Back', onClick: this.handleBackClick },
			{
				form: 'joinGameForm',
				text: 'Join',
				type: 'submit',
			},
		]

		return this.state.redirect ? (
			<Redirect to={`/waiting/${gamecode}`} />
		) : (
			<ButtonTabooCard tabooWord="Join Game" type="home" buttons={buttonInfo}>
				<JoinGameForm initialValues={{ name, gamecode }} handleSubmit={this.handleSubmit} />
				<p style={{ fontSize: '2rem' }}>{submitting ? 'Joining game' : error ? error : ''}</p>
			</ButtonTabooCard>
		)
	}
}

JoinGame.propTypes = {
	history: PropTypes.object.isRequired,
}

// const mapStateToProps = (state) => {
// 	console.log(state)
// 	return {
// 		gamecode: state.game.gamecode,
// 		playerId: state.firebase.auth.uid
// 	}
// }
const mapDispatchToProps = (dispatch) => {
	return {
		joinNewGame: (gameData) => dispatch(joinNewGame(gameData)),
	}
}
export default connect(null, mapDispatchToProps)(JoinGame)
