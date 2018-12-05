'use strict'

const mongoose = require('mongoose')
const collectionName = 'note'

let noteSchema = new mongoose.Schema({
  title: {type : String, required: true},
  content: {type : String, required: true},
  date: {type: Date, default: Date.now }
}, {
  collection: collectionName
})

module.exports = mongoose.model('note', noteSchema)