//This should be a Dynamic component that renders the game board based on the state of the game. For now, it can just render a static 3x3 grid of buttons.
import { useState } from 'react';

const initialGameBoard = [
    [null, null, null,],
    [null, null, null,],
    [null, null, null]
  ];

export default function GameBoard({ onSelectSquare, activePlayerSymbol }) {
  const [gameBoard, setGameBoard] = useState(initialGameBoard);

  function handleCellClick(rowIndex, columnIndex) {
    setGameBoard(prevBoard => {
      const updatedBoard = [...prevBoard];
      updatedBoard[rowIndex] = [...updatedBoard[rowIndex]];
      updatedBoard[rowIndex][columnIndex] = activePlayerSymbol; // Simulating a player move
      return updatedBoard;
    });

    onSelectSquare(); // Notify the parent component that a square has been selected
  }

  return <ol id="game-board">
    {gameBoard.map((row, rowIndex) => <li key={rowIndex}>
      <ol> 
        {/* We need a key for unique identification of each cell */}
        {row.map((playerSymbol, columnIndex) => <li key={columnIndex}>
          <button onClick={() => handleCellClick(rowIndex, columnIndex)}>{playerSymbol}</button>
          </li>)}
      </ol>
    </li>)}
  </ol>
}