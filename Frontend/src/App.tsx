
import {BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Login from "./Pages/AuthPages/Login"
import SignUp from "./Pages/AuthPages/Signup"
import Home from "./Pages/Home"

const App = () => {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/SignUp" element={<SignUp/>} />

        
      </Routes>
    </Router>
  )
}

export default App