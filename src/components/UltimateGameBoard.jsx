import GameBoard from "./GameBoard";

export default function UltimateGameBoard({ onSelectSquare, ultimateGameBoard, activeBoardNumber }) {

    function handleSelectedSquare(boardIndex, rowIndex, columnIndex) {
        onSelectSquare(boardIndex, rowIndex, columnIndex);
    }

    return (
        <ol id="ultimate-game-board">
            {ultimateGameBoard.map((row, rowIndex) =>
                <li key={rowIndex}>
                    <ol>
                        {row.map((column, columnIndex) =>
                            <li key={columnIndex}>
                                {
                                (ultimateGameBoard[rowIndex][columnIndex] === 'X' || ultimateGameBoard[rowIndex][columnIndex] === "O" || ultimateGameBoard[rowIndex][columnIndex] === "/") ?
                                    <button className="ultimate-game-board-button" disabled>{ultimateGameBoard[rowIndex][columnIndex]}</button> :
                                    <GameBoard onSelectSquare={handleSelectedSquare} boardActive={Number.isInteger(activeBoardNumber) ? activeBoardNumber === (rowIndex * 3) + columnIndex : true} boardNumber={(rowIndex * 3) + columnIndex} gameBoard={ultimateGameBoard[rowIndex][columnIndex]} />
                                }
                            </li>)}
                    </ol>
                </li>)}
        </ol>
    )
}