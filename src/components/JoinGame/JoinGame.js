import React from 'react'
import PropTypes from 'prop-types'
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
		}
	}
	//Update to creating player id, validating gamecode, redirecting to 'Waiting Room'
	handleSubmit = (values, setSubmitting) => {
		const gamecode = values.gamecode.toUpperCase()
		console.log(gamecode)
		this.props
			.joinNewGame({ gamecode, playerName: values.name })
			.then((response) => {
				console.log('promise done')
				//Finishes Formik submission process
				setSubmitting(false)
			})
			.catch((error) => {
				console.log('promise error')
				console.log(error)
			})
		/*
      call this.props.joinGame (passed from mapDispatchToProps)
        call verifyGameCode
        add player to the game
        both successful: redirect to <Waiting />

    */
	}

	handleBackClick = () => {
		this.props.history.push('/home')
	}

	render() {
		const { name, gamecode } = this.state
		const buttonInfo = [
			{ text: 'Back', onClick: this.handleBackClick },
			{
				form: 'joinGameForm',
				text: 'Join',
				type: 'submit',
			},
		]
		return (
			<ButtonTabooCard tabooWord="Join Game" type="home" buttons={buttonInfo}>
				<JoinGameForm initialValues={{ name, gamecode }} handleSubmit={this.handleSubmit} />
			</ButtonTabooCard>
		)
	}
}

JoinGame.propTypes = {
	history: PropTypes.object.isRequired,
}

const mapDispatchToProps = (dispatch) => {
	return {
		joinNewGame: (gameData) => dispatch(joinNewGame(gameData)),
	}
}
export default connect(null, mapDispatchToProps)(JoinGame)
