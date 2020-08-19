import { dbUpdateRoundStatus, dbUpdateCardStatus } from 'utils/API'
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

export const updateRoundStatus = (gamecode, status) => {
	return (dispatch) => {
		dispatch(requestRoundStatus())
		console.log(gamecode)
		console.log(status)
		dbUpdateRoundStatus(gamecode, status)
			.then((res) => {
				// dbSetroundEndTime(gamecode)
				// .then(() => {
					console.log('dispatching success')
					dispatch(roundStatusSuccess(status))
					return
				// })
			})
			.catch((error) => {
				dispatch(errorActionCreator('ROUND_STATUS_UPDATE_FAILURE', error))
				return
			})
		//Update status in firebase
		//Update as success or failure
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
