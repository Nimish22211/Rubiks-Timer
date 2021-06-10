var mSeconds = 00;
var seconds = 00;
var minutes = 00;
// helper function and logic of timer
function timer() {
    mSeconds++
    document.getElementById('time').innerHTML = minutes + "." + seconds + "." + mSeconds
    if (mSeconds > 99) {
        mSeconds = 0
        seconds++
    }
    if (seconds >= 60) {
        seconds = 0
        minutes++
    }
}

var timeData = [];//variable to store the time of each solve, used for avg
//scrambles of cube 
var scrambles = [
    ["D' L' B' L D F B R' B' F2 L' D B2 L R"], ["U2 L2 R2 F2 D R B2 D' L R2 B' R F' L2 U2"],
    ["U L F2 D' F D' L2 R2 D B2 F' L2 D' U' B2"], ["L' F' R F' D' U2 L2 D' B U L F' D2 B' R"],
    ["L D L D2 B L F L' U' F D F2 L2 U2 B'"], ["R U' L D U B F U D' R' D F' B U B2"],
    ["R2 B D2 L' R' B U R' B2 R B' U F' R2 B2"], ["L F' R2 D' B' U' F2 D2 F2 U B' R F2 U2 D"],
    ["F' L R' D' L2 R2 U2 L' R2 F L2 D B2 L2 F"], ["F2 U B2 F2 L2 B2 L2 F2 L' R2 F2 L U L R"],
    ["L D B L F2 R U2 L' R D2 U' L' B2 R' B'"], ["L2 D2 U F' D2 B D' L R D L' D F L U2"],
    [" D' L' R F L2 U2 B2 D U2 L R U L D' B'"], ["F' L' D' U' F2 D2 L B' D2 L' D B F L2 R'"]];
// check start stop reset
function check(event) {

    //start the timer
    if (event.charCode == 13) {
        interval = setInterval(timer, 10)
    }
    //stop timer, display time in solves section 
    if (event.charCode == 32) {
        clearInterval(interval)
        event.preventDefault()
        //loop for changing the scramble
        var scramble = document.getElementById('scramble');
        var randomNum = Math.floor(Math.random() * scrambles.length);
        var randomScramble = scrambles[randomNum];
        (function displayScramble() {
            scramble.innerHTML = randomScramble

        })()
        var div = document.createElement('li'); // create a solve time element
        div.innerHTML = document.getElementById('time').innerHTML;
        div.setAttribute('id', 'del')
        document.getElementById('solve-time').appendChild(div)
        // var Delete = document.createElement('div'); // create delete btn
        // Delete.innerHTML = 'delete';
        // document.getElementById('solve-time').appendChild(Delete).classList.add('delete')
        //create element to display avg
        var newMinutes, newMin2, newSeconds, newMs = 0;
        if (minutes >= 0) {
            newMinutes = minutes * 60; // converting minutes to seconds
        }
        if (seconds >= 0) {
            if (newMinutes == 0) {
                newMin2 = seconds * 100 // converting seconds to Mseconds
            } else {
                newMin2 = (seconds + newMinutes) * 100
            }
            newSeconds = newMin2;
            newMs = mSeconds + newSeconds
        }
        var logTime = newMs;
        //push time (converted in one unit) to timeData
        timeData.push(logTime)
        console.log(timeData)
        //conditions to display the avg
        if (document.getElementsByTagName('li').length <= 1) {
            document.getElementById('avg').innerHTML = document.getElementById('time').innerHTML
        }
        if (document.getElementsByTagName('li').length > 1) {
            (function display() {
                var element = 0;
                var length = timeData.length;
                for (var i = 0; i < length; i++) {
                    element += timeData[i]//Number(document.getElementsByTagName('li')[i].innerHTML);
                }
                element /= length
                element /= 100
                element = element.toFixed(2)

                if (element >= 60) {
                    document.getElementById('avg').innerHTML = `1.${(element - 60).toFixed(2)}`
                }
                else {
                    document.getElementById('avg').innerHTML = element
                }

            })()

        }
        // adding bg color class to 'div'
        document.getElementsByTagName('ol')[0].classList.add('new-solve')
        setTimeout(() => {
            document.getElementsByTagName('ol')[0].classList.remove('new-solve')
        }, 1000)

    }
    // reset the timer
    if (event.charCode == 48) {
        mSeconds = 0;
        seconds = 0;
        minutes = 0;
        document.getElementById('time').innerHTML = + seconds + "." + mSeconds
    }
}
// delete btn in solve section
function deleteAll() {
    timeData = []
    var list = document.getElementById("solve-time");
    // As long as <ol> has a child node, remove it
    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
    }
    document.getElementById('avg').innerHTML = 0
}
//document.getElementById('solve-time').addEventListener('click', deleteBtn)
// for toggeling the side bar
function openSideBar() {
    document.getElementsByClassName('side-nav')[0].classList.toggle('side-toggle')
}

function displayScramble() {

    var scramble = document.getElementById('scramble');
    var randomNum = Math.floor(Math.random() * scrambles.length - 1);
    var randomScramble = scrambles[randomNum];
    scramble.innerHTML = randomScramble

}
window.onload = displayScramble
function displayInfo() {
    document.getElementById('infoBox').style.display = 'block'
}
function closeInfo() {
    document.getElementById('infoBox').style.display = 'none'
}
window.onload = displayInfo