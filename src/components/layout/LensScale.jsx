import React, { useState, useEffect, useRef } from "react";
import "./LensScale.css";

const LENS_STATIONS = [
  { id: "hero", mm: "18", label: "HERO // REEL" },
  { id: "testimonials", mm: "24", label: "PROOF // CLIENTS" },
  { id: "styles", mm: "35", label: "CREATOR STYLES" },
  { id: "suite", mm: "50", label: "NLE EDIT SUITE" },
  { id: "cases", mm: "85", label: "CASE STUDIES" },
  { id: "cta", mm: "105", label: "COMMISSION // CALL" },
  { id: "about", mm: "135", label: "SONY FX3 // ABOUT" },
];

export default function LensScale() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStation, setActiveStation] = useState("hero");
  const rafId = useRef(null);

  useEffect(() => {
    const sectionElements = LENS_STATIONS.map((st) => ({
      id: st.id,
      el: document.getElementById(st.id),
    }));

    const updateOnFrame = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0;
      setScrollProgress(progress);

      const midPoint = scrollY + window.innerHeight * 0.38;
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const item = sectionElements[i];
        if (item.el && item.el.offsetTop <= midPoint) {
          setActiveStation(item.id);
          break;
        }
      }

      rafId.current = null;
    };

    const handleScroll = () => {
      if (rafId.current === null) {
        rafId.current = requestAnimationFrame(updateOnFrame);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateOnFrame();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const totalFrames = Math.floor(scrollProgress * (90 * 24));
  const tcSeconds = Math.floor(totalFrames / 24);
  const remFrames = totalFrames % 24;
  const timecodeString = `00:00:${tcSeconds.toString().padStart(2, "0")}:${remFrames
    .toString()
    .padStart(2, "0")}`;

  return (
    <aside className="vrail-container" aria-label="Timeline and Lens Scale Navigation">
      {/* Desktop Top Telemetry */}
      <div className="vrail-top-telemetry">
        <span className="vrail-bracket">┌</span>
        <span className="vrail-axis-label">FOCAL // CTI</span>
        <span className="vrail-bracket">┐</span>
      </div>

      {/* Main Track Core */}
      <div className="vrail-track-core">
        <div className="vrail-axis-line"></div>
        <div className="vrail-tick-marks"></div>

        {/* Desktop CTI Playhead */}
        <div
          className="vrail-playhead-reticle"
          style={{
            transform: `translate3d(0, ${(scrollProgress * 88 + 6) * 4.8}px, 0)`,
          }}
        >
          <div className="vrail-tc-pill">
            <span className="vrail-rec-dot"></span>
            <span className="vrail-tc-val">{timecodeString}</span>
          </div>

          <div className="vrail-playhead-head">
            <div className="vrail-playhead-notch"></div>
          </div>
          <div className="vrail-playhead-hairline"></div>
        </div>

        {/* Focal Buttons */}
        <div className="vrail-stations-wrap">
          {LENS_STATIONS.map((station) => {
            const isActive = activeStation === station.id;
            return (
              <button
                key={station.id}
                type="button"
                className={`vrail-station-node ${isActive ? "vrail-active" : ""}`}
                onClick={() => scrollToSection(station.id)}
              >
                <div className="vrail-station-tick"></div>
                <div className="vrail-station-number-box">
                  <span className="vrail-station-num">{station.mm}</span>
                  <span className="vrail-station-unit">MM</span>
                </div>

                <div className="vrail-tooltip">
                  <span className="vrail-tooltip-tag">{station.mm}MM PRIME</span>
                  <span className="vrail-tooltip-desc">{station.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop Bottom Telemetry */}
      <div className="vrail-bottom-telemetry">
        <span className="vrail-bracket">└</span>
        <span className="vrail-mode-tag">NLE 9:16</span>
        <span className="vrail-bracket">┘</span>
      </div>

      {/* Mobile Live Timecode Indicator */}
      <div className="vrail-mobile-tc-chip">
        <span className="vrail-rec-dot"></span>
        <span>{timecodeString}</span>
      </div>
    </aside>
  );
}