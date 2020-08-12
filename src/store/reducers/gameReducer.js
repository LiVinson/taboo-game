import { errorReducer } from './errorReducer'

const initState = {
	pending: false,
	gamecode: null,
}

export const gameReducer = (state = initState, action) => {
	// console.log(state)
	// console.log(action.payload)
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
		case 'UPDATE_GAME_STATUS':
			console.log('updating game status')
			return state
		case 'REMOVE_GAME':
			console.log('removing game status')
			return state
		case 'CLEAR_GAME_ERRORS':
			return {
				...errorReducer(state, action),
				pending: false,
			}
		default:
			return state
	}
}
