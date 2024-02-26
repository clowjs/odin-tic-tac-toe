const gameStartContainer = document.getElementById('gameStartContainer');
const gameBoardContainer = document.getElementById('gameBoardContainer');
const gameBoardTitle = document.getElementById('gameBoardTitle');
const currentPlayer = document.getElementById('currentPlayer');
const gameOverContainer = document.getElementById('gameOverContainer');
const board = document.getElementById('board');
const inputPlayerOne = document.getElementById('inputPlayerOne');
const inputPlayerTwo = document.getElementById('inputPlayerTwo');

const Gameboard = () => { 
  const state = [null, null, null, null, null, null, null, null, null];

  const displayBoard = () => {
    for (let i = 0; i < 3; i++) {
      let row = '';

      for (let j = 0; j < 3; j++) {
        row += state[i * 3 + j] ? state[i * 3 + j] : '-';
      }

      console.log(row);
    }
  }

  return { state, displayBoard };
};

const Player = (name, mark) => {
    return { name, mark };
};

const renderBoard = (state) => {
  board.innerHTML = '';

  state.forEach((cell, index) => {
    const cellElement = document.createElement('div');
    cellElement.classList.add('cell');
    cellElement.textContent = cell === null ? '' : cell;

    cellElement.addEventListener('click', () => {
      console.log(`Cell ${index} clicked!`);
    });
    board.appendChild(cellElement);
  });
}

const startGame = () => {
  const playerOne = inputPlayerTwo.value === ''
                    ? 'Player 1'
                    : inputPlayerTwo.value;

  const playerTwo = inputPlayerTwo.value === ''
                    ? 'Player 2'
                    : inputPlayerTwo.value;

                    
                    const game = (() => {
    const gameboard = Gameboard();
    const player1 = Player(playerOne, 'X');
    const player2 = Player(playerTwo, 'O');
    let currentPlayer = player1;
    
    const getCurrentPlayer = () => currentPlayer;
    
    const changePlayer = () => {
      currentPlayer = currentPlayer === player1 ? player2 : player1;
    };
  
    const makeMove = (index) => {
      if (gameboard.state[index] === null) {
        gameboard.state[index] = currentPlayer.mark;
        changePlayer();
      }
    };

    const checkWinner = () => {
      const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
      ];

      const state = gameboard.state;
      
      for (let i = 0; i < winningCombos.length; i++) {
        const [a, b, c] = winningCombos[i];
        if (state[a] && state[a] === state[b] && state[a] === state[c]) {
          return state[a];
        }
      }
    
      return null;
    }

    const checkDraw = () => {
      return gameboard.state.every(cell => cell !== null);
    }
    
    const endGame = () => {
      const winner = checkWinner();
      if (winner) {
        let player = winner === player1.mark ? player1 : player2;
        console.log('Game Over!')
        console.log(`Winner: ${player.name} (${player.mark})`);
      } else if (checkDraw()) {
        console.log('The game ended in a Draw!');
      }
    }

    return { gameboard, player1, player2, getCurrentPlayer, makeMove, checkWinner, checkDraw, endGame };
  })();

  renderBoard(game.gameboard.state);
  
  gameStartContainer.style.display = 'none';
  gameBoardContainer.style.display = 'flex';
  gameBoardTitle.textContent = `${playerOne} VS ${playerTwo}`;
  currentPlayer.textContent = `${game.getCurrentPlayer().name}'s turn (${game.getCurrentPlayer().mark})`;

  return game;
};

// startGame('Sergio', 'Luis');
