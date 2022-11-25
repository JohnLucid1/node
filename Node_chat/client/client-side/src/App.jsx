import { useEffect } from 'react'
import { useState } from 'react'
import io from "socket.io-client"

const socket = io.connect("http://localhost:4000")

function App() {
  const [state, setState] = useState({ message: "", name: "" })
  const [chat, setChat] = useState([])

  useEffect(() => {
    socket.on('message', ({ name, message }) => {
      setChat([...chat, { name, message }])
    })
  })

  const onTextChange = e => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const onMessageSubmit = e => {
    e.preventDefault()
    const { name, message } = state
    socket.emit('message', { name, message })
    setState({ message: "", name })
  }


  const renderChat = () => {
    return chat.map(({name, message}, index) => (
      <div key={index} className="Messages">
        <h3 className='MainMessages'>
          {name}: <span>{message}</span>
        </h3>
      </div>
    ))
  }
  return (
      <div className="MainApp">

        <div className="littleApp">
          <form onSubmit={onMessageSubmit} >

            <h1 style={{
              display: "flex",
              justifyContent: "center"
            }}>Messanger</h1>

            <div className="name_field" style={{ display: "flex", justifyContent: "center" }}>
              <input required className="input_field" name="name" placeholder="Name" onChange={e => onTextChange(e)} value={state.name} label='Name' />
            </div>

            <div className="message_field" style={{ display: "flex", justifyContent: 'center' }}>
              <input maxLength={30} required className="input_field" name="message" placeholder='Message' onChange={e => onTextChange(e)} value={state.message} label='Message' />
            </div>

            <div className="MainButton">
              <button className="SendButton">ENTER</button>
            </div>

          </form>

          <div className="render_chat" style={{
            display: "flex",
            justifyContent: "center",
          }}>
            <div className="messages">
              <h1 style={{
                display: "flex",
                justifyContent: "center"
              }}>Chat Logs</h1>
              {renderChat()}
            </div>
          </div>
        </div>
      </div>
  )
}

export default App
