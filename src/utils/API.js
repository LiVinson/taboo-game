import firebase from './fbConfig'

class CustomError {
	constructor(error, source) {
		this.message = error.message
		this.name = error.name || 'No name provided'
		this.source = source || 'Function name not available'
		this.date = Date.now()
	}
}
const dbLogError = (gamecode, error, sourceFunc) => {
	const errorObj = new CustomError(error, sourceFunc)
	console.log(errorObj)
	return firebase
		.firestore()
		.collection('errors')
		.doc(gamecode)
		.set(
			{
				//JSON parse/stringify hack needed as FS does not allow saving class instances
				errorList: firebase.firestore.FieldValue.arrayUnion(JSON.parse(JSON.stringify(errorObj))),
			},
			{ merge: true }
		)
		.catch((err) => {
			//when logging. Will determine how to handle.
			return
		})
}
//--------------------- GAME UPDATES ---------------------------//
export const dbCreateGame = (gamecode, gameDetails) => {
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
		.catch((error) => {
			console.log('first catch:', error.message)
			return dbLogError(gamecode, error, 'dbCreateGame').then(() => {
				throw new Error('There was a problem creating the game. Please try again')
			})
		})
}

//Called when a player attempts to join an existing game. Verifies game exists and is in a valid status for a player to join
export const verifyGameExists = (gamecode) => {
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
	// .catch((error) => {
	// 	throw error
	// })
}

export const dbUpdateGameStatus = (gamecode, status) => {
	// return new Promise((resolve, reject) => {
	return firebase
		.firestore()
		.collection('games')
		.doc(gamecode)
		.update({
			status: status,
		})
		.then(() => {
			return
		})
		.catch((error) => {
			throw error
		})
}

export const dbVerifyEndGame = (gamecode) => {
	return firebase
		.firestore()
		.collection('games')
		.doc(gamecode)
		.get()
		.then((game) => {
			if (!game.exists) throw new Error(`${gamecode} does not exist`)
			const gameInfo = game.data()
			const { endGameMethod } = gameInfo

			if (endGameMethod === 'turns') {
				const { endValue } = gameInfo
				const { team1Rotations, team2Rotations } = gameInfo.gameplay
				//true if both teams have rotated endValue # of turns
				const endGame = team1Rotations >= endValue && team2Rotations >= endValue
				return endGame
			} else {
				return false
				//end based on amount of time elapsed. Fetaure to be added
			}
		})
}

//---------------------PLAYER & TEAM UPDATES --------------------------------
//Creates an anonymous user in firebase with a uid generated.
export const dbCreatePlayer = (playerName) => {
	return firebase
		.auth()
		.signInAnonymously()
		.then((res) => {
			const user = firebase.auth().currentUser
			return user
				.updateProfile({
					displayName: playerName,
				})
				.then(() => {
					const player = {
						playerId: user.uid,
						name: user.displayName,
					}
					return player
				})
				.catch((error) => {
					throw error
				})
		})
		.catch((error) => {
			throw error
		})
}

export const addPlayer = (player, gamecode) => {
	return firebase
		.firestore()
		.collection('games')
		.doc(gamecode)
		.update({
			players: firebase.firestore.FieldValue.arrayUnion(player),
			//storing just the ids separately for purposes of security rules
			users: firebase.firestore.FieldValue.arrayUnion(player.playerId),
		})
		.then(() => {
			return player
		})
}

export const dbUpdateTeam = (gamecode, playerId, team) => {
	const gamePath = firebase.firestore().collection('games').doc(gamecode)
	return firebase
		.firestore()
		.runTransaction((transaction) => {
			//get the game document corresponding to gamecode
			return transaction.get(gamePath).then((game) => {
				if (!game.exists) {
					throw new Error('Document does not exist')
				}
				const players = game.data().players
				//find player object based on playerId and update team property
				const updatedPlayers = players.map((player) => {
					if (player.playerId !== playerId) return player
					const updatedPlayer = {
						...player,
						team: team,
					}
					return updatedPlayer
				})
				return transaction.update(gamePath, { players: updatedPlayers })
			})
		})
		.then(() => {
			return
		})
		.catch((error) => {
			throw error
		})
}

export const dbUpdateRoundStatus = (gamecode, status) => {
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
			return
		})
		.catch((error) => {
			throw error
		})
	// })
}

//----------------------------- CARD / DECK UPDATES ---------------------------
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
			throw error
		})
}

export const dbSaveGameDeck = (gamecode, deck) => {
	const batch = firebase.firestore().batch()

	let cardCount = 0
	//for each item in deck, create a document with the index as the document Id.
	for (let i = 0, keys = Object.keys(deck); i < keys.length; i++) {
		const cardRef = firebase.firestore().collection('games').doc(gamecode).collection('deck').doc(String(i))
		batch.set(cardRef, { tabooList: deck[i].tabooList, word: deck[i].word })
		cardCount++
	}

	//Store the starting index for accessing cards, and the total number of cards in deck.
	batch.set(firebase.firestore().collection('games').doc(gamecode).collection('deck').doc(gamecode), { cardIndex: 0 })
	batch.update(firebase.firestore().collection('games').doc(gamecode).collection('deck').doc(gamecode), {
		cardIndex: 0,
		totalCards: cardCount,
		allCardsPlayed: false,
	})

	//need to figure out how to handle index...
	return batch
		.commit()
		.then(() => {
			return
		})
		.catch((error) => {
			throw error
		})
}

export const dbUpdateCardStatus = (gamecode, cardStatus, currentIndex, roundStatus, round, half) => {
	const deckPath = firebase.firestore().collection('games').doc(gamecode).collection('deck')

	return firebase
		.firestore()
		.runTransaction((transaction) => {
			return transaction.get(deckPath.doc(gamecode)).then((deck) => {
				if (!deck.exists) {
					throw new Error("deck doesn't exist...")
				}

				const { cardIndex, totalCards } = deck.data()

				//Card status changed based on giver/watcher updating within the round
				if (roundStatus === 'in progress') {
					//If the index provided no longer matches, giver and watcher may have selected a button at nearly the same time. This allows only one update to occur and discard
					if (cardIndex !== currentIndex) {
						throw new Error("card index was already changed. Don't proceed")
					}
					transaction.update(deckPath.doc(String(currentIndex)), {
						status: cardStatus,
						roundPlayed: `${round}-${half}`,
					})
					//Check if the card that was just updated is the last card. If so update field that will cause round/game to end. Otherwise, increment cardIndex so next card displays on screen
					if (cardIndex + 1 === totalCards) {
						transaction.update(deckPath.doc(gamecode), {
							allCardsPlayed: true,
						})
					} else {
						transaction.update(deckPath.doc(gamecode), {
							cardIndex: firebase.firestore.FieldValue.increment(1),
						})
					}
				}
				//Card status changed by watcher updating card statuses as needed
				else if (roundStatus === 'postround') {
					transaction.update(deckPath.doc(currentIndex), { status: cardStatus })
				} else {
					throw new Error('Round must be in progress or postround to update card status')
				}
				return
			})
		})
		.then(() => {
			return
		})
		.catch((error) => {
			throw error
		})
}

export const dbUpdateGameScore = (gamecode) => {
	const gamePath = firebase.firestore().collection('games').doc(`${gamecode}`)
	return firebase
		.firestore()
		.runTransaction((transaction) => {
			return transaction.get(gamePath).then((game) => {
				if (!game.exists) {
					throw new Error("game doesn't exist...")
				}

				const data = game.data()
				const { skipPenalty } = data
				const { deck, round, half } = data.gameplay
				const skipScore = skipPenalty === 'full' ? 1 : skipPenalty === 'half' ? 0.5 : 0

				const deckArr = Object.values(deck)
				const givingTeam = half === 'top' ? 1 : 2

				//giving score: number of cards player this round, this half, and with status of correct get 1 point
				const roundScore = deckArr.reduce(
					(score, card) => {
						//calculate number of cards for current round/half that were not discarded
						if (card.roundPlayed === `${round}-${half}` && card.status !== 'discard') {
							//always worth 1 point for 'giving' team
							if (card.status === 'correct') {
								return {
									...score,
									giving: score.giving + 1,
								}
							} else if (card.status === 'skipped') {
								return {
									...score,
									watching: score.watching + skipScore,
								}
							}
						}
						return score
					},
					{ giving: 0, watching: 0 }
				)

				//watching score: number of cards skipped * skippingPenalty
				const givingTeamIncrement = firebase.firestore.FieldValue.increment(roundScore.giving)
				const watchingTeamIncrement = firebase.firestore.FieldValue.increment(roundScore.watching)

				return transaction.update(gamePath, {
					'gameplay.score.team1': givingTeam === 1 ? givingTeamIncrement : watchingTeamIncrement,
					'gameplay.score.team2': givingTeam === 2 ? givingTeamIncrement : watchingTeamIncrement,
				})
			})
		})
		.then(() => {})
		.catch((error) => {
			throw error
		})
}

export const dbSubmitCardIdea = (cardIdea) => {
	const cardIdeaObj = {
		...cardIdea,
		reviewed: false,
		added: false,
		createdAt: firebase.firestore.FieldValue.serverTimestamp(),
	}

	return firebase
		.firestore()
		.collection('suggestions')
		.doc()
		.set(cardIdeaObj)
		.then(() => {
			return true
		})
		.catch((error) => {
			throw error
		})
}
//---------------------------- ROUND UPDATES -------------------------------------//

/*Called to toggle half from top/bottom which determines which team the 'giver' is selected from.
When toggling to top, this means a full round is completed, so team turns are incremented and rotations 
if all players on a team have completed a turn. 
*/
export const dbUpdateRoundHalf = (gamecode) => {
	//transaction: read current round, half. write: team rotations/turn
	const gamePath = firebase.firestore().collection('games').doc(`${gamecode}`)
	let newHalf
	return firebase
		.firestore()
		.runTransaction((transaction) => {
			return transaction.get(gamePath).then((game) => {
				if (!game.exists) {
					throw new Error("game doesn't exist...")
				}

				const data = game.data()
				const { half, team1Turn, team2Turn, team1Rotations, team2Rotations } = data.gameplay
				const { players } = data
				const team1Count = players.filter((player) => player.team === 'team 1').length
				const team2Count = players.filter((player) => player.team === 'team 2').length
				let newTeam1Turn, newTeam2Turn, newTeam1Rotations, newTeam2Rotations

				//top: Team 1 player has completed turn as giver. Keep turn/rotations the same until Team 2 gets a turn
				if (half === 'top') {
					newHalf = 'bottom'
					//turns stays the same until current team 2 player has been the giver
					newTeam1Turn = team1Turn
					newTeam1Rotations = team1Rotations
					newTeam2Turn = team2Turn
					newTeam2Rotations = team2Rotations
					//half === bottom: Team 2 has completed turn as giver. Time to increment turns/rotaions for both teams for new round
				} else {
					newHalf = 'top'
					newTeam2Turn = team2Turn + 1 //stays the same until time for team 2 player as giver again
					newTeam1Turn = team1Turn + 1
					newTeam2Rotations = team2Rotations
					newTeam1Rotations = team1Rotations

					//Each player on team has had a turn. Start turn over back at first player, increment rotations to show all team members have completed a turn
					if (newTeam1Turn >= team1Count) {
						newTeam1Turn = 0
						newTeam1Rotations++
					}

					if (newTeam2Turn >= team2Count) {
						newTeam2Turn = 0
						newTeam2Rotations++
					}
				}
				transaction.update(gamePath, {
					'gameplay.half': newHalf,
					'gameplay.team1Rotations': newTeam1Rotations,
					'gameplay.team1Turn': newTeam1Turn,
					'gameplay.team2Rotations': newTeam2Rotations,
					'gameplay.team2Turn': newTeam2Turn,
				})
				return newHalf
			})
		})
		.then((half) => {
			return half
		})
		.catch((error) => {
			throw error
		})
}

export const dbUpdateRoundNumber = (gamecode) => {
	//Will read and write to database in one operation
	const increment = firebase.firestore.FieldValue.increment(1)
	return firebase.firestore().collection('games').doc(gamecode).update({
		'gameplay.round': increment,
		'gameplay.status': 'preround',
	})
}

/*Gets the current game object from firestore
Calculates the scores and assigns to team based on half, skipPenalty, and cards played this round/hald in deck
Determines the new half, teamRotation and round values


*/
export const dbCompleteRound = (gamecode, currentRound, currentHalf) => {
	const gamePath = firebase.firestore().collection('games').doc(`${gamecode}`)

	return gamePath
		.collection('deck')
		.doc(gamecode)
		.get()
		.then((deckInfo) => {
			if (!deckInfo.exists) {
				throw new Error("Deck doesn't exist...")
			}
			const deckComplete = deckInfo.data().allCardsPlayed
			return deckComplete
		})
		.then((deckComplete) => {
			return gamePath
				.collection('deck')
				.where('roundPlayed', '==', `${currentRound}-${currentHalf}`)
				.get()
				.then((deckSnapshot) => {
					const cardsPlayed = []
					deckSnapshot.forEach((doc) => {
						cardsPlayed.push(doc.data())
					})

					return firebase.firestore().runTransaction((transaction) => {
						return transaction.get(gamePath).then((game) => {
							if (!game.exists) {
								throw new Error("game doesn't exist...")
							}

							const { endGameMethod, endValue, gameplay, players, skipPenalty } = game.data()

							const {
								round,
								half,
								team1Turn,
								team2Turn,
								team1Rotations,
								team2Rotations,
								score,
							} = gameplay
							let endGame = false

							//Calculate new score
							//Update game/gameplay/score
							const givingTeam = half === 'top' ? 'team1' : 'team2'
							const watchingTeam = givingTeam === 'team1' ? 'team2' : 'team1'
							const skipScore = skipPenalty === 'full' ? 1 : skipPenalty === 'half' ? 0.5 : 0

							const scoreObject = calculateRoundScore(skipScore, cardsPlayed, givingTeam, watchingTeam)

							//Determine new half
							//Determine team1 and team 2 turn values
							// Determine rotation values
							const team1Count = players.filter((player) => player.team === 'team 1').length
							const team2Count = players.filter((player) => player.team === 'team 2').length

							const roundTurnObject = calculateRoundTurns(
								half,
								round,
								team1Turn,
								team2Turn,
								team1Count,
								team2Count,
								team1Rotations,
								team2Rotations
							)

							//Determing if game should end

							if (deckComplete) {
								endGame = true
							} else if (half === 'bottom') {
								endGame = verifyEndGame(
									endGameMethod,
									endValue,
									roundTurnObject.team1Rotations,
									roundTurnObject.team2Rotations
								)
							}

							const updatedGamePlay = Object.assign(gameplay, roundTurnObject)
							//current score + score just calculated for this round
							updatedGamePlay.score = {
								team1: score.team1 + scoreObject.team1,
								team2: score.team2 + scoreObject.team2,
							}
							//merge the retrieved data and update the gameplay property with the new properties calculations
							const updatedGameObject = Object.assign(game.data(), { gameplay: updatedGamePlay })
							//If determiend game should end, also update the game status, and keep round number the same
							if (endGame) {
								updatedGameObject.round = currentRound
								updatedGameObject.status = 'completed'
							}

							return transaction.update(gamePath, updatedGameObject)
						})
					})
				})
		})
		.then(() => {
			return
		})
		.catch((error) => {
			throw error
		})
}

const calculateRoundScore = (skipScore, cardsPlayed, givingTeam, watchingTeam) => {
	const scoreObject = cardsPlayed.reduce(
		(score, card) => {
			if (card.status === 'correct') {
				return {
					...score,
					[givingTeam]: score[givingTeam] + 1,
				}
			} else if (card.status === 'skipped' && skipScore > 0) {
				return {
					...score,
					[watchingTeam]: score[watchingTeam] + skipScore,
				}
			} else {
				return score
			}
		},
		{ [givingTeam]: 0, [watchingTeam]: 0 }
	)
	return scoreObject
}

const calculateRoundTurns = (currentHalf, currentRound, t1Turn, t2Turn, t1Count, t2Count, t1Rotation, t2Rotation) => {
	const roundObject = {}

	roundObject.half = currentHalf === 'top' ? 'bottom' : 'top'
	roundObject.status = 'preround'
	//Once both t1 and t2 has completed a round, increment the turnCount.
	//If all players on team have completed a turn, restart at 0 and increment rotationCount
	if (currentHalf === 'bottom') {
		//Check if the active players are the last ones on the team, and start at 0 if so
		roundObject.team1Turn = t1Turn >= t1Count - 1 ? 0 : t1Turn + 1
		roundObject.team2Turn = t2Turn >= t2Count - 1 ? 0 : t2Turn + 1
		//If starting turns over with first player on the team,  increment the rotation
		roundObject.team1Rotations = roundObject.team1Turn === 0 ? t1Rotation + 1 : t1Rotation
		roundObject.team2Rotations = roundObject.team2Turn === 0 ? t2Rotation + 1 : t2Rotation
		roundObject.round = currentRound + 1 //TBD if this should be updated here
	} else {
		roundObject.team1Turn = t1Turn
		roundObject.team2Turn = t2Turn
		roundObject.team1Rotations = t1Rotation
		roundObject.team2Rotations = t2Rotation
	}
	return roundObject
}

const verifyEndGame = (endGameMethod, endGameValue, t1Rotations, t2Rotations) => {
	let endGame
	if (endGameMethod === 'turns') {
		endGame = t1Rotations >= endGameValue && t2Rotations >= endGameValue
		return endGame
	} else {
		//end based on amount of time elapsed. May need started at...
		return false
	}
}
