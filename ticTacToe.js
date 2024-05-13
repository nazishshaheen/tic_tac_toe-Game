let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('.reset-button');
let newGameBtn = document.querySelector('.new-button');
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector('.msg')

// player O
let turnO = true;

// create a 2D array
let winningPattern = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
]

boxes.forEach((box) => {
    box.addEventListener('click',() =>{
        if (turnO) {
            box.innerText = 'O';
            turnO = false;
        }else{
            box.innerText = 'X';
            turnO = true;
        }
        box.disabled = true;

        checkWinner();
    });
});

// function for disabling buttons after getting winner
function disabledButtons() {
    for(let box of boxes){
        box.disabled = true;
    }
}

// function for enabling buttons for new game
function enableButtons(){
    for(let box of boxes){
        box.disabled = false;
        box.innerText = '';
    }
}

// function for showing winner
function showWinner(winner) {
    msg.innerText = `Congratulation, Winner is ${winner}`;
    msgContainer.classList.remove('hide');
    disabledButtons();
}

// function for checking winner
function checkWinner(){
    for(let pattern of winningPattern){
        // console.log(pattern[0],pattern[1],pattern[2]);
        // console.log(boxes[pattern[0]].innerText,boxes[pattern[1]].innerText,boxes[pattern[2]].innerText);
        let pos1Value = boxes[pattern[0]].innerText;
        let pos2Value = boxes[pattern[1]].innerText;
        let pos3Value = boxes[pattern[2]].innerText;

        if (pos1Value != '' && pos2Value != '' && pos3Value != '') {
            if (pos1Value === pos2Value && pos2Value === pos3Value) {
                showWinner(pos1Value);
            }   
        }
    }
}

// function for reset game
function resetGame() {
    turnO = true;
    enableButtons();
    msgContainer.classList.add('hide');
} 

// add event listener on newGame button
newGameBtn.addEventListener('click',resetGame);
resetBtn.addEventListener('click',resetGame);
