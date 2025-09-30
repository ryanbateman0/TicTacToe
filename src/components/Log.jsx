

export default function Log( {gameSequence}) {
    return (
        <ol  id="log">
            {gameSequence.map((turn, turnNumber) => (
                <li key={`${turn.move.board}${turn.move.square.row}${turn.move.square.column}`}>{turn.player} selects ({3 - turn.move.square.row} , {turn.move.square.column + 1}) on board {turn.move.board + 1}</li>
            ))}
        </ol>
    )
}