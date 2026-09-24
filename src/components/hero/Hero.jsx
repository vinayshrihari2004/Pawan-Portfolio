import React from "react";
import CTAButtons from "./CTAButtons";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero-section" id="hero">
      {/* Background Volumetric Glow */}
      <div className="hero-ambient-glow" aria-hidden="true"></div>

      <div className="hero-grid-container">
        {/* LEFT COLUMN: HERO HEADLINE, CTAs & METRICS */}
        <div className="hero-content-col">
          <div className="hero-telemetry-badge">
            <span className="telemetry-dot"></span>
            <span className="telemetry-label">
              SONY FX3 // VERTICAL CINEMA &amp; MOTION
            </span>
          </div>

          <h1 className="hero-main-title">
            Crafting Videos That
            <span className="hero-gradient-text"> Capture Attention </span>
            &amp; Drive Results
          </h1>

          <p className="hero-lead-text">
            High-retention Shorts, Reels, and kinetic motion systems engineered
            for high-scale creators to maximize watch time and conversions.
          </p>

          <div className="hero-action-dock">
            <CTAButtons />
          </div>

          <div className="hero-metrics-ribbon">
            <div className="metric-chip">
              <span className="metric-val">45M+</span>
              <span className="metric-lbl">VIEWS PRODUCED</span>
            </div>
            <div className="metric-sep">/</div>
            <div className="metric-chip">
              <span className="metric-val">78%</span>
              <span className="metric-lbl">AVG RETENTION</span>
            </div>
            <div className="metric-sep">/</div>
            <div className="metric-chip">
              <span className="metric-val">48H</span>
              <span className="metric-lbl">TURNAROUND</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: FRAMELESS CREATOR CUTOUT WITH BLENDED OPACITY & RIM LIGHT */}
        <div className="hero-visual-col">
          <div className="hero-frameless-stage">
            <div className="hero-cutout-wrapper">
              <img
                src="/pawan.png"
                alt="Pawan - Video Editor & Motion Designer"
                className="hero-frameless-img"
              />
            </div>

            {/* --- 6 BRANDED CARDS FROM REFERENCE --- */}

            {/* 1. VIRAL ANIMATIONS */}
            <div className="pill-hardware-card pill-viral">
              <div className="pill-icon-svg" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 20V10" />
                  <path d="M12 20V4" />
                  <path d="M6 20v-6" />
                </svg>
              </div>
              <div className="pill-text-wrap">
                <span className="pill-head">VIRAL ANIMATIONS</span>
                <span className="pill-subhead">HIGHER RETENTION</span>
              </div>
            </div>

            {/* 2. YOUTUBE SHORTS */}
            <div className="pill-hardware-card pill-shorts">
              <div className="pill-icon-svg" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="10 8 16 12 10 16 10 8" fill="#00d4ff" stroke="none" />
                </svg>
              </div>
              <div className="pill-text-wrap">
                <span className="pill-head">YOUTUBE SHORTS</span>
                <span className="pill-subhead">WATCH TIME GROWTH</span>
              </div>
            </div>

            {/* 3. TALKING HEAD VIDEOS */}
            <div className="pill-hardware-card pill-talking">
              <div className="pill-icon-svg" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
              </div>
              <div className="pill-text-wrap">
                <span className="pill-head">TALKING HEAD VIDEOS</span>
                <span className="pill-subhead">CLEAN &amp; ENGAGING</span>
              </div>
            </div>

            {/* 4. PODCAST CLIPS */}
            <div className="pill-hardware-card pill-podcast">
              <div className="pill-icon-svg" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" x2="12" y1="19" y2="22" />
                </svg>
              </div>
              <div className="pill-text-wrap">
                <span className="pill-head">PODCAST CLIPS</span>
                <span className="pill-subhead">MORE REACH</span>
              </div>
            </div>

            {/* 5. SOUND DESIGN */}
            <div className="pill-hardware-card pill-sound">
              <div className="pill-icon-svg" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 10v4" />
                  <path d="M6 6v12" />
                  <path d="M10 3v18" />
                  <path d="M14 8v8" />
                  <path d="M18 5v14" />
                  <path d="M22 10v4" />
                </svg>
              </div>
              <div className="pill-text-wrap">
                <span className="pill-head">SOUND DESIGN</span>
                <span className="pill-subhead">SFX &amp; FOLEY</span>
              </div>
            </div>

            {/* 6. KINETIC MOTION */}
            <div className="pill-hardware-card pill-kinetic">
              <div className="pill-icon-svg" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 2 7 12 12 22 7 12 2" />
                  <polyline points="2 17 12 22 22 17" />
                  <polyline points="2 12 12 17 22 12" />
                </svg>
              </div>
              <div className="pill-text-wrap">
                <span className="pill-head">KINETIC MOTION</span>
                <span className="pill-subhead">PREMIUM EDITS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}