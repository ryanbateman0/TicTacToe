import { useState } from "react"

export default function PlayerInfo({ playerName, symbol, changeName, isActive }) {
    const [currentName, setCurrentName] = useState(playerName);
    const [isEditing, setIsEditing] = useState(false);

    function handleEditClick() {
        setIsEditing((editing) => (!editing));
    }

    function handleChangeInput(event) {
        setCurrentName(event.target.value);
        if (!isEditing) {
            changeName(symbol, event.target.value);
        }
    }

    return (
        <li className={isActive ?  'active' : undefined}>
            <span className="player">
                {isEditing ? <input type="text" value={currentName} onChange={handleChangeInput} required></input> :
                    <span className="player-name">{currentName}</span>}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
        </li>
    )
}