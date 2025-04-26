import { Routes, Route } from 'react-router-dom'
import './App.css'

// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Hotels from './pages/Hotels'
import Cabs from './pages/Cabs'
import Guides from './pages/Guides'
import Packages from './pages/Packages'

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/cabs" element={<Cabs />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/packages" element={<Packages />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
