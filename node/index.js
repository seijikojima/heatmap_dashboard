const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const item_router = require('./routes/items.js')

dotenv.config()

// Mongoose connection
const mongoose_options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}
mongoose.connect(process.env.MONGODB_URL, mongoose_options)

const db = mongoose.connection
db.on('error', console.error.bind(console, '[Mongoose] connection error:'))
db.once('open', () => { console.log('[Mongoose] Connected') })

const APP_PORT = process.env.APP_PORT || 80

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Mongoose CRUD REST API')
})

app.use('/items', item_router)


app.listen(APP_PORT, () => {
  console.log(`App listening on ${APP_PORT}`)
})