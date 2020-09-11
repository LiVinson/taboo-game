import {
	dbCreateGame,
	dbCreatePlayer,
	addPlayer,
	verifyGameExists,
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
		pending: true,
	}
}

const fetchGameDeckSuccess = () => {
	return {
		type: 'FETCH_GAME_DECK_SUCCESS',
		pending: false,
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
					console.log(error.message)
					dispatch(errorActionCreator('CREATE_GAME_FAILURE', error))
				})
		})
	}
}

export const joinNewGame = ({ gamecode, playerName }) => {
	return (dispatch) => {
		//reject not needed. Any error updated in store. Promise needed to allow for calling Formik function on completion of creation

		return new Promise((resolve) => {
			dispatch(requestJoinGame())
			return verifyGameExists(gamecode)
				.then(() => {
					return dbCreatePlayer(playerName)
					.then((playerData) => {
						const player = { ...playerData, host: false, team: 'unassigned' }
						return addPlayer(player, gamecode).then(() => {
							console.log("succesfully created game and added player")
							dispatch(joinGameSuccess(gamecode))
							resolve()
						})

					})
				})
				.catch((error) => {
					console.log('there was an error joining the game')
					console.log(error)
					dispatch(errorActionCreator('JOIN_GAME_FAILURE', error))
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
				dispatch(errorActionCreator('UPDATE_GAME_FAILURE', error))
			})
		// })
	}
}

export const fetchGameDeck = (gamecode) => {
	return (dispatch) => {
		dispatch(requestFetchGameDeck())

		dbRequestGameDeck()
			.then((response) => {
				console.log(response)
				const shuffledDeck = shuffleArray(response)
				//convert from array of objects to object with keys = objects.
				const deckObject = convertArrayToObject(shuffledDeck)
				dbSaveGameDeck(gamecode, deckObject).then((res) => {
					console.log('back from saving shuffled array')
				})
				dispatch(fetchGameDeckSuccess())
			})
			.catch((error) => {
				console.log('there was an error retreiving the deck')
				console.log(error)
				dispatch(errorActionCreator('FETCH_GAME_DECK_FAILURE', error))
			})
	}
}

export const endGame = () => {
	return (dispatch) => {}
}
