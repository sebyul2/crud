'use strict'

const express = require('express')
const wrap = require('express-async-wrap')
const mongoose = require('mongoose')
const config = require('config')
const bodyParser = require('body-parser')
const mongooseTimestamp = require('mongoose-timestamp')
const userModel = require('./model/user-model')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// api
app.use('/', wrap(async (req, res) => {
    res.send('hello world')
}))

app.put('/user', wrap(async (req, res) => {
    // req : request(요청) 클라이언트가 보내는 요청 데이터

    // const name = req.body.name
    // const email = req.body.email
    // const phone = req.body.phone
    // const password = req.body.password
    const { name, email, phone, password } = req.body

    const data = {
        name, email, phone, password
    }
    const user = await userModel.create(data)
    res.json(user)
}))

app.get('/user', wrap(async (req, res) => {
    
}))

app.post('/user', wrap(async (req, res) => {
    
}))

app.delete('/user', wrap(async (req, res) => {
    
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
