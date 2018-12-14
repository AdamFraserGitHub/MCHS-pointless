//IMPORTS
//====================================================================
//imports express and creates an object from it
var app = require('express')();
/* creates a http server and gives express 
 * the ability to controll routing and endpoints of that server 
 */
var server = require('http').Server(app);
/* imports socket.io (websockets library) and tells it to "listen"
 * on the http server we just created
 */
var io = require('socket.io')(server);
//imports IP module to get server network information
const ipModule = require('ip');
//=====================================================================


const controlPannelSpace = io.of('/controlPannelSpace');
const scoreBoardSpace = io.of('/scoreBoardSpace');

var houses = ['Balmoral', 'Sutherland', 'Gleneagles', 'Caladonia', 'Walace', 'Ramsy'];
var scores = [0,0,0,0,0,0];

var scoreBoards = 0;

controlPannelSpace.on('connection', function(socket) {
    console.log("control pannel connected (づ｡◕‿‿◕｡)づ");
    
    // scoreBoardSpace.emit('hideRemoved', {houseNames: houses});

    socket.on('disconnect', function() {
        console.log("controll pannel disconnected ༼ つ ಥ_ಥ ༽つ");
    })

    socket.on('updateScores', function(data) {
        //update scores on scoreboard

        if(scoreBoards < 1) {
            socket.emit('noScoreboard')
        } else {
            console.log("\nbeep boop 👾")
            console.log("scores update".toUpperCase() + "====================");
            for(var i = 0; i < houses.length; i++) {
                if(houses[i] == "Ramsy") {
                    console.log(houses[i] + ": \t\t" + data.scores[i]);
                } else {
                    console.log(houses[i] + ": \t" + data.scores[i]);
                }

                scores[i] += parseInt(data.scores[i]);
            }

            console.log(scores);
            
            scoreBoardSpace.emit('updateScores', {newScores: scores});
        }
    });

    socket.on('removeHouse', function(data) {
        //remove house from scoreboard

        var smallestScore = scores[0]
        var smallestHouses = [houses[0]];

        for(var i = 0; i < houses.length; i++) {
            if(scores[i] < smallestScore) {
                smallestScore = scores[i];
                smallestHouses = [houses[i]]
            } else if(scores[i] == smallestScore) {
                smallestHouses.push(houses[i]);
            }
        }

        for(var i = 0; i < smallestHouses.length; i++) {
            for(var j = 0; j < houses.length; j++) {
                if(houses[j] == smallestHouses[i]) { houses.splice(j, 1); }
            }
        }

        for(var i = 0; i < smallestHouses.length; i++) {
            for(var j = 0; j < scores.length; j++) {
                if(scores[j] == smallestScore) { scores.splice(j, 1); }
            }
        }

        console.log(houses);
        console.log(scores);
        if(smallestHouses.length == 1) {
            console.log("\n" + smallestHouses[0] + " you are the weakest link.. wait wrong show");
        } else {
            var weakestHouses = "";
            for(var i = 0; i < smallestHouses.length - 1; i++) {
                weakestHouses += smallestHouses[i] + ',';
            }
            weakestHouses += smallestHouses[smallestHouses.length - 1]; 

            console.log("\n" + weakestHouses + " you are the weakest links.. wait wrong show");
        }
        scoreBoardSpace.emit('removeHouses', {houses: smallestHouses});

    });

    socket.on('clearScoreboard', function(data) {
        houses = ['Balmoral', 'Sutherland', 'Gleneagles', 'Caladonia', 'Walace', 'Ramsy'];
        scores = [0,0,0,0,0,0];
        scoreBoardSpace.emit('clearScoreboard', {});
    });
});

scoreBoardSpace.on('connection', function(socket) {
    console.log("\nscoreboard connected (づ｡◕‿‿◕｡)づ");
    scoreBoardSpace.emit('updateScores', {newScores: scores});
    scoreBoards ++;

    socket.on('disconnect', function() {
        console.log("\nscoreboard disconnected ༼ つ ಥ_ಥ ༽つ");
        scoreBoards --;

        //just got a bad feeling about line 66
        if(scoreBoards < 0) {
            scoreBoards = 0;
        }
    });
})

const routes = require('./routes.js')
app.use('/', routes);

server.listen(80,'0.0.0.0', function(err) {
    if(err) {
        console.log("you broke the server! GRRR!! (ノಠ益ಠ)ノ彡┻━┻ \n");
    } else {
        console.log("server started successfully \\(•◡•)/ 💖");
        console.log("IP: " + ipModule.address())
        console.log("port: 80")
        console.log("to connect go to any browser on the same network as\nthis device and type http://" + ipModule.address() + " \nand follow the instructions from there")
    }
})