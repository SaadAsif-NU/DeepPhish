import "./App.css";
import "./Styling/dashboard.css";
import "./Styling/history.css";
import "./Styling/nav.css";
import "./Styling/settings.css";
import "./Styling/signin.css";
import "./Styling/signup.css";
import PrivateRoute from "./Components/PrivateRoute";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Signin from "./Components/Signin";
import Signup from "./Components/Signup";
import Dashboard from "./Components/Dashboard";
import History from "./Components/History";
import Settings from "./Components/Settings";
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Signin />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route
          path="/Dashboard"
          element={
            <PrivateRoute>
              <Dashboard></Dashboard>
            </PrivateRoute>
          }
        />
        <Route
          path="/history"
          element={
            <PrivateRoute>
              <History />
            </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
