import { useState } from "react"

export const VertexBlock = (props) => {
    const [vertex, setVertex] = useState(props.vertex);

    return (
        <div top = {vertex.y * props.cellSize}px>

        </div>
    );
}