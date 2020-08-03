const initState = {}
const gameReducer = (state = initState, action) => {
	switch (action.type) {
		case 'CREATE_GAME':
			console.log('creating game')
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

export default gameReducer
