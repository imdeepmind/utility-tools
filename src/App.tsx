import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import JsonFormatter from './pages/JsonFormatter'
import SqlFormatter from './pages/SqlFormatter'
import About from './pages/About'
import TextComparison from './pages/TextComparison'
import Layout from './components/Layout'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="json-formatter" element={<JsonFormatter />} />
        <Route path="sql-formatter" element={<SqlFormatter />} />
        <Route path="text-comparison" element={<TextComparison />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  )
}

export default App
