//contains list of player objects
const initialState = []

export const playersReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'ADD_PLAYER':
			console.log("adding player to state")
			return [...state, action.payload]
		case 'ADD_PLAYER_ERROR':
			console.log(action.error)
			return state
		default:
			return state
	}
}
