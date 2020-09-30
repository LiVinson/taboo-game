class CustomError extends Error {
	constructor(params) {
		// Pass remaining arguments (including vendor specific ones) to parent constructor
		super(params)

		// Maintains proper stack trace for where our error was thrown (only available on V8)
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, CustomError)
		}

		this.name = 'CustomError'
		// Custom debugging information
	}
}

export default CustomError
