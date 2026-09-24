import React from "react";
import "./CTAButtons.css";

export default function CTAButtons() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="hero-cta-group">
      {/* Primary Trigger: Exact Rounded Cyan Pill */}
      <button
        type="button"
        className="hero-btn-book"
        onClick={() => scrollTo("cta")}
      >
        <span className="btn-book-label">BOOK A CALL</span>
        <span className="btn-book-arrow">→</span>
      </button>

      {/* Secondary Trigger: View My Work */}
      <button
        type="button"
        className="hero-btn-secondary"
        onClick={() => scrollTo("suite")}
      >
        <span className="btn-dot-live"></span>
        <span className="btn-work-text">View My Work</span>
        <span className="btn-arrow-icon">↘</span>
      </button>
    </div>
  );
}