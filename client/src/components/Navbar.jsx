import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setIsSignup(false);
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
  };

  const toggleForm = () => {
    setIsSignup(!isSignup);
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
  };

  const handleAuth = (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      setIsLoggedIn(false);
      setIsModalOpen(false);
      if (isMenuOpen) setIsMenuOpen(false);
      navigate('/');
    } else {
      setIsModalOpen(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      console.log("Signup data:", formData);
      setIsLoggedIn(true);
      setIsModalOpen(false);
      setFormData({ name: '', email: '', password: '', confirmPassword: '' });
      navigate('/dashboard');
    } else {
      console.log("Login data:", { email: formData.email, password: formData.password });
      setIsLoggedIn(true);
      setIsModalOpen(false);
      setFormData({ name: '', email: '', password: '', confirmPassword: '' });
      navigate('/dashboard');
    }
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <a href="/" className="logo">Quick Hire</a>
          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <li><a href="#home" onClick={toggleMenu}>Home</a></li>
            <li><a href="#jobs" onClick={toggleMenu}>Jobs</a></li>
            <li><a href="/company" onClick={toggleMenu}>Companies</a></li>
            <li><a href="#resources" onClick={toggleMenu}>Resources</a></li>
            <li className="auth-container">
              <button className="auth-button" onClick={handleAuth}>
                {isLoggedIn ? 'Logout' : 'Login'}
              </button>
              {isLoggedIn && (
                <button
                  className="profile-button"
                  onClick={() => {
                    navigate('/profile');
                    if (isMenuOpen) setIsMenuOpen(false);
                  }}
                >
                  Profile
                </button>
              )}
            </li>
          </ul>
          <div className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </div>
      </nav>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="modal-close" onClick={toggleModal}>
              ×
            </button>
            <h2 className="modal-title">{isSignup ? 'Sign Up' : 'Login'}</h2>
            {isSignup ? (
              <SignupForm
                formData={formData}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
              />
            ) : (
              <LoginForm
                formData={formData}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
              />
            )}
            <p className="modal-toggle">
              {isSignup ? 'Already have an account?' : "Don't have an account?"}
              <button type="button" onClick={toggleForm} className="modal-toggle-button">
                {isSignup ? 'Login' : 'Sign Up'}
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;