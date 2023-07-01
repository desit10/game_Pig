'use strict';

// Element selection
const score0Element = document.getElementById('score--0');
const score1Element = document.getElementById('score--1');
const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');
const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');

// Game initial conditions
let totalScores, currentScore, activePlayer, isPlaying;

const initGame = function () {
  totalScores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  isPlaying = true;

  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0Element.textContent = 0;
  current1Element.textContent = 0;
  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');
  player0Element.classList.remove('player--active');
  player1Element.classList.remove('player--active');
  player0Element.classList.add('player--active');
  diceElement.classList.add('hidden');
};

initGame();

const switchActivePlayer = () => {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};

// New game
btnNew.addEventListener('click', initGame);

// Roll the dice
btnRoll.addEventListener('click', () => {
  if (isPlaying === true) {
    // 1. Generate a random number
    const diceNumber = Math.trunc(Math.random() * 6) + 1;

    // 2. Display number on the dice
    diceElement.classList.remove('hidden');
    diceElement.src = `img/dice${diceNumber}.png`;

    // 3. If the is 1, switch to the next player, if not - add number to the current score
    if (diceNumber !== 1) {
      currentScore += diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }

    if (diceNumber == 1) {
      switchActivePlayer();
    }
  }
});

btnHold.addEventListener('click', () => {
  if (isPlaying === true) {
    // 1. Add current score to active player total score
    totalScores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScores[activePlayer];

    // 2. If total score of active player >= 100, active player won, if not - switch active player
    if (totalScores[activePlayer] >= 20) {
      isPlaying = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceElement.classList.add('hidden');
    }

    if (totalScores[activePlayer] < 20) {
      switchActivePlayer();
    }
  }
});
