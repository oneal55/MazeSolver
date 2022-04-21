import './App.css';
import { useState } from 'react';
import Maze  from './classes/Vertex';
import Game from './components/Game/Game.js';

function App() {
  
  const [search, setSearch] = useState('None');

  const maze = new Maze(15, 15, 20, search);
  return (
    <div className='mainPage'>
      <Game 
      game={maze}
      search={search}
      setSearch={setSearch}
      />
    </div>
  );
}

export default App;
