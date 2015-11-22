# Semantic Web & Linked Data Project

## Parking in Galway
### Garrett Jordan

## Overview

Provide an API to combine data from Galway City Council on car parks in Galway City, Parking Meters in Galway City and Blue Badge parking spots in Galway City. As car parks and parking areas are subject to change the API will allow not only the querying of existing data but also the addition of new data and the deletion of obsolete data. The API calls will reflect the HTTP verbs used and will be self describing. The project is to be developed in such a way that the addition of other towns/areas does not break the existing API and can be achieved by adding another route eg URL/galway/ and URL/athlone/ etc.
Each region should expose the same API which in turn is accessed by our external API. This layered approach will allow for different data storage and data structures for each region if required. Such variation will be encapsulated and transparent to both the external API and the user.

## Entry Points/Routes
### Proposed routes and entry points
Route | Description
---------|------------
 / | Intended to return list of implemented areas in lower case, for the scope of this project galway.
 /galway/ | Returns ALL parking from all 3 data sets
 /galway/get/ | Returns same as above.
 /galway/get/all/ | Returns same as above (more descriptive).
 /galway/get/blue/ | Returns list of blue ticket (special needs) parking spots only.
 /galway/get/display/ | Returns a list of all pay and display parking spots.
 /galway/get/carparks/ | Returns a list of car parks.
 /galway/get/park/{id} | Returns a single car park with id == id
 /galway/post/carpark/ | Add a car park.
 /galway/post/blue/ | Add a special needs parking space.
 /galway/post/meter/ | Add pay and display parking area.
 /galway/del/{param} | Delete the parking area designated by given parameter.


I intend to use update as the exposed verb to avoid confusion between put and post but intend to use put as the actual HTTP verb. All lists returned will be in JSON format. These routes maybe subject to change.

## Technologies
### Software

It is my intention to use node.js (Node) and express.js (Express) to create a public API that can be queried externally and three internal APIs that query the individual data sets. Node and Express are used as they are free and open source, light-weight and effecient. The internal APIs are to be queried through the external API. Any additional modules outside those provided by Node and Express will be documented here if required. All module will be loaded through the Node Package Manager (npm) which is a collection of open source libraries.

Following testing it was found to be preferable to add the three datasets to the same database and use a type value in the data to differentiate the documents. This allowed for a single api end point.

Future use will require a database for each region used which would be more manageable.

### Initial thoughts on database to use

I think that this project is suited to a Couchbase&trade; database due to its native, be it limited, support for geojson. This may change if another database is more suited to the task. More then one database may be used going forward, depending on the suitability of other regions data.

After testing opting to use CouchDB (See testing section below - 4th November).
Pouchdb used to connect to local/remote couch instance.



## Data Used
### Datasets, Attribution & Licencing

The initial seed data for the project is contained in the raw_data folder and is as follows:

* CarParkingOpenData.geojson
* ParkingMetersOpenData.geojson
* BlueBadgeParkingOpenData.geojson

All data was obtained through the Irish Government [Open Data portal](http://data.gov.ie) and is freely available under its [Open Data Licence](https://data.gov.ie/licence). Licences for the individual files will be provided where available.
Data was massaged to remove default header and add header of type: parking type.

The following command were used to add the data to the database.
```bash
curl -d @CarParkingOpenData.geojson -H "Content-type: application/json" -X POST http://127.0.0.1:5984/galway/_bulk_docs

curl -d @BlueBadgeParkingOpenData.geojson -H "Content-type: application/json" -X POST http://127.0.0.1:5984/galway/_bulk_docs

curl -d @ParkingMetersOpenData.geojson -H "Content-type: application/json" -X POST http://127.0.0.1:5984/galway/_bulk_docs
```
These commands are also located in a text file called curlcmds.txt for ease of use. Run curl from that directory after setting up empty database.

An empty database called galway was created on the localhost with the name galway.
There is nothing to stop this been remote and it has been tested connecting to a remote database on a SUSE Linux Server (See Testing). The database was created using futon:

``` bash
http://address_of_server:port/_utils/index.html
```

## Objective

Apps4gaps have asked you build an API that is available over HTTP. They have asked you to select any two of their datasets. The API should provide a single interface through which the two datasets can be queried together, in a way that makes sense. The Apps4gaps datasets are available at data.gov.ie. Apps4gaps will, however, let you use any openly available dataset that is of interest to Irish people, even ones not available on their site. Your code for the API should be made publicly available through GitHub.

## Key Dates

Deadline | Submission
---------|------------
5pm October 28th 2015 | Submit plan for API in form of README in GitHub repository.
5pm November 18th 2015 | Submit code through GitHub repository.
Last weeks of term | Presentations (order to be confirmed).

## Pre-implementation Testing

Section | Implementation | Outcome | Start
--------|----------------|---------|-------
Database | Install Couchdb under Open Suse 13.2 | Testing (Implementation pending test) | 29th October
Data | Use partial data as plain JSON (no db) | Testing (No implemenataion Planned) | 31 October
Database | Couch import working with Diamond json | Tested (Implementing on actual data | 4 November
Data | Data can be added to single database | Implemented (Now a single API) | 12 November
API | Tested all endpoints | Continuous (All end points tested daily) | 21 November

## Examples
Each of the get endpoints can be used via cUrl, a modern web browser or Rest testing tool e.g Postman or REStClient. Examples include:

```
http://localhost:8000/galway/
returns json array of all documents

```

```
http://localhost:8000/galway/get/park/64f7940bd8922c1394cd76a27b04891f
returns the parking object with _id = 64f7940bd8922c1394cd76a27b04891f

```


To post an object the type value and properties of added item are required. The type value must be valid i.e. meter, carparks or blue. Postman was used to test all routes.
The json array you submitted will be returned on success. A few examples:

HTTP POST:
```HTTP
POST /galway/post/carpark HTTP/1.1
Host: localhost:8000
Content-Type: application/json
Cache-Control: no-cache

{
    "type": "carparks",
    "properties":{
        "name": "Garretts Carpark",
        "no_spaces": 34
        }
}
```
or as cURL:

```bash
curl -X POST -H "Content-Type: application/json" -H "Cache-Control: no-cache" -d '{
    "type": "carparks",
    "properties":{
        "name": "Garretts Carpark",
        "no_spaces": 34
        }
}' 'http://localhost:8000/galway/post/carpark'
```

The returned value for the above will be:
```json
{
"type": "carparks",
"properties":{
    "name": "Garretts Carpark",
    "no_spaces": 34
    }
}
```

To delete an item you pass a the documents _value. This value can be extracted from the allDocs gets or the more specific gets e.g. /get/display finding the correct documents.

HTTP Delete:
```HTTP
DELETE /del/698f9578f6ec64893c241c0f61000fbc HTTP/1.1
Host: 127.0.0.1:8000
Cache-Control: no-cache
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW
```


or as cURL:
```bash
curl -X DELETE -H "Cache-Control: no-cache" -H "Postman-Token: 082354bd-1973-78ba-c2ec-6a9e3984ec0d" 'http://127.0.0.1:8000/del/698f9578f6ec64893c241c0f61000fbc'
```
