import { useState } from 'react'
import io from "socket.io-client"
import Chat from './Chat'
import "./App.css"

const socket = io.connect("http://localhost:3001")

function App() {
  const [username, setUsername] = useState("")
  const [room, setRoom] = useState("")
  const [showChat, setShowChat] = useState(false)
  
  
  const checkRoom = (e) => {
    console.log(e);
    e == "" ? setRoom("1") : setRoom(e)
  }

  
  const joinRoom = () => {
    // if(username !== "" && room !== ""){
    if(username !== ""){
      socket.emit("join_room", room)
      setShowChat(true)
    }
  }
  
  return (
    <div className='App'>
    {!showChat ? (
      <div className='joinChatContainer'>
        <h3>Онлайн Чат</h3> 
        <h6>В поле "комната" введите ID комнаты, либо оставьте пустым, чтобы войти в публичную</h6>
        <input type="text" placeholder='Иван' onChange={(event) => {setUsername(event.target.value)}} />
        <input type="text" placeholder='Комната' onChange={(event) => {checkRoom(event.target.value)}} />
        <button onClick={joinRoom}>Войти в чат</button>
      </div>
    ) : (
      <Chat socket={socket} username={username} room={room} />
    )}
    </div>
  )
}

export default App
