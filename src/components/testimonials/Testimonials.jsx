import React, { useState, useRef } from "react";
import "./Testimonials.css";
import testimonials from "./testimonialsData";

function Testimonials() {
  const [active, setActive] = useState(1);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);

  const total = testimonials.length;
  const prev = (active - 1 + total) % total;
  const next = (active + 1) % total;

  // Touch handlers for mobile
  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    setDragOffset(currentX - startX.current);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset > 50) {
      setActive(prev);
    } else if (dragOffset < -50) {
      setActive(next);
    }
    setDragOffset(0);
  };

  // Mouse drag handlers for desktop
  const handleMouseDown = (e) => {
    startX.current = e.clientX;
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    setDragOffset(currentX - startX.current);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset > 50) {
      setActive(prev);
    } else if (dragOffset < -50) {
      setActive(next);
    }
    setDragOffset(0);
  };

  return (
    <section className="testimonials-section" id="testimonials">
      {/* SECTION HEADER */}
      <div className="t-section-header">
        <span className="t-pre-tag">CLIENT STORIES // 9:16 VERTICAL MASTERS</span>
        <h2 className="t-title">
          What My <span>Clients Say</span>
        </h2>
        <p className="t-sub-hint">SWIPE OR DRAG REELS TO EXPLORE</p>
      </div>

      {/* 3D VERTICAL CAROUSEL STAGE */}
      <div
        className="t-carousel-stage"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="t-stage-glow"></div>

        {/* LEFT REEL (PREV) */}
        <div
          className="t-card t-card-left"
          onClick={() => setActive(prev)}
          role="button"
          tabIndex={0}
        >
          <img src={testimonials[prev].thumbnail} alt={testimonials[prev].name} />
          <div className="t-card-overlay"></div>
          <div className="t-side-tag">PREV CUT</div>
        </div>

        {/* ACTIVE MAIN VERTICAL REEL */}
        <div
          className={`t-card t-card-active ${isDragging ? "dragging" : ""}`}
          style={{
            transform: isDragging
              ? `translateX(calc(-50% + ${dragOffset}px)) scale(1)`
              : undefined,
          }}
        >
          <img src={testimonials[active].thumbnail} alt={testimonials[active].name} />
          <div className="t-card-overlay"></div>

          {/* FX3 Top HUD Indicator */}
          <div className="t-hud-top-bar">
            <div className="t-rec-indicator">
              <span className="t-rec-dot"></span>
              <span className="t-rec-text">REC // 9:16</span>
            </div>
            <span className="t-hud-aspect">2160 × 3840</span>
          </div>

          {/* Center Safe Frame Guides */}
          <div className="t-safe-frame"></div>

          {/* Central Play Trigger */}
          <div className="t-play-container">
            <div className="t-play-circle" title="Play Testimonial Reel">
              <span className="t-play-triangle">▶</span>
            </div>
          </div>

          {/* Bottom Client Info */}
          <div className="t-client-meta">
            <span className="t-client-spec">CLIENT MASTER DELIVERED</span>
            <h3 className="t-client-name">{testimonials[active].name}</h3>
            <p className="t-client-role">{testimonials[active].role}</p>
          </div>
        </div>

        {/* RIGHT REEL (NEXT) */}
        <div
          className="t-card t-card-right"
          onClick={() => setActive(next)}
          role="button"
          tabIndex={0}
        >
          <img src={testimonials[next].thumbnail} alt={testimonials[next].name} />
          <div className="t-card-overlay"></div>
          <div className="t-side-tag">NEXT CUT</div>
        </div>

        {/* ARROWS */}
        <button
          type="button"
          className="t-nav-arrow t-arrow-prev"
          onClick={() => setActive(prev)}
          aria-label="Previous reel"
        >
          ←
        </button>

        <button
          type="button"
          className="t-nav-arrow t-arrow-next"
          onClick={() => setActive(next)}
          aria-label="Next reel"
        >
          →
        </button>
      </div>

      {/* SWIPE DOTS PAGINATION */}
      <div className="t-pagination-dots">
        {testimonials.map((_, idx) => (
          <span
            key={idx}
            className={`t-dot ${idx === active ? "active-dot" : ""}`}
            onClick={() => setActive(idx)}
          ></span>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;