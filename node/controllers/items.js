const { query } = require('express')
const Item = require('../models/item.js')

exports.create_item = (req, res) => {
  const {img_name,ng_prob,groundtruth} = req.body || req.query

  if(!img_name || !ng_prob || !groundtruth) {
    return res.status(400).send(`Missing name or description`)
  }
  const new_item = new Item({img_name,ng_prob,groundtruth})
  new_item.save()
  .then((result) => {
    console.log(`[Mongoose] New item inserted`)
    res.send(result)
  })
  .catch(error => {
    console.log(error)
    res.status(500).send('Error')
  })
}


exports.read_item = (req, res) => {
  
  // const {item_id} = req.params
  // if(!item_id) return res.status(400).send(`Item ID not defined`)
  // Item.findById(item_id)
  // Item.find({})
  // .then(item => {
  //   console.log(`[Mongoose] Item ${keyword} queried`)
  //   res.send(item)
  // })
  // .catch(error => {
  //   console.log(error)
  //   res.status(500).send(error)
  // })
}

exports.read_item_by_keyword = (req, res) => {
  
  const {keyword} = req.params
  if(!keyword) return res.status(400).send(`keyword not defined`)
  console.log(req.params)

  const query = { $or: [{ title : {$regex: keyword , $options: 'i'} },
                        { auther : {$regex: keyword , $options: 'i'} },
                        {category : {$regex: keyword , $options: 'i'} }]
                } // like文，大文字小文字区別なし

  Item.find(query)
  .then(item => {
    console.log(`[Mongoose] Item ${keyword} queried`)
    res.send(item)
  })
  .catch(error => {
    console.log(error)
    res.status(500).send(error)
  })
}

exports.update_item = (req, res) => {
  const {item_id} = req.params
  console.log(item_id, req.body)
  if(!item_id) return res.status(400).send(`Item ID not defined`)

  const new_properties = req.body
  console.log(req.body)

  Item.updateOne({_id: item_id}, new_properties)
  .then((result) => {
    console.log(`[Mongoose] Item ${item_id} updated`)
    res.send(result)
  })
  .catch(error => {
    console.log(error)
    res.status(500).send(error)
  })
}

exports.delete_item = (req, res) => {
  const {item_id} = req.params
  if(!item_id) return res.status(400).send(`Item ID not defined`)

  Item.deleteOne({_id: item_id})
  .then(() => {
    console.log(`[Mongoose] Item ${item_id} deleted`)
    res.send('OK')
  })
  .catch(error => {
    console.log(error)
    res.status(500).send(error)
  })
}

exports.read_all_items = (req, res) => {
  Item.find({})
  .then(items => {
    console.log(`[Mongoose] Items queried`)
    res.send(items)
  })
  .catch(error => {
    console.log(error)
    res.status(500).send(error)
  })
}
