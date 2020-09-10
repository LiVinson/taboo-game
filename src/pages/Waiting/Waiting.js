import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { TabooCardTop } from 'components/shared/TabooCard'
import PlayerListCard from 'components/PlayerListCard'
import { FilteredTabooList } from 'components/shared/TabooCard'
import LoadingCard from 'components/shared/LoadingCard'
import { Instructions } from './style'
import { updateTeam } from 'store/actions/playerActions'
import { updateGameStatus } from 'store/actions/gameActions'

export class Waiting extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: true,
			gameVerified: false,
			playerVerified: false,
			error: null,
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
		const { gamecode } = this.props.match.params

		const game = this.props.game[gamecode]
		//Checks if falsy. Add additional edge cases in case empty object is returned
		if (!game || game.status !== 'new') {
			console.log(game)
			this.setState({
				loading: false, //gameVerified false by default
			})
		} else {
			//game info is valid, need to verify current user is a player in the game
			const playerId = this.props.auth.uid
			const players = game.players
			console.log(playerId)
			console.log(players)
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

	/*Get current player and compare current team to the team button clicked
	If current team !== requested team: Send request to update team in firestore
	*/
	handleTeamClick(event) {
		const newTeam = event.target.value
		const playerId = this.props.auth.uid
		const { gamecode } = this.props.match.params
		const players = this.props.game[gamecode].players
		const currentPlayer = players.find((player) => player.playerId === playerId)
		if (currentPlayer.team === newTeam) {
			console.log('player is already on team ', newTeam)
			return
		}
		this.props.updateTeam(gamecode, newTeam)
	}

	handlePlayGame() {
		const { gamecode } = this.props.match.params
		const players = this.props.game[gamecode].players
		const unassignedPlayers = players.filter((player) => !player.team)
		if (unassignedPlayers.length > 0) {
			console.log("can't start game, there are unassigned players")
			return
		}
		this.props.updateGameStatus(gamecode)
	}
	verifyTeamStatus(players) {
		console.log('verifying team status')
		let actionRequired = true

		if (!this.checkPlayersUnassigned(players) && !this.checkUnvenTeams(players)) {
			actionRequired = false
		}

		return actionRequired
	}

	//returns true if any players are unassigned.
	checkPlayersUnassigned(players) {
		console.log('verify all players assigned')
		const unassignedPlayers = players.filter((player) => player.team === 'unassigned')
		console.log('any unassigned: ', unassignedPlayers.length > 0)
		return unassignedPlayers.length > 0
	}

	//Returns true if if difference between number of players on each team is greater than 1
	checkUnvenTeams(players) {
		console.log('verify teams are even')

		const team1Count = players.filter((player) => player.team === 'team 1').length
		console.log('team 1 count: ', team1Count)

		const team2Count = players.filter((player) => player.team === 'team 2').length
		console.log('team 2 count: ', team2Count)
		console.log('difference: ', Math.abs(team1Count - team2Count))
		return Math.abs(team1Count - team2Count) > 1
	}

	render() {
		const { gamecode } = this.props.match.params

		if (this.state.loading) {
			//Update with actual loading component
			return <LoadingCard title="Loading" message="Creating waiting room" />
		} else if (this.props.game[gamecode].status === 'in progress') {
			console.log(gamecode)
			return <Redirect to={`/play/${gamecode}`} />
		} else if (!this.state.gameVerified) {
			//Style and add button to go back home
			return <p>Game doesn't exist, or is already in progress</p>
		} else if (!this.state.playerVerified) {
			//Style and add button to go to Join route so user can join properly
			return <p>Player didn't join properly</p>
		} else {
			const players = this.props.game[gamecode].players
			const playerId = this.props.auth.uid
			const currentPlayer = players.find((player) => player.playerId === playerId)
			const teams = ['unassigned', 'team 1', 'team 2']
			const teamActionRequired = players.length < 4 || this.verifyTeamStatus(players)
			const buttonInfo = [
				{
					text: 'Team 1',
					value: 'team 1',
					onClick: (e) => {
						this.handleTeamClick(e)
					},
				},
				{
					text: 'Team 2',
					value: 'team 2',
					onClick: (e) => {
						this.handleTeamClick(e)
					},
				},
				{
					text: 'Play!',
					onClick: () => {
						this.handlePlayGame()
					},
					hidden: currentPlayer.host ? false : true, //only host player can see play button
					disabled: teamActionRequired,
				},
			]
			return (
				<React.Fragment>
					<Instructions>
						Share the game code below with friends! Once at least four players have joined and picked a
						team, select PLAY to start!
					</Instructions>
					<TabooCardTop margin={true}>{gamecode}</TabooCardTop>
					<PlayerListCard buttonInfo={buttonInfo}>
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
								noneMessage={`No ${team} players`}
							/>
						))}
					</PlayerListCard>
				</React.Fragment>
			)
		}
	}
}

const mapStateToProps = (state, prevProps) => {
	console.log(state)
	const { games } = state.firestore.data
	// console.log(gamecode)
	return {
		gamecode: state.game.gamecode, //tbd if adding this
		game: games, //from firestore
		gameDataReceived: state.firestore.status.requested[`games/${prevProps.match.params.gamecode}`],
		auth: state.firebase.auth,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		updateTeam: (gamecode, team) => dispatch(updateTeam(gamecode, team)),
		updateGameStatus: (gamecode) => dispatch(updateGameStatus(gamecode, 'in progress')),
	}
}

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect((props) => [{ collection: 'games', doc: props.match.params.gamecode }])
)(Waiting)
