class BaseError extends Error {
	constructor(status, message) {
		super()
		this.status = status
		this.message = message
	}
}

class BadRequestError extends BaseError {
	constructor(message) {
		super(400, message)
	}
}
class NotForundError extends BaseError {
	constructor(message) {
		super(400, message)
	}
}

module.exports = {
	BadRequestError,
	NotForundError
}