import './App.css';
import Maze  from './classes/Vertex'
import Game from './components/Game/Game.js'

function App() {
  return (
    <div className='mainPage'>
      <Game game = {new Maze(15, 15, 20)}/>
    </div>
  );
}

export default App;
