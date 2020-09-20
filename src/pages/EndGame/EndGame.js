import React from 'react'
import PropTypes from "prop-types"
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import PlayerListCard from 'components/PlayerListCard'
import { FilteredTabooList } from 'components/shared/TabooCard'
import ScoreCard from 'components/ScoreCard'
import LoadingCard from 'components/shared/LoadingCard'
import { ButtonErrorCard } from 'components/shared/ErrorCard'

export class EndGame extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			loading: true,
			gameVerified: false,
			playerVerified: false,
		}
	}

	//Used to verify when props received from firebase and firestore are available
	componentDidUpdate() {
		//While game is loading, check if game data from firestore and auth data from firebase have been received
		//before verifying  gamecode and player
		if (this.state.loading && this.props.gameDataReceived && this.props.auth.isLoaded) {
			this.verifyGameInfo()
		}
	}

	//verify that game object from firestore exists
	//verify that current user is a player in game
	//toggle loading/verified so UI can render
	verifyGameInfo = () => {
		const game = this.props.game
		//Checks if falsy. Add additional edge cases in case empty object is returned
		if (!game || game.status !== 'completed') {
			this.setState({
				loading: false, //gameVerified false by default
			})
		} else {
			//game exists and is in correct status. Need to verify current user is a player in the game
			const playerId = this.props.auth.uid
			const players = game.players
			//Verify current user has valid uid and is in players array in firestore
			let playerVerified
			const includedUserArr = players.filter((player) => player.playerId === playerId)
			playerVerified = playerId && includedUserArr.length > 0 ? true : false
			this.setState({
				loading: false,
				gameVerified: true,
				playerVerified,
			})
		}
	}

	render() {
		const { gamecode } = this.props.match.params
		const { game } = this.props

		const buttonInfo = [
			{
				text: 'Home',
				type: 'button',
				onClick: () => {
					this.props.history.push('/home')
				},
			},
		]

		//any other incorrect status will result in an error message
		if (game.status === 'in progress') { 
			return <Redirect to={`/play/${gamecode}`} />
		} else if (this.state.loading) {
			return <LoadingCard message="Calculating final scores" />
		} else if (!this.state.gameVerified) {
			const error = "That game doesn't exist, is still in progress, or you don't have access to view the results."
			return <ButtonErrorCard error={error} />
		} else if (!this.state.playerVerified) {
			const error = 'Something went wrong when viewing the result.'
			return <ButtonErrorCard error={error} />
		} else {
			const teams = ['team 1', 'team 2']
			const { players } = game

			//Using alias for easier readability
			const { team1: team1Score, team2: team2Score } = game.gameplay.score
			const currentPlayer = players.find((player) => player.playerId === this.props.auth.uid)
			let winMessage = ''
			if (team1Score > team2Score) {
				winMessage = 'Team 1 Wins!'
			} else if (team2Score > team1Score) {
				winMessage = 'Team 2 Wins!'
			} else {
				winMessage = "It's a Tie!"
			}

			return (
				<React.Fragment>
					<ScoreCard teamScores={[team1Score, team2Score]} />
					<PlayerListCard tabooWord={winMessage} buttonInfo={buttonInfo}>
						{teams.map((team) => (
							<FilteredTabooList
								key={team}
								unfilteredList={players}
								filterKey="team"
								filterValue={team}
								displayProperty="name"
								listTitle={team}
								specialKey="playerId"
								specialValue={currentPlayer.playerId}
							/>
						))}
					</PlayerListCard>
				</React.Fragment>
			)
		}
	}
}

EndGame.propTypes = {
	game: PropTypes.object.isRequired,
	gameDataReceived: PropTypes.bool,
	auth: PropTypes.object,
	error: PropTypes.string

}
const mapStateToProps = (state, ownProps) => {
	// console.log(state)
	//game object from firestore
	const game = state.firestore.data?.games?.[ownProps.match.params.gamecode]
	return {
		game: game ? game : {}, //from firestore
		gameDataReceived: state.firestore.status.requested[`games/${ownProps.match.params.gamecode}`],
		auth: state.firebase.auth,
		error: state.game.error && state.game.error.errorMessage,
	}
}

export default compose(
	connect(mapStateToProps),
	firestoreConnect((props) => [{ collection: 'games', doc: props.match.params.gamecode }])
)(EndGame)
