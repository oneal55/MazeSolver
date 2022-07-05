import { useState, useEffect } from 'react';
import { VertexBlock } from '../VertexBlock/VertexBlock.js';
import './Game.css';

export const Game = (props) => {

    const init = () => {
        let grid = [];
        for (var i = 0; i < props.height; i++) {
            let row = [];
            for (var j = 0; j < props.width; j++) {
                let vertex = {x:j, y:i,
                    on:true, color:'white',
                    top:null, right:null, bottom:null, left:null};
                row.push(vertex);
                }
            grid.push(row);
        }

        for (i = 0; i < grid.length; i++) {
            for (j = 0; j < grid[i].length; j++) {
                if (i > 0) {
                    grid[i][j].top = grid[i-1][j];
                }

                if (i < grid.length - 1) {
                    grid[i][j].bottom = grid[i+1][j];
                }

                if (j > 0) {
                    grid[i][j].left = grid[i][j-1];
                }

                if (j < grid[i].length - 1)
                    grid[i][j].right = grid[i][j+1];
            }
        }
        return grid;
    }

    const [mazeGrid, setMazeGrid] = useState(init());
    const [startPoint, setStartPointState] = useState({point: null});
    const [endPoint, setEndPointState] = useState({point: null});
    const [searchMode, setSearchModeState] = useState("None");
    const [worklist, setWorkListState] = useState([]);
    const [searchStarted, setSearchStarted] = useState(false);

    // 0: click and cell becomes a wall
    // 1: click and cell becomes beginning cell
    // 2: click and cell becomes end cell
    const [cellClickType, setCellClickType] = useState(0);

    const styles = {
        position: 'relative',
        display: 'flex',
        margin: 'auto',
        width: ((props.cellSize + 2) * (mazeGrid[0].length)) + 'px',
        height: ((props.cellSize + 2) * (mazeGrid.length)) + 'px'
    };

    const gameSetter = (vertex) => {
        if (cellClickType === 1) {
            setStartPointState(vertex);
        }
        if (cellClickType === 2) {
            setEndPointState(vertex);
        }
    }

    const selectCell = (clickType) => {
        if(searchMode === 'None'){
            setCellClickType(clickType);
        }
    };

    const reconstruct = (vertex) => {
        if (vertex.left != null) {
            vertex.left.right = vertex;
        }
        if (vertex.right != null) {
            vertex.right.left = vertex;
        }
        if (vertex.top != null) {
            vertex.top.bottom = vertex;
        }
        if (vertex.bottom != null) {
        vertex.bottom.top = vertex;
        }
    }

    const startSearch = () => {
        let list = [];
        list.push(startPoint);
        setWorkListState(list);
        setSearchModeState("Depth-First");
        setSearchStarted(true);
    }

    const searchOnce = () => {
        let worklistclone = [...worklist];
            if (worklist.length > 0) {
                let node;
                if (searchMode === "Depth-First") {
                    node = (worklistclone.pop());
                }
                else {
                    node = (worklistclone.shift());
                }
                node.color = "#40e0d0";

                if (node === endPoint) {
                    setSearchModeState("Reconstruct");
                }

                else {
                    let newNodes = [];
                    if (node.left != null && node.left.on && node.left.cameFrom === null) {
                        newNodes.push(node.left);
                        node.left.cameFrom = node;
                    }
                    if (node.right != null && node.right.on && node.right.cameFrom === null) {
                        newNodes.push(node.right);
                        node.right.cameFrom = node;
                    }
                    if (node.bottom != null && node.bottom.on && node.bottom.cameFrom === null) {
                        newNodes.push(node.bottom);
                        node.bottom.cameFrom = node;
                    }
                    if (node.top != null && node.top.on && node.top.cameFrom === null) {
                        newNodes.push(node.top);
                        node.top.cameFrom = node;
                    }
                    newNodes.sort(() => Math.random() - 0.5)
                    worklistclone.push(...newNodes);
                    setWorkListState(worklistclone);
                }
        }
    }

    const generateEdges = (vertices) => {
        let edges = [];
        for (let i = 0; i < vertices.length; i += 1) {
            let row = vertices[i];
            for (let j = 0; j < row.length; j += 1) {
                if (j + 2 < vertices[i].length) {
                    let edge = {from :vertices[i][j],
                                to :vertices[i][j + 2],
                                weight :Math.random(),
                                right: true}
                                edges.push(edge);
                }
            }
        }

        for (let i = 0; i < vertices.length - 1; i += 1) {
            let row = vertices[i];
            for (let j = 0; j < row.length; j += 1) {

                if (i + 2 < vertices.length) {
                    let edge = {from :vertices[i][j],
                        to :vertices[i+ 2][j],
                        weight :Math.random(),
                        bottom: true}
                        edges.push(edge);
                }
            }
        }
        edges.sort((vertex1, vertex2) => (vertex1.weight - vertex2.weight));
        return edges;
    }

    const kruskals = () => {
        let mazeGridClone = [...mazeGrid];
        let kruskalWorklist = generateEdges(mazeGridClone);

        let edgesInTree = [];
        let representatives = new Map();
        for(let i = 0; i < mazeGridClone.length; i++) {
            for (let j = 0; j < mazeGridClone[0].length; j++) {
                representatives.set(mazeGridClone[i][j].x + '' + mazeGridClone[i][j].y, mazeGridClone[i][j]);
            }
        }
        let verticesSize = (Math.ceil(mazeGrid.length * mazeGrid[0].length * (1/3)));
        while(edgesInTree.length < verticesSize - 1 && kruskalWorklist.length > 0) {
            let currentEdge = kruskalWorklist.shift();
            let repFrom = find(representatives, currentEdge.from);
            let repTo = find(representatives, currentEdge.to);

            if (repFrom === repTo) {

            }
            else {
                edgesInTree.push(currentEdge);
                
                union(representatives, repFrom, repTo);
            }
        }

        edgesInTree.forEach(insertEdge);
        setMazeGrid(mazeGridClone);
    }

    const insertEdge = (edge) => {
        if (edge.bottom) {
            console.log("working");
            edge.from.bottom.on = false;
        }

        if (edge.right) {
            console.log("working");
            edge.from.right.on = false;
        }
    }

    const find = (representatives, vertex) => {
        if (get(representatives, vertex) === vertex) {
            return vertex;
        }
        else {
            return find(representatives, get(representatives, vertex));
        }
    }

    const get = (representatives, vertex) => {
        return representatives.get(vertex.x + '' + vertex.y);
    }

    const union = (representatives, vertexA, vertexB) => {
        representatives.set(get(representatives, vertexA), vertexB);
    }

    const reset = () => {
        setMazeGrid(init());
        setWorkListState([]);
        setSearchStarted(false);
        setStartPointState(null);
        setEndPointState(null);
        setSearchModeState("None");
        setCellClickType(0);
    }

    useEffect(() => {console.log(mazeGrid) }, [mazeGrid])

    let validSearchModes = ["Breadth-First", "Depth-First"];
        
        useEffect(() => {
            const interval = setInterval(() => {if (searchStarted && validSearchModes.includes(searchMode)) {
                console.log("Running");
                searchOnce();
            }}, 25);
            return () => clearInterval(interval);
        });

    return (   
        <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: '30px'}}>
                <div onClick={() => selectCell(1)} className={"btnDiv"} id={"start"}><p className={"btnP"}>Select Start Cell</p></div>
                <div onClick={() => selectCell(2)} className={"btnDiv"} id={"end"}><p className={"btnP"}>Select End Cell</p></div>
            </div>
            <div className={"game"} style={styles}>
                {mazeGrid.map((row) => (row.map((vertex, i) =>
                <VertexBlock key={i}
                  vertex={vertex}
                  search= {searchMode}
                  cellSize={props.cellSize}
                  clickType= {cellClickType}
                  clickTypeSetter={selectCell}
                  gameSetter={gameSetter}
                  reconstruct={reconstruct}
                  />)))}
             
            </div>
            <div style={{display: 'flex', marginTop: '30px', justifyContent: 'center'}}>
                <div onClick={() => startSearch()} className={"btnDiv"} id={"search"}><p className={"btnP"}>Search</p></div>
                <div style = {{marginLeft: '30px'}} onClick={() => kruskals()} className={"btnDiv"} id={"generate"}><p className={"btnP"}>Generate Walls</p></div>
                <div style = {{marginLeft: '30px'}} onClick={() => reset()} className={"btnDiv"} id={"generate"}><p className={"btnP"}>Reset</p></div>

            </div>
        </div>
    );
}

export default Game;