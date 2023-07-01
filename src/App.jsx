import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Form from './components/Form'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Digital business cards</h1>
      <p>Digital</p>
      <Form />
    </>
  )
}

export default App;