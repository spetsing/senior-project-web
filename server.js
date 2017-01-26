var express = require('express');
//var MongoClient = require('mongodb').MongoClient;
//var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();
//var mongoCredentials = require('./mongocredentials');
//var urlTimeRecorderDB = 'mongodb://'+ mongoCredentials.dbName + ':' + mongoCredentials.password + '@127.0.0.1:27017/battleship';
var routes = require('./app/routes');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));


//Points incomming request to routes files
routes(app);


/* MongoClient.connect(urlTimeRecorderDB, function(err,database){
	if(err) return console.log(err);
	else {
		console.log('Connected to MongoDB!');
		battleshipDB = database;
	}
app.listen(3001, function () {
  console.log('Listening on port 3001!');
});

}); */

app.listen(8080, function () {
  console.log('Listening on port 8080!');
});
