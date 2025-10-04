import { useState } from 'react'
import './css/App.css'
import Nav from './Nav.jsx'
import Introduction from './Introduction.jsx'
import Chatbot from './chatbot.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
    <Nav/>
    <Introduction/>
    <Chatbot/>
    </div>
  )
}

export default App
