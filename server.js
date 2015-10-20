// Import the fs module so that we can work with the file system.
var fs = require('fs');
// Import express to create and configure an HTTP server and routing.
var express = require('express');

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


// Start the server.
var server = app.listen(8000);