import { errorReducer } from './errorReducer'

const initState = {
	pending: false,
	gamecode: '',
	error: null,
}

export const gameReducer = (state = initState, action) => {
	console.log(state)
	console.log(action.type)
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
			console.log('updating game status')
			return state
		case 'UPDATE_GAME_STATUS_SUCCESS':
			console.log('game status update success')
			return state

		case 'REQUEST_FETCH_GAME_DECK':
			console.log('requesting game deck')
			return state
		case 'FETCH_GAME_DECK_SUCCESS':
			console.log('request game deck success')
			return state
		case 'FETCH_GAME_DECK_FAILURE':
			console.log('request game deck failure')
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
