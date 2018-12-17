const socket = io('/controlPannelSpace');

const balmoralPointsElem = document.getElementById('balmoralPoints');
const sutherlandPointsElem = document.getElementById('sutherlandPoints');
const ramsyPointsElem = document.getElementById('ramsyPoints');
const walacePointsElem = document.getElementById('walacePoints');
const gleneaglesPointsElem = document.getElementById('gleneaglesPoints');
const caladoniaPointsElem = document.getElementById('caladoniaPoints');

const houseElems = [balmoralPointsElem, sutherlandPointsElem, gleneaglesPointsElem, caladoniaPointsElem, walacePointsElem, ramsyPointsElem];
const houses = ['Balmoral', 'Sutherland', 'Gleneagles', 'Caladonia', 'Walace', 'Ramsy'];

function submitChanges() {
   var data2Send = getPointsData();

   if(data2Send) {
       for(var i = 0; i < houseElems.length; i++) {
           houseElems[i].value = 0;
       }

       socket.emit('updateScores', {scores: data2Send});
   }
}

function removeLowestScore() {
   socket.emit('removeHouse', {})
}

function getPointsData() {
   var houseData = [];
   for(var i = 0; i < houseElems.length; i++) {
       houseData.push(houseElems[i].value);
       if(houseData[i].match(/^[0-9]+$/) == null) {
           alert("you cant break me that easy meatbag! 🤖 \n(not all your values are positive integers)");
           return false;
       }
   }

   return houseData;
}

function clearScoreBoard() {
   socket.emit('clearScoreboard', {});
}

socket.on('noScoreboard', function(data) {
   alert("no scoreboard detected 😭")
})

document.getElementById('submitChangesBtn').addEventListener('click', function(clickEvent) { submitChanges(); });
document.getElementById('removeLowestScoreBtn').addEventListener('click', function(clickEvent) { removeLowestScore(); });
document.getElementById('clearScores').addEventListener('click', function(clickEvent) { clearScoreBoard(); });