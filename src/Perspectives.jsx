import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Perspectives.css';

const Perspectives = ({ tiles }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedTile, setSelectedTile] = useState(null);
  const intervalIdRef = useRef(null);
  const navigate = useNavigate();

  const handleTileClick = (tile, index) => {
    setCurrentIndex(index);
    setSelectedTile(tile);
  };
  
  const handleClose = () => {
    setSelectedTile(null);
  }

  const handlePrev = () => {
      const newIndex = (currentIndex - 1 + tiles.length) % tiles.length;
      setCurrentIndex(newIndex);
      setSelectedTile(tiles[newIndex]);
  }

  const handleNext = () => {
      const newIndex = (currentIndex + 1) % tiles.length;
      setCurrentIndex(newIndex);
      setSelectedTile(tiles[newIndex]);
  }

  useEffect(() => {
    if (!selectedTile) {
      intervalIdRef.current = setInterval(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % tiles.length);
      }, 3000);
    } else {
        clearInterval(intervalIdRef.current);
    }
    return () => clearInterval(intervalIdRef.current);
  }, [tiles.length, selectedTile]);

  // Map tile id to route
  const getSessionRoute = (tileId) => {
    if (tileId === 'ai-therapist') return '/ai-therapist';
    if (tileId === 'safe-venting') return '/vent';
    if (tileId === 'decision-support') return '/decision-support';
    return '/';
  };

  return (
    <section className="blog-tiles-section">
      <div className={`container tiles-container ${selectedTile ? 'content-visible' : ''}`}>
        <div className="circular-scroll-wrapper">
            {selectedTile && (
                <>
                    <div className="carousel-arrow left-arrow" onClick={handlePrev}>‹</div>
                    <div className="carousel-arrow right-arrow" onClick={handleNext}>›</div>
                </>
            )}
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
              cursor: 'pointer',
            };
            
            return (
              <div 
                className={`blog-tile`}
                key={tile.id} 
                style={style}
                onClick={() => handleTileClick(tile, index)}
              >
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
         <div className={`selected-tile-content-wrapper ${selectedTile ? 'visible' : ''}`}>
            {selectedTile && (
                <div className="selected-tile-content">
                    <h2>{selectedTile.title}</h2>
                    <p>{selectedTile.content}</p>
                    <button onClick={handleClose}>Close</button>
                    <button style={{marginLeft: '16px', backgroundColor: 'black', color: 'white'}} onClick={() => navigate(getSessionRoute(selectedTile.id))}>
                      Start Session
                    </button>
                </div>
            )}
        </div>
        <div className="click-instruction">Click on Card</div>
      </div>
    </section>
  );
};

export default Perspectives;
