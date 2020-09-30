import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { fetchGameDeck } from 'store/actions/gameActions'
import Round from 'components/Round'
import LoadingCard from 'components/shared/LoadingCard'
import { ButtonErrorCard, ErrorCard } from 'components/shared/ErrorCard'

export class PlayGame extends React.Component {
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
		if (
			this.state.loading &&
			this.props.gameDataReceived &&
			this.props.auth.isLoaded &&
			this.props.deckDataReceived
		) {
			this.verifyGameInfo()
		}
	}

	//verify that game object from firestore exists
	//verify that current user is a player in game
	//toggle loading/verified so UI can render
	verifyGameInfo = () => {
		const game = this.props.game
		//Checks if falsy. Add additional edge cases in case empty object is returned
		if (!game || isEmpty(game) || game.status !== 'in progress') {
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
			this.setState(
				{
					loading: false,
					gameVerified: true,
					playerVerified,
				},
				() => {
					//If current player is the host, and firestore has finished fetching deck collection and it is null,
					// load the deck. Other players are in "pending" until deck is added
					//Currently, host is set to game creator. Will update to account for player still being online.
					const host = this.props.game.players.find((player) => player.host === true)
					if (
						host.playerId === this.props.auth.uid &&
						(isEmpty(this.props.deck) || this.props.deck == null)
					) {
						this.loadGameDeck()
					}
				}
			)
		}
	}

	loadGameDeck = () => {
		const { gamecode } = this.props.match.params
		this.props.fetchDeck(gamecode)
	}

	render() {
		const { gamecode } = this.props.match.params
		const { game } = this.props
		if (game.status === 'completed') {
			return <Redirect to={`/end/${gamecode}`} />
		} else if (this.state.loading) {
			return <LoadingCard message="Setting up game" />
			//loading is default state until game and player verified
		} else if (!this.state.gameVerified) {
			const error = "That game doesn't exist or hasn't started yet. Make sure you joined the game properly."
			return <ButtonErrorCard error={error} />
		} else if (!this.state.playerVerified) {
			const error = 'Something went wrong when joining. Please try again.'
			return <ButtonErrorCard error={error} />
			//If in the process of fetching deck or deck propety doesn't exist yet or exists but has no cards yet, show loading message or error
			// } else if (this.props.isPending || !game.gameplay?.deck || Object.keys(game.gameplay?.deck).length === 0) {
		} else if (this.props.isPending || this.props.error || isEmpty(this.props.deck)) {
			return this.props.error ? <ErrorCard error={this.props.error} /> : <LoadingCard message="Fetching deck" />
		} else {
			return (
				<Round
					deck={this.props.deck}
					gamecode={gamecode}
					players={game.players}
					gameplay={game.gameplay}
					playerId={this.props.auth.uid}
					skipPenalty={game.skipPenalty}
					endValue={game.endValue}
				/>
			)
			//Game and players are valid, deck is fetched, and ready to play
		}
	}
}

PlayGame.propTypes = {
	match: PropTypes.object.isRequired,
	game: PropTypes.object.isRequired,
	gameDataReceived: PropTypes.bool,
	auth: PropTypes.object,
	error: PropTypes.string,
	isPending: PropTypes.bool.isRequired,
	fetchDeck: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => {
	//? Allows for checking for nested properties without error due to parent object not being defined
	const game = state.firestore.data?.games?.[ownProps.match.params.gamecode]
	const deck = state.firestore.data?.deck
	const requestStatus = state.firestore.status.requested
	//requestStatus properties are true once firestore has finished fetching their value. Turns true even if that value does not exist in the database

	return {
		deck: deck ? deck : {}, //from firestoreConnect
		game: game ? game : {}, //from firestoreConnect
		gameDataReceived: requestStatus[`games/${ownProps.match.params.gamecode}`],
		deckDataReceived: requestStatus.deck,
		auth: state.firebase.auth,
		//error from updating game status, fetching deck,
		error: state.game.error ? state.game.error.errorMessage : state.game.error,
		isPending: state.game.pending,
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
	firestoreConnect((props) => [
		{
			collection: 'games',
			doc: props.match.params.gamecode,
		},
		{
			collection: 'games',
			doc: props.match.params.gamecode,
			subcollections: [{ collection: 'deck' }],
			storeAs: 'deck',
		},
	])
)(PlayGame)
