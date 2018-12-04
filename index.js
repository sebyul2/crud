const express = require('express')
const app = express()

app.use('/', (req, res) => {
    res.send('hello world')
})

const server = app.listen(8080, () => {
    console.log('Express server listening on port ' + server.address().port)
})