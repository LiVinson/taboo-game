const initState = {
	gameCode: null,
	gameStatus: null,
	endGameMethod: null,
	endValue: null,
	skipPenalty: null,
	creationTime: null
}

export const gameReducer = (state = initState, action) => {
	switch (action.type) {
		case 'CREATE_GAME':
			console.log('creating game in store')			
			return Object.assign({}, state, action.payload)
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


