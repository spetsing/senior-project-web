module.exports = function(app,io) {
var path = require('path');
//battleshipDB

	app.get('/',function(req, res){
		res.sendFile(path.join(__dirname+'/../public/index.html'));
	});

	app.get('/socket-test',function(req, res){
		res.sendFile(path.join(__dirname+'/../public/index.html'));
	});

	app.get('/geeks',function(req, res){
		res.sendFile(path.join(__dirname+'/../public/index.html'));
	});


	app.post("/registerplayer", function(req,res) {
		 res.setHeader('Access-Control-Allow-Origin', '*');
		var board = req.body.board,
			userName = req.body.userName,
			collection = battleshipDB.collection("boards");

			var returnModel = {
				board: board,
				userName: userName
			}

			console.log("board:  " + board  + "\nuserName:  " + userName);

			collection.findOne({id: board}, function(err,documents) {
				if(documents!==null) {
					if(documents.assignedPlayer === "") {
						console.log("No player is assingned to the board yet. Assigning "+ userName + " to " + board);
						//assign player to board
						collection.findOneAndUpdate(
							{id: board},
							{$set: {assignedPlayer: userName}},
							{returnOriginal: false},
							function(err, documents) {
								res.status(200).json("You have been assigned to " + board);
							});
					} else {
						console.log(documents);
						res.status(400).json("A player is already assigned to " + board + ". Please make sure you are are trying to connect to the correct board");
					}
				} else {
					res.status(400).json("Unable to connect to the board. Please make sure the board is powered on and try again");
			}
			});
  });

  app.post("/removeplayer", function(req,res) {
	   res.setHeader('Access-Control-Allow-Origin', '*');
	var board = req.body.board,
		userName = req.body.userName,
		collection = battleshipDB.collection("boards");


		collection.findOneAndUpdate(
			{id: board},
			{$set: {assignedPlayer: ""}},
			{returnOriginal: false},
			function(err, documents) {
				if(documents !== null){
					console.log(documents);
					res.status(200).json(userName + " has been removed from " + board);
				} else {
					res.status(400).json("Not able to remove user from the board at this time");
				}
			});
  });

  };
