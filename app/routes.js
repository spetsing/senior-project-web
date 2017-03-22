module.exports = function(app) {
var path = require('path');

app.get('/',function(req, res){
  res.sendFile(path.join(__dirname+'/../public/index.html'));
});

//determines if player slot is open when a user submits which player they would like to play as. If a user is already assigned to that position, checks the other position and returns an error message to user.
app.post("/registerplayer", function(req,res) {

    var playerName = req.body.playerName,
        playerNumber = req.body.playerNumber;



    //Looks at table and determines if specified player is assigned to board
    battleshipDB.collection("boardStatus").findOne({});

    //if spot is open assign player to board


    //if spot is not open look to see if other player slot is open, return message to client

})
//makes call to Pi to retrieve ship objects, once both players have their ships registered, game will start
app.get("/registerships", function(res,req){

});

//takes user input and determines if hit or miss. If hit, call pi and light up corresponding location on board, send back message to client to update their board as well. If a ship is sunk, display message to both users
app.post("/fire", function(req,res){

});



};
