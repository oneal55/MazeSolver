import { useState, useEffect } from "react"
import './VertexBlock.css'

export const VertexBlock = (props) => {

    const [vertex, setVertex] = useState(props.vertex);


    const clickHandler = () => {
        setVertex({...vertex, on: !vertex.on});

    };

    useEffect(() => {}, [vertex]);
    

       const styles = {
            position: "absolute",
            display: "inline-block",
            top: vertex.y * props.cellSize + (2 * vertex.y),
            left: vertex.x * props.cellSize + (2 * vertex.x),
            background: vertex.on ? vertex.color : 'black',
            width: props.cellSize + 'px',
            height: props.cellSize + 'px'
        };
    return (
        <div className="cell"
        onClick = {() => clickHandler()}
        style={styles}>
        </div>
    );
}

export default VertexBlock;