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

server.listen(8080, function() {
    console.log("listening on port 8080")
});

/*io.on('connection', function(client) {
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

});*/
