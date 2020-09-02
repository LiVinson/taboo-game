import firebase from './fbConfig'

export const createGame = (gamecode, gameDetails) => {
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
			return
		})
		.catch((error) => {
			throw error
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
			if (!game.exists) throw new Error(`${gamecode} does not exist`)
			const gameInfo = game.data() //how data is accessed via firestore
			if (gameInfo.status !== 'new') throw new Error(`${gamecode} is ${gameInfo.status} and can't be joined!`)
			return
		})
		.catch((error) => {
			throw error
		})
}

//Creates an anonymous user in firebase with a uid generated.
export const createPlayer = (playerName) => {
	console.log('creating player in firebase...')
	return firebase
		.auth()
		.signInAnonymously()
		.then((res) => {
			console.log('created a player in firebase')
			const user = firebase.auth().currentUser
			return user
				.updateProfile({
					displayName: playerName,
				})
				.then(() => {
					console.log('updated username in firebase')
					const player = {
						playerId: user.uid,
						name: user.displayName,
					}
					// resolve(player)
					return player
				})
				.catch((error) => {
					console.log('there was an error updating username in firebase ')
					console.log(error)
					throw error
				})
		})
		.catch((error) => {
			console.log('there was an error creating user')
			console.log(error)
			throw error
		})
}

export const addPlayer = (player, gamecode) => {
	console.log('action player in firestore to ', gamecode)

	console.log(player)
	return firebase
		.firestore()
		.collection('games')
		.doc(gamecode)
		.update({
			players: firebase.firestore.FieldValue.arrayUnion(player),
		})
		.then(() => {
			console.log('player added to game')
			return player
		})
		.catch((error) => {
			throw error
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
					//find player object based on playerId and update team property
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
	// return new Promise((resolve, reject) => {
	return firebase
		.firestore()
		.collection('games')
		.doc(gamecode)
		.update({
			status: status,
		})
		.then(() => {
			console.log('game updated to ', status)
			return
		})
		.catch((error) => {
			console.log('error updating game')
			return error
		})
	// })
}

export const dbUpdateRoundStatus = (gamecode, status) => {
	console.log('updating game status')
	console.log(status)

	let currentTime
	let endTime = null

	//When round is starting, determine endTime for synchronized countdown timer
	if (status === 'in progress') {
		currentTime = new Date()
		endTime = currentTime.setTime(currentTime.getTime() + 60500)
	}

	return firebase
		.firestore()
		.collection('games')
		.doc(gamecode)
		.update({
			'gameplay.status': status,
			'gameplay.roundEndTime': endTime,
		})
		.then(() => {
			console.log('game updated to ', status)
			return
		})
		.catch((error) => {
			console.log('error updating game')
			return error
		})
	// })
}

export const dbRequestGameDeck = () => {
	const gamedeck = []
	return firebase
		.firestore()
		.collection('cards')
		.get()
		.then((response) => {
			response.forEach((document) => {
				let card = {}
				card.word = document.id
				card.tabooList = document.data().tabooList
				gamedeck.push(card)
			})
			return gamedeck
		})
		.catch((error) => {
			console.log(error)
			return error
		})
}

export const dbSaveGameDeck = (gamecode, deck) => {
	console.log(deck)

	return firebase
		.firestore()
		.collection('games')
		.doc(gamecode)
		.update({
			'gameplay.deck': deck,
			'gameplay.cardIndex': 0,
		})
		.then(() => {
			console.log('saved shuffled array')
			return
		})
		.catch((error) => {
			console.log(error)
			return error
		})
}

export const dbUpdateCardStatus = (gamecode, status, currentIndex) => {
	console.log('updating card status in fb...')
	const gamePath = firebase.firestore().collection('games').doc(gamecode)
	return firebase.firestore().runTransaction((transaction) => {
		return transaction
			.get(gamePath)
			.then((game) => {
				if (!game.exists) {
					console.log('game does not exist')
					throw new Error("game doesn't exist...")
				}

				const { cardIndex, deck, round, half, status: roundStatus } = game.data().gameplay

				let updatedCard

				console.log(deck[currentIndex])
				//Card status changed based on giver/watcher updating within the round
				if (roundStatus === 'in progress') {
					//If the index provided no longer matches, giver and watcher may have selected a button at nearly the same time. This allows only one update to occur and discard
					console.log(cardIndex)
					console.log(currentIndex)
					if (cardIndex !== currentIndex) {
						console.log("card index was already changed. Don't proceed")
						throw new Error("card index was already changed. Don't proceed")
					}

					updatedCard = {
						...deck[currentIndex],
						status: status,
						//Will be used to filter cards that were played in the current round
						roundPlayed: `${round}-${half}`,
					}
				}
				//Card status changed by watcher updating card statuses as needed
				else if (roundStatus === 'postround') {
					updatedCard = {
						...deck[currentIndex],
						status: status,
					}
				}

				const cardPath = `gameplay.deck.${currentIndex}`
				transaction.update(gamePath, {
					//Only change the cardIndex for in round card changes. Stays the same for postround status changes
					'gameplay.cardIndex': roundStatus === 'in progress' ? currentIndex + 1 : currentIndex,
					[cardPath]: updatedCard,
				})
			})
			.then(() => {
				console.log('transaction successful')
				return
			})
			.catch((error) => {
				console.log(error)
			})
	})
}

export const dbUpdateGameScore = (gamecode) => {
	console.log('Updating score in firestore...')

	const gamePath = firebase.firestore().collection('games').doc(`${gamecode}`)
	return firebase.firestore().runTransaction((transaction) => {
		return transaction.get(gamePath).then((game) => {
			if (!game.exists) {
				console.log('game does not exist')
				throw new Error("game doesn't exist...")
			}

			console.log(game.data())

			const data = game.data()
			const { skipPenalty } = data
			const { deck, round, half } = data.gameplay
			const skipScore = skipPenalty === 'full' ? 1 : skipPenalty === 'half' ? 0.5 : 0
			const deckArr = Object.values(deck)
			const givingTeam = half === 'top' ? 'team 1' : 'team2'
			console.log(deckArr)
			//giving score: number of cards player this round, this half, and with status of correct get 1 point
			const roundScore = deckArr.reduce(
				(score, card) => {
					console.log(score)
					if (card.roundPlayed === `${round}-${half}` && card.status !== 'discard') {
						if (card.status === 'correct') {
							return {
								...score,
								giving: score.giving + 1,
							}
						} else if (card.status === 'skipped') {
							return {
								...score,
								watching: score.watching + 1 * skipScore,
							}
						}
					}
					return score
				},
				{ giving: 0, watching: 0 }
			)

			//watching score: number of cards skipped * skippingPenalty
			console.log(roundScore)
			const givingTeamIncrement = firebase.firestore.FieldValue.increment(roundScore.giving)
			const watchingTeamIncrement = firebase.firestore.FieldValue.increment(roundScore.watching)

			transaction
				.update(gamePath, {
					'gameplay.score.team1': givingTeam === 'team 1' ? givingTeamIncrement : watchingTeamIncrement,
					'gameplay.score.team2': givingTeam === 'team 2' ? givingTeamIncrement : watchingTeamIncrement,
				})
			
		}).then(() => {
			console.log('transaction complete')
		})
	})
}
