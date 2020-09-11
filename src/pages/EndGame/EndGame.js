import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import PlayerListCard from 'components/PlayerListCard'
import { FilteredTabooList } from 'components/shared/TabooCard'
import ScoreCard from 'components/ScoreCard'
import LoadingCard from 'components/shared/LoadingCard'

// const EndGame = ({ players, currentPlayer, team1Score, team2Score }) => {
class EndGame extends React.Component {
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
		if (!game || game.status !== 'completed') {
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

    const buttonInfo = [{
      text: "Home",
      type: "button",
      onClick: ()=> {this.props.history.push("/home")}
    }]
		if (game.status === 'in progress') {
			return <Redirect to={`/play/${gamecode}`} />
		} else if (this.state.loading) {
			//Update with actual loading component
			return <LoadingCard message="Calculating final scores" />
		} else if (!this.state.gameVerified) {
			//Update with actual loading component
			return <p>That game doesn't exist or hasn't started yet</p>
		} else if (!this.state.playerVerified) {
			//Style and add button to go to Join route so user can join properly
			return <p>Player didn't join properly</p>
		} else {
			console.log(game)
			const teams = ['team 1', 'team 2']
			const { players } = game
			// console.log(players)
			const { team1: team1Score, team2: team2Score } = game.gameplay.score
			console.log(team1Score, team2Score)
			const currentPlayer = players.filter((player) => player.playerId === this.props.auth.uid)[0]
			console.log(currentPlayer)
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

const mapStateToProps = (state, ownProps) => {
	console.log(state)
	//game object from firestore
	const game = state.firestore.data?.games?.[ownProps.match.params.gamecode]
	console.log(game)
	return {
		//determine if gamePending property needed...
		game: game ? game : {}, //from firestore
		gameDataReceived: state.firestore.status.requested[`games/${ownProps.match.params.gamecode}`],
		auth: state.firebase.auth,
		error: state.game.error,
	}
}

export default compose(
	connect(mapStateToProps),
	firestoreConnect((props) => [{ collection: 'games', doc: props.match.params.gamecode }])
)(EndGame)
