const readline = require('readline');

// 1. Setup readline so we can talk with the user via terminal
const a = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 2. The computer picks a secret number between 1 and 100
const secretNumber = Math.floor(Math.random() * 100) + 1;

// 3. Counter to count valid guesses
let attempts = 0;

console.log("Welcome to the Number Guessing Game!");
console.log("I have picked a secret number between 1 and 100.\n");

function askGuess() {
  a.question("Enter your guess: ", (answer) => {
    // 1. Convert input string to a number (trim whitespace first)
    const guess = Number(answer.trim());

    if (isNaN(guess) || answer.trim() === "" || guess < 1 || guess > 100) {
      console.log("Invalid input! Please enter a number between 1 and 100.\n");
      askGuess(); // Ask again without incrementing attempts
      return;
    }

    // 3. Increment attempts for valid guess
    attempts++;

    // 4. Compare user guess with secret number
    if (guess > secretNumber) {
      console.log("Too high\n");
      askGuess(); // Ask again
    } else if (guess < secretNumber) {
      console.log("Too low\n");
      askGuess(); // Ask again
    } else {
      console.log(`Correct in ${attempts} tries!`);
      a.close(); // Close the input interface and exit the game
    }
  });
}

// Start the game!
askGuess();
