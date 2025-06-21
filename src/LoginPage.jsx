import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: ""
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    // After successful login:
    navigate("/dashboard");
  };

  return (
    <div className="login-page">
      {/* Background Video */}
      <div className="login-background">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="login-video"
        >
          <source src="/third.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="login-overlay"></div>
      </div>

      {/* Login Container */}
      <div className="login-container">
        <div className="login-card">
          {/* Logo */}
          <div className="login-logo">
            <span className="logo-text">Clarifica</span>
            <img src="/logo.png" alt="Clarifica Logo" className="login-logo-image" />
          </div>

          {/* Form Toggle */}
          <div className="form-toggle">
            <button
              className={`toggle-btn ${isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(true)}
            >
              Log In
            </button>
            <button
              className={`toggle-btn ${!isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                required
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                required
              />
            </div>

            {isLogin && (
              <div className="form-options">
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                  Remember me
                </label>
                <a href="#" className="forgot-password">Forgot Password?</a>
              </div>
            )}

            <button type="submit" className="submit-btn">
              {isLogin ? 'Log In' : 'Sign Up'}
            </button>
          </form>

          {/* Social Login */}
          <div className="social-login">
            <div className="divider">
              <span>or continue with</span>
            </div>
            <div className="social-buttons">
              <button className="social-btn google">
                <span className="social-icon">🔍</span>
                Google
              </button>
              <button className="social-btn apple">
                <span className="social-icon">🍎</span>
                Apple
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage; 