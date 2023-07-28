'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0'); // score 0 element
const score1El = document.getElementById('score--1'); // querySelector ile aynı çalışır.
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

// functions
const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;

  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Starting Conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const newGame = function () {
  btnHold.classList.remove('hidden');
  btnRoll.classList.remove('hidden');

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');
  activePlayer = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
  currentScore = 0;
  for (let i = 0; i < scores.length; i++) {
    scores[i] = 0;
    document.querySelector(`#score--${i}`).textContent = scores[i];
    document.querySelector(`#current--${i}`).textContent = 0;
  }

  playing = true;
};

const scores = [0, 0]; // scores of Player 1 and 2
let currentScore = 0;
let activePlayer = 0; // 0 is Player 1 , 1 is Player 2
let playing = true;

// Rolling dice functionality

btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for  rolled 1: if ture,
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

// Holding functionality

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. Add current score to active player's score.
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      //win the game
      playing = false;
      diceEl.classList.add('hidden');

      btnHold.classList.add('hidden');
      btnRoll.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

// Resetting the game

btnNew.addEventListener('click', newGame);
