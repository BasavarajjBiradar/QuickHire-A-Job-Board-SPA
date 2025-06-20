import React, { useState } from 'react';
import './Navbar.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setLogin } from '../redux/authSlice';

function LoginForm({ formData, handleInputChange, handleSubmit }) {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const { email, password } = formData;

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });

      const userData = response.data.user;
      const token = response.data.token;

      localStorage.setItem('token', token);         // ✅ Store token
      dispatch(setLogin(userData));                 // ✅ Set Redux user
      console.log('Login successful:', response.data);

      handleSubmit(e);
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessage(
        error.response?.data?.message || 'Invalid email or password. Please try again.'
      );
    }
  };

  return (
    <form onSubmit={handleAuth} className="modal-form">
      {errorMessage && (
        <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>
          {errorMessage}
        </div>
      )}
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
      <button type="submit" className="modal-submit-button">
        Login
      </button>
    </form>
  );
}

export default LoginForm;