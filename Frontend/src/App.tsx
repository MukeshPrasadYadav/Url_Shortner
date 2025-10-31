
import {BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Login from "./Pages/AuthPages/Login"
import SignUp from "./Pages/AuthPages/Signup"
import Home from "./Pages/Home"
import ProtectedSignUp from "./helpers/ProtectedSignUp"
import ProtectedRoute from "./helpers/ProtectedRoutes"

const App = () => {
  return(
    <Router>
      <Routes>
        
        <Route path="/Login" element={ 
          // <ProtectedSignUp>
          <Login/>
         // </ProtectedSignUp>
          }/>
        <Route path="/SignUp" element={
        //  <ProtectedSignUp>
          <SignUp/>
        //  </ProtectedSignUp>
          } />

       
        <Route path="/" element={
           //<ProtectedRoute>
          <Home/>
          //</ProtectedRoute>
          } />

        


        
      </Routes>
    </Router>
  )
}

export default App