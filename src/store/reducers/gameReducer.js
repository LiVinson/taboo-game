const initState = {
	gameCode: null,
	gameStatus: null,
	endGameMethod: null,
	endValue: null,
	skipPenalty: null,
	creationTime: null,
}

export const gameReducer = (state = initState, action) => {
	switch (action.type) {
		case 'REQUEST_CREATE_GAME':
			console.log('requesting new game...')
			return state
		case 'CREATE_GAME_SUCCESS':
			console.log('sucessfully created game in store')
			return Object.assign({}, state, action.payload)
		case 'CREATE_GAME_FAILURE':
			console.log('creating new game failed')
			console.log(action.error)
			return state
		case 'UPDATE_GAME_STATUS':
			console.log('updating game status')
			return state
		case 'REMOVE_GAME':
			console.log('removing game status')
			return state
		default:
			return state
	}
}
