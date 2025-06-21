import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import LoginPage from "./LoginPage";

function LoadingBar({ progress }) {
  return (
    <div className="loading-bar-container">
      <div className="loading-bar" style={{ width: `${progress}%` }}></div>
    </div>
  );
}

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
  const intervalIdRef = useRef(null);

  // Automatic tile loop effect
  useEffect(() => {
    intervalIdRef.current = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % tiles.length);
    }, 3000);
    return () => clearInterval(intervalIdRef.current);
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

  // Fill animation state
  const [progress, setProgress] = useState(0);
  const [startFill, setStartFill] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayActive, setOverlayActive] = useState(false);
  const buttonRef = React.useRef(null);
  const [overlayStyle, setOverlayStyle] = useState({ width: 0, height: 0, borderRadius: '50px', left: 0, top: 0 });
  const [buttonCenter, setButtonCenter] = useState({ x: 0, y: 0 });
  const [showOverlayText, setShowOverlayText] = useState(false);

  useEffect(() => {
    // Wait for last letter fade-in (1.1s delay + 0.6s duration) + 0.5s extra = 2.2s
    const fillTimeout = setTimeout(() => setStartFill(true), 2200);
    return () => clearTimeout(fillTimeout);
  }, []);
  useEffect(() => {
    if (!startFill) return;
    let interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 100));
    }, 30);
    return () => clearInterval(interval);
  }, [startFill]);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        setShowOverlay(true);
        if (buttonRef.current) {
          const btnRect = buttonRef.current.getBoundingClientRect();
          const heroRect = buttonRef.current.closest('.hero').getBoundingClientRect();
          const btnCenterX = btnRect.left - heroRect.left + btnRect.width / 2;
          const btnCenterY = btnRect.top - heroRect.top + btnRect.height / 2;
          setButtonCenter({ x: btnCenterX, y: btnCenterY });
          setOverlayStyle({
            width: btnRect.width,
            height: btnRect.height,
            borderRadius: '50px',
            left: btnCenterX - btnRect.width / 2,
            top: btnCenterY - btnRect.height / 2,
          });
          setTimeout(() => {
            setOverlayActive(true);
            setOverlayStyle({
              width: '100%',
              height: '100%',
              borderRadius: '0px',
              left: 0,
              top: 0,
              transition: 'width 1.5s cubic-bezier(0.4,0,0.2,1), height 1.5s cubic-bezier(0.4,0,0.2,1), border-radius 1.5s cubic-bezier(0.4,0,0.2,1), left 1.5s cubic-bezier(0.4,0,0.2,1), top 1.5s cubic-bezier(0.4,0,0.2,1)',
            });
          }, 10);
        }
      }, 500);
    }
  }, [progress]);

  useEffect(() => {
    if (showOverlay) {
      const textTimeout = setTimeout(() => setShowOverlayText(true), 500);
      return () => clearTimeout(textTimeout);
    } else {
      setShowOverlayText(false);
    }
  }, [showOverlay]);

  return (
    <div className="app">
      {/* Top Right Buttons */}
      {/* Removed Log In and Sign Up buttons */}
      {/* Hero Section */}
      <section id="home" className="hero" style={{ position: 'relative' }}>
        {showOverlay && (
          <div
            className={`white-fill-overlay${overlayActive ? ' active' : ''}`}
            style={{
              position: 'absolute',
              left: overlayStyle.left,
              top: overlayStyle.top,
              width: overlayStyle.width,
              height: overlayStyle.height,
              borderRadius: overlayStyle.borderRadius,
              zIndex: 3000,
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'transparent',
              overflow: 'hidden',
              transition: overlayStyle.transition || 'width 1.5s cubic-bezier(0.4,0,0.2,1), height 1.5s cubic-bezier(0.4,0,0.2,1), border-radius 1.5s cubic-bezier(0.4,0,0.2,1), left 1.5s cubic-bezier(0.4,0,0.2,1), top 1.5s cubic-bezier(0.4,0,0.2,1)',
            }}
          >
            <video
              src="/Second.mp4"
              autoPlay
              muted
              loop
              playsInline
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
            {showOverlayText && (
              <span
                className="overlay-fade-in-text"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: '#fff',
                  fontSize: '12rem',
                  fontWeight: 400,
                  textShadow: '0 2px 16px rgba(0,0,0,0.5)',
                  pointerEvents: 'none',
                  letterSpacing: '0.05em',
                  zIndex: 10,
                  fontFamily: 'Bacasime Antique, serif',
                }}
              >
                Clarifica
              </span>
            )}
          </div>
        )}
        <div className="hero-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <button className="center-hero-btn" style={{ position: 'relative', overflow: 'hidden' }} ref={buttonRef}>
            <span
              className="center-hero-btn-fill"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                width: `${progress}%`,
                background: '#fff',
                zIndex: 1,
                transition: 'width 0.3s cubic-bezier(0.4,0,0.2,1)',
              }}
            />
            <span
              className="center-hero-btn-text"
              style={{
                position: 'relative',
                zIndex: 2,
                color: `rgb(${255 - Math.round(progress * 2.55)}, ${255 - Math.round(progress * 2.55)}, ${255 - Math.round(progress * 2.55)})`,
                transition: 'color 0.3s',
              }}>
              {Array.from('Clarifica').map((char, i) => (
                <span className="center-hero-btn-letter" key={i}>{char}</span>
              ))}
            </span>
          </button>
        </div>
      </section>

      {/* Blog Tiles Section */}
      <section className="blog-tiles-section">
        <div className="container tiles-container">
          <div className="circular-scroll-wrapper">
            {tiles.map((tile, index) => {
              const offset = (index - currentIndex + tiles.length) % tiles.length;
              let style = {
                backgroundImage: `url(${tile.imgSrc})`,
              };

              let transform = '';
              let opacity = 0;
              let zIndex = 0;
              if (offset === 0) {
                transform = 'translateX(0) scale(1)';
                opacity = 1;
                zIndex = 2;
              } else if (offset === 1) {
                transform = 'translateX(120px) scale(0.8)';
                opacity = 0.5;
                zIndex = 1;
              } else if (offset === tiles.length - 1) {
                transform = 'translateX(-120px) scale(0.8)';
                opacity = 0.5;
                zIndex = 1;
              }

              style = {
                ...style,
                transform,
                opacity,
                zIndex,
                pointerEvents: 'none',
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
