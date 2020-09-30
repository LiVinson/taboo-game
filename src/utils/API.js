import firebase from './fbConfig'
import FireStoreErrorInfo from '../lib/FireStoreErrorInfo'
import CustomError from '../lib/CustomError'

const db = firebase.firestore()

//Used to take in firestore or custom errors from firestore interaction. Creates an object with relevant info and updates in db
//Throws existing CustomErrors or creates and new error messages with user friendly text to display
const dbLogError = (
	error,
	gamecode,
	sourceFunc,
	customErrMsg = 'There was an error. Please try again.',
	additionalInfo = 'none'
) => {
	const errorObj = new FireStoreErrorInfo(error, sourceFunc, additionalInfo)
	return db
		.collection('errors')
		.doc(gamecode)
		.set(
			{
				//JSON parse/stringify hack needed as FS does not allow saving class instances
				errorList: firebase.firestore.FieldValue.arrayUnion(JSON.parse(JSON.stringify(errorObj))),
			},
			//update array if exists. Otherwise create array
			{ merge: true }
		)
		.then(() => {
			if (error instanceof CustomError) {
				throw error
			} else {
				throw new Error(customErrMsg)
			}
		})
}

//---------------------------- GAME UPDATES ----------------------------------//
export const dbCreateGame = (gamecode, gameDetails) => {
	const newGame = {
		gamecode,
		...gameDetails,
		createdAt: firebase.firestore.FieldValue.serverTimestamp(),
	}
	return db
		.collection('games')
		.doc(gamecode)
		.set(newGame)
		.catch((error) => {
			const generalErrorMsg = 'There was a problem creating the game. Please try again.'
			dbLogError(error, gamecode, 'dbCreateGame', generalErrorMsg)
		})
}

//Called when a player attempts to join an existing game. Verifies game exists and is in a valid status for a player to join
export const dbVerifyGameExists = (gamecode) => {
	return db
		.collection('games')
		.doc(gamecode)
		.get()
		.then((game) => {
			if (!game.exists) throw new CustomError(`Game code ${gamecode} does not exist!`)
			const gameInfo = game.data() //how data is accessed via firestore
			if (gameInfo.status !== 'new')
				throw new CustomError(`${gamecode} is ${gameInfo.status} and can't be joined!`)
			return
		})
		.catch((error) => {
			const generalErrorMsg = 'There was a problem verifying this game. Please try again.'
			return dbLogError(error, gamecode, 'dbVerifyGameExists', generalErrorMsg)
		})
}

export const dbUpdateGameStatus = (gamecode, status) => {
	return db
		.collection('games')
		.doc(gamecode)
		.update({
			status: status,
		})
		.catch((error) => {
			const generalErrorMsg = 'There was an error updating the game status. Refresh the page and try again.'
			return dbLogError(error, gamecode, 'dbUpdateGameStatus', generalErrorMsg, status)
		})
}

//--------------------------------PLAYER & TEAM UPDATES --------------------------------

//Creates an anonymous user in firebase with a uid generated.
export const dbCreatePlayer = (playerName, gamecode) => {
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
		})
		.catch((error) => {
			const generalErrorMsg = `There was an error adding you to the game. Please try again.`
			return dbLogError(error, gamecode, 'dbCreatePlayer', generalErrorMsg)
		})
}

//Takes player object with uid stored in players array, and uid in users
export const addPlayer = (player, gamecode) => {
	return db
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
		.catch((error) => {
			const generalErrorMsg = 'There was an error adding you to the game. Please try again.'
			return dbLogError(error, gamecode, 'addPlayer', generalErrorMsg, `uid: ${player.uid}`)
		})
}

//Used to switch user to team 1 or team 2.
export const dbUpdateTeam = (gamecode, playerId, team) => {
	const gamePath = db.collection('games').doc(gamecode)
	return db
		.runTransaction((transaction) => {
			//get the game document corresponding to gamecode
			return transaction.get(gamePath).then((game) => {
				if (!game.exists) {
					throw new CustomError('This game no longer exists. Please try again.')
				}
				const players = game.data().players
				//find player object based on playerId and update team property leaving the others unchanged
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
		.catch((error) => {
			const generalErrorMsg = 'There was an error changing teams. Please try again.'
			return dbLogError(error, gamecode, 'dbUpdateTeam', generalErrorMsg, `uid: ${playerId}`)
		})
}

//------------------------------------ CARD / DECK UPDATES -------------------------------------
export const dbRequestGameDeck = (gamecode) => {
	const gamedeck = []
	return db
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
			const generalErrorMsg = 'There was a problem retrieving the deck. Please refresh and try again.'
			return dbLogError(error, 'deckRequest', 'dbRequestGameDeck', generalErrorMsg)
		})
}

export const dbSaveGameDeck = (gamecode, deck) => {
	const batch = db.batch()

	let cardCount = 0
	//for each item in deck, loop and create a document with the index as the document Id and containing object with word and tabooWords[].
	for (let i = 0, keys = Object.keys(deck); i < keys.length; i++) {
		const cardRef = db.collection('games').doc(gamecode).collection('deck').doc(String(i))
		batch.set(cardRef, { tabooList: deck[i].tabooList, word: deck[i].word })
		cardCount++
	}
	//Store the starting index for accessing cards, and the total number of cards in deck used to determine when cards run out.
	// batch.set(db.collection('games').doc(gamecode).collection('deck').doc(gamecode), { cardIndex: 0 })
	batch.set(
		db.collection('games').doc(gamecode).collection('deck').doc(gamecode),
		{
			cardIndex: 0,
			totalCards: cardCount,
			allCardsPlayed: false,
		},
		{ merge: true }
	)
	return batch.commit().catch((error) => {
		const generalErrorMsg = 'There was a problem retrieving the deck. Please refresh and try again.'
		return dbLogError(error, gamecode, 'dbSaveGameDeck', generalErrorMsg)
	})
}

//Used to set or update the card status in deck collection based on changes in round or in postround
export const dbUpdateCardStatus = (gamecode, cardStatus, currentIndex, roundStatus, round, half) => {
	const deckPath = db.collection('games').doc(gamecode).collection('deck')

	return db
		.runTransaction((transaction) => {
			//Get the object containing deck information to verify the current index
			return transaction.get(deckPath.doc(gamecode)).then((deck) => {
				if (!deck.exists) {
					throw new CustomError(`Unable to update card ${currentIndex} status. This deck no longer exists!`)
				}

				const { cardIndex, totalCards } = deck.data()

				//Card status was changed based on giver/watcher updating within the round
				if (roundStatus === 'in progress') {
					//If the index provided no longer matches, giver and watcher may have selected a button at nearly the same time. This allows only one update to occur and discards other
					if (cardIndex !== currentIndex) {
						throw new CustomError(`card ${cardIndex} status was already updated.`)
					}
					//Update the status of card played and set roundPlayed field used for scoring at end of round
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
				//Card status changed by watcher updating card statuses as needed after round
				else if (roundStatus === 'postround') {
					transaction.update(deckPath.doc(currentIndex), { status: cardStatus })
				} else {
					throw new CustomError(`Round must be in progress or postround to update card ${cardIndex} status.`)
				}
				return
			})
		})
		.catch((error) => {
			const generalErrorMsg = `There was a problem updating card ${currentIndex}. Please try again.`

			return dbLogError(
				error,
				gamecode,
				'dbUpdateCardStatus',
				generalErrorMsg,
				`New status: ${cardStatus}, Current index: ${currentIndex}, round: ${round}-${half}, roundStatus:${roundStatus}`
			)
		})
}

//Used when SubmitCard form is submitted. Writes to /suggestions collection
export const dbSubmitCardIdea = (cardIdea) => {
	const cardIdeaObj = {
		...cardIdea,
		reviewed: false,
		added: false,
		createdAt: firebase.firestore.FieldValue.serverTimestamp(),
	}

	return db
		.collection('suggestions')
		.doc()
		.set(cardIdeaObj)
		.catch((error) => {
			const generalErrorMsg = 'There was a problem submitting your idea. Please try again.'
			return dbLogError(error, 'cardSubmit', 'dbSubmitCardIdea', generalErrorMsg, JSON.stringify(cardIdeaObj))
		})
}
//---------------------------- ROUND UPDATES -------------------------------------//

//Used to update round status to preround, in progress, or postround. If changing to inProgress, sets endTime value
export const dbUpdateRoundStatus = (gamecode, newStatus) => {
	let currentTime
	let endTime = null

	//When round is starting, determine endTime for synchronized countdown timer and add 60.5 seconds to set endTime
	if (newStatus === 'in progress') {
		currentTime = new Date()
		endTime = currentTime.setTime(currentTime.getTime() + 60500)
	}

	return db
		.collection('games')
		.doc(gamecode)
		.update({
			'gameplay.status': newStatus,
			'gameplay.roundEndTime': endTime,
		})
		.catch((error) => {
			const generalErrorMsg = 'There was an error updating the round status.'
			return dbLogError(error, gamecode, 'dbUpdateRoundStatus', generalErrorMsg, `new status: ${newStatus}`)
		})
}

/*Gets the current game object from firestore
Calculates the scores and assigns to team based on half, skipPenalty, and cards played this round/half in deck
Determines the new half, teamRotation and round values and whether game should end based on endValue or deck completed
*/
export const dbCompleteRound = (gamecode, currentRound, currentHalf) => {
	const gamePath = db.collection('games').doc(`${gamecode}`)
	//Retreives allCardsPlayed field from deck/gamecode used to determine if game should end early
	return gamePath
		.collection('deck')
		.doc(gamecode)
		.get()
		.then((deckInfo) => {
			if (!deckInfo.exists) {
				throw new CustomError('There was a problem completing this round. Please try again.')
			}
			const deckComplete = deckInfo.data().allCardsPlayed
			return deckComplete
		})
		.then((deckComplete) => {
			//Retreives all cards from deck that were played during current round and half. Used to update score
			return gamePath
				.collection('deck')
				.where('roundPlayed', '==', `${currentRound}-${currentHalf}`)
				.get()
				.then((deckSnapshot) => {
					const cardsPlayed = []
					deckSnapshot.forEach((doc) => {
						cardsPlayed.push(doc.data())
					})
					//Get game and gameplay information to determine next set of turns and info for scoring
					return db.runTransaction((transaction) => {
						return transaction.get(gamePath).then((game) => {
							if (!game.exists) {
								throw new CustomError('There was a problem completing this round. Please try again.')
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

							//Calculate new score based on current half.
							//Update game/gameplay/score
							const givingTeam = half === 'top' ? 'team1' : 'team2'
							const watchingTeam = givingTeam === 'team1' ? 'team2' : 'team1'
							//penalty for each card skipped is 1pt, .5pts, or 0 pts depending on game setup
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
								//determines whether game should end based on number of turns for each player
								endGame = verifyEndGame(
									endGameMethod,
									endValue,
									roundTurnObject.team1Rotations,
									roundTurnObject.team2Rotations
								)
							}

							//object used to updates games/{gamecode}/gameplay. Merged with existing
							const updatedGamePlay = Object.assign(gameplay, roundTurnObject)
							//current score + score just calculated for this round
							updatedGamePlay.score = {
								team1: score.team1 + scoreObject.team1,
								team2: score.team2 + scoreObject.team2,
							}
							//object used to update games/{gamecode} including merging gameplay field with updatedGamePlay object. Merged with existing
							const updatedGameObject = Object.assign(game.data(), { gameplay: updatedGamePlay })
							//If determined game should end, also update the game status, and keep round number the same isntead of incrementing
							if (endGame) {
								updatedGameObject.round = currentRound
								updatedGameObject.status = 'completed'
							}

							return transaction.update(gamePath, updatedGameObject)
						})
					})
				})
		})
		.catch((error) => {
			const generalErrorMsg = 'There was an error completing this round. Please try again.'
			return dbLogError(
				error,
				gamecode,
				'dbCompleteRound',
				generalErrorMsg,
				`round: ${currentRound}-${currentHalf}`
			)
		})
}

//Returns object with team 1 and team 2 properties with scores
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
				//card was discarded, or skipped without penalty assessed
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
