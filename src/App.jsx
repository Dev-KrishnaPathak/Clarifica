import React, { useState, useEffect } from "react";
import "./App.css";
import LoginPage from "./LoginPage";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateToLogin = () => {
    setCurrentPage("login");
  };

  const navigateToHome = () => {
    setCurrentPage("home");
  };

  if (currentPage === "login") {
    return <LoginPage onBack={navigateToHome} />;
  }

  return (
    <div className="app">
      {/* Top Left Logo */}
      <img src="/logo.png" alt="Clarifica Logo" className="top-left-logo" />
      {/* Top Right Buttons */}
      <div className={`top-right-buttons ${isScrolled ? 'hidden' : ''}`}>
        <button className="btn-secondary" onClick={navigateToLogin}>Log In</button>
        <button className="btn-primary" onClick={navigateToLogin}>Sign Up</button>
      </div>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-background">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="hero-video"
          >
            <source src="/waves.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="title-c">C</span>
              <span className="title-rest">larifica</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Core Services</h2>
            <p className="section-subtitle">
              Three powerful ways to find clarity and support in your life
            </p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🧠</div>
              <h3>AI Therapist</h3>
              <p>Access professional-level emotional support anytime, anywhere. Our AI therapist provides compassionate guidance, helps you process feelings, and offers evidence-based coping strategies for your mental well-being.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">💭</div>
              <h3>Safe Venting Space</h3>
              <p>Express your thoughts and emotions freely in a judgment-free environment. Our venting feature provides a secure space to release pent-up feelings, helping you process emotions and find emotional relief.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Decision Making Support</h3>
              <p>Navigate life's complex choices with confidence. Our AI analyzes your situation, considers multiple perspectives, and provides structured guidance to help you make informed decisions that align with your values.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>About Clarifica</h2>
              <p>
                We believe everyone deserves access to emotional support and clarity in their decision-making. 
                Clarifica was created to bridge the gap between professional mental health support and everyday 
                emotional challenges, making psychological well-being accessible to everyone.
              </p>
              <p>
                Our AI-powered platform combines the best of therapeutic techniques, safe emotional expression, 
                and cognitive decision-making frameworks to provide comprehensive support for your mental health journey.
              </p>
              <div className="stats">
                <div className="stat">
                  <h3>50K+</h3>
                  <p>Users Supported</p>
                </div>
                <div className="stat">
                  <h3>24/7</h3>
                  <p>Availability</p>
                </div>
                <div className="stat">
                  <h3>95%</h3>
                  <p>Satisfaction Rate</p>
                </div>
              </div>
            </div>
            <div className="about-visual">
              <div className="about-image">
                <div className="image-placeholder">
                  <span>Mental Health Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="contact-content">
            <div className="contact-info">
              <h2>Get in Touch</h2>
              <p>Ready to start your journey to clarity and emotional well-being? Let's connect.</p>
              
              <div className="contact-methods">
                <div className="contact-method">
                  <div className="method-icon">📧</div>
                  <div>
                    <h4>Email</h4>
                    <p>support@clarifica.com</p>
                  </div>
                </div>
                
                <div className="contact-method">
                  <div className="method-icon">📞</div>
                  <div>
                    <h4>Support Line</h4>
                    <p>+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="contact-method">
                  <div className="method-icon">📍</div>
                  <div>
                    <h4>Office</h4>
                    <p>123 Wellness Drive<br />Mental Health City, MH 12345</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="contact-form">
              <form>
                <div className="form-group">
                  <input type="text" placeholder="Your Name" required />
                </div>
                <div className="form-group">
                  <input type="email" placeholder="Your Email" required />
                </div>
                <div className="form-group">
                  <textarea placeholder="How can we help you today?" rows="5" required></textarea>
                </div>
                <button type="submit" className="btn-primary btn-full">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="footer-logo">
                <span className="logo-text">Clarifica</span>
                <span className="logo-dot">.</span>
              </div>
              <p>Supporting your mental health journey with AI-powered clarity and compassion.</p>
            </div>
            
            <div className="footer-section">
              <h4>Services</h4>
              <ul>
                <li><a href="#features">AI Therapist</a></li>
                <li><a href="#features">Venting Space</a></li>
                <li><a href="#features">Decision Support</a></li>
                <li><a href="#pricing">Pricing</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Company</h4>
              <ul>
                <li><a href="#about">About</a></li>
                <li><a href="#careers">Careers</a></li>
                <li><a href="#blog">Blog</a></li>
                <li><a href="#press">Press</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Support</h4>
              <ul>
                <li><a href="#help">Help Center</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="#privacy">Privacy</a></li>
                <li><a href="#terms">Terms</a></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2024 Clarifica. All rights reserved.</p>
            <div className="social-links">
              <a href="#" className="social-link">Twitter</a>
              <a href="#" className="social-link">LinkedIn</a>
              <a href="#" className="social-link">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
