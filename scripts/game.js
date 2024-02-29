const winningArray = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

let options;
let isRunning;
let turnNumber;
let gameNumber = 1;
let currentPlayerSymbol;
let currentPlayerName;

function initializeGame() {
  options = ["", "", "", "", "", "", "", "", ""];
  isRunning = true;
  turnNumber = 1;
  currentPlayerSymbol = 'X';
  currentPlayerName = (gameNumber % 2 === 1) ? player1Name : player2Name;

  gameContainerEl.innerHTML = `
    <h1 class="title js-title">Tic Tac Toe</h1>
    <div class="cell-container">
      <button class="cell js-cell"></button>
      <button class="cell js-cell"></button>
      <button class="cell js-cell"></button>
      <button class="cell js-cell"></button>
      <button class="cell js-cell"></button>
      <button class="cell js-cell"></button>
      <button class="cell js-cell"></button>
      <button class="cell js-cell"></button>
      <button class="cell js-cell"></button>
    </div>
    <div class="status js-status"></div>
    <button class="play-again-btn>
  `;

  const cellEl = document.querySelectorAll('.js-cell');
  const statusEl = document.querySelector('.js-status');

  statusEl.innerHTML = `${currentPlayerName}'s turn`;

  cellEl.forEach((cell, index) => {
    cell.addEventListener('mouseover', () => {
      mouseOver(cell, index);
    });
    cell.addEventListener('mouseleave', () => {
      mouseLeave(cell, index);
    });
    cell.addEventListener('click', () => {
      cellClicked(cell, index);
    });
  });

  function mouseOver(cell, index) {
    if (options[index] === '') {
      cell.classList.add('hover');
      cell.innerHTML = currentPlayerSymbol;
    }
  }
  
  function mouseLeave(cell, index) {
    cell.classList.remove('hover');
    if (options[index] === '') {
      cell.innerHTML = '';
    }
  }
  
  function cellClicked(cell, index) {
    if (options[index] === '') {
      updateCell(cell, index);
      cell.classList.remove('hover');
      
      if (checkWinner()) {
        isRunning = false;
        updateScore();
        displayStats(`${currentPlayerName} is the winner!`);
      } else {
        changePlayerSymbol();
        changePlayerName();
        if (statusEl.innerHTML === 'Error: That cell is not avaliable') {
          statusEl.classList.remove('error');
        }
        statusEl.innerHTML = `${currentPlayerName}'s turn`;
      }

      turnNumber++;
      if (isRunning && turnNumber > 9) {;
        updateScore();
        displayStats("It's a tie!");
      }
    } else {
      statusEl.classList.add('error');
      statusEl.innerHTML = 'Error: That cell is not avaliable';
    }
  }
  
  function updateCell(cell, index) {
    options[index] = currentPlayerSymbol;
    cell.classList.add(`${currentPlayerSymbol}`);
    cell.innerHTML = currentPlayerSymbol;
  }
  
  function changePlayerSymbol() {
    currentPlayerSymbol = (currentPlayerSymbol === 'X') ? 'O' : 'X';
  }

  function changePlayerName() {
    currentPlayerName = (currentPlayerName === player1Name) ? player2Name : player1Name;
  }
  
  function checkWinner() {
    for (let i = 0; i < winningArray.length; i++) {
      let winner = true;
      const array = winningArray[i];
      for (let j = 0; j < array.length - 1; j++) {
        if (options[array[j]] === "" || options[array[j]] !== options[array[j + 1]]) {
          winner = false;
        }
      }
  
      if (winner) {
        return true;
      }
    }
  
    return false;
  }

  function updateScore() {
    if (turnNumber <= 9) {
      if (currentPlayerName === player1Name) {
        player1Score++;
      } else {
        player2Score++;
      }
    } else {
      ties++;
    }
  }

  function displayStats(message) {
    gameContainerEl.innerHTML = `
      <h1 class="title js-title">${message}</h1>
      <div class="display-container">
        <div class="display-total-games">
          Total Games: ${gameNumber}
        </div>
        <div class="display-score">
          <div>${player1Name}: ${player1Score} win(s)</div>
          <div>Ties: ${ties}</div>
          <div>${player2Name}: ${player2Score} win(s)</div>
        </div>
        <button class="play-again-btn js-play-again-btn">
          Play again!
        </button>
      </div>
    `;

    const playAgainBtnEl = document.querySelector('.js-play-again-btn');

    playAgainBtnEl.addEventListener('click', restartGame);

    function restartGame() {
      gameNumber++;

      cellEl.forEach((cell, index) => {
        cell.innerHTML = '';
        if (cell.classList.contains('X')) {
          cell.classList.remove('X');
        } else if (cell.classList.contains('O')) {
          cell.classList.remove('O')
        }
      });

      initializeGame();
    }
  }
}