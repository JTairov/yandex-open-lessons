const fs = require('fs')
const path = require('path')
const zlib = require('zlib')

function compressFile(
	inputFilePath,
	outputFolder,
	resultFileName
) {
	return new Promise((resolve, reject) => {
		const stream = fs.createReadStream(inputFilePath)

		stream
			.pipe(zlib.createGzip())
			.pipe(
				fs.createWriteStream(path.resolve(outputFolder, `${Date.now()}_${resultFileName}.gz`), {flags: 'a'})
			)
			.on('finish', resolve)
			.on('error', reject)
	})
}

module.exports = {
	compressFile
}