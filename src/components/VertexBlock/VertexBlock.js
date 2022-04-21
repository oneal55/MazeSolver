import { useState, useEffect } from "react"
import './VertexBlock.css'

export const VertexBlock = (props) => {

    const [vertex, setVertex] = useState(props.vertex)

    const clickHandler = () => {
        if(props.search == 'None'){
            if(props.clickType == 0){
                vertex.on = !vertex.on;
                 setVertex({...vertex, on: vertex.on})
            }
            else if(props.clickType == 1) {
                vertex.on = true;
                vertex.color = '#07DA63';
                setVertex({...vertex, on: vertex.on, color: vertex.color})
                props.gameSetter(vertex)
                props.clickTypeSetter(0);
            }
            else {
                props.gameSetter(vertex)
                vertex.on = true;
                vertex.color = '#fe326f';
                setVertex({...vertex, on: vertex.on, color: vertex.color})
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