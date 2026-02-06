import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import JsonFormatter from './pages/JsonFormatter'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/json-formatter" element={<JsonFormatter />} />
    </Routes>
  )
}

export default App
