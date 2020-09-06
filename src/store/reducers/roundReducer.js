import { errorReducer } from './errorReducer'

const initState = {
	pending: false,
	error: null,
	pendingMsg: null,
}

export const roundReducer = (state = initState, action) => {
	switch (action.type) {
		case 'REQUEST_ROUND_STATUS_UPDATE':
			console.log('REQUEST_ROUND_STATUS_UPDATE')
			return {
				...errorReducer(state, action),
				pending: true,
			}
		case 'ROUND_STATUS_UPDATE_SUCCESS':
			console.log('REQUEST_ROUND_STATUS_SUCCESS')
			return {
				...errorReducer(state, action),
				status: action.payload.status,
				pending: false,
				pendingMsg: null,
			}
		case 'ROUND_STATUS_UPDATE_FAILURE':
			console.log('REQUEST_ROUND_STATUS_FAILURE')
			return {
				...errorReducer(state, action),
				pending: false,
				pendingMsg: null,
			}
		case 'REQUEST_UPDATE_CARD_STATUS':
			return {
				...errorReducer(state, action),
				pending: true,
			}
		case 'UPDATE_CARD_STATUS_SUCCESS':
			return {
				...errorReducer(state, action),
				pending: false,
				pendingMsg: null,
			}
		case 'UPDATE_CARD_STATUS_FAILURE':
			return {
				...errorReducer(state, action),
				pending: false,
				pendingMsg: null,
			}
		case 'REQUEST_COMPLETE_ROUND':
			console.log(action.payload.pendingMsg)
			return {
				...errorReducer(state, action),
				pending: true,
				pendingMsg: action.payload.pendingMsg,
			}
		case "COMPLETE_ROUND_SUCCESS":
			return {
				...errorReducer(state, action),
				pending: false,
				pendingMsg: null,
			}
		// case 'REQUEST_UPDATE_SCORE':
		// 	console.log("reducer case for  request update score")
		// 	return {
		// 		...errorReducer(state, action),
		// 		pending: true,
		// 	}
		// case 'UPDATE_SCORE_SUCCESS':
		// 	return {
		// 		...errorReducer(state, action),
		// 		pending: false,
		// 	}
		// case 'UPDATE_SCORE_FAILURE':
		// 	return {
		// 		...errorReducer(state, action),
		// 		pending: false,
		// 	}
		// case 'REQUEST_UPDATE_ROUND_HALF':
		// 	return {
		// 		...errorReducer(state, action),
		// 		pending: true,
		// 	}
		// case 'UPDATE_ROUND_HALF_SUCCESS':
		// 	return {
		// 		...errorReducer(state, action),
		// 		pending: false,
		// 	}
		// case 'UPDATE_ROUND_HALF_FAILURE':
		// 	return {
		// 		...errorReducer(state, action),
		// 		pending: false,
		// 	}
		// case 'REQUEST_UPDATE_ROUND_NUMBER':
		// 	return {
		// 		...errorReducer(state, action),
		// 		pending: true,
		// 	}
		// case 'UPDATE_ROUND_NUMBER_SUCCESS':
		// 	return {
		// 		...errorReducer(state, action),
		// 		pending: false,
		// 	}
		// case 'UPDATE_ROUND_NUMBER_FAILURE':
		// 	return {
		// 		...errorReducer(state, action),
		// 		pending: false,
		// 	}
		default:
			return state
	}
}
