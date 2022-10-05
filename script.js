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
      if (this.winnerDeclared) return;
      board[`${e.target.id}`] = `${game.activePlayer.letter}`;
      game.remainingSpots--;
      displayBoard();
      game.checkWinner();
      if (game.winnerDeclared === false) {
        if (game.remainingSpots > 0) {
          game.switchTurn();
          game.updateTurnDisplay();
          console.log(game.remainingSpots);
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

  const turnDisplay = document.querySelector('.turn');
  function updateTurnDisplay() {
    turnDisplay.textContent = `${this.activePlayer.playerName}'s Turn`;
  }

  let winner;

  function checkWinner() {
    checkRowWinner();
    checkColumnWinner();
    checkDiagonalWinner();
    checkTie();
  }

  function checkRowWinner() {
    if (
      gameBoard.board[0] === gameBoard.board[1] &&
      gameBoard.board[0] === gameBoard.board[2] &&
      gameBoard.board[0]
    ) {
      winner = `${gameBoard.board[0]}`;
      showWinner();
      this.winnerDeclared = true;
    } else if (
      gameBoard.board[3] === gameBoard.board[4] &&
      gameBoard.board[3] === gameBoard.board[5] &&
      gameBoard.board[3]
    ) {
      winner = `${gameBoard.board[3]}`;
      showWinner();
      winnerDeclared = true;
    } else if (
      gameBoard.board[6] === gameBoard.board[7] &&
      gameBoard.board[6] === gameBoard.board[8] &&
      gameBoard.board[6]
    ) {
      winner = `${gameBoard.board[6]}`;
      showWinner();
      winnerDeclared = true;
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

  function checkTie() {
    if (remainingSpots === 0) {
      declareTie();
      console.log('Tie');
    }
  }

  function declareTie() {
    turnDisplay.textContent = "It's a tie!";
    console.log('declare');
  }

  //   let filled;
  //   function checkDraw() {
  //     for (let i = 0; i < gameBoard.board.length; i++) {
  //       if (!gameBoard.board[i]) {
  //         filled = false;
  //         break;
  //       } else filled = true;
  //     }
  //     if (filled && !winner) {
  //     }
  //   }

  function showWinner() {
    turnDisplay.textContent = `Player ${winner} has won!`;
  }

  return {
    activePlayer,
    switchTurn,
    updateTurnDisplay,
    checkWinner,
    winner,
    // checkDraw,
    showWinner,
    remainingSpots,
    winnerDeclared,
    checkTie,
    declareTie,
  };
})();
