import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import LoginPage from "./LoginPage";

function Dashboard() {
  return (
    <div style={{ color: '#222', textAlign: 'center', marginTop: '100px', fontSize: '2rem' }}>
      Welcome! You are logged in.<br />
      (Replace this with your real dashboard or home page)
    </div>
  );
}

function HomePage() {
  const navigate = useNavigate();

  // Data for the tiles
  const initialTiles = [
    {
      id: 'ai-therapist',
      imgSrc: '/therapy-tile.jpeg',
      imgAlt: 'AI Therapist',
      title: 'AI Therapist',
      meta: 'Mindset • 2 min',
    },
    {
      id: 'safe-venting',
      imgSrc: '/vent-tile.jpeg',
      imgAlt: 'Safe Venting',
      title: 'Safe Venting Space',
      meta: 'Expression • 3 min',
    },
    {
      id: 'decision-support',
      imgSrc: '/decision-tile.jpeg',
      imgAlt: 'Decision Support',
      title: 'Decision Making Support',
      meta: 'Clarity • 4 min',
    },
  ];

  const [tiles] = useState(initialTiles);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % tiles.length);
    }, 3000); // Change tile every 3 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [tiles.length]);

  // Animated quote words
  const animatedWords = ["Alignment", "Wellness", "Prosperity"];
  const [wordIndex, setWordIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    setAnimating(true);
    const timeout = setTimeout(() => setAnimating(false), 1500); // animation duration
    const interval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => setAnimating(false), 1500);
      setWordIndex((prev) => (prev + 1) % animatedWords.length);
    }, 3500);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  const quote = [
    "The next chapter in your life is called ",
    <span className="animated-quote-fancy-word-wrapper" key="animated-word-wrapper">
      <span
        key={animatedWords[wordIndex]}
        className={`animated-quote-fancy-word${animating ? ' animating' : ''}`}
      >
        {animatedWords[wordIndex]}
      </span>
    </span>
  ];

  return (
    <div className="app">
      {/* Top Right Buttons */}
      <div className={`top-right-buttons`}>
        <button className="btn-secondary" onClick={() => navigate('/login')}>Log In</button>
        <button className="btn-primary" onClick={() => navigate('/login')}>Sign Up</button>
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
            <source src="/third.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title" style={{margin: 0}}>
              <span className="title-c">C</span>
              <span className="title-rest">larifica</span>
            </h1>
            {/* Quote just below Clarifica */}
            <div style={{
              color: 'white',
              fontSize: '1.1rem',
              fontStyle: 'italic',
              textAlign: 'center',
              marginTop: '0.1rem',
              zIndex: 10
            }}>
              {quote}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Tiles Section */}
      <section className="blog-tiles-section">
        <div className="container">
          <div className="tiles-container">
            <div className="circular-scroll-wrapper">
              {tiles.map((tile, index) => {
                const offset = (index - currentIndex + tiles.length) % tiles.length;
                let transform = '';
                let opacity = 0;
                let zIndex = 0;
                
                if (offset === 0) {
                  // Center tile
                  transform = 'translateX(0) scale(1)';
                  opacity = 1;
                  zIndex = 2;
                } else if (offset === 1) {
                  // Right tile
                  transform = 'translateX(120px) scale(0.8)';
                  opacity = 0.5;
                  zIndex = 1;
                } else if (offset === tiles.length - 1) {
                  // Left tile
                  transform = 'translateX(-120px) scale(0.8)';
                  opacity = 0.5;
                  zIndex = 1;
                }
                
                const style = {
                  transform: transform,
                  opacity: opacity,
                  zIndex: zIndex,
                  pointerEvents: 'none', // Disable pointer events as it's automatic
                  backgroundImage: `url(${tile.imgSrc})`,
                };
                
                return (
                  <div className="blog-tile" key={tile.id} style={style}>
                    <div className="tile-content">
                      <h3>{tile.title}</h3>
                      <div className="tile-meta">
                        <p>{tile.meta}</p>
                        <span className="tile-arrow">↗</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - AI Therapist */}
      <section
        id="ai-therapist"
        className="features"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="container">
          <div className="about-content">
            <div
              className="about-text"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <h2>AI Therapist</h2>
              <p>
                Access professional-level emotional support anytime, anywhere. Our AI therapist provides compassionate guidance, helps you process feelings, and offers evidence-based coping strategies for your mental well-being.
              </p>
            </div>
            <div
              className="about-visual"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="about-image">
                <div className="image-placeholder">
                  <img src="/therapy section.jpeg" alt="Therapy session" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Safe Venting Space */}
      <section
        id="safe-venting"
        className="features"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="container">
          <div className="about-content">
            <div
              className="about-visual"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <div className="about-image">
                <div className="image-placeholder">
                  <img src="/venting.jpeg" alt="Venting space" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            </div>
            <div
              className="about-text"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <h2>Safe Venting Space</h2>
              <p>
                Express your thoughts and emotions freely in a judgment-free environment. Our venting feature provides a secure space to release pent-up feelings, helping you process emotions and find emotional relief.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Decision Making Support */}
      <section
        id="decision-support"
        className="features"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="container">
          <div className="about-content">
            <div
              className="about-text"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <h2>Decision Making Support</h2>
              <p>
                Navigate life's complex choices with confidence. Our AI analyzes your situation, considers multiple perspectives, and provides structured guidance to help you make informed decisions that align with your values.
              </p>
            </div>
            <div
              className="about-visual"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="about-image">
                <div className="image-placeholder">
                  <span>🎯</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="about"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="container">
          <div className="about-content">
            <div
              className="about-text"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
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
            <div
              className="about-visual"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
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

function AppRoutes() {
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

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
