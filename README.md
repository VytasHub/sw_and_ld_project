# Semantic Web & Linked Data Project

## Parking in Galway
### Garrett Jordan

## Overview

Provide an API to combine data from Galway City Council on car parks in Galway City, Parking Meters in Galway City and Blue Badge parking spots in Galway City. As car parks and parking areas are subject to change the API will allow not only the querying of existing data but also the addition of new data, the modification of the existing data and the deletion of obsolete data. The API calls will reflect the HTTP verbs used and will be self describing. The project is to be developed in such a way that the addition of other towns/areas does not break the existing API and can be achieved by adding another route eg URL/galway/ and URL/athlone/ etc.
Each region should expose the same API which in turn is accessed by our external API. This layered approach will allow for different data storage and data structures for each region if required. Such variation will be encapsulated and transparent to both the external API and the user.

## Entry Points/Routes
### Proposed routes and entry points
Route | Description
---------|------------
 / | Returns list of implemented areas in lower case, for the scope of this project galway.
 /galway/ | Returns ALL parking from all 3 data sets
 /galway/get/ | Returns same as above.
 /galway/get/all/ | Returns same as above (more descriptive).
 /galway/get/blue/ | Returns list of blue ticket (special needs) parking spots only.
 /galway/get/display/ | Returns a list of all pay and display parking spots.
 /galway/get/carparks/ | Returns a list of car parks.
 /galway/get/blue/{param} | Returns a blue ticket (special needs) parking spot based on given parameter.
 /galway/get/display/{param} | Returns a pay and display parking spot based on given parameter.
 /galway/get/carparks/{param} | Returns a car park based on given parameter.
 /galway/post/carpark/ | Add a car park.
 /galway/post/blue/ | Add a special needs parking space.
 /galway/post/display/ | Add pay and display parking area.
 /galway/delete/{param} | Delete the parking area designated by given parameter.
 /galway/update/{param} | Update the parking space designated by given parameter.

I intend to use update as the exposed verb to avoid confusion between put and post but intend to use put as the actual HTTP verb. All lists returned will be in JSON format. These routes maybe subject to change.

## Technologies
### Software

It is my intention to use node.js (Node) and express.js (Express) to create a public API that can be queried externally and three internal APIs that query the individual data sets. Node and Express are used as they are free and open source, light-weight and effecient. The internal APIs are to be queried through the external API. Any additional modules outside those provided by Node and Express will be documented here if required. All module will be loaded through the Node Package Manager (npm) which is a collection of open source libraries.

### Initial thoughts on database to use

I think that this project is suited to a Couchbase&trade; database due to its native, be it limited, support for geojson. This may change if another database is more suited to the task. More then one database may be used going forward, depending on the suitability of other regions data.



## Data Used
### Datasets, Attribution & Licencing

The initial seed data for the project is contained in the raw_data folder and is as follows:

* CarParkingOpenData.geojson
* ParkingMetersOpenData.geojson
* BlueBadgeParkingOpenData.geojson

All data was obtained through the Irish Government [Open Data portal](http://data.gov.ie) and is freely available under its [Open Data Licence](https://data.gov.ie/licence). Licences for the individual files will be provided where available.


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
