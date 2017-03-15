// app.js
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var routes = require('./app/routes');
var bodyParser = require("body-parser");
var MongoClient = require('mongodb').MongoClient;
var mongoCredentials = require('./mongocredentials');
var urlTimeRecorderDB = 'mongodb://'+ mongoCredentials.dbName + ':' + mongoCredentials.password + '@127.0.0.1:27017/bs';

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));


//Points incomming request to routes files
routes(app,io);


app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

MongoClient.connect(urlTimeRecorderDB, function(err,database){
	if(err) return console.log(err);
	else {
		console.log('Connected to MongoDB!');
		battleshipDB = database;
	}
server.listen(3001, function() {
    console.log("listening on port 3001");
});
});

var clientCount = 0;
io.on('connection', function(client) {
	console.log("player connected");
	battleshipDB.collection("boards").findOne(
							{assignedPlayer: ''},
							function(err, documents) {
								console.log(documents);
								if(documents===null){
									io.emit("gameReady","data");
								}
								//res.status(200).json("You have been assigned to " + board);
							});


	io.emit("join","You have established a socket conneciton to the server");

    client.on('join', function(data) {
        console.log(data);
    });

    client.on("startGame", function(data) {
        console.log(data.test);
        console.log(data.test2);
    });

    client.on("fire", function (data) {
        console.log(data);
        io.emit('receive-fire', data);
    });

    client.on("waiting", function (data) {
        console.log("A player has connected" + data);
        console.log(io.sockets.sockets.length);
        ++clientCount;
        io.emit('receive-wait', clientCount);
    });

	client.on("test", function(data) {

		io.emit("gameReady","data");
	});

});
