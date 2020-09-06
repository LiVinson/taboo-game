import {
	dbUpdateRoundStatus,
	dbUpdateCardStatus,
	dbUpdateGameScore,
	dbUpdateRoundHalf,
	dbUpdateRoundNumber,
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

const requestUpdateCardStatus = () => {
	return {
		type: 'REQUEST_UPDATE_CARD_STATUS',
	}
}

const updateCardStatusSuccess = () => {
	return {
		type: 'UPDATE_CARD_STATUS_SUCCESS',
	}
}

const requestCompleteRound = (message) => {
	console.log("dispatching: ", message)
	return {
		type: 'REQUEST_COMPLETE_ROUND',
		payload: {
			pendingMsg: message,
		},
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
			await dbUpdateCardStatus(gamecode, 'discard', currentIndex)
		}
		dbUpdateRoundStatus(gamecode, newRoundStatus)
			.then(() => {
				console.log('dispatching round status success')
				dispatch(roundStatusSuccess(newRoundStatus))
				return
			})
			.catch((error) => {
				dispatch(errorActionCreator('ROUND_STATUS_UPDATE_FAILURE', error))
				return
			})
	}
}

export const changeCardStatus = (gamecode, status, currentIndex) => {
	return (dispatch) => {
		//dispatch changing card in progress
		//set the status of the current card in firebase, and update the index
		//dispatch changing card complete
		dispatch(requestUpdateCardStatus())
		dbUpdateCardStatus(gamecode, status, currentIndex)
			.then(() => {
				dispatch(updateCardStatusSuccess())
			})
			.catch((error) => {
				dispatch(errorActionCreator('UPDATE_CARD_STATUS_FAILURE', error))
			})
	}
}


/*Called at end of round when watcher selects 'Confirm' button and after scores have been updates in firestore.
	Toggles half from top/bottom which determines which team the giver is from. When half is changed to top (round just completed),
	checks for end of game. If not, updates the round number and round status. If changed to bottom, just update round status. 
*/
export const completeRound = (gamecode) => {
	return (dispatch) => {
		dispatch(requestCompleteRound('Updating scores'))
		dbUpdateGameScore(gamecode)
			.then(() => {
				dispatch(requestCompleteRound('Updating round information'))
				return dbUpdateRoundHalf(gamecode)
			})
			.then((half) => {
				// dispatch(updateRoundHalfSuccess())
				console.log('updated half: ', half)
				if (half === 'top') {
					console.log('need to determine end of game')
					if (false) {
						// function to check for end of game to be added
						console.log('end of game')
					} else {
						dispatch(requestCompleteRound('Preparing to start next round'))
						return dbUpdateRoundNumber(gamecode)

					}
				} else {
					dispatch(requestCompleteRound('Changing round status'))
					console.log('half is bottom. Just need to change round status to preround')
					return updateRoundStatus(gamecode, 'preround')(dispatch)
				}
			})
			.then(() => {
				dispatch(completeRoundSuccess())
			})
			.catch((error) => {
				dispatch(errorActionCreator('UPDATE_ROUND_NUMBER_FAILURE', error))
			})
	}
}

