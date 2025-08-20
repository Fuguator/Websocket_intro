import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import LongPulling from './LongPulling'
import EventSourcing from './EventSourcing'
import WebSock from './WebSock'
import './App.css'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <WebSock/>
    </div>
  )
}

export default App
