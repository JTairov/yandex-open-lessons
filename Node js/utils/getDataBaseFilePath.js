const path = require('path')

function getDataBaseFilePath() {
	const linksDevFilePath = path.resolve(__dirname, "../db/links.dev.json")
	const linksProdFilePath = path.resolve(__dirname, "../db/links.prod.json")

	return process.env.LINKS_TYPE === "prod" ? linksProdFilePath : linksDevFilePath
}

module.exports = {
	getDataBaseFilePath
}