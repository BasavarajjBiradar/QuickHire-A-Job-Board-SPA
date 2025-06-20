import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // ✅ import useSelector
import './Navbar.css';

function Profile() {
  const navigate = useNavigate();

  // ✅ Get user and isLoggedIn from Redux
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <div className="profile-container">
        <div className="profile-header">
          <h1 className="profile-title">User Profile</h1>
        </div>
        <div className="profile-content">
          <p className="profile-message">
            Welcome to your profile page. Manage your account details, view your activity, and more.
          </p>
          {/* ✅ Display user details */}
          {user && (
            <div className="user-details">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;
