'use strict';

const createPlayer = (playerName, letter) => {
  return { playerName, letter };
};

const gameBoard = (() => {
  const board = [];
  for (let i = 0; i < 9; i++) {
    board.push('');
  }

  const squares = document.querySelectorAll('.square');
  function displayBoard() {
    for (let i = 0; i < board.length; i++) {
      squares[i].textContent = board[i];
    }
  }

  squares.forEach((square) => {
    square.addEventListener('click', (e) => {
      if (board[`${e.target.id}`]) return;
      if (game.winnerDeclared) return;
      board[`${e.target.id}`] = `${game.activePlayer.letter}`;
      game.remainingSpots--;
      displayBoard();
      game.checkWinner();
      if (game.winnerDeclared === false) {
        if (game.remainingSpots > 0) {
          game.switchTurn();
          game.updateDisplay();
        } else {
          game.declareTie();
        }
      }
    });
  });

  return { board };
})();

const game = (() => {
  const playerOne = createPlayer('Player 1', 'X');
  const playerTwo = createPlayer('Player 2', 'O');

  let activePlayer = playerOne;
  let winnerDeclared = false;
  let remainingSpots = 9;

  function switchTurn() {
    if (this.activePlayer === playerOne) {
      this.activePlayer = playerTwo;
    } else this.activePlayer = playerOne;
  }

  const display = document.querySelector('.display');
  function updateDisplay() {
    display.textContent = `${this.activePlayer.playerName}'s Turn`;
  }

  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function checkWinner() {
    winConditions.forEach((item) => {
      if (
        gameBoard.board[item[0]] === gameBoard.board[item[1]] &&
        gameBoard.board[item[0]] === gameBoard.board[item[2]] &&
        gameBoard.board[item[0]]
      ) {
        display.textContent = `${this.activePlayer.playerName} wins!`;
        this.winnerDeclared = true;
      }
    });
  }

  function declareTie() {
    display.textContent = "It's a tie!";
  }

  return {
    activePlayer,
    switchTurn,
    updateDisplay,
    checkWinner,
    winnerDeclared,
    remainingSpots,
    declareTie,
  };
})();
