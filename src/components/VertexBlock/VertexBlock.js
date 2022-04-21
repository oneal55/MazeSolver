import { useState, useEffect } from "react"
import './VertexBlock.css'

export const VertexBlock = (props) => {

    const [vertex, setVertex] = useState(props.vertex);

    const clickHandler = () => {
        if(props.search == 'None'){
            if(props.clickType == 0){
                setVertex({...vertex, on: !vertex.on});
                props.vertex.on = !vertex.on;

            }
            else if(props.clickType == 1) {
                setVertex({...vertex, on: true, color: '#07DA63'});
                props.maze.startPoint = props.vertex;
                props.vertex.color = '#07DA63';
                props.clickTypeSetter(0);
            }
            else {
                setVertex({...vertex, on: true, color: '#fe326f'});
                props.maze.goalPoint = props.vertex;
                props.vertex.color = '#fe326f';
                props.clickTypeSetter(0);
            }
        }
    };

    useEffect(() => {}, [vertex]);
    
    useEffect(() => {
        if((props.clickType == 1 && vertex.color == '#07DA63') || (props.clickType == 2 && vertex.color == '#fe326f')) {
            setVertex({...vertex, color: '#FFF'})
        }
    }, [props.clickType]);

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