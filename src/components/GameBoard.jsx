//This should be a Dynamic component that renders the game board based on the state of the game. For now, it can just render a static 3x3 grid of buttons.

export default function GameBoard({ onSelectSquare, board }) {
  // const [gameBoard, setGameBoard] = useState(initialGameBoard);

  // function handleCellClick(rowIndex, columnIndex) {
  //   setGameBoard(prevBoard => {
  //     const updatedBoard = [...prevBoard];
  //     updatedBoard[rowIndex] = [...updatedBoard[rowIndex]];
  //     updatedBoard[rowIndex][columnIndex] = activePlayerSymbol; // Simulating a player move
  //     return updatedBoard;
  //   });

  //   onSelectSquare(); // Notify the parent component that a square has been selected
  // }

  return <ol id="game-board">
    {board.map((row, rowIndex) => <li key={rowIndex}>
      <ol> 
        {/* We need a key for unique identification of each cell */}
        {row.map((playerSymbol, columnIndex) => <li key={columnIndex}>
          <button onClick={ () => onSelectSquare(rowIndex, columnIndex)} disabled={playerSymbol !== null}>{playerSymbol}</button>
          </li>)}
      </ol>
    </li>)}
  </ol>
}