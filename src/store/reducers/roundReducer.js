import { errorReducer } from './errorReducer'

const initState = {
	pending: false,
	error: null,
	status: 'new',
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
		default:
			return state
	}
}
