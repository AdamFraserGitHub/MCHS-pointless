const balmoralPointsElem = document.getElementById('balmoralPoints');
const sutherlandPointsElem = document.getElementById('sutherlandPoints');
const ramsyPointsElem = document.getElementById('ramsyPoints');
const walacePointsElem = document.getElementById('walacePoints');
const gleneaglesPointsElem = document.getElementById('gleneaglesPoints');
const caladoniaPointsElem = document.getElementById('caladoniaPoints');

const houseElems = [balmoralPointsElem, sutherlandPointsElem, gleneaglesPointsElem, caladoniaPointsElem, walacePointsElem, ramsyPointsElem];
const houses = ['Balmoral', 'Sutherland', 'Gleneagles', 'Caladonia', 'Walace', 'Ramsy'];

const socket = io('/scoreBoardSpace');

socket.on('resetScoreboard', function(data) {
    for(var i = 0; i < houseElems.length; i++) {
        houseElems[i].innerHTML = 0;
    }
});

socket.on('updateScores', function(data) {
    for(var i = 0; i < houseElems.length; i++) {
        houseElems[i].innerHTML = data.newScores[i];
    }
});

socket.on('removeHouses', function(data) {
    for(var i = 0; i < data.houses.length; i++) {
        document.getElementById(data.houses[i].toLowerCase() + 'Div').hidden = true;
    }
});

socket.on('clearScoreboard', function(data) {
    for(var i = 0; i < houses.length; i++) {
        document.getElementById(houses[i].toLowerCase() + 'Div').hidden = false;
        houseElems[i].innerHTML = "0"
    };
});

socket.on('hideRemoved', function(data) {
    for(var i = 0; i < houses.length; i++) {
        if(!(houses[i] in data.houses)) {
            document.getElementById(houses[i].toLowerCase() + 'Div').hidden = true;
        }
    };
});