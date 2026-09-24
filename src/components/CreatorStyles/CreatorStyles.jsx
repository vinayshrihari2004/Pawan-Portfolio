import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "./CreatorStyles.css";

// 6 plain video reels for the 3-column grid
const VIDEO_ITEMS = [
  { id: 1, title: "Reel 01", videoSrc: "/videos/Aiabdal.mp4" },
  { id: 2, title: "Reel 02", videoSrc: "/videos/Casey.mp4" },
  { id: 3, title: "Reel 03", videoSrc: "/videos/Gadzi.mp4" },
  { id: 4, title: "Reel 04", videoSrc: "/videos/Hormozi.mp4" },
  { id: 5, title: "Reel 05", videoSrc: "/videos/Mkbhd.mp4" },
  { id: 6, title: "Reel 06", videoSrc: "/videos/Mrbeast.mp4" },
];

export default function CreatorStyles() {
  const [activeVideo, setActiveVideo] = useState(null);
  const modalVideoRef = useRef(null);
  const cardVideoRefs = useRef([]);

  // Ensure all 6 grid preview videos reliably autoplay and loop continuously
  useEffect(() => {
    cardVideoRefs.current.forEach((video) => {
      if (video) {
        video.muted = true;
        video.defaultMuted = true;
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Fallback for mobile low-power or data-saver modes
          });
        }
      }
    });
  }, []);

  // Handle modal keyboard close and modal autoplay
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };

    if (activeVideo) {
      window.addEventListener("keydown", handleKeyDown);
      if (modalVideoRef.current) {
        modalVideoRef.current.currentTime = 0;
        const playPromise = modalVideoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      }
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeVideo]);

  const openModal = (item) => {
    setActiveVideo(item);
  };

  const closeModal = () => {
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
    }
    setActiveVideo(null);
  };

  return (
    <section className="cs-section" id="styles">
      <div className="cs-container">
        {/* Minimalist Section Header */}
        <div className="cs-header">
          <span className="cs-eyebrow">// EDITORIAL REPERTOIRE</span>
          <h2 className="cs-title">Selected Works</h2>
        </div>

        {/* 6 Plain Cards in a 3-Column Layout (3x2) */}
        <div className="cs-grid-3col">
          {VIDEO_ITEMS.map((item, index) => (
            <div
              key={item.id}
              className="cs-plain-card"
              onClick={() => openModal(item)}
              role="button"
              tabIndex={0}
              aria-label={`Open ${item.title}`}
            >
              <div className="cs-card-media">
                {/* Autoplaying Edge-to-Edge Preview Video */}
                <video
                  ref={(el) => (cardVideoRefs.current[index] = el)}
                  src={item.videoSrc}
                  className="cs-card-video"
                  muted
                  loop
                  autoPlay
                  playsInline
                  preload="auto"
                />

                {/* Subtle Centered Hover Play Cue */}
                <div className="cs-play-indicator" aria-hidden="true">
                  <div className="cs-play-disc">
                    <svg viewBox="0 0 24 24" className="cs-play-svg">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Maximized Lightbox Modal with Frosted Background Blur */}
      {activeVideo &&
        createPortal(
          <div
            className="cs-modal-backdrop"
            onClick={closeModal}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="cs-modal-chassis"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                className="cs-modal-close-btn"
                onClick={closeModal}
                aria-label="Close video"
              >
                ✕
              </button>

              {/* 9:16 Video Player with Controls */}
              <div className="cs-modal-viewport">
                <video
                  ref={modalVideoRef}
                  src={activeVideo.videoSrc}
                  className="cs-modal-video"
                  controls
                  autoPlay
                  playsInline
                />
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}