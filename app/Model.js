var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var boardSchema = new Schema({
	userName:String,
	id: String,
	ip: String
	},{collection: "board"})

var board = mongoose.model("Board", boardSchema);


var shipSchema = new Schema({
    board: String,
	name: String,
	position:[String],
	health: Number
},{collection:"ships"});

var ship = mongoose.model("Ship",shipSchema);



module.exports = {
    ship: ship,
    board: board
}



