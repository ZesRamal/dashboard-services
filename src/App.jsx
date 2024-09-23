import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Home, Register, Registry, Login } from "./pages";
import { Navbar } from './layout';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";

function App() {
  const [isLogged, setIsLogged] = useState('loading')

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsLogged(true)
    } else {
      setIsLogged(false)
    }
  });


  return (
    <>
      {
        isLogged == 'loading' ?
          <div></div>
          :
          <div style={{ display: "flex", backgroundColor: "rgb(217, 230, 247)" }}>
            <Router>
              {
                isLogged == true ? <Navbar /> : <Navigate to="/login" replace />
              }
              <Routes>
                <Route>
                  <Route path="/" element={isLogged == true ? <Home /> : <Navigate to="/login" replace />} />
                  <Route path="/register" element={isLogged == true ? <Register /> : <Navigate to="/login" replace />} />
                  <Route path="/registry" element={isLogged == true ? <Registry /> : <Navigate to="/login" replace />} />
                </Route>
                <Route path="/login" element={isLogged == false ? <Login /> : <Navigate to="/" replace />} />
              </Routes>
            </Router>
          </div>
      }
    </>
  )
}

export default App
