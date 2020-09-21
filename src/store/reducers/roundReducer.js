import { errorReducer } from './errorReducer'

const initState = {
	pending: false,
	error: null,
}

export const roundReducer = (state = initState, action) => {
	switch (action.type) {
		case 'REQUEST_ROUND_STATUS_UPDATE':
			return {
				...errorReducer(state, action),
				pending: true,
			}
		case 'ROUND_STATUS_UPDATE_SUCCESS':
		case 'ROUND_STATUS_UPDATE_FAILURE':
			return {
				...errorReducer(state, action),
				pending: false,
			}
		case 'REQUEST_COMPLETE_ROUND':
			return {
				...errorReducer(state, action),
				pending: true,
			}
		case 'COMPLETE_ROUND_SUCCESS':
		case 'COMPLETE_ROUND_FAILURE':
			return {
				...errorReducer(state, action),
				pending: false,
			}
		default:
			return state
	}
}
