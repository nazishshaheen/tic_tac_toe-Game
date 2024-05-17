let heading = document.querySelector('.heading');
let boxes = document.querySelectorAll('.box');
let resetContainer = document.querySelector('.reset-container');
let resetBtn = document.querySelector('.reset-button');
let mobileResetBtn = document.getElementById('mobile-reset-btn');
let newGameBtn = document.querySelector('.new-button');
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector('.msg');
let outer1 = document.querySelector('.outer1');
let outer2 = document.querySelector('.outer2');

// player O
let turnO = true;
outer1.style.setProperty("--disp1", 'block');

// create a 2D array
let winningPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
]

class Player {
    _score = 0;
    constructor(name) {
        this.fname = name.split(' ')[0][0].toUpperCase()+name.split(' ')[0].substr(1);
        if (name.includes(' ')) {
            this.lname = name.split(' ')[1][0].toUpperCase()+name.split(' ')[1].substr(1);   
        }
    }

    setScore = function () {
        this._score = this._score + 1;
    }
    getScore = function () {
        return this._score;
    }
}

document.getElementById('script').addEventListener('load', playerStarter);

let player1 = null;
let player2 = null;

function playerStarter() {
    if (!player1 && !player2) {
        let name1 = prompt('Enter First Player Name :');
        let name2 = prompt('Enter Second Player Name :');
        if (isNaN(Number(name1)) && isNaN(Number(name2))) {
            player1 = new Player(name1);
            player2 = new Player(name2);
        }else{
            alert('Please Enter Player Name \nCarefully !');
            playerStarter();
        }
    }
    document.getElementById('player1').innerText = player1.fname;
    document.getElementById('player2').innerText = player2.fname;
    showScore();
}


boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if (turnO) {
            box.innerText = 'O';
            turnO = false;
            outer1.style.setProperty("--disp1", 'none');
            outer2.style.setProperty("--disp2", 'block');
        } else {
            box.innerText = 'X';
            turnO = true;
            outer1.style.setProperty("--disp1", 'block');
            outer2.style.setProperty("--disp2", 'none');
        }
        box.disabled = true;

        checkWinner();
    });
});

// function for disabling buttons after getting winner
function disabledButtons() {
    for (let box of boxes) {
        box.disabled = true;
    }
}

// function for enabling buttons for new game
function enableButtons() {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = '';
    }
}

// function for showing winner
function showWinner(winnerObj) {
    winnerObj.setScore();
    showScore();
    msg.innerText = `Congratulation, Winner is \n ${winnerObj.fname + " "+(winnerObj.lname??'')}`;
    msg.style.marginTop = '30px';
    msgContainer.classList.remove('hide');
    disabledButtons();
    heading.style.display = 'none';
    resetContainer.style.display = 'none';
    mobileResetBtn.style.display = 'none';
    newGameBtn.style.marginTop = '30px';
    outer1.style.setProperty("--disp1", 'none');
    outer2.style.setProperty("--disp2", 'none');
}

// function for checking winner
function checkWinner() {
    for (let pattern of winningPattern) {
        // console.log(pattern[0],pattern[1],pattern[2]);
        // console.log(boxes[pattern[0]].innerText,boxes[pattern[1]].innerText,boxes[pattern[2]].innerText);
        let pos1Value = boxes[pattern[0]].innerText;
        let pos2Value = boxes[pattern[1]].innerText;
        let pos3Value = boxes[pattern[2]].innerText;

        if (pos1Value != '' && pos2Value != '' && pos3Value != '') {
            if (pos1Value === pos2Value && pos2Value === pos3Value) {
                showWinner(pos1Value == 'O' ? player1 : player2);
            }
        }
    }
}

// function for reset game
function resetGame() {
    turnO = true;
    enableButtons();
    msgContainer.classList.add('hide');
    heading.style.display = 'block';
    resetContainer.style.display = 'flex';
    mobileResetBtn.style.display = 'block';
    outer1.style.setProperty("--disp1", 'block');
    outer2.style.setProperty("--disp2", 'none');
}

function showScore() {
    document.getElementById('p1-score').innerText = player1.getScore();
    document.getElementById('p2-score').innerText = player2.getScore();
}

// add event listener on newGame button
newGameBtn.addEventListener('click', resetGame);
resetBtn.addEventListener('click', resetGame);
mobileResetBtn.addEventListener('click',resetGame);

