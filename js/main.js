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

const startGame = (playerOne, playerTwo) => {
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

  console.log(`Game Started!`);
  console.log(`${game.player1.name} (${game.player1.mark}) VS ${game.player2.name} (${game.player2.mark})`);
  console.log('-------------------');
  console.log(`Current player: ${game.getCurrentPlayer().name}`)
  game.gameboard.displayBoard();
  console.log('Choose a cell to make a move: 0-8')

  while (!game.checkWinner() && !game.checkDraw()) {
    const move = prompt(`${game.getCurrentPlayer().name} (${game.getCurrentPlayer().mark})`);
    game.makeMove(move);
    game.gameboard.displayBoard();
    console.log('-------------------');
    console.log(`Current player: ${game.getCurrentPlayer().name} (${game.getCurrentPlayer().mark})`);
  }
  
  game.endGame();
};

startGame('Sergio', 'Luis');
