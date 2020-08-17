import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { fetchGameDeck } from 'store/actions/gameActions'
import Round from 'components/Round'

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
	componentDidUpdate(prevProps) {
		//While game is loading, check if game data from firestore and auth data from firebase have been received
		//before verifying  gamecode and player
		if (this.state.loading && this.props.gameDataReceived && this.props.auth.isLoaded) {
			this.verifyGameInfo()
		}
	}

	//verify that game exists
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
			//game info is valid, need to verify current user is a player in the game
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
					//If current player is the host, load the deck. Other players are in "pending" until deck is added 
					//host is the first player to join that is still online
					const host = this.props.game.players.find(player => player.online === true)
					if(host.playerId === this.props.auth.uid && !this.props.game.gameplay.deck) {
						console.log("Im the host")
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
		const {game} = this.props
		console.log(game.gameplay?.deck)

		if (this.state.loading || !game.gameplay?.deck) {
			//Update with actual loading component
			return <p>Loading Firestore/Firebase</p>
		} else if (game.status === 'new') {
			return <Redirect to={`/waiting/${gamecode}`} />
		} else if (!this.state.playerVerified) {
			//Style and add button to go to Join route so user can join properly
			return <p>Player didn't join properly</p>
		} else {
			return (
				<Round
					gamecode={this.props.match.params.gamecode}
					players={game.players}
					gameplay={game.gameplay}
					playerId={this.props.auth.uid}
				/>
			)
		}
	}
}

const mapStateToProps = (state, prevProps) => {
	const game = state.firestore.data?.games?.[prevProps.match.params.gamecode]
	console.log(game)
	// console.log(state.firestore.data)
	return {
		gamecode: state.game.gamecode, //tbd if adding this
		game: game ? game : {}, //from firestore
		gameDataReceived: state.firestore.status.requested[`games/${prevProps.match.params.gamecode}`],
		auth: state.firebase.auth,

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
		{ collection: 'games', doc: props.match.params.gamecode }],
))(PlayGame)
