const initState = {
	error: null,
}

export const errorReducer = (state=initState, action) => {
	switch (action.type) {
		case 'CREATE_GAME_ERROR':
			console.log(action.error)
			return Object.assign({}, state, { error: action.error })
		case 'CREATE_PLAYER_ERROR':
			console.log(action.error)
			return Object.assign({}, state, { error: action.error })
		case 'ADD_PLAYER_ERROR':
			console.log(action.error)
			return Object.assign({}, state, { error: action.error })
		default:
			return state
	}
}
