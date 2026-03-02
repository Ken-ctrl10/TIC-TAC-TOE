import './App.css'
import { useState } from 'react'

// Components-Files
import Player from './components/Player.jsx'
import GameBoard from './components/GameBoard.jsx'
import Log from './components/Log.jsx'
import GameOver from './components/GameOver.jsx'

import { winningCombinations } from './winningCombinations.js'

//General Constants Variables
const PLAYERS = {
  X: 'Player 1', 
  O: 'Player 2'
}

const INITIAL_GAME_BOARD = [
    [null, null, null,],
    [null, null, null,],
    [null, null, null]
  ];

function deriveActivePlayer(gameTurns) {
    let currPlayer = 'X';

    if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
      currPlayer = 'O';
    };

    return currPlayer;
}

function deriveBoard(gameTurns){
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];
  
  for (const turn of gameTurns){
     const { square, player } = turn;
     const { row, col } = square;
 
     gameBoard[row][col] = player;
  }

  return gameBoard;
}

function deriveWinner( gameBoard, players){
    let winner = null;

  for(const combination of winningCombinations){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].col];
    const secondSquareSymbol =  gameBoard[combination[1].row][combination[1].col];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].col];

    if (firstSquareSymbol && 
        firstSquareSymbol === secondSquareSymbol && 
        firstSquareSymbol === thirdSquareSymbol){
        winner = players[firstSquareSymbol];
    }
  }

  return winner;
}

function App() {
  //new state where we store the current player names
  const [players, setPlayers] = useState(PLAYERS);
  //In this tic-tac-toe game, we derive everything from the state below.
  const [gameTurns, setGameTurns] = useState([]);

  // const [ isWinner, setIsWinner ] = useState(false); 
  // ^ this is a redundant state, because we can derive a winner in the gameTurns.

  // const [activePlayer, setActivePlayer] = useState('X');

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveBoard(gameTurns);

  const winner = deriveWinner(gameBoard, players);
  const isDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    //setActivePlayer(prevPlayer => prevPlayer === 'X' ? 'O' : 'X');
    setGameTurns(prevTurns => {
      const currPlayer = deriveActivePlayer(prevTurns);

      const updatedTruns = [
        {square: {row: rowIndex, col: colIndex}, player: currPlayer}, 
        // currPlayer is much optimal than activePlayer because of the asynchronous nature of state updates in React. If we were to use activePlayer, we might end up with a stale value due to the state update not being reflected immediately within the same render cycle.
        ...prevTurns
      ];
      
      return updatedTruns;
    });
  }
  
  function handleRestart(){
    setGameTurns([]);
  }

  function handlePlayerName(symbol, newName){
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      };
    });
  }

  return <main>
    <div id="game-container">
      <ol id="players" className='highlight-player'>
        <Player name={PLAYERS.X} 
                symbol="X" 
                isActive={activePlayer === 'X'} 
                onChangeName={handlePlayerName}
        />
        
        <Player name={PLAYERS.O}
                symbol="O" 
                isActive={activePlayer === 'O'} 
                onChangeName={handlePlayerName}
        />
      </ol>

      {(isDraw ||winner) && <GameOver winner={winner} onRestart={handleRestart}/>}
      <GameBoard onSelectSquare={handleSelectSquare} 
        board={gameBoard}/> 
    </div>

    <Log turns={gameTurns}/>
  </main>
}

export default App