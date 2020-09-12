import { errorReducer } from './errorReducer'

const initState = {
	pending: false,
	players: [], //tbd how this will be used
	error: null,
}

export const playersReducer = (state = initState, action) => {
	switch (action.type) {
		case 'REQUEST_ADD_PLAYER':
			return {
				...errorReducer(state, action),
				pending: true,
			}
		case 'ADD_PLAYER_SUCCESS':
		case 'ADD_PLAYER_FAILURE':
			return {
				...errorReducer(state, action),
				pending: false,
			}
		case "REQUEST_UPDATE_TEAM":
			console.log("requesting update")
			return {
				...errorReducer(state, action),
				pending: true,
			}
		case "UPDATE_TEAM_SUCCESS":
		case 'UPDATE_TEAM_FAILURE':
			return {
				...errorReducer(state, action),
				pending: false,
			}
		default:
			return state
	}
}
