'use strict';

/*
console.log(document.querySelector('.message').textContent);

document.querySelector('.message').textContent = '🎉 Correct Number !';

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10;

document.querySelector('.guess').value = 23;
console.log(document.querySelector('.guess').value); // value : to get the actual value from the <input> tag.
*/

// .addEventListener(first arg, second arg)  The first arg, we had the name of the event that we're listening for,which is a click. The second arg, we have the function value to execute whenever the event happens.

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
document.querySelector('.score').textContent = score;

let highscore = 0;
document.querySelector('.highscore').textContent = highscore;

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  // !guess = input girilmeden check'e basıldığı zaman guess 0'a eşit oluyor. 0 = false, input girilip basıldığındaysa girilen değere eşit olduğu için guess 0'dan başka bir sayıya dönüyor ve true döndürüyor.

  //when there is no input
  if (!guess) {
    // document.querySelector('.message').textContent = '🛑 No Number !';
    displayMessage('🛑 No Number !');
  }

  // When player wins
  else if (guess === secretNumber) {
    // document.querySelector('.message').textContent = '🎉 Correct Number !';
    displayMessage('🎉 Correct Number !');

    document.querySelector('.number').textContent = secretNumber;
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';

    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
  }

  // When guess is wrong
  else if (guess !== secretNumber) {
    if (score > 1) {
      // document.querySelector('.message').textContent =
      //   guess < secretNumber ? '📉 Too Low ! ' : '📈 Too High ! ';
      displayMessage(guess < secretNumber ? '📉 Too Low ! ' : '📈 Too High ! ');
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      // document.querySelector('.message').textContent = '💣 You lost the game !';
      displayMessage('💣 You lost the game !');
      document.querySelector('.score').textContent = 0;
    }
  }

  // When guess is too low
  // else if (guess < secretNumber) {
  //   if (score > 1) {
  //     document.querySelector('.message').textContent = '📉 Too Low ! ';
  //     score--;
  //     document.querySelector('.score').textContent = score;
  //   } else {
  //     document.querySelector('.message').textContent = '💣 You lost the game !';
  //     document.querySelector('.score').textContent = 0;
  //   }
  // }
  // // When guess is too high
  // else if (guess > secretNumber) {
  //   if (score > 1) {
  //     document.querySelector('.message').textContent = '📈 Too High ! ';
  //     score--;
  //     document.querySelector('.score').textContent = score;
  //   } else {
  //     document.querySelector('.message').textContent = '💣 You lost the game !';
  //     document.querySelector('.score').textContent = 0;
  //   }
  // }
});

document.querySelector('.again').addEventListener('click', function () {
  document.querySelector('body').style.backgroundColor = '#222';

  // new random secret number
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.number').style.width = '15rem';

  // reset the score
  score = 20;
  document.querySelector('.score').textContent = score;

  // reset the message
  // document.querySelector('.message').textContent = 'Start guessing...';
  displayMessage('🕵️‍♀️ Start guessing...');

  // reset the guess input
  document.querySelector('.guess').value = '';
});
