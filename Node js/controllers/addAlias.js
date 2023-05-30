const links = require('../services/links')

async function addAlias(request, response) {
	try {
		const { alias, link } = request.body

		await links.addAlias(alias, link)

		return response.send({ status: 'success' })
	} catch (error) {
		next(error)
	}
}

module.exports = {
	addAlias
}