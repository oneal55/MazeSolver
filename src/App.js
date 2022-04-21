import './App.css';
import Game from './components/Game/Game.js';

function App() {
  return (
    <div className='mainPage'>
      <Game 
      width={5}
      height={5}
      cellSize={20}
      />
    </div>
  );
}

export default App;
