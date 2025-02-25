import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import Bai2 from './Bai2.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App /> 
    {/* <Bai2 /> */}
  </StrictMode>,
)
