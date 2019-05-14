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
    if(data.sort) {
        var teamOrder = sortHouses();

        var count = 0;
        for(var i = 0; i < teamOrder.length; i++) {
            //find div, set its top margin
            if(!linSearch(hidden, teamOrder[i].name)){
                console.log("\n\n");
                console.log(teamOrder[i].name);
                console.log("\n\n")
                console.log("ok")
                document.getElementById(teamOrder[i].name.toLowerCase() + 'Div').style.marginTop = ((count * 16.6667) + (100/12) * hidden.length).toString() + 'vh';
                count++;
            }
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
        hidden.push(data.houses[i]);

    }

    var teamOrder = sortHouses();
    console.log("\nrh")
    console.log(teamOrder)

    var count = 0;
    for(var i = 0; i < teamOrder.length; i++) {
        //find div, set its top margin
        if(!linSearch(hidden, teamOrder[i].name)) {
            document.getElementById(teamOrder[i].name.toLowerCase() + 'Div').style.marginTop = ((count * 16.6667) + (100/12) * hidden.length).toString() + 'vh';
            count++;
        }
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


function sortHouses() {
    //this funciton will need to sort scores and houses simultaniously
    var sortedList = [];
    var lenList = houses.length;
    var workingList = []

    for(var i = 0; i < lenList; i++) {
        workingList.push({name: houses[i], score: scores[i]});
    }

    for(var i = 0; i < lenList; i++) {
        //find largest and put in sorted list
        var smallestIndex = 0;

        for(var j = 0; j < workingList.length; j++) {
            // if(!(list2Sort[j] in hidden)) {
                if (workingList[j].score < workingList[smallestIndex].score) {
                    smallestIndex = j;
                }
            // }
        }

        sortedList.push(workingList[smallestIndex]);
        workingList.splice(smallestIndex, 1);
    }

    return sortedList;
}

function linSearch(array2Search, key2Search4) {
    for(var i = 0; i < array2Search.length; i++) {
        if(array2Search[i].toLowerCase() == key2Search4.toLowerCase()) {
            return true;
        }
    }

    return false;
}