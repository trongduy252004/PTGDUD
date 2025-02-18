import { useState } from 'react'
import Mycomponent from './components/Mycomponent'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        Nhap ho ten va tuoi
        <Mycomponent></Mycomponent> //class component
	</div>

    </>
  )
}

export default App
