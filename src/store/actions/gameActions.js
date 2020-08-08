import { addPlayerSuccess } from 'store/actions/playerActions'
import { createGame, createPlayer, addPlayer, verifyGameExists } from 'utils/API'

const createGameSuccess = (gamecode, gameDetails) => {
	return {
		type: 'CREATE_GAME',
		payload: {
			gamecode,
			...gameDetails,
		},
	}
}

const createGameFailure = (error) => {
	return {
		type: 'CREATE_GAME',
		error,
	}
}

export const createNewGame = (gamecode, gameData, hostPlayerName) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		return new Promise((resolve, reject) => {
			//Creates a new game instance in firestore
			return createGame(gamecode, gameData)
				.then((res) => {
					dispatch(createGameSuccess(gamecode, gameData))
					return res
				})
				.then(() => {
					//creates anonymous user in firebase and updates displayName
					return createPlayer(hostPlayerName)
				})
				.then((player) => {
					const host = { ...player, host: true }
					//associates anonymous user with game instance in firestore
					return addPlayer(host, gamecode)
				})
				.then((player) => {
					dispatch(addPlayerSuccess(player))
					resolve(player.playerId)
				})
				.catch((error) => {
					dispatch(createGameFailure(error))
					reject(error)
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
					return createPlayer(playerName)
				})
				.then((playerData) => {
					const player = { ...playerData, host: false }
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
