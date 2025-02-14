document.querySelector(".human-left").addEventListener("click", afterLeftClick);
document.querySelector(".human-right").addEventListener("click", afterRightClick);
document.querySelector(".setter").addEventListener("click", afterSet);
document.querySelector(".play-left").addEventListener("click", sendLeft);
document.querySelector(".play-right").addEventListener("click", sendRight);

const leftHand = document.querySelector(".human-left");
const rightHand = document.querySelector(".human-right");
const setBtn = document.querySelector(".setter");
const pcLeft = document.querySelector(".computer-left");
const pcRight = document.querySelector(".computer-right");

function afterLeftClick() {
    var choice = window.getComputedStyle(leftHand).backgroundImage; //apply tagged item

    /* getComputedStyle() returns ACTUAL VALUE of defined CSS property */

    if (choice.includes("rock.png")) {
        leftHand.style.backgroundImage = 'url("./assets/paper.png")';
    } else if (choice.includes("paper.png")) {
        leftHand.style.backgroundImage = 'url("./assets/scissors.png")';
    } else {
        leftHand.style.backgroundImage = 'url("./assets/rock.png")';
    }
}

function afterRightClick() {
    var choice = window.getComputedStyle(rightHand).backgroundImage; 

    if (choice.includes("rock.png")) {
        rightHand.style.backgroundImage = 'url("./assets/paper.png")';
    } else if (choice.includes("paper.png")) {
        rightHand.style.backgroundImage = 'url("./assets/scissors.png")';
    } else {
        rightHand.style.backgroundImage = 'url("./assets/rock.png")';
    }
}

function afterSet() {
    setBtn.disabled = true;
    document.querySelector(".play-left").disabled = false;
    document.querySelector(".play-right").disabled = false;
    document.querySelector(".stage-prompt").innerHTML = "MINUS ONE!";

    var randomRollLeft = Math.floor(Math.random() * 3); 
    var randomRollRight = Math.floor(Math.random() * 3); 

    switch (randomRollLeft) {
        case 0: pcLeft.style.backgroundImage='url("./assets/rock.png")'; break;
        case 1: pcLeft.style.backgroundImage='url("./assets/paper.png")'; break;
        case 2: pcLeft.style.backgroundImage='url("./assets/scissors.png")'; break;
    }
    switch (randomRollRight) {
        case 0: pcLeft.style.backgroundImage='url("./assets/rock.png")'; break;
        case 1: pcLeft.style.backgroundImage='url("./assets/paper.png")'; break;
        case 2: pcLeft.style.backgroundImage='url("./assets/scissors.png")';  break;
    }
}

function disableHands() {
    leftHand.disabled = true; 
    rightHand.disabled = true; 
    document.querySelector(".play-left").disabled = true;
    document.querySelector(".play-right").disabled = true;
}

function dimButton(hand) {
    hand.style.filter = "opacity(0.5)";
}

function sendLeft() {
    disableHands();
    dimButton(rightHand);
    setBtn.disabled = true;
    pcPlay();
}

function sendRight() {
    disableHands();
    dimButton(leftHand);
    setBtn.disabled = true;
    pcPlay();
}

function pcPlay() {
    var playItem = Math.floor(Math.random() * 2); 
    switch (playItem) {
        case 0: dimButton(pcLeft); break;
        case 1: dimButton(pcRight); break;
    }
}