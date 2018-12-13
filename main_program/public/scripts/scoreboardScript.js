const balmoralPointsElem = document.getElementById('balmoralPoints');
const sutherlandPointsElem = document.getElementById('sutherlandPoints');
const ramsyPointsElem = document.getElementById('ramsyPoints');
const walacePointsElem = document.getElementById('walacePoints');
const gleneaglesPointsElem = document.getElementById('gleneaglesPoints');
const caladoniaPointsElem = document.getElementById('caladoniaPoints');

var houseElems = [balmoralPointsElem, sutherlandPointsElem, gleneaglesPointsElem, caladoniaPointsElem, walacePointsElem, ramsyPointsElem];
var houses = ['Balmoral', 'Sutherland', 'Gleneagles', 'Caladonia', 'Walace', 'Ramsy'];
var scores = [0,0,0,0,0,0];
var hidden = [];

const socket = io('/scoreBoardSpace');

socket.on('resetScoreboard', function(data) {
    for(var i = 0; i < houseElems.length; i++) {
        houseElems[i].innerHTML = 0;
    }
});

socket.on('updateScores', function(data) {
    console.log(data);
    for(var i = 0; i < houseElems.length; i++) {
        houseElems[i].innerHTML = data.newScores[i];
        scores[i] = parseInt(data.newScores[i]);
    }
});

socket.on('removeHouses', function(data) {
    for(var i = 0; i < data.houses.length; i++) {
        document.getElementById(data.houses[i].toLowerCase() + 'Div').hidden = true;
        hidden.push(houses[i]);
    }
});

socket.on('clearScoreboard', function(data) {
    for(var i = 0; i < houses.length; i++) {
        document.getElementById(houses[i].toLowerCase() + 'Div').hidden = false;
        houseElems[i].innerHTML = "0"
    };

    scores = [0,0,0,0,0,0];
    hidden = [];
});

socket.on('hideRemoved', function(data) {
    for(var i = 0; i < houses.length; i++) {
        if(!(houses[i] in data.houses)) {
            document.getElementById(houses[i].toLowerCase() + 'Div').hidden = true;
            hidden.push(houses[i]);
        }
    };
});

function sortHouses(list2Sort) {
    //this funciton will need to sort scores and houses simultaniously
    sortedList = [];

    for(var i = 0; i < list2Sort.length; i++) {
        //find largest and put in sorted list
        var largest = list2Sort
    }
}