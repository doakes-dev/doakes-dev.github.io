// Event Listeners
document.querySelector("#guessBtn").addEventListener("click", checkGuess);
document.querySelector("#resetBtn").addEventListener("click", initializeGame);

// Global Variables
let randomNumber;
let attempts;
let wins;
let losses;

initializeGame();

function initializeGame() {
    randomNumber = Math.floor(Math.random() * 99) + 1;
    console.log("randomNumber: " + randomNumber)
    attempts = 0;
    losses = 0;
    wins = 0;
    document.querySelector("#attemptCount").textContent = attempts;
    document.querySelector("#lossCount").textContent = losses;
    document.querySelector("#winCount").textContent = wins;

    //hiding the Reset button
    document.querySelector("#resetBtn").style.display = "none";

    //showing the Guess button
    document.querySelector("#guessBtn").style.display = "inline";

    let playerGuess = document.querySelector("#playerGuess");
    playerGuess.focus(); //adding focus to textbox
    playerGuess.value = ""; //clears the textbox

    let feedback = document.querySelector("#feedback");
    feedback.textContent = ""; //clears the feedback

    //clears previous guesses
    document.querySelector("#guesses").textContent = "";
}

function checkGuess() {
    let feedback = document.querySelector("#feedback");
    feedback.textContent = "";
    let guess = document.querySelector("#playerGuess").value;
    console.log("Player guess: " + guess);
    if (guess < 1 || guess > 99) {
        feedback.textContent = "Enter a number between 1 and 99";
        feedback.style.color = "red";
        return;
    }
    attempts++;
    document.querySelector("#attemptCount").textContent = attempts;
    console.log("Attempts: " + attempts);
    feedback.style.color = "orange";
    if (guess == randomNumber) {
        feedback.textContent = "You've guessed it! You Won!";
        feedback.style.color = "#00b4d8";
        wins++;
        document.querySelector("#winCount").textContent = wins;
        gameOver();
    } else {
        document.querySelector("#guesses").textContent += guess + " ";
        if (attempts == 7) {
            feedback.textContent = "Sorry, you lost! The number was: " + randomNumber;
            feedback.style.color = "red";
            losses++;
            document.querySelector("#lossCount").textContent = losses;
            gameOver();
        } else if (guess > randomNumber) {
            feedback.textContent = "Guess was high";
        } else {
            feedback.textContent = "Guess was low";
        }
    }
}

function gameOver() {
    let guessBtn = document.querySelector("#guessBtn");
    let resetBtn = document.querySelector("#resetBtn");
    guessBtn.style.display = "none";   // hides Guess button
    resetBtn.style.display = "inline"; // displays Reset button
}