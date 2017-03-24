// app.js
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var routes = require('./app/routes');
var mongooseModel = require("./app/Model")
var mongoCredentials = require('./mongocredentials');
var bodyParser = require("body-parser");
var mongoURL = 'mongodb://'+ mongoCredentials.dbName + ':' + mongoCredentials.password + '@127.0.0.1:27017/bs';
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var db = mongoose.connection;
var boardDB = mongooseModel.board;
var shipDB = mongooseModel.ship;

//app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
bodyParser.urlencoded({extended:true});
app.use(express.static(__dirname + '/public'));

mongoose.connect(mongoURL);


//Called when there is an error connecting to mongoDB
db.on('error', console.error.bind(console, 'connection error:'));
//Called when successfully connected to MongoDB
db.once('open', function callback () {
  console.log('DB connection opened');
});

//Points incomming request to routes files
routes(app);

//connect server on specified port	
server.listen("3002", function() {
    console.log("listening on port 3002")
});

app.get('/', function(req, res,next) {
    res.sendFile(__dirname + '/index.html');
});


// returns a ship with matching position
app.get("/getShip", function(req, res, next) {
	var board = req.body.board;
  
    
    shipDB.find({board:board}, function(err, documents) {
        res.send(documents);
    })
})
	



//Sockets config
io.on('connection', function (client) {
    console.log("player connected");
    io.emit("join", "You have established a socket conneciton to the server");
    
   
    console.log("testing to see if both players have connected");
    boardDB.find({userName:""}, function(err, documents) {
        console.log(documents);
        if(documents.length === 0) {
            console.log("Both players have connected! Start the game!")
            io.emit("gameReady", "data");            
        }
    })   
    

    //called when a player joins
    client.on('join', function (data) {
        console.log(data);
    });    
    

    //called when user presses fire button. Checks for hit or miss
    client.on("fire", function (data) {
        var boardID;
        console.log(data);
        
        if(data.board === "1") {
            boardID = "2";
        } else {
            boardID = "1"
        }
        
        shipDB.find({board: boardID, position: data.cell}, function(err, documents) {
            //HIT
            if(documents.length > 0) {
                documents[0].health -= 1;
                console.log("Player " + boardID + " hit " + documents[0].name +  " and now has " + documents[0].health + " health");                
                documents[0].save(function(err, doc){
                        console.log(doc);
                    
                    if(documents[0].health <= 0) {
                        console.log("Sunked " + documents[0].name); 
                        data.shipName = documents[0].name;                     
                        io.emit("sunk", data);
                        //Send message to board via sockets
                        io.emit("led",{board:boardID,cell: data.cell});
                        shipDB.find({board: boardID, health: {$gt:0}}, function(err, doc){
                            console.log("Checking if game is over");
                            console.log(doc);
                            if(doc.length === 0) {
                                io.emit("gameover", data);
                            } 
                        })                    
                    } else {
                        io.emit("hit", data);
                        
                        //Send message to board via sockets
                        io.emit("led",{board:boardID,cell: data.cell});
                    } 
                });          
            } else {
            //MISS
                io.emit("miss", data);                
            }
        })
        
        //Query users ships and determin if it was a hit.
        
        
        //if hit- send back to client and send to board
        
        //if not hit- send to board
    });

  
    

});













































/*// app.js
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var routes = require('./app/routes');
var bodyParser = require("body-parser");
var MongoClient = require('mongodb').MongoClient;
var mongoCredentials = require('./mongocredentials');
var urlTimeRecorderDB = 'mongodb://' + mongoCredentials.dbName + ':' + mongoCredentials.password + '@127.0.0.1:27017/bs';

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(__dirname + '/public'));


//Points incomming request to routes files
routes(app, io);


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

MongoClient.connect(urlTimeRecorderDB, function (err, database) {
    if (err) return console.log(err);
    else {
        console.log('Connected to MongoDB!');
        battleshipDB = database;
    }
    server.listen(3001, function () {
        console.log("listening on port 3001");
    });
});

var clientCount = 0;
io.on('connection', function (client) {
    console.log("player connected");
    battleshipDB.collection("boards").findOne({assignedPlayer: ''
        },
        function (err, documents) {
            console.log(documents);
            if (documents === null) {
                io.emit("gameReady", "data");
            }
            //res.status(200).json("You have been assigned to " + board);
        });


    io.emit("join", "You have established a socket conneciton to the server");

    client.on('join', function (data) {
        console.log(data);
    });

    client.on("startGame", function (data) {
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

    client.on("test", function (data) {

        io.emit("gameReady", "data");
    });

});*/
