import { useState } from "react"
import PlayerInfo from "./components/PlayerInfo"
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import UltimateGameBoard from "./components/UltimateGameBoard";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

function mapUltimateGameBoard(gameTurns){
  const currentUltimateGameBoard = [...initialGameBoard.map(array => [...array])];

  for (let i = 0; i < 3; i++) {
    for (let o = 0; o < 3; o++) {
      currentUltimateGameBoard[i][o] = mapGameBoard(((i * 3) + o), gameTurns);
    }
  }

  return currentUltimateGameBoard;
}

function mapGameBoard(currentBoard, gameTurns) {
  let currentGameBoard = [...initialGameBoard.map(array => [...array])];

  let numberOfTurns = 0;

  for (const turn of gameTurns) {

    const { move, player } = turn;
    const { board, square} = move;
    const { row, column } = square;

    if (currentBoard !== board) {
        continue;
    }

    numberOfTurns += 1;
    currentGameBoard[row][column] = player;
  }

  let winner = getWinner(currentGameBoard, {X: 'X', O: 'O'})

  if (!winner && numberOfTurns === 9) {
    return 
  }

  return winner ? winner : currentGameBoard;
}

function getWinner(currentGameBoard, players) {
  let winner;

  for (const combo of WINNING_COMBINATIONS) {
    const firstSquare = currentGameBoard[combo[0].row][combo[0].column]
    const secondSquare = currentGameBoard[combo[1].row][combo[1].column]
    const thirdSquare = currentGameBoard[combo[2].row][combo[2].column]

    if ((firstSquare === 'X' || firstSquare === 'O') && firstSquare === secondSquare && firstSquare === thirdSquare) {
      winner = players[firstSquare];
    }
  }

  return winner;
}

function getActivePlayer(gameTurns) {
  let currentPlayer = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O'
  }

  return currentPlayer;
}

function getActiveBoardNumber(currentBoard, gameTurns){
  if (gameTurns.length === 0) {
    return null;
  } 

  const {row, column} = gameTurns[0].move.square;

  //NEXT BUG TO FIX
  if (currentBoard[column][row] === 'X' || currentBoard[column][row] === "O" || currentBoard[column][row] === "/"){
    return null;
  }

  return (column * 3) + row;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState({X: 'Player 1', O: 'Player 2'})
  

  const activePlayer = getActivePlayer(gameTurns);
  const currentUltimateGameBoard = mapUltimateGameBoard(gameTurns);
  const activeBoardNumber = getActiveBoardNumber(currentUltimateGameBoard, gameTurns);
  const winner = getWinner(currentUltimateGameBoard, players);
  const hasDraw = gameTurns.length === 81 && !winner;

  function handleSelectRematch() {
    setGameTurns([]);
  }

  function handleChangeName(symbol, newName){
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      };
    })
  }

  function handleSelectSquare(boardIndex, rowIndex, columnIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = getActivePlayer(prevTurns)

      const updatedTurns = [{ move: { board: boardIndex, square: { row: rowIndex, column: columnIndex } }, player: currentPlayer }, ...prevTurns];

      return updatedTurns
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <PlayerInfo playerName="Player 1" symbol="X" changeName={handleChangeName} isActive={activePlayer === 'X'} />
          <PlayerInfo playerName="Player 2" symbol="O" changeName={handleChangeName} isActive={activePlayer === 'O'} />
        </ol>
        {(winner || hasDraw) && <GameOver selectedRematch={handleSelectRematch} winner={winner} />}
        <UltimateGameBoard onSelectSquare={handleSelectSquare} activeBoardNumber={activeBoardNumber} ultimateGameBoard={currentUltimateGameBoard} />
      </div>
      <Log gameSequence={gameTurns} />
    </main>
  )
}

export default App
