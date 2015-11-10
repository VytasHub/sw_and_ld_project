// Import the fs module so that we can work with the file system.
var fs = require('fs');
// Import express to create and configure an HTTP server and routing.
var express = require('express');

// Connect to remote hosted couch instance
//var nano = require('nano')('http://redacted:5984');

// Connect to local couch instance
var nano = require('nano')('http://localhost:5984');

// Create a HTTP server app.
var app = express();

//test Data for initialisation
var data = [
  'Select Datasets.'
  , 'Combine Datasets.'
  , 'Send Peace and love.'
];

// When a user goes to /, return a dummy response.
app.get('/', function(req, res) {
  res.send('Project incoming prepare for launch in coming weeks!');
});


// test routing at data which returns dummy data as JSON
app.get('/data', function(req, res) {
    res.json(data);
});

// Select element from dummy array as indexed by parameterf
app.get('/data/:id', function(req, res) {
    res.json(data[req.params.id]);
});

//Holders

app.get('/galway/', function(req, res) {
  res.send('Will respond with all parking areas in galway!');
});

app.get('/galway/getParking', function(req, res) {
  res.send('Will return all car parks in Galway!');
});

app.get('/galway/getMeters', function(req, res) {
  res.send('Will return all on street parking in Galway!');
});

app.get('/galway/getBlueTicket', function(req, res) {
  res.send('Will return all special needs designated spaces in Galway!');
});

app.get('/galway/getAllButBlue', function(req, res) {
  res.send('All non special needs areas in galway!');
});


// Start the server.
var server = app.listen(8000);
console.log("Server running on port 8000. Check it out.");