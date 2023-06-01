import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import RoomList from './RoomList.tsx';
import EditShelf from './EditRoom';

function App() {
  const [page, setPage] = useState({homePage: true});
  const [room, setRoom] = useState({roomId: null, roomName: null});
  return (
    <div className="App">
      <div className="Navbar">
        <span>
          <img src={logo} className="App-logo" alt="logo" /> 
          Biblocate 
        </span>
      </div>
      {page.homePage ? <RoomList setPage={setPage} setRoom={setRoom}/> : <EditShelf page={page} setPage={setPage} room={room} setRoom={setRoom}/>}
    </div>
  );
}

export default App;
