// app.js
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var routes = require('./app/routes');

//app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));


//Points incomming request to routes files
routes(app);


app.get('/', function(req, res,next) {
    res.sendFile(__dirname + '/index.html');
});

server.listen(3001, function() {
    console.log("listening on port 3001");
});

var clientCount = 0;

io.on('connection', function(client) {



    console.log('Client connected...1');

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

});
