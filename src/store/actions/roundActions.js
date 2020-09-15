import {
	dbUpdateRoundStatus,
	dbUpdateCardStatus,
	dbUpdateGameScore,
	dbUpdateRoundHalf,
	dbUpdateRoundNumber,
	dbVerifyEndGame,
	dbUpdateGameStatus,
	dbCompleteRound,
} from 'utils/API'
import { errorActionCreator } from './errorActions'
// import { getFirestore } from 'redux-firestore'

const requestRoundStatus = () => {
	return {
		type: 'REQUEST_ROUND_STATUS_UPDATE',
	}
}

const roundStatusSuccess = (status) => {
	return {
		type: 'ROUND_STATUS_UPDATE_SUCCESS',
		payload: status,
	}
}

const requestCompleteRound = () => {
	return {
		type: 'REQUEST_COMPLETE_ROUND',
	}
}

const completeRoundSuccess = () => {
	console.log('dispatching complete round success')
	return {
		type: 'COMPLETE_ROUND_SUCCESS',
	}
}

export const updateRoundStatus = (gamecode, newRoundStatus, currentIndex) => {
	return async (dispatch) => {
		dispatch(requestRoundStatus())
		console.log(gamecode)
		console.log(newRoundStatus)

		//If round has ended, change the status of the last card displayed so it does not display next round
		if (newRoundStatus === 'postround') {
			console.log('round is ending, but need to update card# ', currentIndex)
			try {
				await dbUpdateCardStatus(gamecode, 'discard', parseInt(currentIndex))
				//need to determine handling error here
			} catch (err) {
				console.log('there was an error updating card status')
				console.log(err.message)
				const errorMessage =
					'There was a problem updating to the next round. Please refresh the page to try again'
				dispatch(errorActionCreator('ROUND_STATUS_UPDATE_FAILURE', errorMessage))
				return
			}
		}
		dbUpdateRoundStatus(gamecode, newRoundStatus)
			.then(() => {
				console.log('dispatching round status success')
				dispatch(roundStatusSuccess(newRoundStatus))
				return
			})
			.catch((error) => {
				console.log(error)
				const errorMsg = 'There was a problem starting the round. Please refresh the page to try again.'
				dispatch(errorActionCreator('ROUND_STATUS_UPDATE_FAILURE', errorMsg))
				return
			})
	}
}

/*Called at end of round when watcher selects 'Confirm' button. End round tasks:
 * Updates the scores in firestore based on card status.
 * Toggles round half from top/bottom which determines which team the giver is from.
 *  When half is changed to top (round just completed), checks for end of game.
 * If ending, updates game status which triggers redirect
 * If not ending, updates the round number (if required) and round status.
 */
export const completeRound = (gamecode) => {
	return (dispatch) => {
		dispatch(requestCompleteRound())
		dbCompleteRound(gamecode)
			.then((response) => {
				dispatch(completeRoundSuccess())
			})
			.catch((error) => {
				console.log(error.message)
				dispatch(errorActionCreator('COMPLETE_ROUND_FAILURE', error))
			})
	}
}

// export const completeRound = (gamecode) => {
// 	return (dispatch) => {
// 		dispatch(requestCompleteRound('Updating scores'))
// 		// need to combine updateGameScore & updateRoundHalf into one method to avoid updating document too often
// 		dbUpdateGameScore(gamecode)
// 			.then(() => {
// 				// dispatch(requestCompleteRound('Updating round information'))
// 				return dbUpdateRoundHalf(gamecode)
// 			})
// 			.then((half) => {
// 				console.log('updated half: ', half)
// 				//check for endgame after a 'bottom' is complete so both teams have had a turn
// 				if (half === 'top') {
// 					console.log('need to determine end of game')
// 					dbVerifyEndGame(gamecode).then((endGame) => {
// 						if (endGame) {
// 							console.log('game should end')
// 							dbUpdateGameStatus(gamecode, 'completed')
// 						} else {
// 							console.log('game should continue. Start next round')
// 							// dispatch(requestCompleteRound('Preparing to start next round'))
// 							return dbUpdateRoundNumber(gamecode).then(() => {
// 								dispatch(completeRoundSuccess())
// 							})
// 						}
// 					})
// 				} else {
// 					// dispatch(requestCompleteRound('Changing round status'))
// 					console.log('half is bottom. Just need to change round status to preround')
// 					return dbUpdateRoundStatus(gamecode, 'preround').then(() => {
// 						dispatch(completeRoundSuccess())
// 					})
// 				}
// 			})
// 			.catch((error) => {
// 				//Need to create user friendly error
// 				dispatch(errorActionCreator('COMPLETE_ROUND_FAILURE', error))
// 			})
// 	}
// }
