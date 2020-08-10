import { dbUpdateTeam } from "utils/API"

export const addPlayerSuccess = (player) => {
	return {
		type: 'ADD_PLAYER',
		payload: {
			player,
		},
	}
}

const requestTeamUpdate = () => {
	return {
		type: "TEAM_UPDATE_REQUEST"
	}
}

export const teamUpdateSuccess = () => {
	return {
		type: "TEAM_UPDATE_SUCCESS"
	}
}

export const teamUpdateFailure = (error) => {
	return {
		type: "TEAM_UPDATE_FAILURE",
		error
	}
}

export const updateTeam = (gamecode, team) => {
	return (dispatch, getState, firebase) => {

		//dispatch that player team is changing
		return new Promise((resolve, reject) => {
			dispatch(requestTeamUpdate)
			const state = getState()
			console.log(team)
			console.log(state)
			const playerId = state.firebase.auth.uid
			dbUpdateTeam(gamecode, playerId, team)
			.then(response => {
				console.log("team update successful")
				console.log(response)
				dispatch(teamUpdateSuccess())
			})
			.catch(error => {
				console.log("team update failed")
				console.log(error)
				dispatch(teamUpdateFailure(error))
			})
		})

	}
}

