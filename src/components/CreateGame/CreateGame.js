import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import randomize from 'randomatic'
import { ButtonTabooCard } from 'components/shared/TabooCard'
import CreateGameForm from 'components/CreateGameForm'
import Pending from "components/shared/Pending"
import ErrorMessage from "components/shared/ErrorMessage"
import { createNewGame } from 'store/actions/gameActions'
import { clearErrors } from "store/actions/errorActions"

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
		}
	}

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
			//Wait until state update is complete to create gameData object
			() => {
				const { endGameMethod, turnsValue, timeValue, skipPenalty, name } = this.state
				const endValue = endGameMethod === 'turns' ? turnsValue : timeValue
				//6 characters of capital letters and numbers
				const gamecode = randomize('A0', 6)
				const gameData = {
					status: 'new',
					endGameMethod,
					endValue,
					skipPenalty,
					players: [],
				}

				this.props.createNewGame(gamecode, gameData, name).then(() => {
					//finishes formik submission process
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

	componentWillUnmount() {
		this.props.clearGameErrors()
	}
	render() {

		const buttonInfo = [
			{ text: 'Back', className: 'button', onClick: this.handleBackClick },
			{
				form: 'createGameForm',
				text: 'Submit',
				type: 'submit',
				disabled: this.props.isPending
			},
		]
		return this.state.redirect ? (
			<Redirect to={`/waiting/${this.props.gamecode}`} />
		) : (
			<ButtonTabooCard tabooWord="New Game" buttons={buttonInfo}>
				<CreateGameForm initialValues={this.state} handleSubmit={this.handleSubmit} />
				{this.props.isPending ? <Pending speed={300} message="Creating new game"/> : null}
				{this.props.error ? <ErrorMessage error={this.props.error.message}/> : null}
			</ButtonTabooCard>
		)
	}
}

CreateGame.propTypes = {
	history: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
	// console.log(state)
	return {
		error: state.game.error ? state.game.error.errorMessage : state.game.error,
		isPending: state.game.pending,
		gamecode: state.game.gamecode
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		createNewGame: (gamecode, gameData, player) => dispatch(createNewGame(gamecode, gameData, player)),
		clearGameErrors: () => dispatch(clearErrors("CLEAR_GAME_ERRORS"))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateGame)
