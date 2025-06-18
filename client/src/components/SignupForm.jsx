import React, { useState } from 'react';
import './Navbar.css';

function SignupForm({ formData, handleInputChange, handleSubmit }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <form onSubmit={handleSubmit} className="modal-form">
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