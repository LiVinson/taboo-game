class FireStoreErrorInfo {
	constructor(error, source, additionalInfo) {
		this.message = error.message
		this.name = error.name || 'No name provided'
		this.source = source || 'Function name not available'
        this.date = Date.now()
        this.additionalInfo = additionalInfo
	}
}

export default FireStoreErrorInfo