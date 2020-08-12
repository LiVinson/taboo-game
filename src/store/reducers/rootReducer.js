import { combineReducers } from 'redux'
import { gameReducer } from './gameReducer'
import { playersReducer } from './playersReducer'
// import { errorReducer } from './errorReducer'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'

const rootReducer = combineReducers({
	game: gameReducer,
	players: playersReducer,
	// error: errorReducer,
	firestore: firestoreReducer,
	firebase: firebaseReducer, //syncs FB auth data with the redux state. Can detect authentication
})

export default rootReducer
