import './App.css';
import Game from './components/Game/Game.js';

function App() {
  return (
    <div className='mainPage'>
      <Game 
      width={30}
      height={30}
      cellSize={10}
      />
    </div>
  );
}

export default App;
