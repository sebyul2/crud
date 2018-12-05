'use strict'

const express = require('express')
const wrap = require('express-async-wrap')
const mongoose = require('mongoose')
const config = require('config')
const bodyParser = require('body-parser')
const mongooseTimestamp = require('mongoose-timestamp')
const userModel = require('./model/user-model')
const customerModel = require('./model/customer-model')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// api
//===================  user  =========================
app.put('/user', wrap(async (req, res) => {
    // req : request(요청) 클라이언트가 보내는 요청 데이터

    // 중복체크하는 로직은 향후 업데이트 해야함!!!!!!!!!!!!!!!!!
    // 에러처리하는 부분도 향후 업데이트 해야함!!!!!!!!!!!!!!!!!
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
    const user = await userModel.find()
    res.json(user)
}))

app.post('/user', wrap(async (req, res) => {
    const { id, name, email, phone, password } = req.body
    let data = {}
    if (name) data.name = name
    if (email) data.email = email
    if (phone) data.phone = phone
    if (password) data.password = passowrd 
    // findOneAndUpdate 형식
    // findOneAndUpdate(검색조건, 수정할 data, 옵션)
    const user = await userModel.findOneAndUpdate(
        { _id: id },
        data,
        { upsert: true, new: true }
    )
    res.json(user)
}))

app.delete('/user', wrap(async (req, res) => {
    const { id } = req.query
    const user = await userModel.deleteOne({ _id: id })
    // _id : mongoDB의 자동 생성 아이디
    // id : 사용자가 클라이언트에서 입력한 값 테스트시 id 사용
    res.json(user)
}))

//=================  customer  =======================
app.put('/customer', wrap(async (req, res) => {
    const { company, name, email, phone } = req.body
    const data = {
        name, email, phone, company
    }
    const customer = await customerModel.create(data)
    res.json(customer)
}))

app.get('/customer', wrap(async (req, res) => {
    const customer = await customerModel.find()
    res.json(customer)
}))

app.post('/customer', wrap(async (req, res) => {
    const { id, name, email, phone, company } = req.body
    let data = {}
    if (name) data.name = name
    if (email) data.email = email
    if (phone) data.phone = phone
    if (company) data.company = company 
    // findOneAndUpdate 형식
    // findOneAndUpdate(검색조건, 수정할 data, 옵션)
    const customer = await customerModel.findOneAndUpdate(
        { _id: id },
        data,
        { upsert: true, new: true }
    )
    res.json(customer)
}))

app.delete('/customer', wrap(async (req, res) => {
    const { id } = req.query
    const customer = await customerModel.deleteOne({ _id: id })
    // _id : mongoDB의 자동 생성 아이디
    // id : 사용자가 클라이언트에서 입력한 값 테스트시 id 사용
    res.json(customer)
}))

//테스트용
// app.use('/', wrap(async (req, res) => {
//     res.send('hello world')
// }))

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
