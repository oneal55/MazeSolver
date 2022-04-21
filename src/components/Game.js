import { useState } from 'react';
import { VertexBlock } from './VertexBlock.js';
import './Game.css'

export const Game = (props) => {
    const [mazeGame, setMazeGameState] = useState(props.game);

    const styles = {
        position: 'absolute',
        display: 'inline-block',
        margin: 'auto',
        width: ((mazeGame.cellSize + 2) * (mazeGame.width)) + 'px',
        height: ((mazeGame.cellSize + 2) * (mazeGame.height)) + 'px'
    };

    const vertices = mazeGame.graph.vertices;
    return (    
        <div className={"game"} style={styles}>
            {vertices.map((row) => (row.map((vertex, i) => <VertexBlock key = {i} 
            vertex = {vertex} cellSize = {mazeGame.cellSize}/>)))}
        </div>
    );
}

export default Game;