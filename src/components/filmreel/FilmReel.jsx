import React from "react";
import "./FilmReel.css";

const creators = [
  { name: "Mr Beast", image: "/creators/mrbeast.jpg", handle: "@mrbeast" },
  { name: "Nikhil Kamath", image: "/creators/nikhil.jpg", handle: "@nikhilkamath" },
  { name: "BeerBiceps", image: "/creators/beerbiceps.jpg", handle: "@ranveerallahbadia" },
  { name: "CarryMinati", image: "/creators/carry.jpg", handle: "@carryminati" },
  { name: "Dhruv Rathee", image: "/creators/dhruv.jpg", handle: "@dhruvrathee" },
];

export default function FilmReel() {
  // Quadruple the array so the continuous marquee never runs out of track on wide/retina displays
  const marqueeItems = [...creators, ...creators, ...creators, ...creators];

  return (
    <section className="film-section" id="film-reel">
      {/* Background Optical Radial Glow */}
      <div className="film-ambient-glow" aria-hidden="true"></div>

      {/* Technical Header */}
      <div className="film-heading">
        <span className="film-pre-tag">35MM CELLULOID // CREATOR ARCHIVE</span>
        <h2 className="film-main-title">
          Some Faces, <span>Bigger Stories</span>
        </h2>
        <p className="film-sub-text">PROVEN IMPACT ACROSS YOUTUBE & DIGITAL MEDIA</p>
      </div>

      {/* Infinite Film Track Enclosure */}
      <div className="film-wrapper">
        <div className="film-edge-vignette left" aria-hidden="true"></div>
        <div className="film-edge-vignette right" aria-hidden="true"></div>

        <div className="film-strip">
          {marqueeItems.map((creator, index) => {
            const frameNum = String((index % creators.length) + 1).padStart(2, "0");
            return (
              <div className="film-frame" key={index}>
                {/* 35mm Physical Celluloid Corner Marks */}
                <div className="frame-corner top-left"></div>
                <div className="frame-corner top-right"></div>
                <div className="frame-corner bottom-left"></div>
                <div className="frame-corner bottom-right"></div>

                {/* Film Stock Metadata Stamp */}
                <div className="frame-telemetry">
                  <span className="frame-stock">KODAK // 500T</span>
                  <span className="frame-idx">{frameNum}A</span>
                </div>

                <img 
                  src={creator.image} 
                  alt={creator.name} 
                  loading="lazy" 
                  decoding="async"
                />

                <div className="film-frame-overlay">
                  <span className="creator-handle">{creator.handle}</span>
                  <h3 className="creator-name">{creator.name}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}