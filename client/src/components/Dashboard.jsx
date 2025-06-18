import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './Navbar.css';

function Dashboard({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Welcome to Dashboard</h1>
        </div>
        <div className="dashboard-content">
          <p className="dashboard-message">
            Hello! You're now logged into your Quick Hire dashboard. Explore your profile, manage jobs, and more.
          </p>
        </div>
      </div>
    </>
  );
}

export default Dashboard;