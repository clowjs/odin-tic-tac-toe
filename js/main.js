const gameStartContainer = document.getElementById('gameStartContainer');
const gameBoardContainer = document.getElementById('gameBoardContainer');
const gameBoardTitle = document.getElementById('gameBoardTitle');
const currentPlayer = document.getElementById('currentPlayer');
const gameOverContainer = document.getElementById('gameOverContainer');
const board = document.getElementById('board');
const inputPlayerOne = document.getElementById('inputPlayerOne');
const inputPlayerTwo = document.getElementById('inputPlayerTwo');
const winner = document.getElementById('winner');
let gameInstance = null;

function handleClick(index) {
  return function() {
    gameInstance.makeMove(index);
    gameInstance.render();
    currentPlayer.textContent = `${gameInstance.getCurrentPlayer().name}'s turn (${gameInstance.getCurrentPlayer().mark})`;
  }
}

const GameBoard = () => { 
  const state = [null, null, null, null, null, null, null, null, null];

  const render = () => {
    board.innerHTML = '';
  
    state.forEach((cell, index) => {
      const cellElement = document.createElement('div');
      cellElement.classList.add('cell');
      cellElement.textContent = cell === null ? '' : cell;
  
      cellElement.addEventListener('click', handleClick(index));
      board.appendChild(cellElement);
    });
  }

  return { state, render };
};

const Player = (name, mark) => {
    return { name, mark };
};

const Game = (playerOne, playerTwo) => {
  const board = GameBoard();
  const player1 = Player(playerOne, 'X');
  const player2 = Player(playerTwo, 'O');
  let currentPlayer = player1;

  const getCurrentPlayer = () => currentPlayer;

  const makeMove = (index) => {
    if (board.state[index] !== null) {
      console.log('Cell already taken!');
      return
    }

    board.state[index] = currentPlayer.mark;
    currentPlayer = currentPlayer === player1 ? player2 : player1;

    if (checkWinner() || checkDraw()) {
      endGame();
    }
  };

  const checkWinner = () => {
    const winningCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    const state = board.state;
    
    for (let i = 0; i < winningCombos.length; i++) {
      const [a, b, c] = winningCombos[i];
      if (state[a] && state[a] === state[b] && state[a] === state[c]) {
        return state[a];
      }
    }
  
    return null;
  };

  const checkDraw = () => {
    return board.state.every(cell => cell !== null);
  };

  const endGame = () => {
    const gameWinner = checkWinner();

    if (gameWinner) {
      let player = gameWinner === player1.mark ? player1 : player2;
      winner.textContent = `${player.name} (${player.mark}) wins!`;

      gameStartContainer.style.display = 'none';
      gameBoardContainer.style.display = 'none';
      gameOverContainer.style.display = 'flex';
 
    } else if (checkDraw()) {
      winner.textContent = 'It\'s a draw!';

      gameStartContainer.style.display = 'none';
      gameBoardContainer.style.display = 'none';
      gameOverContainer.style.display = 'flex';
    }

    game = null;
  };

  return { getCurrentPlayer, makeMove, checkWinner, checkDraw, endGame, render: board.render }

};

function playAgain() {
  inputPlayerOne.value = '';
  inputPlayerTwo.value = '';
  gameStartContainer.style.display = 'flex';
  gameBoardContainer.style.display = 'none';
  gameOverContainer.style.display = 'none';
}

function startGame() {
  const playerOne = inputPlayerOne.value === ''
                    ? 'Player 1'
                    : inputPlayerOne.value;

  const playerTwo = inputPlayerTwo.value === ''
                    ? 'Player 2'
                    : inputPlayerTwo.value;

                    
  gameInstance = Game(playerOne, playerTwo);

  gameInstance.render();

  
  gameBoardTitle.textContent = `${playerOne} VS ${playerTwo}`;
  currentPlayer.textContent = `${gameInstance.getCurrentPlayer().name}'s turn (${gameInstance.getCurrentPlayer().mark})`;
  
  gameStartContainer.style.display = 'none';
  gameOverContainer.style.display = 'none';
  gameBoardContainer.style.display = 'flex';
}