import { errorActionCreator } from './errorActions'
import { dbUpdateCardStatus } from 'utils/API'

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
				console.log(error.message)
				const errorMessage = `There was a problem updating card ${currentIndex}. Please try again.`
				dispatch(errorActionCreator('UPDATE_CARD_STATUS_FAILURE', errorMessage))
			})
	}
}