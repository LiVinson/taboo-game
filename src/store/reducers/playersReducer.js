import { errorReducer } from './errorReducer'

const initState = {
	pending: false,
	error: null,
}

export const playersReducer = (state = initState, action) => {
	switch (action.type) {
		case 'REQUEST_UPDATE_TEAM':
			return {
				...errorReducer(state, action),
				pending: true,
			}
		case 'UPDATE_TEAM_SUCCESS':
		case 'UPDATE_TEAM_FAILURE':
			return {
				...errorReducer(state, action),
				pending: false,
			}
		default:
			return state
	}
}
