// Plays "Nessun Dorma" in the background, the same music playing while
// Kim Jeong-rae and Choi Woo-seok played this same game in Season 2: Episode 1,
// of 'Squid Game'.
var music = document.querySelector(".music");
music.play();

// Adding event listeners for each button available.
document.querySelector(".human-left").addEventListener("click", () => changeHand(leftHand));
document.querySelector(".human-right").addEventListener("click", () => changeHand(rightHand));

document.querySelector(".play-left").addEventListener("click", () => playHand(leftHand));
document.querySelector(".play-right").addEventListener("click", () => playHand(rightHand));
document.querySelector(".play-top").addEventListener("click", () => playHand(leftHand));
document.querySelector(".play-bottom").addEventListener("click", () => playHand(rightHand));

// There are two different 'setter' and 'resetter' buttons which the player may notice
// when resizing their screen during play. We use a forEach loop to apply the same
// event listener to all instances of these resective buttons.
document.querySelectorAll(".setter").forEach(btn => btn.addEventListener("click", afterSet));
document.querySelectorAll(".resetter").forEach(btn => btn.addEventListener("click", resetGame));

// Defining constant variables for hand buttons and utility buttons for shorter
// code length moving forward.
const leftHand = document.querySelector(".human-left");
const rightHand = document.querySelector(".human-right");

const setBtn = document.querySelectorAll(".setter");
const resetBtn = document.querySelectorAll(".resetter");

const pcLeft = document.querySelector(".computer-left");
const pcRight = document.querySelector(".computer-right");

const playLeftUtil = document.querySelector(".play-left");
const playRightUtil = document.querySelector(".play-right");
const playTopUtil = document.querySelector(".play-top");
const playBottomUtil = document.querySelector(".play-bottom");

var humanHand;
var computerHand;

var humanScore = 0;
var computerScore = 0;

function changeHand(hand) {
    var choice = window.getComputedStyle(hand).backgroundImage; 

    /* getComputedStyle() returns ACTUAL VALUE of defined CSS property */

    // Changes the play item image when player clicks on their own hand buttons.
    if (choice.includes("rock.png")) {
        hand.style.backgroundImage = 'url("./assets/paper.png")';
    } else if (choice.includes("paper.png")) {
        hand.style.backgroundImage = 'url("./assets/scissors.png")';
    } else {
        hand.style.backgroundImage = 'url("./assets/rock.png")';
    }
}

function afterSet() {
    setBtn.forEach(btn => btn.disabled = true);
    playLeftUtil.disabled = false;
    playRightUtil.disabled = false;
    playTopUtil.disabled = false;
    playBottomUtil.disabled = false;

    // Let computer pick between 0-2 for the item it's going to play.
    var randomRollLeft = Math.floor(Math.random() * 3); 
    var randomRollRight = Math.floor(Math.random() * 3); 

    // Assigns pictures to respective choices.
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

    // Sets CSS for the left and right hands of the computer. Initially, the image
    // is hidden as, logically, you will not see an opponent's hand before the game
    // commences, nor can you see them change hands after you whip them out (in the 
    // case of image randomizer argument).

    var pcHands = [pcLeft, pcRight];
    pcHands.forEach(hand => {
        hand.style.backgroundRepeat = 'no-repeat';
        hand.style.backgroundPosition = 'center';
        hand.style.backgroundSize = 'contain';
    })

    // Disables further adjustment on player side after computer makes its choice.
    leftHand.disabled = true; 
    rightHand.disabled = true;

    // Initiates a "Minus One" prompt for the player to select the hand they wish
    // to play. Turns the text red to add to the tension.
    document.querySelector(".stage-prompt").textContent = "MINUS ONE!";
    document.querySelector(".stage-prompt").style.color = "red";
}

function disableHands() {

    var hands = [leftHand, rightHand, playLeftUtil, playRightUtil, playTopUtil, playBottomUtil];

    hands.forEach(hand => hand.disabled = true);
}

function playHand(hand) {

    disableHands(); // locks hand items from changing;
    
    // Dims the image of the hand opposite to what is selected for play.
    if (hand.className.includes("left")) {
        changeBtnState(rightHand, "dim");
        humanHand = leftHand;
    }
    else if (hand.className.includes("right")) {
        changeBtnState(leftHand, "dim");
        humanHand = rightHand;
    }
    
    setBtn.forEach(btn => btn.disabled = true);

    pcPlay(); // Lets PC pick its choice.

    var winner = checkWinner(humanHand, computerHand);

    // Scoring system for the game. No upper limit set at the moment.
    // [OPTIONAL]: Might implement Russian Roulette system later.
    switch (winner) {
        case "HUMAN": humanScore++; break;
        case "COMPUTER": computerScore++; break;
        default: break;
    }

    // Sets post-game notification messages and states.
    setTimeout(() => {
        if (winner != "HUMAN" && winner != "COMPUTER")
            document.querySelector(".stage-prompt").textContent = "Tied Game!";
        else 
            document.querySelector(".stage-prompt").textContent = (`${winner} wins!`);
    }, 850); 

    setTimeout(() => {
        alert(`COMPUTER SCORE: ${computerScore} || HUMAN SCORE: ${humanScore}`);
        resetBtn.forEach(btn => btn.disabled = false);
    }, 1500)
}

function changeBtnState(hand, mode) {

    // DOM Manipulation on image opacity depending on what hand the human
    // or computer plays.

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

    // Extract the image the human and computer players pick.
    var humanChoice = window.getComputedStyle(humanHand).backgroundImage; 
    var compChoice = window.getComputedStyle(computerHand).backgroundImage; 

    // Compare image values. Evaluate winner.
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

    // Removes dim-opacity DOM manipulation from earlier.
    hands.forEach(element => {
        changeBtnState(element, "light");
    });
    document.querySelector(".stage-prompt").textContent = "SETTING STAGE";
    document.querySelector(".stage-prompt").style.color = "black";
    
    // Fixes buttons back to initial state.
    setBtn.forEach(btn => btn.disabled = false);
    leftHand.disabled = false; 
    rightHand.disabled = false;
    resetBtn.forEach(btn => btn.disabled = true);   


    var pcHands = [pcLeft, pcRight];

    // Hides PC's hands again, based on initial state.
    pcHands.forEach(hand => {
        hand.style.backgroundImage = 'none';
        hand.style.backgroundColor = 'black';
    })
}

