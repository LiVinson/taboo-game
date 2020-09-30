import { dbUpdateRoundStatus, dbUpdateCardStatus, dbCompleteRound } from 'utils/API'
import { errorActionCreator } from './errorActions'

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
	return {
		type: 'COMPLETE_ROUND_SUCCESS',
	}
}

export const updateRoundStatus = (gamecode, newRoundStatus, currentIndex, round, half) => {
	return async (dispatch) => {
		dispatch(requestRoundStatus())

		//If round has ended, change the status of the last card displayed so it does not display next round
		if (newRoundStatus === 'postround') {
			try {
				await dbUpdateCardStatus(gamecode, 'discard', currentIndex, "in progress", round, half, )
				//need to determine handling error here
			} catch (err) {
				const errorMessage =
					'There was a problem updating to the next round. Please refresh the page to try again'
				dispatch(errorActionCreator('ROUND_STATUS_UPDATE_FAILURE', errorMessage))
				return
			}
		}
		dbUpdateRoundStatus(gamecode, newRoundStatus)
			.then(() => {
				dispatch(roundStatusSuccess(newRoundStatus))
				return
			})
			.catch((error) => {
				dispatch(errorActionCreator('ROUND_STATUS_UPDATE_FAILURE', error.message))
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
export const completeRound = (gamecode, currentRound, currentHalf) => {
	return (dispatch) => {
		dispatch(requestCompleteRound())
		dbCompleteRound(gamecode, currentRound, currentHalf)
			.then(() => {
				dispatch(completeRoundSuccess())
			})
			.catch((error) => {
				dispatch(errorActionCreator('COMPLETE_ROUND_FAILURE', error.message))
			})
	}
}
