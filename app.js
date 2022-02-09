// Requiring module
var express = require('express');

 
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
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index1.html");
   });

 app.post("/getresults", (req, res) => {
    var myData = new User(req.body);
    myData.save()
    .then(item => {
    res.send("item saved to database");
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
   });

   
 app.use("/", (req, res) => {
     res.sendFile(__dirname + "/BarChart.html");    
   });

   app.listen(PORT, () => {
    console.log("Server listening on port " + PORT);
   });


   