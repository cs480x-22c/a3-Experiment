// Requiring module
var express = require('express');
const path = require('path');
const router = express.Router();
 
// Creating express object
var app = express();
 
// Port Number
var PORT = process.env.PORT ||3000;


var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;mongoose.connect("mongodb://localhost:27017/node-demo");

var nameSchema = new mongoose.Schema({
    id: Number,
    input: Number,
    value: Number,
    type: String
});

var User = mongoose.model("User", nameSchema);

// Server Setup
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/index1.html"));
   });

 app.post("/addResults", (req, res) => {
    var myData = new User(req.body);
    myData.save()
    .then(item => {
        res.send("data saved"); 
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
   });

   router.get("/bc", (req, res) => {
    res.sendFile(path.join(__dirname + "/BarChart.html"));
   });

   router.get("/pg", (req, res) => {
    res.sendFile(path.join(__dirname + "/PieGraph.html"));
   });


   router.get('/results', function(req, res) {
    res.sendFile(path.join(__dirname, '/results.html'));
  });
  
   
  app.use('/', router);

   app.listen(PORT, () => {
    console.log("Server listening on port " + PORT);
   });


   