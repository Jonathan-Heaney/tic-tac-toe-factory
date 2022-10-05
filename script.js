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
      //   if (game.winner) return;
      board[`${e.target.id}`] = `${game.activePlayer.letter}`;
      displayBoard();
      game.switchTurn();
      game.updateTurnDisplay();
      game.checkWinner();
    });
  });

  return { board };
})();

const game = (() => {
  const playerOne = createPlayer('Player 1', 'X');
  const playerTwo = createPlayer('Player 2', 'O');

  let activePlayer = playerOne;

  function switchTurn() {
    if (this.activePlayer === playerOne) {
      this.activePlayer = playerTwo;
    } else this.activePlayer = playerOne;
  }

  const turnDisplay = document.querySelector('.turn');
  function updateTurnDisplay() {
    turnDisplay.textContent = `${this.activePlayer.playerName}'s Turn`;
  }

  let winner;

  function checkWinner() {
    checkRowWinner();
    checkColumnWinner();
    checkDiagonalWinner();
    checkDraw();
  }

  function checkRowWinner() {
    if (
      gameBoard.board[0] === gameBoard.board[1] &&
      gameBoard.board[0] === gameBoard.board[2] &&
      gameBoard.board[0]
    ) {
      winner = `${gameBoard.board[0]}`;
      showWinner();
    } else if (
      gameBoard.board[3] === gameBoard.board[4] &&
      gameBoard.board[3] === gameBoard.board[5] &&
      gameBoard.board[3]
    ) {
      winner = `${gameBoard.board[3]}`;
      showWinner();
    } else if (
      gameBoard.board[6] === gameBoard.board[7] &&
      gameBoard.board[6] === gameBoard.board[8] &&
      gameBoard.board[6]
    ) {
      winner = `${gameBoard.board[6]}`;
      showWinner();
    }
  }

  function checkColumnWinner() {
    if (
      gameBoard.board[0] === gameBoard.board[3] &&
      gameBoard.board[0] === gameBoard.board[6] &&
      gameBoard.board[0]
    ) {
      winner = `${gameBoard.board[0]}`;
      showWinner();
    } else if (
      gameBoard.board[1] === gameBoard.board[4] &&
      gameBoard.board[1] === gameBoard.board[7] &&
      gameBoard.board[1]
    ) {
      winner = `${gameBoard.board[1]}`;
      showWinner();
    } else if (
      gameBoard.board[2] === gameBoard.board[5] &&
      gameBoard.board[2] === gameBoard.board[8] &&
      gameBoard.board[2]
    ) {
      winner = `${gameBoard.board[2]}`;
      showWinner();
    }
  }

  function checkDiagonalWinner() {
    if (
      gameBoard.board[0] === gameBoard.board[4] &&
      gameBoard.board[0] === gameBoard.board[8] &&
      gameBoard.board[0]
    ) {
      winner = `${gameBoard.board[0]}`;
      showWinner();
    } else if (
      gameBoard.board[2] === gameBoard.board[4] &&
      gameBoard.board[2] === gameBoard.board[6] &&
      gameBoard.board[2]
    ) {
      winner = `${gameBoard.board[2]}`;
      showWinner();
    }
  }

  let filled;
  function checkDraw() {
    for (let i = 0; i < gameBoard.board.length; i++) {
      if (!gameBoard.board[i]) {
        filled = false;
        break;
      } else filled = true;
    }
    if (filled && !winner) {
      turnDisplay.textContent = "It's a tie!";
    }
  }

  function showWinner() {
    turnDisplay.textContent = `Player ${winner} has won!`;
  }

  return {
    activePlayer,
    switchTurn,
    updateTurnDisplay,
    checkWinner,
    winner,
    checkDraw,
    showWinner,
  };
})();
