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

socket.on('updateScores', function(data) {
    console.log(data);
    for(var i = 0; i < houseElems.length; i++) {
        houseElems[i].innerHTML = data.newScores[i];
        scores[i] = parseInt(data.newScores[i]);
    }

    //stuff for sorting and moving about teams
    var teamOrder = sortHouses(houses);

    for(var i = 0; i < teamOrder.length; i++) {
        //find div, set its top margin
        document.getElementById(teamOrder[i].toLowerCase() + 'Div').style.marginTop = (i * 16.6667).toString() + 'vh';
    }
});

socket.on('removeHouses', function(data) {
    for(var i = 0; i < data.houses.length; i++) {
        document.getElementById(data.houses[i].toLowerCase() + 'Div').style.display = "none";
        // document.getElementById(data.houses[i].toLowerCase() + 'Div').style.marginTop = "5000px"; //eww
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

socket.on('hideRemoved', function(data) {
    for(var i = 0; i < houses.length; i++) {
        if(!(houses[i] in data.houseNames)) {
            document.getElementById(houses[i].toLowerCase() + 'Div').hidden = true;
            hidden.push(houses[i]);
        }
    };
});

function sortHouses(list2Sort) {
    //this funciton will need to sort scores and houses simultaniously
    sortedList = [];
    list2Sort = list2Sort.slice();
    var scoresCoppy = scores.slice();

    var lenList = list2Sort.length;
    for(var i = 0; i < lenList; i++) {
        //find largest and put in sorted list
        var largestIndex;
        for(var j = 0; j < list2Sort.length; j++) {
            if(!(list2Sort[j] in hidden)) {
                largestIndex = j;
                break;
            }
        }    

        for(var j = 0; j < list2Sort.length; j++) {
            if(!(list2Sort[j] in hidden)) {
                if (scoresCoppy[j] > scoresCoppy[largestIndex]) {
                    largestIndex = j;
                }
            }
        }

        sortedList.push(list2Sort[largestIndex]);
        list2Sort.splice(largestIndex, 1);
        scoresCoppy.splice(largestIndex, 1);
    }

    return sortedList;
}