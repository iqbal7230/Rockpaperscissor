
document.querySelector('.rock-button').addEventListener('click', () => {
    playgame('rock');
    
});
document.querySelector('.paper-button').addEventListener('click', () => {
    playgame('paper');
})
document.querySelector('.scissor-button').addEventListener('click', () => {
    playgame('scissor');
})
document.querySelector('.reset-button').addEventListener('click', () => {
    confreset();
})
document.querySelector('.Auto-button').addEventListener('click', () => {
    autobutton();
});

// score counting intializing
let score = JSON.parse(localStorage.getItem('score')) || {
    win: 0,
    loss: 0,
    tie: 0,
};

// this is auto computer choice
function pickComputerMove() {
    const randomNumber = Math.random();
    let computerMove = ' ';
    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = 'rock';
    }
    else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = 'paper';
    }
    else if (randomNumber >= 2 / 3 && randomNumber < 1) {
        computerMove = 'scissor';
    }
    return computerMove;
}

// this player choice
function playgame(playerMove) {
    const computerMove = pickComputerMove();
    let result = ' ';

    if (playerMove === 'scissor') {
        if (computerMove === 'rock') {
            result = 'You Lose';
        }
        else if (computerMove === 'paper') {
            result = "You win";
        }
        else if (computerMove === 'scissor') {
            result = "Tie";
        }
    }
    else if (playerMove === 'paper') {
        if (computerMove === 'rock') {
            result = 'You win';
        }
        else if (computerMove === "scissor") {
            result = "You Lose";
        }
        else if (computerMove === 'paper') {
            result = "Tie";
        }
    }
    else if (playerMove === 'rock') {
        if (computerMove === "rock") {
            result = 'Tie';
        }
        else if (computerMove === 'paper') {
            result = "You Lose";
        }
        else if (computerMove === 'scissor') {
            result = "You win";
        }

    }


    // result 

    updateresult();
    if (result === 'You win') {
        score.win += 1;
    }
    else if (result === 'You Lose') {
        score.loss += 1;
    }
    else if (result === 'Tie') {
        score.tie += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));
    updateresult();
    document.querySelector('.result').innerHTML = result;


    // to show moves
    document.querySelector('.moves').innerHTML = `You: ${playerMove} &nbsp &nbsp&nbsp&nbsp Computer: ${computerMove}`
}

// update  result
function updateresult() {
    document.querySelector('.score').innerHTML = `Win: ${score.win}, Loss: ${score.loss}, Tie: ${score.tie}`;
}
function confreset() {
    confirm("Do you really want to reset");
    if (true) {
        reset();
    }
}
function reset() {
    score.win = 0;
    score.loss = 0;
    score.tie = 0;

    localStorage.removeItem('score');
    updateresult();
}
// Auto play code
let autoPlayInterval; // Declare autoPlayInterval outside the function to maintain its state
let isAutoPlaying = false; // Use isAutoPlaying to keep track of auto play state

function autobutton() {
    const autoButton = document.querySelector('.Auto-button');
    
    if (!isAutoPlaying) {
        autoPlayInterval = setInterval(() => {
            const playerMove = pickComputerMove();
            playgame(playerMove);
        }, 1000);
        isAutoPlaying = true;
        autoButton.innerHTML = 'Stop Playing';
    } else {
        clearInterval(autoPlayInterval);
        isAutoPlaying = false;
        autoButton.innerHTML = 'Auto Play';
    }
}
//play by button
document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r'){
        playgame('rock');
    }
    else if (event.key === 'p'){
        playgame('paper');
    }
    else if (event.key === 's'){
        playgame('scissor')
    }
});
