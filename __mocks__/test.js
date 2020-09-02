// const moment = require.requireActual('moment')

// // By default, the isBefore function will always return true
// let isBefore = true
// moment.fn.isBefore = () => {
// 	console.log('before')
// 	return true
// }

// // This function is added to moment's prototype in order for our tests to
// // change moment's isBefore behaviour
// moment.fn.__isBefore = (value) => {
// 	console.log('before 2 ')
// 	console.log(value)
// 	isBefore = true
// }

// This resets the isBefore behaviour back to default
moment.fn.__reset = () => {
	moment.fn.isBefore = () => true
}

export default moment
