import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import HomePage from "./components/HomePage";
import Company from "./components/Company";
import Job from "./components/Job";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import JobPost from "./components/JobPost";
import JobDetails from './components/JobDetails';
import LoginForm from "./components/LoginForm";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);



  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />


      <Routes>
        <Route
          path="/jobs" element={<Job />}
        // element={
        //   // <Job
        //   //   isLoggedIn={isLoggedIn}
        //   //   setIsLoggedIn={setIsLoggedIn}
        //   // />

        />
        <Route
          path="/"
          element={
            <HomePage
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <Dashboard
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />
        {/* <Route
          path="/login"
          element={
            <LoginForm
            />
          }
        /> */}
        <Route
          path="/profile"
          element={
            <Profile
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />
        <Route
          path="/company"
          element={
            <Company />
          }
        />
        <Route
          path="/contact"
          element={
            <Contact />
          }
        />
        <Route
          path="/jobpost"
          element={
            <JobPost />
          }
        />
        <Route
          path="/job/:id"
          element={
            <JobDetails />
          }
        />
      </Routes>
      <Footer />

    </div>
  );
}

export default App;