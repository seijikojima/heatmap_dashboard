const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
  img_name: String,
  ng_prob: Number,
  groundtruth: Number
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item
