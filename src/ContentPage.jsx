import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ContentPage.css';
import Perspectives from './Perspectives';

function ContentPage() {
  const navigate = useNavigate();

  // Data for the tiles
  const initialTiles = [
    {
      id: 'ai-therapist',
      imgSrc: '/therapy-tile.jpeg',
      imgAlt: 'AI Therapist',
      title: 'AI Therapist',
      meta: 'Mindset • 2 min',
      content: 'Our AI Therapist offers a conversational approach to mental wellness, providing insights and exercises based on Cognitive Behavioral Therapy. It helps you identify and challenge negative thought patterns in a safe, non-judgmental environment.'
    },
    {
      id: 'safe-venting',
      imgSrc: '/vent-tile.jpeg',
      imgAlt: 'Safe Venting',
      title: 'Safe Venting Space',
      meta: 'Expression • 3 min',
      content: 'A private and secure space for you to express your thoughts and feelings without fear of judgment. Venting can be a powerful tool for emotional release and self-reflection. Our platform ensures your data is encrypted and confidential.'
    },
    {
      id: 'decision-support',
      imgSrc: '/decision-tile.jpeg',
      imgAlt: 'Decision Support',
      title: 'Decision Making Support',
      meta: 'Clarity • 4 min',
      content: 'Struggling with a tough choice? Our decision support tool uses structured frameworks to help you weigh pros and cons, consider different perspectives, and gain clarity on your options. Make choices that align with your values and goals.'
    },
  ];

  const [tiles] = useState(initialTiles);

  return (
    <div className="content-page">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-text">Clarifica</span>
            <span className="logo-dot">.</span>
          </div>
          <div className="nav-menu">
            <a href="#perspectives" className="nav-link">Perspectives</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#contact" className="nav-link">Contact</a>
            <div className="nav-cta">
              <button 
                className="btn-primary"
                onClick={() => navigate('/login')}
              >
                Log In
              </button>
              <button 
                className="btn-secondary"
                onClick={() => navigate('/login', { state: { showSignUp: true } })}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Perspectives Section */}
      <section id="perspectives">
        <Perspectives tiles={tiles} />
      </section>

      {/* About Section */}
      <section
        id="about"
        className="about"
      >
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
                <li><a href="#perspectives">AI Therapist</a></li>
                <li><a href="#perspectives">Venting Space</a></li>
                <li><a href="#perspectives">Decision Support</a></li>
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

export default ContentPage;
