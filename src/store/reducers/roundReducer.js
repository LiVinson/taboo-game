import { errorReducer } from './errorReducer'

const initState = {
	pending: false,
	error: null,
	status: 'preround',
}

export const roundReducer = (state = initState, action) => {
	switch (action.type) {
		case 'REQUEST_ROUND_STATUS_UPDATE':
			return {
				...errorReducer(state, action),
				pending: true,
			}
		case 'ROUND_STATUS_UPDATE_SUCCESS':
			return {
				...errorReducer(state, action),
				status: action.payload.status,
				pending: false,
			}
		case 'ROUND_STATUS_UPDATE_FAILURE':
			return {
				...errorReducer(state, action),
				pending: false,
			}
		case 'REQUEST_UPDATE_CARD_STATUS':
			console.log('REQUEST_UPDATE_CARD_STATUS')

			return {
				...errorReducer(state, action),
				pending: true,
			}
		case 'UPDATE_CARD_STATUS_SUCCESS':
			console.log('UPDATE_CARD_STATUS_SUCCESS')
			return {
				...errorReducer(state, action),
				pending: false,
			}
		case 'UPDATE_CARD_STATUS_FAILURE':
			console.log('UPDATE_CARD_STATUS_FAILURE')
			return {
				...errorReducer(state, action),
				pending: false,
			}
		default:
			return state
	}
}
