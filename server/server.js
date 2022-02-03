const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app)

const { v4: uuidv4 } = require('uuid')

const env = require('dotenv').config()

const mongo = require('mongodb')

const mongoURI = `mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@cluster0.h1arh.mongodb.net`

const client = new mongo.MongoClient(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
let collection = null

client.connect().then(() => {
  return client.db('Cluster0').collection('scores')
}).then(__collection => {
  console.log('Database connected!')
  collection = __collection
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/uuid', (req, res) => {
  res.send(uuidv4());
})

app.post('/chart', (req, res) => {
  console.log(req.query)
  let { data } = req.query
  collection.insertOne(data)
  res.sendStatus(200)
})

const listener = server.listen(process.env.PORT || 3001, () => {
  console.log('App is listening on port ' + listener.address().port);
});
