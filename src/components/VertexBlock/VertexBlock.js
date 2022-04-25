import { useState, useEffect } from "react"
import './VertexBlock.css'

export const VertexBlock = (props) => {

    const [vertex, setVertex] = useState(props.vertex)

    const clickHandler = () => {
        if(props.search == 'None'){
            if(props.clickType == 0){
                let vertexClone = {...vertex, on: !vertex.on};
                props.reconstruct(vertexClone);
                setVertex(vertexClone);
            }
            else if(props.clickType == 1) {
                let vertexClone = {...vertex, on : true, color: '#07DA63'};
                props.reconstruct(vertexClone);
                setVertex(vertexClone)
                props.gameSetter(vertexClone)
                props.clickTypeSetter(0);
            }
            else {
                let vertexClone = {...vertex, on : true, color: '#fe326f'};
                props.reconstruct(vertexClone);
                setVertex(vertexClone)
                props.gameSetter(vertexClone)
                props.clickTypeSetter(0);
            }
        }
    };
    
    useEffect(() => {
        if((props.clickType == 1 && props.search == 'None' && vertex.color == '#07DA63')
        || (props.clickType == 2 && props.search == 'None' && vertex.color == '#fe326f')) {
            setVertex({...vertex, color: "#FFF"})
        }
    }, [props.clickType, vertex]);

       const styles = {
            position: "absolute",
            display: "inline-block",
            left: (vertex.x * props.cellSize) + (2 * vertex.x),
            top: (vertex.y * props.cellSize) + (2 * vertex.y),
            background: vertex.on ? vertex.color : 'black',
            width: props.cellSize + 'px',
            height: props.cellSize + 'px'
        };

    return (
        <div className={props.clickType == 0 ? "cell" : props.clickType == 1 ? "cellStartHover cell" : "cellEndHover cell"}
        onClick = {() => clickHandler()}
        style={styles}>
        </div>
    );
}

export default VertexBlock;