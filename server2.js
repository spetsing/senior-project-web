// app.js
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var routes = require('./app/routes');
var mongooseModel = require("./app/Model")
var mongoCredentials = require('./mongocredentials');
var bodyParser = require("body-parser");
var mongoURL = 'mongodb://' + mongoCredentials.dbName + ':' + mongoCredentials.password + '@127.0.0.1:27017/bs';
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var db = mongoose.connection;
var boardDB = mongooseModel.board;
var shipDB = mongooseModel.ship;
var shipCordDB = mongooseModel.shipCord;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
//bodyParser.urlencoded({extended:true});
app.use(express.static(__dirname + '/public'));

mongoose.connect(mongoURL);


//Called when there is an error connecting to mongoDB
db.on('error', console.error.bind(console, 'connection error:'));
//Called when successfully connected to MongoDB
db.once('open', function callback() {
    console.log('DB connection opened');
});

//Points incomming request to routes files
routes(app);

//connect server on specified port	
server.listen("3002", function () {
    console.log("listening on port 3002")
});

app.get('/', function (req, res, next) {
    res.sendFile(__dirname + '/index.html');
});


// returns a ship with matching position
app.get("/getShip", function (req, res, next) {
    /*  var board = req.body.board;



      shipDB.find({
          board: board
      }, function (err, documents) {
          res.send(documents);
      })*/

    var board1 = new boardDB({
        userName:"",
        id:"1",
        ready: false
    })
    board1.save();

    var board2 = new boardDB({
        userName:"",
        id:"2",
        ready: false
    })

    board2.save();
    res.json("Saved Ships");
})




app.post("/hit", function (req, res) {

    console.log(req.body.board + "     " + req.body.cell)

    io.emit("led", {
        board: req.body.board,
        cell: req.body.cell
    });

    res.status(200).json("Sent");
})



//Sockets config
io.on('connection', function (client) {
    console.log("player connected");
    io.emit("join", "You have established a socket conneciton to the server");
     console.log("Turning off LEDS");
        io.emit("reset", "cuck");


    console.log("testing to see if both players have connected");
    boardDB.find({
        userName: ""
    }, function (err, documents) {
        console.log(documents);
        if (documents.length === 0) {
            console.log("Both players have connected! Start the game!")
            io.emit("gameReady", "data");

            boardDB.find({}, function (err, documents) {
                //remove user from board
                for (var x = 0; x < documents.length; x++) {
                    documents[x].userName = "";
                    documents[x].save();
                }
            })
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

        if (data.board === "1") {
            boardID = "2";
        } else {
            boardID = "1"
        }

        shipCordDB.find({
            board: boardID,
            coordinates: data.cell
        }, function (err, documents) {
            if (documents.length > 0) {
                documents[0].health -= 1;
                documents[0].save();
                io.emit("hit", data);
                //Send message to board via sockets
                io.emit("led", {
                    board: boardID,
                    cell: data.cell
                });

                if (documents[0].health <= 0) {
                    //All ships sunk
                    console.log("Player " + boardID + " lost");
                    io.emit("gameover", data);
                }
            } else {
                //MISS
                io.emit("miss", data);
            }
        })
    })
    //called when user presses ready button at beginning of game
     client.on("ready", function (data) {
        console.log("called ready");

        var board = data.board;
        console.log("Board " + board + " is ready. Get their ships");
        io.emit("ships", data);

        //update board is ready
        boardDB.find({id: board}, function(err, documents) {
            if(err) console.error(err);
            if(documents.length > 0) {
                documents[0].ready = true;
                documents[0].markModified('readyToPlay');
                documents[0].save();
                console.log("Board " + board + " status updated to ready");
            } else {
                console.log("Could not find board to update ready status");
            }

        boardDB.find({ready: false},function(err, documents) {
            if(err) console.error(err);
            console.log(documents);
            if(documents.length === 0) {
                //both users are ready. Start game
                console.log("both players are ready, start game");
                io.emit("startGame","1");
            }
        })

        })
    })

    //called when user restarts game
    client.on("replay", function (data) {
        console.log("Turning off LEDS");
        io.emit("reset", "cuck");

        boardDB.find({id: data}, function (err, document) {
            document[0].ready = false;
            document[0].save();
            console.log("Board " + data + " ready status has been reset");
            /*for (var x = 0; x < document.length; x++) {
                document[x].ready = false;
                document[x].save();
                console.log("Board " + x + " ready status has been reset");
            }*/
        })
    })

    //Gets ships from board
    client.on("getShip", function (data) {
        console.log(data);

        //create ship objects and add them to DB

      /*  var ship = new shipCordDB({
            board: data.board,
            coordinates: data.coords,
            health: data.coords.length
        })*/
        shipCordDB.find({board:data.board}, function(err, documents) {
            documents[0].coordinates = data.coords.length;
            documents[0].health = data.coords.length;
            documents[0].save();
        })

        console.log("Board " + data.board + " has been updated");

    })

    client.on("sendHit", function (data) {
        console.log(data);
        io.emit("led", data);
    })


    client.on("turnOffLED", function (data) {
        console.log("Turning off LEDS");
        io.emit("reset", "cuck");
    })



    client.on("sendShips", function (data) {
        console.log("Lets get dem ships")
        io.emit("ships", "");
    })

});


/* shipDB.find({board: boardID, position: data.cell}, function(err, documents) {
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
                });          */
