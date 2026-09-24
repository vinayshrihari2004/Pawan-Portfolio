import React, { useState, useEffect, useRef } from "react";
import "./AboutMe.css";

const telemetryStats = [
  { label: "VIEWS PRODUCED", val: "45M+", sub: "ORGANIC BENCHMARK" },
  { label: "AVG HOOK RETENTION", val: "68%", sub: "FIRST 3-SEC RATE" },
  { label: "FLAGSHIP EDITS", val: "180+", sub: "DELIVERED MASTERS" },
  { label: "TURNAROUND", val: "48h", sub: "RUSH TO FINAL 9:16" },
];

export default function AboutMe() {
  const [frames, setFrames] = useState(14);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);
  const sectionRef = useRef(null);

  // Lazy Video Decoding: Only decode & play when scrolled near
  useEffect(() => {
    const videoEl = videoRef.current;
    const sectionEl = sectionRef.current;
    if (!videoEl || !sectionEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoEl.play().catch(() => {});
          setIsPlaying(true);
        } else {
          videoEl.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(sectionEl);
    return () => observer.disconnect();
  }, []);

  // 24fps SMPTE Timecode counter (throttled)
  useEffect(() => {
    const timer = setInterval(() => {
      setFrames((prev) => (prev >= 23 ? 0 : prev + 1));
    }, 1000 / 24);
    return () => clearInterval(timer);
  }, []);

  const tcDisplay = `01:48:32:${frames.toString().padStart(2, "0")}`;

  const toggleAudio = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const togglePlayback = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <section className="fx3-about-section" id="about" ref={sectionRef}>
      {/* Background Matrix & Subtle Glow */}
      <div className="fx3-ambient-glow" aria-hidden="true"></div>

      <div className="fx3-about-container">
        {/* SECTION HEADER BAR */}
        <div className="fx3-section-meta">
          <div className="meta-left">
            <span className={`rec-tally-dot ${isPlaying ? "active" : "paused"}`}></span>
            <span className="meta-cam">SONY FX3 // OPERATOR PROFILE [135MM]</span>
          </div>
          <span className="meta-mode">DIRECTOR MONITOR // LIVE FEED</span>
        </div>

        {/* MAIN HUD INTERFACE GRID */}
        <div className="fx3-hud-terminal">

          {/* LEFT: LIVE CAMERA VIEWFINDER */}
          <div className="fx3-viewfinder-col">
            <div className="fx3-viewfinder-frame">
              
              {/* Top Viewfinder Telemetry */}
              <div className="hud-top-strip">
                <div 
                  className="tally-box" 
                  onClick={togglePlayback} 
                  title={isPlaying ? "Pause Feed" : "Resume Feed"}
                  role="button"
                  tabIndex={0}
                >
                  <span className={`tally-light ${isPlaying ? "rec" : "standby"}`}>●</span>
                  <span className="tally-text">{isPlaying ? "REC" : "STBY"}</span>
                </div>
                <div className="hud-tc">{tcDisplay}</div>
                <div className="hud-media">
                  <span className="slot-badge">A: 142m</span>
                  <span className="slot-badge">B: 98m</span>
                </div>
              </div>

              {/* AUTOPLAYING VIDEO NOTE */}
              <video
                ref={videoRef}
                className="hud-editor-video"
                src="/pawan-note.mp4"
                loop
                muted
                playsInline
                preload="metadata"
              />

              {/* Sony AF-C Eye Tracking Reticle */}
              <div className="sony-af-box">
                <span className="af-bracket top-left"></span>
                <span className="af-bracket top-right"></span>
                <span className="af-bracket bottom-left"></span>
                <span className="af-bracket bottom-right"></span>
                <span className="af-tag">AF-C [EYE] LOCK</span>
              </div>

              {/* Center 9:16 Action Safe Guides */}
              <div className="guide-9x16-box">
                <div className="center-crosshair"></div>
                <span className="guide-label">9:16 ACTION SAFE</span>
              </div>

              {/* Interactive Audio Unmute Toggle */}
              <button 
                type="button" 
                className={`hud-mic-btn ${isMuted ? "muted" : "live"}`}
                onClick={toggleAudio}
                title="Toggle client voice audio"
              >
                <span className="mic-icon">{isMuted ? "🔇" : "🔊"}</span>
                <span>{isMuted ? "UNMUTE AUDIO" : "AUDIO LIVE"}</span>
              </button>

              {/* Bottom Camera Settings Strip */}
              <div className="hud-bottom-camera-strip">
                <div className="cam-param">
                  <span className="param-k">SHUTTER</span>
                  <span className="param-v">1/50</span>
                </div>
                <div className="cam-param">
                  <span className="param-k">IRIS</span>
                  <span className="param-v">F1.4</span>
                </div>
                <div className="cam-param">
                  <span className="param-k">ISO</span>
                  <span className="param-v">800</span>
                </div>
                <div className="cam-param">
                  <span className="param-k">WB</span>
                  <span className="param-v">5600K</span>
                </div>
                <div className="cam-param">
                  <span className="param-k">LUT</span>
                  <span className="param-v active-lut">S-CINETONE</span>
                </div>
              </div>

              {/* Live Audio VU Level Meter */}
              <div className="hud-vu-meter">
                <span className="vu-label">CH1</span>
                <div className="vu-track">
                  <div className={`vu-fill ch1 ${isMuted ? "muted-bars" : "active-bars"}`}></div>
                </div>
                <span className="vu-label">CH2</span>
                <div className="vu-track">
                  <div className={`vu-fill ch2 ${isMuted ? "muted-bars" : "active-bars"}`}></div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: OPERATOR LOG & TELEMETRY MENU */}
          <div className="fx3-telemetry-col">
            <div className="hud-panel-header">
              <span className="sys-status">OPERATOR ID: PAWAN_EDITS</span>
              <span className="sys-spec">XAVC S-I 4K // 10-BIT 4:2:2</span>
            </div>

            <div className="hud-body-text">
              <h2 className="operator-headline">
                I DON'T JUST CUT FRAMES. <br />
                <span>I ENGINEER RETENTION.</span>
              </h2>
              <p className="operator-lead">
                Specialized in high-velocity Reels, Shorts, and creator podcasts. In a feed where viewers swipe in 0.8 seconds, I treat pacing like an instrument—syncing audio foley, kinetic text, and seamless J-cuts to keep audiences glued past the 3-second drop-off curve.
              </p>
            </div>

            {/* Editing Metrics Telemetry */}
            <div className="hud-stats-grid">
              {telemetryStats.map((item, idx) => (
                <div className="telemetry-card" key={idx}>
                  <div className="telemetry-corner"></div>
                  <span className="stat-value">{item.val}</span>
                  <span className="stat-label">{item.label}</span>
                  <span className="stat-sub">{item.sub}</span>
                </div>
              ))}
            </div>

            {/* Workflow Pipeline Diagnostics */}
            <div className="hud-pipeline-box">
              <span className="pipeline-title">PRODUCTION PIPELINE SETUP</span>
              <div className="pipeline-tags">
                <span>PREMIERE PRO CC</span>
                <span>AFTER EFFECTS RIGS</span>
                <span>DAVINCI COLOR MASTER</span>
                <span>SOUND STAGED FOLEY</span>
                <span>SUB-PIXEL RETENTION ZOOMS</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}