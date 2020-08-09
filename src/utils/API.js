import firebase from './fbConfig'

export const createGame = (gamecode, gameDetails, getFirestore) => {
	console.log('creating game in firestore')
	const newGame = {
		gamecode,
		...gameDetails,
		createdAt: firebase.firestore.FieldValue.serverTimestamp(),
	}

	return firebase
		.firestore()
		.collection('games')
		.doc(gamecode)
		.set(newGame)
		.then(() => {
			console.log('firestore created the game. Time to dispatch')
			return true
		})
}

//Called when a player attempts to join an existing game. Verifies game exists and is in a valid status for a player to join
export const verifyGameExists = (gamecode) => {
	console.log('Verify: ' + gamecode)
	return firebase
		.firestore()
		.collection('games')
		.doc(gamecode)
		.get()
		.then((game) => {
			if (!game.exists) 
				return Promise.reject(`game ${gamecode} does not exist`)

			const gameInfo = game.data() //how data is accessed via firestore
			if (gameInfo.status !== 'new')
				return Promise.reject(`game ${gamecode} is already in progress! No additional players can join`) //can't join game already in progress
			
			return true
		})
		//any firestore errors will be caught in caller

}

export const createPlayer = (playerName) => {
	console.log('creating player in firebase...')
	return new Promise((resolve, reject) => {
		return firebase
			.auth()
			.signInAnonymously()
			.then((res) => {
				console.log('created a player in firebase')
				const user = firebase.auth().currentUser
				user.updateProfile({
					displayName: playerName,
				})
					.then(() => {
						console.log('updated username in firebase')
						const player = {
							playerId: user.uid,
							name: user.displayName,
						}
						resolve(player)
					})
					.catch((error) => {
						console.log('there was an error updating usernamein firebase ')
						console.log(error)
						reject(error)
					})
			})
			.catch((error) => {
				console.log('there was an error creating user')
				console.log(error)
				reject(error)
			})
	})
}

export const addPlayer = (player, gamecode) => {
	console.log('action player in firestore to ', gamecode)
	console.log(player)
	return new Promise((resolve, reject) => {
		return firebase
			.firestore()
			.collection('games')
			.doc(gamecode)
			.update({
				players: firebase.firestore.FieldValue.arrayUnion(player),
			})
			.then(() => {
				console.log("player added to game")
				resolve(player)
			})
			.catch((error) => {
				reject(error)
			})
	})
}
