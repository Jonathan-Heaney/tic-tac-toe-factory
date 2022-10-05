'use strict';

const playerFactory = (playerName, letter) => {
  return { playerName, letter };
};

const gameBoard = (() => {
  const board = [];
  for (let i = 0; i < 9; i++) {
    board.push('');
  }

  const squares = document.querySelectorAll('.square');
  for (let i = 0; i < board.length; i++) {
    squares[i].textContent = board[i];
  }

  return { board, squares };
})();
