let randomNum = parseInt(Math.random() * 100 + 1);

const submit = document.querySelector("#subt");
const userInput = document.querySelector("#guessField");
const guessSlot = document.querySelector(".guesses");
const remaining = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");
const startOver = document.querySelector(".resultParas");

const p = document.createElement("p");

let prevGuess = [];
let numGuess = 0;
let playGame = true;

if (playGame) {
  submit.addEventListener("click", function (e) {
    e.preventDefault();
    const userGuess = parseInt(userInput.value);
    validateGuess(userGuess);
  });
}

function validateGuess(userGuess) {
  if (isNaN(userGuess)) {
    alert("Please enter a number");
  } else if (userGuess < 1 || userGuess > 100) {
    alert("Please enter a number between 1 and 100");
  } else {
    prevGuess.push(userGuess);
    numGuess++; // Increment guess count here

    if (numGuess === 10) {
      displayGuess(userGuess);
      displayMsg(`Game Over! Random number was ${randomNum}`);
      endGame();
    } else {
      displayGuess(userGuess);
      checkGuess(userGuess);
    }
  }
}

function checkGuess(guess) {
  if (guess === randomNum) {
    displayMsg(`Congratulations! You found the number in ${numGuess} guesses.`);
    endGame();
  } else if (guess < randomNum) {
    displayMsg("Too low!");
  } else if (guess > randomNum) {
    displayMsg("Too high!");
  }
}

function displayGuess(guess) {
  userInput.value = "";
  guessSlot.innerHTML += `${guess}, `;
  remaining.innerHTML = `${10 - numGuess}`;
}

function displayMsg(message) {
  lowOrHi.innerHTML = `<h2>${message}</h2>`;
}

function endGame() {
  submit.disabled = true;
  userInput.disabled = true; // Disable input field after game ends
  p.classList.add("button");
  p.innerHTML = `<h2 id="newGame">Start new Game</h2>`;
  startOver.appendChild(p);
  playGame = false;
  newGame();
}

function newGame() {
  const newGameBtn = document.querySelector("#newGame");
  newGameBtn.addEventListener("click", () => {
    randomNum = Math.floor(Math.random() * 100) + 1;
    numGuess = 0;
    prevGuess = [];
    guessSlot.innerHTML = "";
    lowOrHi.innerHTML = "";
    remaining.innerHTML = "10";
    userInput.value = "";
    userInput.disabled = false; // Enable input field for new game
    submit.disabled = false; // Enable submit button
    startOver.removeChild(p);
    playGame = true;
  });
}
