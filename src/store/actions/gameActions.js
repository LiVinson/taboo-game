import { addPlayer } from 'store/actions/playerActions'
import { createPlayer } from 'utils/API'

// export const createNewGame = (gameData) => {
// 	return Promise.all([
//         createGame(gameData),
//         createPlayer(),
//         addPlayer()
//     ])
// }

/* old version
export const createGame = ({ gamecode, endGameMethod, turnsValue, timeValue, skipPenalty }) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		// return new Promise((resolve, reject) => {
		const endValue = endGameMethod === 'turns' ? turnsValue : timeValue
		const gameDetails = {
			status: 'new',
			endGameMethod,
			endValue,
			skipPenalty,
			creationTime: Date.now(),
		}

		const firestore = getFirestore()
		console.log('creating game in firebase...')
		return firestore
			.collection('games')
			.doc(gamecode)
			.set(gameDetails)
			.then((response) => {
				console.log('firestore created the game. Time to dispatch')
				dispatch({
					type: 'CREATE_GAME',
					payload: {
						gamecode,
						...gameDetails,
					},
				})
				return gamecode
			})
			.catch((error) => {
				console.log('error')
				console.log(error)
				dispatch({
					type: 'CREATE_GAME_ERROR',
					error,
				})
				// return reject(error)
			})
		// })
	}
}

*/

const createGame = (gamecode, gameDetails, getFirestore, dispatch) => {
	const firestore = getFirestore()
	console.log('creating game in firestore')
	const newGame = {
		...gameDetails,
		createdAt: firestore.FieldValue.serverTimestamp(),
	}
	return firestore
		.collection('games')
		.doc(gamecode)
		.set(newGame)
		.then(() => {
			console.log('firestore created the game. Time to dispatch')
			dispatch({
				type: 'CREATE_GAME',
				payload: {
					gamecode,
					...gameDetails,
				},
			})
			return gamecode
		})
}

export const createNewGame = (gamecode, gameData, hostPlayerName) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		return new Promise((resolve, reject) => {
			//Creates a new game instance in firestore
			createGame(gamecode, gameData, getFirestore, dispatch)
				.then((response) => {
					console.log(response)
					//Creates a new anon user in firebase and returns object with name and id
					createPlayer(hostPlayerName)
						.then((player) => {
							const host = {
								...player,
								host: true,
							}
							//Adds user from firebase into game instance in firestore
							addPlayer(host, gamecode, getFirestore, dispatch)
								.then((res) => {
									console.log(res)
									resolve(true)
								})
								.catch((error) => {
									console.log('something went wrong adding player to the game')
									console.log(error)
									dispatch({
										type: 'ADD_PLAYER_ERROR',
										error,
									})
									reject(error)
								})
						})
						.catch((error) => {
							console.log('something went wrong creating the player')
							console.log(error)
							dispatch({
								type: 'CREATE_PLAYER_ERROR',
								error,
							})
							reject(error)
						})
				})
				.catch((error) => {
					console.log('something went wrong creating the game')
					console.log(error)
					dispatch({
						type: 'CREATE_GAME_ERROR',
						error,
					})
					reject(error)
				})
		})
	}
}
