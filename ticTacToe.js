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
let trophy1 = document.getElementById('trophy1');
let trophy2 = document.getElementById('trophy2');

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
    static lastWinner = null;
    _score = 0;
    constructor(name) {
        this.fname = name.split(' ')[0][0].toUpperCase() + name.split(' ')[0].substr(1);
        if (name.includes(' ')) {
            this.lname = name.split(' ')[1][0].toUpperCase() + name.split(' ')[1].substr(1);
        }
    }

    setScore = function () {
        this._score = this._score + 1;
    }
    getScore = function () {
        return this._score;
    }
}

let player1 = null;
let player2 = null;

document.getElementById('script').addEventListener('load', () => {
    if (confirm('Do you want to Set Player Name?\nclick Cancel for Default Name')) {
        playerStarter(false);
    } else {
        playerStarter(true);
    }
});



function playerStarter(defName) {
    if (!player1 && !player2 && !defName) {
        let name1 = prompt('Enter First Player Name :');
        let name2 = prompt('Enter Second Player Name :');
        if (isNaN(Number(name1)) && isNaN(Number(name2))) {
            player1 = new Player(name1);
            player2 = new Player(name2);
        } else {
            if (confirm('Do you want to Set Player Name?\nclick Cancel for Default Name')) {
                playerStarter(false);
            } else {
                playerStarter(true);
            }
        }
    } else {
        player1 = new Player('player_A');
        player2 = new Player('Player_B')
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
            timer(2000);
            outer1.style.setProperty("--disp1", 'none');
            outer2.style.setProperty("--disp2", 'block');

        } else {
            box.innerText = 'X';
            turnO = true;
            timer(2000);
            outer1.style.setProperty("--disp1", 'block');
            outer2.style.setProperty("--disp2", 'none');
        }
        box.disabled = true;

        if (!checkWinner()) {
            let draw;
            setTimeout(() => {
                draw = isDraw();

                if (draw) {
                    if (confirm('The Game is Draw!\nStart new Game?')) {
                        resetGame();
                    }
                }
            }, 50);
        }

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
    msg.innerText = `Congratulation, Winner is \n ${winnerObj.fname + " " + (winnerObj.lname ?? '')}`;
    msg.style.marginTop = '30px';
    msgContainer.classList.remove('hide');
    disabledButtons();
    heading.style.display = 'none';
    resetContainer.style.display = 'none';
    mobileResetBtn.classList.remove('disp-responsive');
    newGameBtn.style.marginTop = '30px';
    outer1.style.setProperty("--disp1", 'none');
    outer2.style.setProperty("--disp2", 'none');
}

// function for checking winner
function checkWinner() {
    for (let pattern of winningPattern) {

        let pos1Value = boxes[pattern[0]].innerText;
        let pos2Value = boxes[pattern[1]].innerText;
        let pos3Value = boxes[pattern[2]].innerText;

        if (pos1Value != '' && pos2Value != '' && pos3Value != '') {
            if (pos1Value === pos2Value && pos2Value === pos3Value) {
                if (!Player.lastWinner) {
                    let winner;
                    if (pos1Value == 'O') {
                        trophy1.classList.add('disp-ib');
                        winner = 'player1';
                        showWinner(player1);
                    } else {
                        trophy1.classList.remove('disp-ib');
                        trophy2.classList.add('disp-ib');
                        winner = 'player2';
                        showWinner(player2);
                        outer1.style.setProperty("--disp1", 'none');
                        outer2.style.setProperty("--disp2", 'block');
                    }
                    Player.lastWinner = winner;
                } else if (Player.lastWinner === "player1") {
                    let winner;
                    if (pos1Value == 'O') {
                        trophy2.classList.remove('disp-ib');
                        trophy1.classList.add('disp-ib');
                        winner = 'player1';
                        showWinner(player1);
                        outer1.style.setProperty("--disp1", 'block');
                        outer2.style.setProperty("--disp2", 'none');
                    } else {
                        trophy1.classList.remove('disp-ib');
                        trophy2.classList.add('disp-ib');
                        winner = 'player2';
                        showWinner(player2);
                        outer2.style.setProperty("--disp2", 'block');
                        outer1.style.setProperty("--disp1", 'none');
                    }
                    Player.lastWinner = winner;
                } else if (Player.lastWinner === 'player2') {
                    let winner;
                    if (pos1Value == 'O') {
                        trophy1.classList.remove('disp-ib');
                        trophy2.classList.add('disp-ib');
                        winner = 'player2';
                        showWinner(player2);
                        outer2.style.setProperty("--disp2", 'block');
                        outer1.style.setProperty("--disp1", 'none');
                    } else {
                        trophy2.classList.remove('disp-ib');
                        trophy1.classList.add('disp-ib');
                        winner = 'player1';
                        showWinner(player1);
                        outer2.style.setProperty("--disp2", 'none');
                        outer1.style.setProperty("--disp1", 'block');
                    }
                    Player.lastWinner = winner;
                }

                return true;
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
    mobileResetBtn.classList.add('disp-responsive');
    // outer1.style.setProperty("--disp1", 'block');
    // outer2.style.setProperty("--disp2", 'none');
}

function showScore() {
    document.getElementById('p1-score').innerText = player1.getScore();
    document.getElementById('p2-score').innerText = player2.getScore();
}

function isDraw() {
    for (let i = 0; i < boxes.length; i++) {
        if (boxes[i].innerText === '') {
            return false;
        }
        if (i > 7 && boxes[i].innerText != '') {
            return true;
        }
    }

}
let interval = null;
function timer(ms) {
    if (interval) {
        clearInterval(interval);
        interval = null;
        intervalFunc(ms);
    } else {
        intervalFunc(ms);
    }

}

function intervalFunc(ms) {

    let width = 71;
    outer1.style.setProperty('--wd', `${width--}px`);
    outer2.style.setProperty('--wd', `${width--}px`);
    outer1.style.setProperty('--clr', `green`);
    outer2.style.setProperty('--clr', `green`);
    interval = setInterval(() => {
        if (ms > 57) {
            ms -= 57;
            console.log(ms);
            outer1.style.setProperty('--wd', `${width--}px`);
            outer2.style.setProperty('--wd', `${width--}px`);
            if (ms < 700) {
                outer1.style.setProperty('--clr', `red`);
                outer2.style.setProperty('--clr', `red`);
            } else {
                outer1.style.setProperty('--clr', `green`);
                outer2.style.setProperty('--clr', `green`);
            }

        } else {
            ms = 2000;
            width = 71;
        }
    }, 570);
}

// add event listener on newGame button
newGameBtn.addEventListener('click', resetGame);
resetBtn.addEventListener('click', resetGame);
mobileResetBtn.addEventListener('click', resetGame);

