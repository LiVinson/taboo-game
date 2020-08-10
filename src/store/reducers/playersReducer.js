//contains list of player objects
const initialState = []

export const playersReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'REQUEST_ADD_PLAYER':
			console.log('requesting that player be added')
			return [...state, action.payload]
		case 'ADD_PLAYER_SUCCESS':
			console.log('adding player to state')
			return [...state, action.payload]
		case 'ADD_PLAYER_ERROR':
			console.log("error adding player")
			console.log(action.error)
			return state
		case 'TEAM_UPDATE_REQUEST':
			console.log('requesting team change...')
			return state
		case 'TEAM_UPDATE_SUCCESS':
			console.log('team change succesful...')
			return state
		case 'TEAM_UPDATE_FAILURE':
			console.log('team change failed...')
			console.log(action.error)
			return state
		default:
			return state
	}
}
