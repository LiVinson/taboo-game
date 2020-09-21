import { errorReducer } from './errorReducer'

const initState = {
	pending: false,
	gamecode: '',
	error: null,
}

export const gameReducer = (state = initState, action) => {
	switch (action.type) {
		case 'REQUEST_CREATE_GAME':
			return {
				...errorReducer(state, action),
				pending: true,
			}
		case 'CREATE_GAME_SUCCESS':
		case 'CREATE_GAME_FAILURE':
			return {
				...errorReducer(state, action),
				gamecode: action.payload.gamecode,
				pending: false,
			}
		case 'REQUEST_JOIN_GAME':
			return {
				...errorReducer(state, action),
				gamecode: action.payload.gamecode,
				pending: true,
			}
		case 'JOIN_GAME_SUCCESS':
		case 'JOIN_GAME_FAILURE':
			return {
				...errorReducer(state, action),
				gamecode: action.payload.gamecode,
				pending: false,
			}
		case 'REQUEST_UPDATE_GAME_STATUS':
			return {
				...errorReducer(state, action),
				pending: true,
			}
		case 'UPDATE_GAME_STATUS_SUCCESS':
		case 'UPDATE_GAME_STATUS_FAILURE':
			return {
				...errorReducer(state, action),
				pending: false,
			}
		case 'REQUEST_FETCH_GAME_DECK':
			return {
				...errorReducer(state, action),
				pending: true,
			}
		case 'FETCH_GAME_DECK_SUCCESS':
		case 'FETCH_GAME_DECK_FAILURE':
			return {
				...errorReducer(state, action),
				pending: false,
			}
		case 'CLEAR_GAME_ERRORS':
			return {
				...errorReducer(state, action),
				pending: false,
			}
		default:
			return state
	}
}
