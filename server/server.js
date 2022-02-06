const express = require('express')
const bodyParser = require('body-parser')
const http = require('http')
const app = express()

app.use(bodyParser.json())
const server = http.createServer(app)

const { v4: uuidv4 } = require('uuid')

const env = require('dotenv').config()

const mongo = require('mongodb')

const mongoURI = `mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@cluster0.h1arh.mongodb.net/Cluster0?retryWrites=true&w=majority`
console.log('MongoDB URI:', mongoURI)

const client = new mongo.MongoClient(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
let collection = null

client.connect().then(() => {
  return client.db('scores').collection('scores')
}).then(__collection => {
  console.log('Database connected!')
  collection = __collection
})

function getCollection() {
  if (collection === null) {
    console.err('Collection is null!')
  }
  return collection
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/uuid', (req, res) => {
  res.send(uuidv4());
})

app.post('/chart', async (req, res) => {
  let data = req.body
  await getCollection().insertOne(data, (err, result) => {
    if (err) {
      console.err(err)
    } else {
      console.log(result)
    }
  })
  res.sendStatus(200)
})

app.get('/results', async (req, res) => {
  let types = ['bar', 'pie', 'sbar']
  let data = {}

  types.forEach(type => {
    data[type] = new Array()
  })

  queries = types.map(type => {
    return getCollection().find({chart: type}, {value: 1})
  })

  await Promise.all(queries).then(async (values) => {
    await Promise.all(values.map(async (value) => {
      const push = async () => {
        let hasNext = await value.hasNext()
        while(hasNext) {
          let score = await value.next()
          type = score.chart
          data[type].push(score.value)

          hasNext = await value.hasNext()
        }
      }
      await push()
    }))
  })
  res.send(data)
})

const listener = server.listen(process.env.PORT || 3001, () => {
  console.log('App is listening on port ' + listener.address().port);
});
