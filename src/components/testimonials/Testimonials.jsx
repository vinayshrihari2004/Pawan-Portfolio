import React, { useState, useRef, useEffect, useCallback } from "react";
import "./Testimonials.css";
import testimonials from "./testimonialsData";

const SLIDE_DURATION = 1000; // 4.5s per review

function Testimonials() {
  const [active, setActive] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const startX = useRef(0);

  const total = testimonials.length;
  const prev = (active - 1 + total) % total;
  const next = (active + 1) % total;

  const handleNext = useCallback(() => {
    setActive((curr) => (curr + 1) % total);
    setProgressKey((k) => k + 1);
  }, [total]);

  const handlePrev = useCallback(() => {
    setActive((curr) => (curr - 1 + total) % total);
    setProgressKey((k) => k + 1);
  }, [total]);

  const handleSelect = (idx) => {
    setActive(idx);
    setProgressKey((k) => k + 1);
  };

  // Continuous auto-sliding timer with pause on hover/interaction
  useEffect(() => {
    if (isPaused || isDragging) return;

    const timer = setInterval(() => {
      handleNext();
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, [isPaused, isDragging, handleNext, progressKey]);

  // Touch handlers
  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    setDragOffset(e.touches[0].clientX - startX.current);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset > 50) handlePrev();
    else if (dragOffset < -50) handleNext();
    setDragOffset(0);
  };

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    startX.current = e.clientX;
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setDragOffset(e.clientX - startX.current);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset > 50) handlePrev();
    else if (dragOffset < -50) handleNext();
    setDragOffset(0);
  };

  return (
    <section
      className="testimonials-section"
      id="testimonials"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* SECTION HEADER */}
      <div className="t-section-header">
        <span className="t-pre-tag">// VERIFIED EDITORIAL FEEDBACK</span>
        <h2 className="t-title">
          Client <span>Endorsements</span>
        </h2>
        <div className="t-status-row">
          <span className="t-live-pulse"></span>
          <p className="t-sub-hint">
            {isPaused ? "AUTO-CYCLE PAUSED (HOVERED)" : "AUTO-STREAMING LIVE REVIEWS"}
          </p>
        </div>
      </div>

      {/* 3D CAROUSEL STAGE */}
      <div
        className="t-carousel-stage"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <div className="t-stage-glow"></div>

        {/* LEFT GHOST CARD */}
        <div
          className="t-card t-card-left"
          onClick={handlePrev}
          role="button"
          tabIndex={0}
        >
          <div className="t-hud-top-bar">
            <span className="t-rec-text">{testimonials[prev].deliverable}</span>
          </div>
          <p className="t-quote-snippet">
            "{testimonials[prev].quote.slice(0, 110)}..."
          </p>
          <div className="t-author-block">
            <h4 className="t-client-name">{testimonials[prev].name}</h4>
            <span className="t-client-role">{testimonials[prev].role}</span>
          </div>
        </div>

        {/* ACTIVE MAIN CARD */}
        <div
          key={active}
          className={`t-card t-card-active ${isDragging ? "dragging" : ""}`}
          style={{
            transform: isDragging
              ? `translateX(calc(-50% + ${dragOffset}px)) scale(1)`
              : undefined,
          }}
        >
          {/* Animated Top Progress Bar */}
          <div className="t-card-progress-track">
            <div
              key={progressKey}
              className={`t-card-progress-fill ${isPaused ? "paused" : ""}`}
              style={{ animationDuration: `${SLIDE_DURATION}ms` }}
            ></div>
          </div>

          {/* Top HUD */}
          <div className="t-hud-top-bar">
            <div className="t-rec-indicator">
              <span className="t-rec-dot"></span>
              <span className="t-rec-text">
                CUT {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
            </div>
            <span className="t-hud-aspect">{testimonials[active].deliverable}</span>
          </div>

          {/* Animated Quote */}
          <blockquote className="t-quote-text">
            "{testimonials[active].quote}"
          </blockquote>

          {/* Author Details Footer */}
          <div className="t-author-footer">
            <div className="t-author-info">
              <h3 className="t-client-name">{testimonials[active].name}</h3>
              <p className="t-client-role">{testimonials[active].role}</p>
            </div>
            <div className="t-metric-tag">
              <span>{testimonials[active].metric}</span>
            </div>
          </div>
        </div>

        {/* RIGHT GHOST CARD */}
        <div
          className="t-card t-card-right"
          onClick={handleNext}
          role="button"
          tabIndex={0}
        >
          <div className="t-hud-top-bar">
            <span className="t-rec-text">{testimonials[next].deliverable}</span>
          </div>
          <p className="t-quote-snippet">
            "{testimonials[next].quote.slice(0, 110)}..."
          </p>
          <div className="t-author-block">
            <h4 className="t-client-name">{testimonials[next].name}</h4>
            <span className="t-client-role">{testimonials[next].role}</span>
          </div>
        </div>

        {/* ARROWS */}
        <button
          type="button"
          className="t-nav-arrow t-arrow-prev"
          onClick={handlePrev}
          aria-label="Previous testimonial"
        >
          ←
        </button>

        <button
          type="button"
          className="t-nav-arrow t-arrow-next"
          onClick={handleNext}
          aria-label="Next testimonial"
        >
          →
        </button>
      </div>

      {/* 8-DOT PAGINATION */}
      <div className="t-pagination-dots">
        {testimonials.map((_, idx) => (
          <button
            type="button"
            key={idx}
            className={`t-dot ${idx === active ? "active-dot" : ""}`}
            onClick={() => handleSelect(idx)}
            aria-label={`View review ${idx + 1}`}
          ></button>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;