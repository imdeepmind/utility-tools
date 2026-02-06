import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import JsonFormatter from './pages/JsonFormatter'
import About from './pages/About'
import Layout from './components/Layout'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="json-formatter" element={<JsonFormatter />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  )
}

export default App
