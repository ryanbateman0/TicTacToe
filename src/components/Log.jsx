

export default function Log( {gameSequence}) {
    return (
        <ol  id="log">
            {gameSequence.map((turn, turnNumber) => (
                <li key={`${turn.move.board}${turn.move.square.row}${turn.move.square.column}`}>{turn.player} selects ({turn.move.square.row} , {turn.move.square.column}) on board {turn.move.board}</li>
            ))}
        </ol>
    )
}