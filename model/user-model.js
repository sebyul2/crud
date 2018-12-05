'use strict'

const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);
const collectionName = 'user'

let userSchema = new mongoose.Schema({
  email: {type : String, required: true},
  sequence: {type : Number, default: 0},
}, {
  collection: collectionName
})

module.exports = mongoose.model('user', userSchema)