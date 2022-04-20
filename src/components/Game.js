import { useState } from 'react';
import { VertexBlock } from './VertexBlock.js';
import './Game.css'

export const Game = (props) => {

    console.log(props);
    const [mazeGame, setMazeGameState] = useState(props.game);

    const vertices = mazeGame.graph.vertices;
    return (
        <div>
            {vertices.map((row) => (row.map((vertex, i) => <VertexBlock key = {i} 
            vertex = {vertex} cellSize = {40}/>)))}
        </div>
    );
}

export default Game;