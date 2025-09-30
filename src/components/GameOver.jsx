export default function GameOver({selectedRematch, winner}) {
    return (
        <div id="game-over">
            <h2>Game Over!</h2>
            {winner ?  <p>{winner} won!</p> : <p>Draw!</p>}
            <p>
                <button onClick={selectedRematch}>Rematch!</button>
            </p>
        </div>
    );
}