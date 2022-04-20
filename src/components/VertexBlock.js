import { useState } from "react"
import './VertexBlock.css'

export const VertexBlock = (props) => {
    const [vertex, setVertex] = useState(props.vertex);

    return (
        <div top={vertex.y * props.cellSize } left={vertex.y * props.cellSize} color = {vertex.color}>
        </div>
    );
}

export default VertexBlock;