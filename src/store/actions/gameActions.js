import {
	dbCreateGame,
	dbCreatePlayer,
	addPlayer,
	dbVerifyGameExists,
	dbUpdateGameStatus,
	dbRequestGameDeck,
	dbSaveGameDeck,
} from 'utils/API'
import { shuffleArray, convertArrayToObject } from 'utils/helpers'
import { errorActionCreator } from './errorActions'

const requestCreateGame = () => {
	return {
		type: 'REQUEST_CREATE_GAME',
	}
}

const createGameSuccess = (gamecode) => {
	return {
		type: 'CREATE_GAME_SUCCESS',
		payload: {
			gamecode,
		},
	}
}

const requestJoinGame = (gamecode) => {
	return {
		type: 'REQUEST_JOIN_GAME',
		payload: {
			gamecode,
		},
	}
}

const joinGameSuccess = (gamecode) => {
	return {
		type: 'JOIN_GAME_SUCCESS',
		payload: {
			gamecode,
		},
	}
}
const requestUpdateGameStatus = () => {
	return {
		type: 'REQUEST_UPDATE_GAME_STATUS',
	}
}

const updateGameStatusSuccess = () => {
	return {
		type: 'UPDATE_GAME_STATUS_SUCCESS',
	}
}

const requestFetchGameDeck = () => {
	return {
		type: 'REQUEST_FETCH_GAME_DECK',
	}
}

const fetchGameDeckSuccess = () => {
	return {
		type: 'FETCH_GAME_DECK_SUCCESS',
	}
}

export const createNewGame = (gamecode, gameData, hostPlayerName) => {
	return (dispatch) => {
		//reject not needed. Any error updated in store. Promise needed to allow for calling Formik function on completion of creation
		return new Promise((resolve) => {
			dispatch(requestCreateGame())
			return dbCreateGame(gamecode, gameData)
				.then(() => {
					return dbCreatePlayer(hostPlayerName).then((player) => {
						const host = { ...player, team: 'unassigned', online: true, host: true }
						//associates anonymous user with game instance in firestore
						return addPlayer(host, gamecode).then((player) => {
							dispatch(createGameSuccess(gamecode))
							resolve()
						})
					})
				})
				.catch((error) => {			
					dispatch(errorActionCreator('CREATE_GAME_FAILURE', error.message))
				})
		})
	}
}

export const joinNewGame = ({ gamecode, playerName }) => {
	return (dispatch) => {
		//reject not needed. Any error updated in store. Promise needed to allow for calling Formik function on completion of creation
		return new Promise((resolve) => {
			dispatch(requestJoinGame())
			return dbVerifyGameExists(gamecode)
				.then(() => {
					return dbCreatePlayer(playerName).then((playerData) => {
						const player = { ...playerData, host: false, team: 'unassigned' }
						return addPlayer(player, gamecode).then(() => {
							dispatch(joinGameSuccess(gamecode))
							resolve()
						})
					})
				})
				.catch((error) => {
					dispatch(errorActionCreator('JOIN_GAME_FAILURE', error.message))
				})
		})
	}
}

export const updateGameStatus = (gamecode, status) => {
	return (dispatch) => {
		// return new Promise((resolve, reject) => {
		dispatch(requestUpdateGameStatus)
		dbUpdateGameStatus(gamecode, status)
			.then(() => {
				dispatch(updateGameStatusSuccess(status))
			})
			.catch((error) => {
				dispatch(errorActionCreator('UPDATE_GAME_STATUS_FAILURE', error.message))
			})
	}
}

export const fetchGameDeck = (gamecode) => {
	return (dispatch) => {
		dispatch(requestFetchGameDeck())
		return dbRequestGameDeck()
			.then((response) => {	
				const shuffledDeck = shuffleArray(response)
				//convert from array of objects to object with keys = objects.
				const deckObject = convertArrayToObject(shuffledDeck)
		
				//object with each property as a number containg an object
				return dbSaveGameDeck(gamecode, deckObject).then((res) => {
					dispatch(fetchGameDeckSuccess())
				})
			})
			.catch((error) => {
						dispatch(errorActionCreator('FETCH_GAME_DECK_FAILURE', error.message))
			})
	}
}

