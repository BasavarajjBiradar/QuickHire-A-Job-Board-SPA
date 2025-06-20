import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { useSelector, useDispatch } from 'react-redux';
import { setLogin, setLogout } from '../redux/authSlice';

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const [formData, setFormData] = useState({

    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      dispatch(setLogin(storedUser));
    }
  }, [dispatch]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setIsSignup(false);
    resetForm();
  };

  const toggleForm = () => {
    setIsSignup(!isSignup);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'user',
    });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   if (isSignup) {
  //     if (formData.password !== formData.confirmPassword) {
  //       alert('Passwords do not match!');
  //       return;
  //     }
  //   }

  //   const userData = {

  //     name: formData.name || 'Guest',
  //     email: formData.email,
  //     role: formData.role || 'user',
  //   };
  //   console.log('dispatchhhh',userData)

  //   dispatch(setLogin(userData));
  //   localStorage.setItem('user', JSON.stringify(userData));

  //   if (userData.role === 'recruiter') {
  //     navigate('/dashboard');
  //   } else {
  //     navigate('/');
  //   }

  //   resetForm();
  //   setIsModalOpen(false);
  //   setIsMenuOpen(false);
  // };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Get full user info from Redux or localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (!storedUser) {
      alert('Login/Signup failed. Please try again.');
      return;
    }

    // Navigate based on role
    if (storedUser.roles?.includes('recruiter')) {
  navigate('/dashboard');
} else {
  navigate('/');
}


    resetForm();
    setIsModalOpen(false);
    setIsMenuOpen(false);
  };


  const handleLogout = () => {
    dispatch(setLogout());
    localStorage.removeItem('user');
    navigate('/');
    setIsMenuOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <a href="/" className="logo">
          <img src="logo.png" className='logoimg' alt="Quick Hire Logo" />
          Quick Hire</a>
          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <li><a href="/" onClick={toggleMenu}>Home</a></li>
            <li><a href="/jobs" onClick={toggleMenu}>Jobs</a></li>
            <li><a href="/company" onClick={toggleMenu}>Companies</a></li>
            {/* <li><a href="#resources" onClick={toggleMenu}>Resources</a></li> */}
            <li className="auth-container">
              {isLoggedIn && user?.roles?.includes('recruiter') && (
  <button
    className="profile-button"
    onClick={() => {
      navigate('/dashboard');
      if (isMenuOpen) setIsMenuOpen(false);
    }}
  >
    Dashboard
  </button>
)}

              {isLoggedIn && user?.roles?.includes('user') && (

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
              <button className="auth-button" onClick={isLoggedIn ? handleLogout : toggleModal}>
                {isLoggedIn ? 'Logout' : 'Login'}
              </button>
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
            <button className="modal-close" onClick={toggleModal}>×</button>
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
              <button onClick={toggleForm} className="modal-toggle-button">
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
