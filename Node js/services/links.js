const path = require('path')
const { threadId } = require('worker_threads')
const { BadRequestError } = require('../modules/error')
const fs = require('fs').promises

const linksDevFilePath = path.resolve(__dirname, "../db/links.dev.json")
const linksProdFilePath = path.resolve(__dirname, "../db/links.prod.json")

const linksFilePath = process.env.LINKS_TYPE === "prod" ? linksProdFilePath : linksDevFilePath

async function getByAlias(alias) {
	const links = require(linksFilePath)
	return links[alias]
}

async function addAlias(alias, link) {
	const links = require(linksFilePath)

	if (links[alias]) {
		throw new BadRequestError('alias-already-exists')
	}

	links[alias] = link

	await fs.writeFile(linksFilePath, JSON.stringify(links, null, 2), "utf-8")

	return links[alias]
}

module.exports = {
	getByAlias,
	addAlias
}