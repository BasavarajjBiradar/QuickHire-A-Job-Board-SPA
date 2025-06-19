import React, { useEffect, useState } from 'react';
import './Navbar.css';
import axios from 'axios';
function LoginForm({ formData, handleInputChange, handleSubmit }) {    //http://localhost:5000/api/auth/login
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleAuth = async(e) => {
    const { email, password } = formData;

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      console.log('Login successful:', response.data);
    } catch (error) {
      console.error('Login failed:', error);
    }

  };

  useEffect(() => {
    const passwordInput = document.getElementById('password');
    if (showPassword) {
      passwordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
    }
  }, [showPassword]);



  return (
    <form onSubmit={handleSubmit} className="modal-form">
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