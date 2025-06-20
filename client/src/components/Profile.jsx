import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Navbar.css';

function Profile() {
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1 className="profile-title">Welcome, {user?.email || 'User'}!</h1>
      </div>
    </div>
  );
}

export default Profile;
