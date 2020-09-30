class FireStoreErrorInfo {
	constructor(error, source) {
		this.message = error.message
		this.name = error.name || 'No name provided'
		this.source = source || 'Function name not available'
		this.date = Date.now()
	}
}

export default FireStoreErrorInfo