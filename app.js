/*
GAME FUNCTION:
-PLAYER MUST GUESS A NUMBER BETWEEN A MIN AND MAX
-PLAYER GETS A CERTAIN AMOUNT OF GUESSES
-NOTIFY PLAYER OF GUESSES REMAINING
-NOTIFY THE PLAYER OF THE CORRECT ANSWER
-LET PLAYER CHOOSE TO PLAY AGAIN
*/


// GAME VALUES
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', function(e){
  if(e.target.className === 'play-again'){
    window.location.reload();
  }
});

// Listen for guess
guessBtn.addEventListener('click', function(){
  let guess = parseInt(guessInput.value);

  // Validate input
  if(isNaN(guess) || guess < min || guess > max){
    setMessage(`Please enter a number between ${min} and ${max}.`, 'red');
  }

  //Check if won
  if(guess === winningNum){
    gameOver(true, `${winningNum} is correct, you win!`);
  } else {
    guessesLeft -= 1;

    if(guessesLeft === 0){
      gameOver(false, `Game over, you lost. The correct number was ${winningNum}.`);
    } else {
      // Game continues
      guessInput.style.borderColor = 'red';
      // Clear input
      guessInput.value = '';
      // Tell user their guess is incorrect
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left.`);
    }
  }
});

// Game over
function gameOver(won, msg){
  let color;
  won === true ? color = 'green' : color = 'red';

  // Disable input
  guessInput.disabled = true;
  // Change border color to green
  guessInput.style.borderColor = color;
  // Set text color
  message.style.color = color;
  // Set message
  setMessage(msg);

  // Play again?
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';

}

// Get Winning Number
function getRandomNum(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Set message
function setMessage(msg, color){
  message.style.color = color;
  message.textContent = msg;
}