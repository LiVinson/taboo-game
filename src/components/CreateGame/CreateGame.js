import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import randomize from 'randomatic'
import { ButtonTabooCard } from 'components/shared/TabooCard'
import CreateGameForm from 'components/CreateGameForm'
import { createNewGame } from 'store/actions/gameActions'

class CreateGame extends React.Component {
	constructor(props) {
		super(props)

		//Used for Form initial values
		this.state = {
			name: '',
			endGameMethod: 'turns',
			turnsValue: 2,
			timeValue: 60,
			skipPenalty: 'none',
			redirect: false,
			submitting: false,
			error: null,
		}
	}

	//pickle - decide if an onChange function is needed in form to update state when values are changed

	/*Creates game in firestore using form data, updates redux store
    On success, creates an anonymous user in firebase and returns user info
    On success, adds user to the game as as a player  
  */
	handleSubmit = (values, setSubmitting) => {
		console.log('submit')
		this.setState(
			{
				name: values.name.toUpperCase(),
				endGameMethod: values.endGameMethod,
				turnsValue: values.turnsValue,
				timeValue: values.timeValue,
				skipPenalty: values.skipPenalty,
			},
			() => {
				const { endGameMethod, turnsValue, timeValue, skipPenalty, name } = this.state
				const endValue = endGameMethod === 'turns' ? turnsValue : timeValue
				const gamecode = randomize('A0', 6)
				const gameData = {
					status: 'new',
					endGameMethod,
					endValue,
					skipPenalty,
					players: [],
				}

				this.props.createNewGame(gamecode, gameData, name).then((response) => {
					//finishes formik submission process
					setSubmitting(false)
					//redirect to waiting
					console.log('all done')
					console.log(response)
					this.setState({
						gamecode: response,
						redirect: true,
					})
				})
			}
		)
	}

	handleBackClick = () => {
		this.props.history.push('/home')
	}

	render() {
		const { gamecode, error, submitting } = this.state

		const buttonInfo = [
			{ text: 'Back', className: 'button', onClick: this.handleBackClick },
			{
				form: 'createGameForm',
				text: 'Submit',
				className: 'button',
				type: 'submit',
			},
		]
		return this.state.redirect ? (
			<Redirect to={`/waiting/${gamecode}`} />
		) : (
			<ButtonTabooCard tabooWord="New Game" buttons={buttonInfo}>
				<CreateGameForm initialValues={this.state} handleSubmit={this.handleSubmit} inputRef={this.inputRef} />
				<p style={{ fontSize: '2rem' }}>{submitting ? 'Creating new game' : error ? error : ''}</p>
			</ButtonTabooCard>
		)
	}
}

CreateGame.propTypes = {
	history: PropTypes.object.isRequired,
}

const mapDispatchToProps = (dispatch) => {
	return {
		createNewGame: (gamecode, gameData, player) => dispatch(createNewGame(gamecode, gameData, player)),
	}
}

export default connect(null, mapDispatchToProps)(CreateGame)
