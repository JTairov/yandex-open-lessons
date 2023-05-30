const path = require('path')
const { compressFile } = require('./compressFile')
const { getDataBaseFilePath } = require('./getDataBaseFilePath')

const linksFilePath = getDataBaseFilePath()

function dumpDataBase() {
	setInterval(() => {
		compressFile(linksFilePath, path.resolve("./db", "./dumps"), "db-dump.json")

		console.log("Database dump was created.")
	}, 10000)
}

module.exports = {
	dumpDataBase
}