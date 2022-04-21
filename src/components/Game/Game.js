import { useState, useEffect } from 'react';
import { VertexBlock } from '../VertexBlock/VertexBlock.js';
import './Game.css';

export const Game = (props) => {

    const init = () => {
        let grid = []
        for (var i = 0; i < props.height; i++) {
            let row = [];
            for (var j = 0; j < props.width; j++) {
                row.push(
                    {x:j, y:i,
                    on:true, color:'white',
                    top:null, right:null, bottom:null, left:null});
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
    const [visited, setVisitedState] = useState([]);
    const [cameFromEdge, setCameFromEdgeState] = useState({})

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

    const startSearch = () => {
        let list = [];
        list.push(startPoint);
        setWorkListState(list);
        setSearchModeState("Breadth-First");
    }
    useEffect(() => {if (worklist.length > 0) searchOnce()}, [worklist])

    const searchOnce = () => {
        let worklistclone = [...worklist];
        let newCameFromEdge = {...cameFromEdge}
        let newVisited = [...visited];
            if (worklist.length > 0) {
                let node;
                if (searchMode === "Depth-First") {
                    node = (worklistclone.pop());
                }
                if (searchMode === "Breadth-First") {
                    node = (worklistclone.shift());
                }
                console.log("x: " + node.x + " y:" + node.y + " color:" + node.color);
                node.color = "#40e0d0";
                newVisited.push(node);

            if (node.left != null && node.left.on && !newVisited.includes(node.left)) {
                worklistclone.push(node.left);
                newCameFromEdge[node.left] = node;
            }
            if (node.right != null && node.right.on && !newVisited.includes(node.right)) {
                worklistclone.push(node.right);
                newCameFromEdge[node.right] = node;
            }
            if (node.bottom != null && node.bottom.on && !newVisited.includes(node.bottom)) {
                worklistclone.push(node.bottom);
                newCameFromEdge[node.bottom] = node;
            }
            if (node.top != null && node.top.on && !newVisited.includes(node.top)) {
                worklistclone.push(node.top);
                newCameFromEdge[node.top] = node;
            }
            setWorkListState(worklistclone);
            setCameFromEdgeState(newCameFromEdge);
            setVisitedState(newVisited);

        }
    }

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
                  gameSetter={gameSetter} />)))}
             
            </div>
            <div style={{display: 'flex', marginTop: '30px', justifyContent: 'center'}}>
                <div onClick={() => startSearch()} className={"btnDiv"} id={"search"}><p className={"btnP"}>Search</p></div>
            </div>
        </div>
    );
}

export default Game;