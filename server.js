// Load modules

// couch database to connect to an sysnc
// MUST EXIST!!!
var url = 'http://localhost:5984/galway';

// Pouch will communicate with the local couchdb
var PouchDB = require('pouchdb');

// Express middleware
var express = require('express');


// extra modules
var request = require('request'), querystring = require('querystring');
var bodyParser = require('body-parser');

var app = express();
// Connect pouch to running instance of couch
var db = new PouchDB(url);

// body parser for json posts
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies

// test functions for console

db.info().then(function (info) {
  console.log(info);
})

// end console tests


//////////////////////////// Test ?????????????????
var database = "galway";


////////////////////////////  Start routes ///////////////////////


// >>>>>>>>>>>>>>>>>>>>>>>>  Get Methods >>>>>>>>>>>>>>>>>>>>>>>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// All docs
// Root will return all docs as json
app.get('/', function(req, res) {


       res.send(database);
});

// galway will return all docs as json
app.get('/galway', function(req, res) {


       db.allDocs({
               include_docs: true,
               descending: false,
       }, function(err, doc) {
               res.send(err || doc)

       });
});

// galway get will return all docs as json
app.get('/galway/get/', function(req, res) {


       db.allDocs({
               include_docs: true,
               descending: false,
       }, function(err, doc) {
               res.send(err || doc)

       });
});

// galway get all will return all docs as json
app.get('/galway/get/all', function(req, res) {


       db.allDocs({
               include_docs: true,
               descending: false,
       }, function(err, doc) {
               res.send(err || doc)

       });
});

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Only Car Parks of specific type
// Using couchDb views to return a view matching the type specified
// Example http://localhost:port/galway/get/display returns a JSON array of
// all carparking areas that are pay & display


// Returns JSON list of metered parking (P&D)
app.get('/galway/get/display', function(req,res){
    //use view to emit matching type
    db.query(function (doc) {
  emit(doc.type, doc);
}, {key: 'meter'}).then(function (result) {
  // found docs with doc.type === 'meter'
        res.send(result);
});
});

// Returns JSON list of carparks
app.get('/galway/get/carparks', function(req,res){
    //use view to emit matching type
    db.query(function (doc) {
  emit(doc.type, doc);
}, {key: 'carparks'}).then(function (result) {
  // found docs of doc.type === 'carparks'
        res.send(result);
});
});

// Returns JSON list of blue ticket parking (Speclial needs)
app.get('/galway/get/blue', function(req,res){
    //use view to emit matching type
    db.query(function (doc) {
  emit(doc.type, doc);
}, {key: 'blue'}).then(function (result) {
  // found docs with doc.type === 'blue'
        res.send(result);
});
});



// ++++++++++++++++++++++++++++++++++++++++++ Posts ++++++++++++++++++++++++++++++++++++++++++++++++++++++
// All posts to be sent json data with type = meter || carparks || blue
// All posts must contain a properties, this may be empty to facilitate cahnging in future.
// Example { "type" : "blue", "properties" : { "name"="my new thing"} }}



// Post a new meter (json in json out)
// Must be formated as type = meter and contain properties
app.post('/galway/post/carpark',function(req,res){
    carpark = req.body;
if (carpark.type == "carparks" && carpark.type.properties){
    var carpark=req.body;
    console.log(carpark);
    db.post(carpark);

    res.json(carpark);
    res.end();



}



});


// Post a new meter (json in json out)
// Must be formated as type = meter and contain properties
app.post('/galway/post/blue',function(req,res){
    carpark = req.body;
if (carpark.type == "blue" && carpark.type.properties){
    var blue=req.body;
    console.log(blue);
    db.post(blue);

    res.json(blue);
    res.end();



}



});

// Post a new meter (json in json out)
// Must be formated as type = meter and contain properties
app.post('/galway/post/meter',function(req,res){
    carpark = req.body;
if (carpark.type == "meter" && carpark.type.properties){
    var meter=req.body;
    console.log(meter);
    db.post(meter);

    res.json(meter);
    res.end();



}



});

////////////// Delete ////////////////////////////////////////////////

// Delete a document
// Give the doc id to be deleted


app.delete("/del/:doc_id", function(req, res){
    doc_id = req.params.doc_id;
    db.get(doc_id).then(function(doc){
        //get id and rev
        docid = doc.id;
        rev = doc.rev;
        // call couch db remove on found elements
        return db.remove(doc._id, doc._rev);

                        }).then(function(result){
    console.log(result);
    }).catch(function(err) {
             console.log(err);
             });//end promises
});






// Start the server on port 8000
var server = app.listen(8000);
console.log("API parking service running on port: 8000");
