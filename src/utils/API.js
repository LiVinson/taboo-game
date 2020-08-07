import firebase from './fbConfig'

export const createGame = (gamecode, gameDetails, getFirestore) => {
	console.log('creating game in firestore')
	const newGame = {
		...gameDetails,
		createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    }
    
	return firebase.firestore()
		.collection('games')
		.doc(gamecode)
		.set(newGame)
		.then(() => {
			console.log('firestore created the game. Time to dispatch')
			return true			
		})
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
	console.log('action to add player')
	console.log(player)
	return new Promise((resolve, reject) => {
		return firebase.firestore()
			.collection('games')
			.doc(gamecode)
			.update({
				players: firebase.firestore.FieldValue.arrayUnion(player),
			})
			.then(() => {
				resolve('player added')
            })
            .catch(error => {
                reject(error)
            })
	})
}
