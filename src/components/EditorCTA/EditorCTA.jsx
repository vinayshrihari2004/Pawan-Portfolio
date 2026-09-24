import React from "react";
import "./EditorCTA.css";

export default function EditorCTA() {
  return (
    <section className="editor-cta-section" id="cta">
      {/* Background Optical Radial Glow */}
      <div className="cta-ambient-glow" aria-hidden="true"></div>

      <div className="cta-container">
        {/* Availability Badge */}
        <div className="cta-availability-badge">
          <span className="pulsing-indicator"></span>
          <span>CURRENTLY ACCEPTING 2 SELECT CREATORS</span>
        </div>

        {/* Main Headline */}
        <h2 className="cta-main-title">
          Ready to scale your <span>Reels & Shorts?</span>
        </h2>

        {/* Short & Punchy Subtitle */}
        <p className="cta-sub-copy">
          Let’s review your retention drop-offs, pacing, and hooks. Book a quick 15-minute alignment call to see if we’re a fit.
        </p>

        {/* Direct Calendly Action */}
        <div className="cta-action-wrap">
          <a
            href="https://calendly.com/your-calendly-username" 
            target="_blank"
            rel="noopener noreferrer"
            className="cta-calendly-btn"
          >
            <svg
              className="calendar-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="18" y2="10"></line>
            </svg>
            <span>SCHEDULE A 15-MIN CALL</span>
            <span className="btn-arrow">↗</span>
          </a>

          <span className="cta-micro-note">
            Free 15-min strategy & timeline audit • No obligation
          </span>
        </div>
      </div>
    </section>
  );
}