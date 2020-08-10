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
			if (!game.exists) return Promise.reject(`game ${gamecode} does not exist`)

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
				console.log('player added to game')
				resolve(player)
			})
			.catch((error) => {
				reject(error)
			})
	})
}

export const dbUpdateTeam = (gamecode, playerId, team) => {
	console.log('updating team in firestore')
	console.log(team)
	return new Promise((resolve, reject) => {
		const gamePath = firebase.firestore().collection('games').doc(gamecode)
		return firebase.firestore().runTransaction((transaction) => {
			//get the game document corresponding to gamecode
			return transaction
				.get(gamePath)
				.then((game) => {
					if (!game.exists) {
						reject('Document does not exist')
					}
					const players = game.data().players
					//find player object and update team property
					console.log(players)
					const updatedPlayers = players.map((player) => {
						if (player.playerId !== playerId) return player
						const updatedPlayer = {
							...player,
							team: team,
						}
						return updatedPlayer
					})
					console.log(updatedPlayers)
					transaction.update(gamePath, { players: updatedPlayers })
				})
				.then(() => {
					console.log('transaction succesfully committed ')
					resolve()
				})
				.catch((error) => {
					console.log('transaction failed: ', error)
					reject()
				})
		})
	})
}

export const dbUpdateGameStatus = (gamecode, status) => {
	console.log('updating game status')
	console.log(status)
	console.log(gamecode)
	return new Promise((resolve, reject) => {
		return firebase
			.firestore()
			.collection('games')
			.doc(gamecode)
			.update({
				status: status,
			})
			.then(() => {
				console.log('game updated to ', status)
				resolve()
			})
			.catch((error) => {
				console.log('error updating game')
				reject(error)
			})
	})
}
