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
		//set the status of the current card in firebase, and update the index
		//dispatch changing card complete
		dispatch(requestUpdateCardStatus())
		dbUpdateCardStatus(gamecode, status, currentIndex, round, half, roundStatus)
			.then(() => {
				dispatch(updateCardStatusSuccess())
			})
			.catch((error) => {
				console.log(error.message)
				const errorMessage = `There was a problem updating card ${currentIndex}. Please try again.`
				dispatch(errorActionCreator('UPDATE_CARD_STATUS_FAILURE', errorMessage))
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
					const errorMessage = 'There was a problem submitting your idea. Please try again.'
					dispatch(errorActionCreator('SUBMIT_CARD_IDEA_FAILURE', errorMessage))
				})
		})
	}
}
