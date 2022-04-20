import { useState } from 'react';
import { Maze, Vertex, Graph } from './classes/Vertex.js'

export const Game = (props) => {

    const [mazeGame, setMazeGameState] = useState(props.game);

    const vertices = mazeGame.graph.vertices;
    const squaresn = (vertices) =>
    {vertices.map((row) => (row.map((vertex) => <VertexBlock cellSize = {'20'}/>)))}
    return (
        <div>
            
        </div>
    );
}