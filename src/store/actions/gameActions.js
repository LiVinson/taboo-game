import { addPlayerSuccess } from 'store/actions/playerActions'
import { createGame, createPlayer, addPlayer, verifyGameExists, dbUpdateGameStatus } from 'utils/API'
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

export const createNewGame = (gamecode, gameData, hostPlayerName) => {
	return (dispatch) => {
		//reject not needed. Any error updated in store. Promise needed to allow for calling Formik function on completion of creation
		return new Promise((resolve) => {
			dispatch(requestCreateGame())
			createGame(gamecode, gameData)
				.then(() => {
					createPlayer(hostPlayerName).then((player) => {
						const host = { ...player, team: null, host: true }
						//associates anonymous user with game instance in firestore
						addPlayer(host, gamecode).then((player) => {
							dispatch(addPlayerSuccess(player))
							dispatch(createGameSuccess(gamecode))
							resolve()
						})
					})
				})
				.catch((error) => {
					dispatch(errorActionCreator('CREATE_GAME_FAILURE', error))
				})
		})
	}
}

export const joinNewGame = ({ gamecode, playerName }) => {
	return (dispatch) => {
		return new Promise((resolve, reject) => {
			return verifyGameExists(gamecode)
				.then(() => {
					return true
				})
				.then(() => {
					//creates anonymous user in firebase and updates displayName
					console.log(playerName)
					return createPlayer(playerName)
				})
				.then((playerData) => {
					const player = { ...playerData, host: false, team: null }
					//associates anonymous user with game instance in firestore
					return addPlayer(player, gamecode)
				})
				.then((player) => {
					dispatch(addPlayerSuccess(player))
					resolve(player.playerId)
				})
				.catch((err) => {
					//may add a joinGame error dispatch
					console.log(err)
					reject(err)
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
