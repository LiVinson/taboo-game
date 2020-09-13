import React from 'react'
import { Redirect } from "react-router-dom"
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { fetchGameDeck } from 'store/actions/gameActions'
import Round from 'components/Round'
import LoadingCard from 'components/shared/LoadingCard'
import {ButtonErrorCard, ErrorCard} from 'components/shared/ErrorCard'

class PlayGame extends React.Component {
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
		console.log('verifying game and player info')
		const game = this.props.game
		//Checks if falsy. Add additional edge cases in case empty object is returned
		if (!game || game.status !== 'in progress') {
			console.log(game)
			this.setState({
				loading: false, //gameVerified false by default
			})
		} else {
			//game exists and is in correct status. Need to verify current user is a player in the game
			const playerId = this.props.auth.uid
			const players = game.players
			console.log(playerId)
			//Verify current user has valid uid and is in players array in firestore
			let playerVerified
			const includedUserArr = players.filter((player) => player.playerId === playerId)
			playerVerified = playerId && includedUserArr.length > 0 ? true : false
			this.setState(
				{
					loading: false,
					gameVerified: true,
					playerVerified,
				},
				() => {
					//If current player is the host, load the deck. Other players are in "pending" until deck is added
					//host is the first player to join that is still online
					const host = this.props.game.players.find((player) => player.online === true)
					//add to only fetch when game and player are verified to avoid unnecessary
					if (host.playerId === this.props.auth.uid && !this.props.game.gameplay.deck) {
						console.log('Im the host')
						this.loadGameDeck()
					}
				}
			)
		}
	}

	loadGameDeck = () => {
		console.log('Loadgamedeck')
		const { gamecode } = this.props.match.params
		this.props.fetchDeck(gamecode)
	}

	render() {
		const { gamecode } = this.props.match.params
		const { game } = this.props
		
		if (game.status === 'completed') {
			return <Redirect to={`/end/${gamecode}`} />
		} else
		if (this.state.loading) {
			//default state until game and player verified
			return <LoadingCard message="Setting up game" />
		} else if (!this.state.gameVerified) {
			const error = "That game doesn't exist, is already in progress, or is complete and can't be joined."
			return <ButtonErrorCard error={error} />
		} else if (!this.state.playerVerified) {
			const error = 'Something went wrong when joining. Please try again.'
			return <ButtonErrorCard error={error} />
			//If in the process of fetching deck or deck propety doesn't exist yet or exists but has no cards yet, show loading message or error
		} else if (this.props.isPending || !game.gameplay?.deck || Object.keys(game.gameplay?.deck).length === 0) {
			return this.props.error ? <ErrorCard error={this.props.error} /> : <LoadingCard message="Fetching deck" />
		} else {
			return (
				<Round
					gamecode={gamecode}
					players={game.players}
					gameplay={game.gameplay}
					playerId={this.props.auth.uid}
					error={this.props.error}
				/>
			)
		}
	}
}

const mapStateToProps = (state, ownProps) => {
	const game = state.firestore.data?.games?.[ownProps.match.params.gamecode]
	console.log(state.game.error)
	return {
		//determine if gamePending property needed...
		gamecode: state.game.gamecode, //tbd if adding this
		game: game ? game : {}, //from firestore
		gameDataReceived: state.firestore.status.requested[`games/${ownProps.match.params.gamecode}`],
		auth: state.firebase.auth,
		error: state.game.error ? state.game.error.errorMessage : state.game.error, 
		isPending: state.game.pending
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchDeck: (gamecode) => {
			dispatch(fetchGameDeck(gamecode))
		},
	}
}

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect((props) => [{ collection: 'games', doc: props.match.params.gamecode }])
)(PlayGame)
