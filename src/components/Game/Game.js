import { useState, useEffect } from 'react';
import { VertexBlock } from '../VertexBlock/VertexBlock.js';
import './Game.css';

export const Game = (props) => {
    const [mazeGame, setMazeGameState] = useState(props.game);
    // 0: click and cell becomes a wall
    // 1: click and cell becomes beginning cell
    // 2: click and cell becomes end cell
    const [cellClickType, setCellClickType] = useState(0)

    const styles = {
        position: 'relative',
        display: 'flex',
        margin: 'auto',
        width: ((mazeGame.cellSize + 2) * (mazeGame.width)) + 'px',
        height: ((mazeGame.cellSize + 2) * (mazeGame.height)) + 'px'
    };

    const selectCell = (clickType) => {
        setCellClickType(clickType);
    };

    useEffect(() => {}, [cellClickType]);

    const vertices = mazeGame.graph.vertices;
    return (    
        <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: '30px'}}>
                <div onClick={() => selectCell(1)} className={"btnDiv"} id={"start"}><p className={"btnP"}>Select Start Cell</p></div>
                <div onClick={() => selectCell(2)} className={"btnDiv"} id={"end"}><p className={"btnP"}>Select End Cell</p></div>
            </div>
            <div className={"game"} style={styles}>
                {vertices.map((row) => (row.map((vertex, i) => 
                <VertexBlock key = {i} 
                    vertex={vertex}
                    cellSize={mazeGame.cellSize}
                    clickType={cellClickType}
                    clickTypeSetter={selectCell}
                />)))}
            </div>
        </div>
    );
}

export default Game;