import { useState } from "react"
import './VertexBlock.css'

export const VertexBlock = (props) => {
    const [vertex, setVertex] = useState(props.vertex);
       const styles = {
            position: "absolute",
            display: "inline",
            top: vertex.y * props.cellSize,
            left: vertex.x * props.cellSize,
            backgroundColor: vertex.color,
            width: props.cellSize,
            height: props.cellSize
        };
    return (
        <div 
        style={styles}>
        </div>
    );
}

export default VertexBlock;