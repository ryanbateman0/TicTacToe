

export default function GameBoard( {onSelectSquare, gameBoard, boardNumber, boardActive}) {
    return (
        <ol id="game-board">
            {gameBoard.map((row, rowIndex) =>
                <li key={rowIndex}>
                    <ol id="ultimate-game-board-ol">
                        {row.map((playerSymbol, columnIndex) =>
                            <li key={columnIndex}>
                                <button onClick={() => (onSelectSquare(boardNumber, rowIndex, columnIndex))} disabled={!boardActive || playerSymbol !== null}>{playerSymbol}</button>
                            </li>)}
                    </ol>
                </li>)}
        </ol>
    )
}