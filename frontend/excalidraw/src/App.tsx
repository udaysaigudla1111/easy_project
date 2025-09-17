import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Canvas from './pages/Canvas'
const App = () => {
  return (
    <div>
      <Router>
      <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route path="/signIn" element={<SignIn/>} />
      <Route path="/signUp" element={<SignUp/>} />
      <Route path="/canvas" element={<Canvas/>} />
      </Routes>
      </Router>
    </div>
  )
}

export default App