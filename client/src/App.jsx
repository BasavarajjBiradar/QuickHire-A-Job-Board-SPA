import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import Company from "./components/Company";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <div className="home-container">
              <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            </div>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Dashboard isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          }
        />
        <Route
          path="/profile"
          element={
            <Profile isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          }
        />
          <Route
          path="/company"
          element={
            <Company/>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
