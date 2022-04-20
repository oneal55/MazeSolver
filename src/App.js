import './App.css';
import Maze  from './classes/Vertex'
import Game from './components/Game.js'

function App() {
  return (
    <div className='main'>
    <Game game = {new Maze(3, 3)}/>
    </div>
  );
}

export default App;
