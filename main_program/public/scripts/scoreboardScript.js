const balmoralPointsElem = document.getElementById('balmoralPoints');
const sutherlandPointsElem = document.getElementById('sutherlandPoints');
const ramsyPointsElem = document.getElementById('ramsyPoints');
const walacePointsElem = document.getElementById('walacePoints');
const gleneaglesPointsElem = document.getElementById('gleneaglesPoints');
const caladoniaPointsElem = document.getElementById('caladoniaPoints');

const houseElems = [balmoralPointsElem, sutherlandPointsElem, gleneaglesPointsElem, caladoniaPointsElem, walacePointsElem, ramsyPointsElem];
var houses = ['Balmoral', 'Sutherland', 'Gleneagles', 'Caladonia', 'Walace', 'Ramsy'];
var scores = [0,0,0,0,0,0];
var hidden = [];

const socket = io('/scoreBoardSpace');

socket.on('resetScoreboard', function(data) {
    for(var i = 0; i < houseElems.length; i++) {
        houseElems[i].innerHTML = 0;
    }
});



//UPDATE SCORES
//this listner waits fro the update scores command
//from a control pannel and then updates the scores
//with the data that it has recieved from the 
//scoreboard
socket.on('updateScores', function(data) {

    for(var i = 0; i < houseElems.length; i++) {
        //this is where the problem is
        houseElems[i].innerHTML = data.newScores[i];
        scores[i] = parseInt(data.newScores[i]);
    }

    //stuff for sorting and moving about teams
    var teamOrder = sortHouses(houses);
    console.log(teamOrder);

    var count = 0;
    for(var i = 0; i < teamOrder.length; i++) {
        //find div, set its top margin
        if(!linSearch(hidden, teamOrder[i].name)){
            console.log("ok")
            document.getElementById(teamOrder[i].name.toLowerCase() + 'Div').style.marginTop = (count * 16.6667).toString() + 'vh';
        }
    }
});



//REMOVE HOUSES
//this listner waits for the command from a control pannel to 
//remove houses and removes the houses that have the lowest 
//scores
socket.on('removeHouses', function(data) {

    for(var i = 0; i < data.houses.length; i++) {
        document.getElementById(data.houses[i].toLowerCase() + 'Div').style.display = "none";
        hidden.push(houses[i]);
    }

    var teamOrder = sortHouses(houses);

    for(var i = 0; i < teamOrder.length; i++) {
        //find div, set its top margin
        document.getElementById(teamOrder[i].toLowerCase() + 'Div').style.marginTop = ((i * 16.6667) + (100/24) * hidden.length).toString() + 'vh';
    }
});

socket.on('clearScoreboard', function(data) {
    for(var i = 0; i < houses.length; i++) {
        document.getElementById(houses[i].toLowerCase() + 'Div').style.display = "block";
        document.getElementById(houses[i].toLowerCase() + 'Div').style.marginTop = (16.6667 * i).toString() + 'vh';
        houseElems[i].innerHTML = "0"
    };

    scores = [0,0,0,0,0,0];
    hidden = [];
}); 


function sortHouses(list2Sort) {
    //this funciton will need to sort scores and houses simultaniously
    var sortedList = [];
    var lenList = list2Sort.length;
    var workingList = []

    for(var i = 0; i < lenList; i++) {
        workingList.push({name: list2Sort[i], score: scores[i]});
    }

    for(var i = 0; i < lenList; i++) {
        //find largest and put in sorted list
        var largestIndex = 0;

        for(var j = 0; j < workingList.length; j++) {
            // if(!(list2Sort[j] in hidden)) {
                if (workingList[j].score > workingList[largestIndex].score) {
                    largestIndex = j;
                }
            // }
        }

        sortedList.push(workingList[largestIndex]);
        list2Sort.splice(largestIndex, 1);
    }

    return sortedList;
}

function linSearch(array, key) {
    for(var i = 0; i < array.length; i++) {
        if(array == key) {
            return true;
        }
    }

    return false;
}