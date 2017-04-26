module.exports = function (app) {
    var path = require('path');
    var mongoooseModel = require("./Model");
    var boardDB = mongoooseModel.board;
    var shipDB = mongoooseModel.ship;

    //battleshipDB

    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname + '/../public/index.html'));
    });
    
    
    /*
----------------------CUSTOM API'S --------------------------------------
    */
    
    
    /*
    Attempts to register a player to a board by ID. If the board is full, send error message
    */
    app.post("/registerplayer", function (req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        var board = req.body.board,
            userName = req.body.userName,
            returnModel = {
                board: board,
                userName: userName
            }
        console.log("board:  " + board + "\nuserName:  " + userName);

        boardDB.find({id: board}, function (err, documents) {
            if (err) console.error(err);

            if (documents.length > 0) {
                console.log(documents);
                if (documents[0].userName === "") {
                    console.log("No player is assingned to the board yet. Assigning " + userName + " to " + board);
                    documents[0].userName = userName;
                    documents[0].ready = false;
                    documents[0].save(function (err, doc) {
                        console.log(doc);
                        res.status(200).json("You have been assigned to " + board);
                    })
                } else {
                    console.log(documents);
                    res.status(400).json("A player is already assigned to " + board + ". Please make sure you are are trying to connect to the correct board");
                }
            } else {
                res.status(400).json("Unable to connect to the board. Please make sure the board is powered on and try again");
            }
        })
    });
    
    /*
    Removes a player from a specified board by ID
    */   
    app.post("/removeplayer", function (req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        var board = req.body.board,
            userName = req.body.userName;

            boardDB.find({id: board}, function (err, documents) {
                if (documents.length > 0) {
                    documents[0].userName = "";
                    documents[0].save(function (err, doc) {
                        console.log(documents);
                        res.status(200).json(userName + " has been removed from " + board);
                    })
                } else {
                    res.status(400).json("Not able to remove user from the board at this time");
                }
            })
    });
    
    /*
    Resets all ships to their default health values
    */    
    app.get("/resetHealth", function(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        
        shipDB.find({}, function(err, documents) {
            console.log(documents.length);
            if(documents.length > 0) {
                
                for(var x = 0; x < documents.length; x++) {
                    console.log(documents[x]);
                    switch(documents[x].name){
                        case "Carrier": documents[x].health = 5;
                            break;
                        case "Destroyer": documents[x].health = 1;
                            break;
                        case "Cruiser": documents[x].health = 2;
                            break;
                        case "Battleship": documents[x].health = 3;
                            break;
                    }
                    documents[x].save();
                }
                res.status(200).send("Ships health have been reset to defaults");
            } else {
                res.status(400).send("Could not find any ships");
            }
        })
    })
    //called when Pi updates IP address
    app.post("/updateIP", function(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        var board = req.body.board;
        var ip = req.body.ip;
        console.log("ID: " + board);
        console.log("IP: " + ip);

        console.log(req.body);

        boardDB.find({id:board}, function(err, document) {
            if(document.length > 0) {
                document[0].ip = ip;
                document[0].save(function(err, doc) {
                   res.status(200).send(doc);
                });
            } else {
                "Could not find the coresponding board so I could not update the IP. Maybe you fucked up the command?"
                res.status(400).send("Could not find a board associated with that ID");
            }
        });
    });

};
