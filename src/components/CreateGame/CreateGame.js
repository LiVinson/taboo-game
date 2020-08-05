import React from 'react'
import PropTypes from 'prop-types'
import { ButtonTabooCard } from 'components/shared/TabooCard'
import CreateGameForm from 'components/CreateGameForm'
import { connect } from 'react-redux'
import { createNewGame } from 'store/actions/gameActions'
import { addPlayer } from 'store/actions/playerActions'
import { createPlayer } from 'utils/API'

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
      error:null,
      loading: false
		}
	}

	//pickle - decide if an onChange function is needed in form to update state when values are changed

  /*Creates game in firestore using form data, updates redux store
    On success, creates an anonymous user in firebase and returns user info
    On success, adds user to the game as as a player  
  */
	handleSubmit = (values, setSubmitting) => {
    const {  endGameMethod, turnsValue, timeValue, skipPenalty, name } = values
    const endValue = endGameMethod === 'turns' ? turnsValue : timeValue
    const gamecode = '1234567'
    const gameData = {
			status: 'new',
			endGameMethod,
			endValue,
      skipPenalty,
      players:[],
			creationTime: Date.now(),
    }

    this.props.createNewGame(gamecode, gameData, name)
    .then(response => {
      //finishes formik submission process
      setSubmitting(false)
      //redirect to waiting
      console.log("all done")
    })

    //THis works ---> 
    // this.props.createGame({ gamecode, ...values })
    // .then((code) => {
    //   console.log("game was created. Now starting create player")
    //   const player = values.name
      
    //   createPlayer(player)
    //   .then((user) => {
    //     console.log("returned from creating player")
    //     const player = {
    //       playerId: user.uid,
    //       name: user.displayName,
    //       team: "unassigned" 
    //     }
    //     this.props.addPlayer(player)
    //   })
    // })
    // .catch(error => {
    //   console.log(error)
    // })		
	 }

	handleBackClick = () => {
		this.props.history.push('/home')
  }
  
	render() {
		const buttonInfo = [
			{ text: 'Back', className: 'button', onClick: this.handleBackClick },
			{
				form: 'createGameForm',
				text: 'Submit',
				className: 'button',
				type: 'submit',
			},
		]
		return (
			<ButtonTabooCard tabooWord="New Game" buttons={buttonInfo}>
				<CreateGameForm initialValues={this.state} handleSubmit={this.handleSubmit} inputRef={this.inputRef} />
			</ButtonTabooCard>
		)
	}
}

CreateGame.propTypes = {
	history: PropTypes.object.isRequired,
}

const mapDispatchToProps = (dispatch) => {
	return {
    // createGame: (gameData) => dispatch(createGame(gameData)),
    createNewGame: (gamecode, gameData, player) => dispatch(createNewGame(gamecode, gameData, player)),

		addPlayer: (player, gamecode) => dispatch(addPlayer(player, gamecode)),
	}
}

export default connect(null, mapDispatchToProps)(CreateGame)
