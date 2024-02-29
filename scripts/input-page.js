const gameContainerEl = document.querySelector('.js-game-container');
const player1InputEl = document.querySelector('.js-input-1');
const player2InputEl = document.querySelector('.js-input-2');
const errorMessageEl = document.querySelector('.error');
const startBtnEl = document.querySelector('.js-start-btn');

let player1Name = '';
let player2Name = '';
let player1Score = 0;
let player2Score = 0;
let ties = 0;

player1InputEl.addEventListener('click', () => {
  errorMessageEl.innerHTML = '';
})
player2InputEl.addEventListener('click', () => {
  errorMessageEl.innerHTML = '';
})

startBtnEl.addEventListener('click', () => {
  player1Name = player1InputEl.value;
  player2Name = player2InputEl.value;
  if (player1Name && player2Name) {
    initializeGame();
  } else {
    errorMessageEl.innerHTML = 'Error: Please complete the fields above';
  }
});