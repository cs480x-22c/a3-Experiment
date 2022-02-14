// Requiring module
var express = require('express');
const path = require('path');
require("dotenv").config(); 
const router = express.Router();

console.log('directory-name: ', __dirname);

// Creating express object
var app = express();
 
// Port Number
var PORT = process.env.PORT ||3000;

app.use(express.static(__dirname));

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const password = process.env.DB_PASSWORD
var conn = mongoose.connect('mongodb+srv://lsg:troop3398@cluster0.4gwej.mongodb.net/trial',
(err)=>{
if(err) throw err;

console.log('DB Connected Successfully');
})

var schema = new Schema({
    input: Number,
    actual: Number,
    type: String
});

var trialData = mongoose.model("trialData", schema);

// Server Setup
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/index1.html"));
   });

   router.get("/bc", (req, res) => {
    res.sendFile(path.join(__dirname, "/BarChart.html"));
   });

   router.get("/pie", (req, res) => {
    res.sendFile(path.join(__dirname, "/PieGraph.html"));
     });

     router.get("/bb", (req, res) => {
        res.sendFile(path.join(__dirname, "/Bubble.html"));
         });


   router.get('/results', function(req, res) {
    res.sendFile(path.join(__dirname, '/results.html'));
  });
  
  app.post('/addResults', function (req, res) {  
      var inp = req.body.inputs;
      var per = req.body.percent;
      var chart = req.body.bc;
    const doc = new trialData(
    {   input: inp,
        actual: per,
        type: chart,
    });
    console.log(doc);
    console.log(doc.input);
    console.log(doc.actual);
    doc.save()
    });

   
  app.use('/', router);

   app.listen(PORT, () => {
    console.log("Server listening on port " + PORT);
   });


   