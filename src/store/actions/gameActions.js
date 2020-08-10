import { addPlayerSuccess } from 'store/actions/playerActions'
import { createGame, createPlayer, addPlayer, verifyGameExists } from 'utils/API'

const requestCreateGame = () => {
	return {
		type: 'REQUEST_CREATE_GAME',
	}
}

const createGameSuccess = (gamecode, gameDetails) => {
	return {
		type: 'CREATE_GAME_SUCCESS',
		payload: {
			gamecode,
			...gameDetails,
		},
	}
}

const createGameFailure = (error) => {
	return {
		type: 'CREATE_GAME_FAILURE',
		error,
	}
}

export const createNewGame = (gamecode, gameData, hostPlayerName) => {
	return (dispatch) => {
		return new Promise((resolve, reject) => {
			dispatch(requestCreateGame())
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
					const host = { ...player, team: null, host: true }
					//associates anonymous user with game instance in firestore
					return addPlayer(host, gamecode)
				})
				.then((player) => {
					dispatch(addPlayerSuccess(player))
					resolve(gamecode)
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
