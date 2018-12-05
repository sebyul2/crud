'use strict'

const express = require('express')
const wrap = require('express-async-wrap')
const mongoose = require('mongoose')
const config = require('config')
const mongooseTimestamp = require('mongoose-timestamp')
const app = express()

// api
app.use('/', wrap(async (req, res) => {
    res.send('hello world')
}))

// monngoDB 접속 & server listening 
mongoose.Promise = global.Promise
mongoose.plugin(mongooseTimestamp, {
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})

const { user, pass, host, name } = config.db
const url = `mongodb://${user}:${pass}@${host}/${name}?authSource=admin`
const options = { useNewUrlParser: true }

mongoose.connect(url, options).then(client => {
    console.log('mongoDB connection successful')
    const server = app.listen(8080, () => {
        console.log('Express server listening on port ' + server.address().port)
    })
})
