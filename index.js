'use strict'

const express = require('express')
const wrap = require('express-async-wrap')
const mongoose = require('mongoose')
const config = require('config')
const bodyParser = require('body-parser')
const mongooseTimestamp = require('mongoose-timestamp')
const cors = require('cors')
const userModel = require('./model/user-model')
const customerModel = require('./model/customer-model')
const noteModel = require('./model/note-model')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

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
    console.log(req.body)
    const { name, email, phone, password } = req.body
    const data = {
        name, email, phone, password
    }
    const user = await userModel.create(data)
    console.log(user)
    res.json(user)
}))

app.get('/user', wrap(async (req, res) => {
    const user = await userModel.find()
    res.json(user)
}))

app.post('/user', wrap(async (req, res) => {
    const { id, name, email, phone, password } = req.body

    console.log(req.body)

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

//=================  note  =======================
app.put('/note', wrap(async (req, res) => {
    const { title, content } = req.body
    const data = {
        title, content
    }
    const note = await noteModel.create(data)
    res.json(note)
}))

app.get('/note', wrap(async (req, res) => {
    const note = await noteModel.find()
    res.json(note)
}))

app.post('/note', wrap(async (req, res) => {
    const { id, title, content } = req.body
    let data = {}
    if (title) data.title = title
    if (content) data.content = content
    // findOneAndUpdate 형식
    // findOneAndUpdate(검색조건, 수정할 data, 옵션)
    const note = await noteModel.findOneAndUpdate(
        { _id: id },
        data,
        { upsert: true, new: true }
    )
    res.json(note)
}))

app.delete('/note', wrap(async (req, res) => {
    const { id } = req.query
    const note = await noteModel.deleteOne({ _id: id })
    // _id : mongoDB의 자동 생성 아이디
    // id : 사용자가 클라이언트에서 입력한 값 테스트시 id 사용
    res.json(note)
}))

//모슨 삭제
app.delete('/note/all', wrap(async (req, res) => {
    const note = await noteModel.deleteMany()
    res.json(note)
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
