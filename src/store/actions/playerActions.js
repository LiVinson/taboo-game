import { dbUpdateTeam } from 'utils/API'
import { errorActionCreator } from './errorActions'

const requestTeamUpdate = () => {
	return {
		type: 'REQUEST_UPDATE_TEAM',
	}
}

export const teamUpdateSuccess = () => {
	return {
		type: 'UPDATE_TEAM_SUCCESS',
	}
}

export const updateTeam = (gamecode, playerId, team) => {
	return (dispatch) => {
		//dispatch that player team is changing
		dispatch(requestTeamUpdate())
		// const state = getState()
		// console.log(team)
		// console.log(state)
		// const playerId = state.firebase.auth.uid
		dbUpdateTeam(gamecode, playerId, team)
		.then(() => {
			console.log('team update successful')
			dispatch(teamUpdateSuccess())
		})
		.catch((error) => {
			console.log('team update failed')
			console.log(error)
			dispatch(errorActionCreator('UPDATE_TEAM_FAILURE', error.message))
		})
	}
}
