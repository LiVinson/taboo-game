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
		dbUpdateTeam(gamecode, playerId, team)
		.then(() => {
			dispatch(teamUpdateSuccess())
		})
		.catch((error) => {
			dispatch(errorActionCreator('UPDATE_TEAM_FAILURE', error.message))
		})
	}
}
