import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './Navbar.css';

function Profile({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div className="profile-container">
        <div className="profile-header">
          <h1 className="profile-title">User Profile</h1>
        </div>
        <div className="profile-content">
          <p className="profile-message">
            Welcome to your profile page. Manage your account details, view your activity, and more.
          </p>
        </div>
      </div>
    </>
  );
}

export default Profile;