import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Home, Register, Registry, Login } from "./pages";
import { Navbar } from './layout';
import { useAuth } from './utils/authProvider';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div style={{ display: "flex", backgroundColor: "rgb(217, 230, 247)" }}>
      <Router>
        {
          isAuthenticated ? <Navbar /> : <Navigate to="/login" replace />
        }
        <Routes>
          <Route>
            <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />} />
            <Route path="/register" element={isAuthenticated ? <Register /> : <Navigate to="/login" replace />} />
            <Route path="/registry" element={isAuthenticated ? <Registry /> : <Navigate to="/login" replace />} />
          </Route>
          <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" replace />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
