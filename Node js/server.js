const express = require('express')

const { urlLogger } = require('./middleware/urlLogger')
const { notFound } = require('./middleware/notFound')
const { errorHandler } = require('./middleware/errorHandler')
const { resolveAlias } = require('./controllers/resolveAlias')
const { ping } = require('./middleware/ping')
const { addAlias } = require('./controllers/addAlias')
const { accessLogs } = require('./middleware/accessLogs')
const { dumpDataBase } = require('./utils/dumpDataBase')

const app = express()

app.use(express.json())

app.use(accessLogs())
app.use(accessLogs(true))

app.get("/ping", ping)
app.get("/:alias", resolveAlias)
app.post("/alias", addAlias)

app.use(notFound)

app.use(errorHandler)
	
const PORT = 3000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

dumpDataBase()