# Project Battleship
This repository will contain the front end and back end files

## API CALLS
 * `POST /registerplayer` : Determines if player slot is open when a user submits which player they would like to play as. If a user is already assigned to that position, checks the other position and returns an error message to user.

 * `GET /registerships` : Makes call to Pi to retrieve ship objects. Once both players have their ships registered, game will start

 * `POST /fire` : Takes user input and determines if hit or miss. If hit, call pi and light up corresponding location on board and send back message to client to update their board as well. If a ship is sunk, display message to both users
