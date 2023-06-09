const {disablePoweredBy} = require('./disablePoweredBy')

const helmet = require('helmet')
const rateLimiter = require('express-rate-limit')
const slowDown = require('express-slow-down')
const cors = require('cors')

function secure(app) {
	app.use(disablePoweredBy)

	app.use(
		cors({
			origin: ["https://example.ru", "http://localhost:3000"]
		})
	)

	app.use(
		helmet({
			contentSecurityPolicy: {
				useDefaults: true,
				directives: {
					scriptSrc: [
						"'self'",
						"'unsafe-inline'",
						"https://cdn.jsdelivr.net",
						"https://code.jquery.com"
					]
				}
			}
		})
	)
	
	const limiter = rateLimiter({
		windowMs: 1 * 60 * 1000,
		max: 120
	})

	const speedLimiter = slowDown({
		windowMs: 1 * 60 * 1000,
		delayAfter: 100,
		delayMs: 1000
	})

	app.use(speedLimiter)
	app.use(limiter)
}

module.exports = {
	secure
}