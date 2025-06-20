import React, { useState } from 'react';
import './Navbar.css';
import axios from 'axios';
  import { useDispatch } from 'react-redux';
import { setLogin } from '../redux/authSlice';

function SignupForm({ formData, handleInputChange, handleSubmit }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // const handleSignup = async (e) => {
  //   e.preventDefault();
  //   setErrorMessage('');

  //   const { name, email, password, confirmPassword, role } = formData;

  //   if (password !== confirmPassword) {
  //     setErrorMessage('Passwords do not match.');
  //     return;
  //   }

  //   try {
  //     const response = await axios.post('http://localhost:5000/api/auth/signup', {
  //       name,
  //       email,
  //       password,
  //       roles: [role], // Must be array as per schema
  //     });

  //     console.log('Signup successful:', response.data);
  //     handleSubmit(e);
  //   } catch (error) {
  //     console.error('Signup failed:', error);
  //     setErrorMessage(
  //       error.response?.data?.message || 'Signup failed. Please try again.'
  //     );
  //   }
  // };


const dispatch = useDispatch(); // inside component

const handleSignup = async (e) => {
  e.preventDefault();
  setErrorMessage('');

  const { name, email, password, confirmPassword, role } = formData;

  if (password !== confirmPassword) {
    setErrorMessage('Passwords do not match.');
    return;
  }

  try {
    const response = await axios.post('http://localhost:5000/api/auth/signup', {
      name,
      email,
      password,
      roles: [role],
    });

    const { token, user } = response.data;

    const userData = {
      token,
      ...user,
    };

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    dispatch(setLogin(userData));
    handleSubmit(e);
  } catch (error) {
    console.error('Signup failed:', error);
    setErrorMessage(
      error.response?.data?.message || 'Signup failed. Please try again.'
    );
  }
};


  return (
    <form onSubmit={handleSignup} className="modal-form">
      {errorMessage && (
        <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>
          {errorMessage}
        </div>
      )}

      {/* Name */}
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <div className="input-wrapper">
          <span className="input-icon name-icon"></span>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            placeholder="Enter your name"
          />
        </div>
      </div>

      {/* Email */}
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <div className="input-wrapper">
          <span className="input-icon email-icon"></span>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            placeholder="Enter your email"
          />
        </div>
      </div>

      {/* Role */}
      <div className="form-group">
        <label htmlFor="role">Role</label>
        <div className="input-wrapper">
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            required
          >
            <option value="user">User</option>
            <option value="recruiter">Recruiter</option>
          </select>
        </div>
      </div>

      {/* Password */}
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <div className="input-wrapper">
          <span className="input-icon password-icon"></span>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            placeholder="Enter your password"
          />
          <button
            type="button"
            className={`password-toggle ${showPassword ? 'show' : 'hide'}`}
            onClick={togglePasswordVisibility}
          ></button>
        </div>
      </div>

      {/* Confirm Password */}
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <div className="input-wrapper">
          <span className="input-icon password-icon"></span>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
            placeholder="Confirm your password"
          />
          <button
            type="button"
            className={`password-toggle ${showConfirmPassword ? 'show' : 'hide'}`}
            onClick={toggleConfirmPasswordVisibility}
          ></button>
        </div>
      </div>

      <button type="submit" className="modal-submit-button">
        Sign Up
      </button>
    </form>
  );
}

export default SignupForm;
