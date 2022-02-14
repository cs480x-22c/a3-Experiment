// Requiring module
var express = require('express');
var fs = require('fs');
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

// Server Setup
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/index.html"));
   });

   router.get("/BarChart", (req, res) => {
    res.sendFile(path.join(__dirname, "/BarChart.html"));
   });

   router.get("/PieGraph", (req, res) => {
    res.sendFile(path.join(__dirname, "/PieGraph.html"));
     });

     router.get("/Bubble", (req, res) => {
        res.sendFile(path.join(__dirname, "/Bubble.html"));
         });


   router.get('/results', function(req, res) {
    res.sendFile(path.join(__dirname, '/results.html'));
  });
  
  app.post('/addResults', function (req, res) {  
    var inp = req.body.inputs;
    var per = req.body.percent;
    var chart = req.body.bc;
    var doc = [inp, per ,chart];
    fs.appendFile('data.json', JSON.stringify(doc), (err) => {  
      // Catch this!
      if (err) throw err;
  
      console.log(doc)
  });
});

   
  app.use('/', router);

   app.listen(PORT, () => {
    console.log("Server listening on port " + PORT);
   });


   