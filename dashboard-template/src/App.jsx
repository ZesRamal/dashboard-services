import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Register, Registry, Login } from "./pages";
import { Navbar } from './layout';

function App() {
  return (
    <div style={{ display: "flex", backgroundColor: "rgb(217, 230, 247)" }}>
      <Router>
        <Navbar />
        <Routes>
          <Route>
            <Route path="/" Component={Home} />
            <Route path="/register" Component={Register} />
            <Route path="/registry" Component={Registry} />
          </Route>
          <Route path="/login" Component={Login} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
