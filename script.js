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

  //   let winner;

  //   function checkWinner() {
  //     checkRowWinner();
  //     checkColumnWinner();
  //     checkDiagonalWinner();
  //     checkTie();
  //   }

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
    winConditions.forEach((item, index) => {
      if (
        gameBoard.board[item[0]] === this.activePlayer.letter &&
        gameBoard.board[item[1]] === this.activePlayer.letter &&
        gameBoard.board[item[2]] === this.activePlayer.letter
      ) {
        console.log('winner');
        turnDisplay.textContent = `${this.activePlayer.playerName} wins!`;
        console.log(activePlayer);
        this.winnerDeclared = true;
      }
    });
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

  function showWinner() {
    turnDisplay.textContent = `Player ${winner} has won!`;
  }

  return {
    activePlayer,
    switchTurn,
    updateTurnDisplay,
    checkWinner,
    remainingSpots,
    winnerDeclared,
    checkTie,
    declareTie,
  };
})();
