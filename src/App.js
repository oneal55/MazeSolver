import './App.css';
import Maze  from './classes/Vertex'
import Game from './components/Game.js'

function App() {
  return (
    <div>
    <Game game = {new Maze(10, 10)}/>
    </div>
  );
}

export default App;
