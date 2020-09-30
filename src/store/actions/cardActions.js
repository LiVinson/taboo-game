import { errorActionCreator } from './errorActions'
import { dbUpdateCardStatus, dbSubmitCardIdea } from 'utils/API'

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

const requestSubmitCardIdea = () => {
	return {
		type: 'REQUEST_SUBMIT_CARD_IDEA',
	}
}

const submitCardIdeaSuccess = () => {
	return {
		type: 'SUBMIT_CARD_IDEA_SUCCESS',
	}
}
export const changeCardStatus = (gamecode, status, currentIndex, round, half, roundStatus) => {
	return (dispatch) => {
		//dispatch changing card in progress
		//set the status of the current card in firebase, and update the index or update field to indicate all cards played
		//dispatch changing card complete
		dispatch(requestUpdateCardStatus())
		dbUpdateCardStatus(gamecode, status, currentIndex, round, half, roundStatus)
			.then(() => {
				dispatch(updateCardStatusSuccess())
			})
			.catch((error) => {
				dispatch(errorActionCreator('UPDATE_CARD_STATUS_FAILURE', error.message))
			})
	}
}

export const submitCardIdea = (cardIdea) => {

	return (dispatch) => {
		return new Promise((resolve, reject) => {
			dispatch(requestSubmitCardIdea())

			return dbSubmitCardIdea(cardIdea)
				.then(() => {
					dispatch(submitCardIdeaSuccess())
					resolve(true)
				})
				.catch((error) => {
					dispatch(errorActionCreator('SUBMIT_CARD_IDEA_FAILURE', error.message))
				})
		})
	}
}
