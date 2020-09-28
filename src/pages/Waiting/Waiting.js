import React from 'react'
import PropTypes from "prop-types"
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { TabooCardTop } from 'components/shared/TabooCard'
import PlayerListCard from 'components/PlayerListCard'
import { FilteredTabooList } from 'components/shared/TabooCard'
import LoadingCard from 'components/shared/LoadingCard'
import { ButtonErrorCard } from 'components/shared/ErrorCard'
import {ErrorMessage} from 'components/shared/FeedbackMessage'
import InstructionsText from 'components/shared/InstructionsText'
import KeyWord from 'components/shared/KeyWord'

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
		const { gamecode } = this.props.match.params
		const game = this.props.game[gamecode]
	
		//Checks if falsy. Add additional edge cases in case empty object is returned
		if (!game || game.status !== 'new') {
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
		this.props.updateTeam(gamecode, playerId, newTeam)
	}

	handlePlayGame() {
		const { gamecode } = this.props.match.params
		this.props.updateGameStatus(gamecode)
	}

	//Returns false if any players unassigned or if teams uneven
	verifyTeamStatus(players) {
		let actionRequired = true
		if (!this.checkPlayersUnassigned(players) && !this.checkUnvenTeams(players)) {
			actionRequired = false
		}
		return actionRequired
	}

	//returns true if any players are unassigned.
	checkPlayersUnassigned(players) {
		const unassignedPlayers = players.filter((player) => player.team === 'unassigned')
		return unassignedPlayers.length > 0
	}

	//Returns true if if difference between number of players on each team is greater than 1
	checkUnvenTeams(players) {
		const team1Count = players.filter((player) => player.team === 'team 1').length
		const team2Count = players.filter((player) => player.team === 'team 2').length
		return Math.abs(team1Count - team2Count) > 1
	}

	render() {
		const { gamecode } = this.props.match.params
		// console.log(this.props)
		//In process of verifying game and player
		if (this.state.loading) {
			return <LoadingCard message="Joining waiting room" />
			//Game is already in progress or complete. Can't join Waiting Room
		} else if (this.props.game[gamecode]?.status === 'in progress') {
			return <Redirect to={`/play/${gamecode}`} />
			//If url contains gamecode that is not valid
		} else if (!this.state.gameVerified) {
			const error = "That game doesn't exist, is already in progress, or is complete and can't be joined."
			return <ButtonErrorCard error={error} />
			//User attempts to navigate to Waiting room without first joining through /home/join
		} else if (!this.state.playerVerified) {
			const error = 'Something went wrong when joining. Please try again.'
			return <ButtonErrorCard error={error} />
		} else { //Display Waiting Room
			const players = this.props.game[gamecode].players
			const playerId = this.props.auth.uid
			const currentPlayer = players.find((player) => player.playerId === playerId)
			const teams = ['unassigned', 'team 1', 'team 2']
			//At least 4 players required to play, all on a team, with no more than 1 additional player on a team
			const teamActionRequired = players.length < 4 || this.verifyTeamStatus(players)
			const buttonInfo = [
				{
					text: 'Team 1',
					value: 'team 1',
					onClick: (e) => {
						this.handleTeamClick(e)
					},
					//Disable when in the process of joining a team, or if user is already on that team
					disabled: this.props.isPending.players || currentPlayer.team === 'team 1',
				},
				{
					text: 'Team 2',
					value: 'team 2',
					onClick: (e) => {
						this.handleTeamClick(e)
					},
					//Disable when in the process of joining a team, or if user is already on that team
					disabled: this.props.isPending.players || currentPlayer.team === 'team 2',
				},
				{
					text: 'Play!',
					onClick: () => {
						this.handlePlayGame()
					},
					//only host player can see play button
					hidden: currentPlayer.host ? false : true, 
					disabled: teamActionRequired || this.props.isPending.game,
				},
			]
			return (
				<React.Fragment>
					<InstructionsText align={"center"}>
						Share the game code below with friends! Once at least four players have joined and picked a
						team, the host can select <KeyWord>PLAY</KeyWord> to start!
					</InstructionsText>
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

						{this.props.error.gameError ? <ErrorMessage error={this.props.error.gameError} /> : null}
						{this.props.error.playersError ? <ErrorMessage error={this.props.error.playersError} /> : null}
					</PlayerListCard>
				</React.Fragment>
			)
		}
	}
}
Waiting.propTypes = {
	match: PropTypes.object.isRequired,
	gameDataReceived: PropTypes.bool,
	game: PropTypes.object,
	auth: PropTypes.object.isRequired,
	error: PropTypes.object.isRequired,
	isPending: PropTypes.object.isRequired,
	updateTeam: PropTypes.func.isRequired,
	updateGameStatus: PropTypes.func.isRequired
}

const mapStateToProps = (state, prevProps) => {
	// console.log(state)
	const { games } = state.firestore.data
	return {
		game: games, //from firestore
		gameDataReceived: state.firestore.status.requested[`games/${prevProps.match.params.gamecode}`],
		auth: state.firebase.auth,
		//Need to account for errors from two different reducers - players and game
		error: {
			gameError: state.game.error ? state.game.error.errorMessage : state.game.error,
			playersError: state.players.error ? state.players.error.errorMessage : state.players.error,
		},
		//Need to account for pending status from two different reducers - players and game
		isPending: {
			players: state.players.pending,
			game: state.game.pending,
		},
	}
}


const mapDispatchToProps = (dispatch) => {
	return {
		updateTeam: (gamecode, playerId, team) => dispatch(updateTeam(gamecode, playerId, team)),
		updateGameStatus: (gamecode) => dispatch(updateGameStatus(gamecode, 'in progress')),
	}
}

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect((props) => [{ collection: 'games', doc: props.match.params.gamecode }])
)(Waiting)
