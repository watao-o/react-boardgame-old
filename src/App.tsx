import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import Home from './pages/Home'
import Othello from './pages/Othello'
import Metronome from './pages/Metronome'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="/othello" element={<Othello />} />
          <Route path="/metronome" element={<Metronome />} />
          <Route path="*" element={<h2>Not Found</h2>} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
