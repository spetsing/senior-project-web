var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var boardSchema = new Schema({
	userName:String,
	id: String,
	ready: Boolean
	},{collection: "board"})

var board = mongoose.model("Board", boardSchema);


var shipSchema = new Schema({
    board: String,
	name: String,
	position:[String],
	health: Number
},{collection:"ships"});

var ship = mongoose.model("Ship",shipSchema);

var shipCordSchema = new Schema({
    board: String,
    coordinates:[String],
    health: Number
},{collection:"shipCord"})

var shipCord = mongoose.model("ShipCord", shipCordSchema);

module.exports = {
    ship: ship,
    board: board,
    shipCord: shipCord

}



