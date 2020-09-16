import { errorReducer } from './errorReducer'

const initState = {
	pending: false,
	error: null,
}

export const cardsReducer = (state = initState, action) => {
	console.log(action.type)
	switch (action.type) {
		case 'REQUEST_UPDATE_CARD_STATUS':
			console.log('REQUEST_UPDATE_CARD_STATUS')
			return {
				...errorReducer(state, action),
				pending: true,
			}
		case 'UPDATE_CARD_STATUS_SUCCESS':
		case 'UPDATE_CARD_STATUS_FAILURE':
			return {
				...errorReducer(state, action),
				pending: false,
			}
		case 'REQUEST_SUBMIT_CARD_IDEA':
			return {
				...errorReducer(state, action),
				pending: true,
			}
		case 'SUBMIT_CARD_IDEA_SUCCESS':
		case 'SUBMIT_CARD_IDEA_FAILURE':
			return {
				...errorReducer(state, action),
				pending: false,
			}
		default:
			return state
	}
}
