document.querySelector(".human-left").addEventListener("click", () => changeHand(leftHand));
document.querySelector(".human-right").addEventListener("click", () => changeHand(rightHand));
document.querySelector(".setter").addEventListener("click", afterSet);
document.querySelector(".play-left").addEventListener("click", () => playHand(leftHand));
document.querySelector(".play-right").addEventListener("click", () => playHand(rightHand));
document.querySelector(".play-top").addEventListener("click", () => playHand(leftHand));
document.querySelector(".play-bottom").addEventListener("click", () => playHand(rightHand));
document.querySelector(".resetter").addEventListener("click", resetGame);

const leftHand = document.querySelector(".human-left");
const rightHand = document.querySelector(".human-right");

const setBtn = document.querySelector(".setter");
const resetBtn = document.querySelector(".resetter");

const pcLeft = document.querySelector(".computer-left");
const pcRight = document.querySelector(".computer-right");

const playLeftUtil = document.querySelector(".play-left");
const playRightUtil = document.querySelector(".play-right");
const playTopUtil = document.querySelector(".play-top");
const playBottomUtil = document.querySelector(".play-bottom");

var humanHand;
var computerHand;

function changeHand(hand) {
    var choice = window.getComputedStyle(hand).backgroundImage; 

    /* getComputedStyle() returns ACTUAL VALUE of defined CSS property */

    if (choice.includes("rock.png")) {
        hand.style.backgroundImage = 'url("./assets/paper.png")';
    } else if (choice.includes("paper.png")) {
        hand.style.backgroundImage = 'url("./assets/scissors.png")';
    } else {
        hand.style.backgroundImage = 'url("./assets/rock.png")';
    }
}

function afterSet() {
    setBtn.disabled = true;
    playLeftUtil.disabled = false;
    playRightUtil.disabled = false;
    playTopUtil.disabled = false;
    playBottomUtil.disabled = false;

    var randomRollLeft = Math.floor(Math.random() * 3); 
    var randomRollRight = Math.floor(Math.random() * 3); 

    switch (randomRollLeft) {
        case 0: pcLeft.style.backgroundImage='url("./assets/rock.png")'; break;
        case 1: pcLeft.style.backgroundImage='url("./assets/paper.png")'; break;
        case 2: pcLeft.style.backgroundImage='url("./assets/scissors.png")'; break;
    }
    
    switch (randomRollRight) {
        case 0: pcRight.style.backgroundImage='url("./assets/rock.png")'; break;
        case 1: pcRight.style.backgroundImage='url("./assets/paper.png")'; break;
        case 2: pcRight.style.backgroundImage='url("./assets/scissors.png")'; break;
    }

    leftHand.disabled = true; 
    rightHand.disabled = true;
    document.querySelector(".stage-prompt").textContent = "MINUS ONE!";
    document.querySelector(".stage-prompt").style.color = "red";
}

function disableHands() {
    leftHand.disabled = true; 
    rightHand.disabled = true; 
    playLeftUtil.disabled = true;
    playRightUtil.disabled = true;
    playTopUtil.disabled = true;
    playBottomUtil.disabled = true;
}

function playHand(hand) {

    disableHands(); // locks hand items from changing;
    
    if (hand.className.includes("left")) {
        changeBtnState(rightHand, "dim");
        humanHand = leftHand;
    }
    else if (hand.className.includes("right")) {
        changeBtnState(leftHand, "dim");
        humanHand = rightHand;
    }
    
    setBtn.disabled = true;
    pcPlay();

    var winner = checkWinner(humanHand, computerHand);

    setTimeout(() => {
        if (winner != "HUMAN" && winner != "COMPUTER")
            document.querySelector(".stage-prompt").textContent = "Tied Game!";
        else 
            document.querySelector(".stage-prompt").textContent = (`${winner} wins!`);
        resetBtn.disabled = false;
    }, 850); 
}

function changeBtnState(hand, mode) {
    if (mode === "dim") { hand.style.filter = "opacity(0.5)"; }
    else if (mode === "light") { hand.style.filter = "opacity(1)"; }
}

function pcPlay() {
    var playItem = Math.floor(Math.random() * 100); 
    switch (playItem % 2) {
        case 0: // even = play left
            changeBtnState(pcRight, "dim"); 
            computerHand = pcLeft;
            break; 
        case 1: // odd = play right
            changeBtnState(pcRight, "dim"); 
            computerHand = pcLeft;
            break;
    }
}

function checkWinner(humanHand, computerHand) {
    var winner;
    var humanChoice = window.getComputedStyle(humanHand).backgroundImage; 
    var compChoice = window.getComputedStyle(computerHand).backgroundImage; 

    if (humanChoice === compChoice) {
        winner = "NO ONE";
    }
    
    else if (humanChoice.includes("rock") && compChoice.includes("scissors")
    || humanChoice.includes("scissors") && compChoice.includes("paper")
    || humanChoice.includes("paper") && compChoice.includes("rock")) {
        winner = "HUMAN";
    }

    else {winner = "COMPUTER";}

    return winner;
}

function resetGame() {
    var hands = [leftHand, rightHand, pcLeft, pcRight];

    hands.forEach(element => {
        changeBtnState(element, "light");
    });
    document.querySelector(".stage-prompt").textContent = "SETTING STAGE";
    document.querySelector(".stage-prompt").style.color = "black";
    
    setBtn.disabled = false;
    leftHand.disabled = false; 
    rightHand.disabled = false;
    resetBtn.disabled = true;     
}

