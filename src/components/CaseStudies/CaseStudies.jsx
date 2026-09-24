import React, { useState, useEffect } from "react";
import "./CaseStudies.css";

// Native counting hook (Zero external libraries)
function useCountUp(targetValue, duration = 1200, startTrigger = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startTrigger) {
      setCount(0);
      return;
    }

    let startTime = null;
    let animationFrame;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out exponential curve
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * targetValue));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [targetValue, duration, startTrigger]);

  return count;
}

const covers = [
  {
    id: "01",
    masthead: "FOUNDER",
    issueDate: "OCTOBER 2026",
    price: "$14.00",
    volume: "VOL. 04 / ED. 01",
    subjectName: "ISHAN SHARMA",
    mainStory: {
      kicker: "RETENTION ARCHITECTURE",
      headline: "THE 1M TALK",
      sub: "How micro-rehooks & multi-cam cadence engineered a 52% average view duration.",
    },
    leftTeasers: [
      { tag: "PACING", text: "Zero Dead Air Blueprint" },
      { tag: "AUDIO", text: "Dynamic EQ & Multitrack Stems" },
    ],
    rightTeasers: [{ tag: "SCALE", text: "1M+ Views Architecture" }],
    barcode: "9 771234 567003",
    image: "/ishan.webp",
    stats: {
      views: { num: 312, prefix: "+", suffix: "%", label: "VIEWS INCREASED", sub: "From 240K to 990K" },
      subs: { num: 48, prefix: "+", suffix: "%", label: "SUBSCRIBERS GAINED", sub: "From 52K to 77K" },
      retention: { num: 52, prefix: "", suffix: "%", label: "AVERAGE RETENTION", sub: "+21% from previous content" },
      engagement: { num: 73, prefix: "+", suffix: "%", label: "ENGAGEMENT RATE", sub: "From 4.1% to 7.1%" },
    },
  },
  {
    id: "02",
    masthead: "ASCENT",
    issueDate: "AUTUMN 2026",
    price: "$14.00",
    volume: "VOL. 04 / ED. 02",
    subjectName: "CA NANDINI AGARWAL",
    mainStory: {
      kicker: "FINANCIAL CLARITY",
      headline: "PRECISION CUT",
      sub: "Translating balance sheets and dense strategy into fluid visual essays.",
    },
    leftTeasers: [
      { tag: "DATA MOTION", text: "Vector Graphic Motion" },
      { tag: "RHYTHM", text: "Invisible J-Cuts & Punch" },
    ],
    rightTeasers: [{ tag: "STRATEGY", text: "Executive Talking-Head" }],
    barcode: "9 772049 332008",
    image: "/nandini.webp",
    stats: {
      views: { num: 440, prefix: "+", suffix: "%", label: "VIEWS INCREASED", sub: "From 120K to 650K" },
      subs: { num: 65, prefix: "+", suffix: "%", label: "SUBSCRIBERS GAINED", sub: "From 30K to 49.5K" },
      retention: { num: 58, prefix: "", suffix: "%", label: "AVERAGE RETENTION", sub: "+28% retention boost" },
      engagement: { num: 82, prefix: "+", suffix: "%", label: "ENGAGEMENT RATE", sub: "From 3.8% to 6.9%" },
    },
  },
  {
    id: "03",
    masthead: "CRAFT",
    issueDate: "SPECIAL ISSUE",
    price: "$16.00",
    volume: "VOL. 04 / ED. 03",
    subjectName: "SAPTARSHI PRAKASH",
    mainStory: {
      kicker: "INTERACTION DESIGN",
      headline: "PIXEL RIG",
      sub: "3D camera space, sub-pixel curves & UI-synced tactile foley for modern pedagogy.",
    },
    leftTeasers: [
      { tag: "KINETICS", text: "Spatial Canvas Pan" },
      { tag: "SOUND FX", text: "Tactile Click Affordance" },
    ],
    rightTeasers: [{ tag: "CRAFT", text: "60 FPS Master Export" }],
    barcode: "9 770829 471001",
    image: "/saptarshi.webp",
    stats: {
      views: { num: 280, prefix: "+", suffix: "%", label: "VIEWS INCREASED", sub: "From 310K to 1.18M" },
      subs: { num: 54, prefix: "+", suffix: "%", label: "SUBSCRIBERS GAINED", sub: "From 84K to 130K" },
      retention: { num: 61, prefix: "", suffix: "%", label: "AVERAGE RETENTION", sub: "+19% watch duration" },
      engagement: { num: 64, prefix: "+", suffix: "%", label: "ENGAGEMENT RATE", sub: "From 5.2% to 8.5%" },
    },
  },
];

// Single flippable case study card with animated counters
function CaseCard({ cover, isFlipped, onToggle }) {
  const viewsVal = useCountUp(cover.stats.views.num, 1100, isFlipped);
  const subsVal = useCountUp(cover.stats.subs.num, 1000, isFlipped);
  const retentionVal = useCountUp(cover.stats.retention.num, 1200, isFlipped);
  const engagementVal = useCountUp(cover.stats.engagement.num, 1050, isFlipped);

  return (
    <div className="mag-flipper-box">
      <div
        className={`mag-card-3d ${isFlipped ? "is-flipped" : ""}`}
        onClick={onToggle}
        role="button"
        tabIndex={0}
        aria-label={`Toggle stats for ${cover.subjectName}`}
      >
        {/* =========================================================
            FRONT FACE: MAGAZINE COVER (CREATOR PROFILE)
            ========================================================= */}
        <article className="mag-face mag-front">
          <div className="mag-inner-border"></div>

          {/* Top Issue Strip */}
          <div className="mag-header-strip">
            <span className="mag-date">{cover.issueDate}</span>
            <span className="mag-issue-badge">{cover.volume}</span>
            <span className="mag-price">{cover.price}</span>
          </div>

          {/* Masthead */}
          <h1 className="mag-masthead">{cover.masthead}</h1>

          {/* Hero Creator Cutout */}
          <div className="creator-cutout-wrap">
            <img
              src={cover.image}
              alt={cover.subjectName}
              className="creator-image"
              loading="lazy"
            />
          </div>

          {/* Left Cover Lines */}
          <div className="cover-lines-left">
            {cover.leftTeasers.map((teaser, idx) => (
              <div className="teaser-block" key={idx}>
                <span className="teaser-kicker">{teaser.tag}</span>
                <p className="teaser-text">{teaser.text}</p>
              </div>
            ))}
          </div>

          {/* Right Cover Lines */}
          <div className="cover-lines-right">
            {cover.rightTeasers.map((teaser, idx) => (
              <div className="teaser-block" key={idx}>
                <span className="teaser-kicker accent-tag">{teaser.tag}</span>
                <p className="teaser-text">{teaser.text}</p>
              </div>
            ))}
          </div>

          {/* Main Feature Story Headline Block */}
          <div className="mag-main-story">
            <div className="story-header-line">
              <span className="main-kicker">{cover.mainStory.kicker}</span>
              <span className="story-sep">•</span>
              <span className="story-vol">{cover.volume}</span>
            </div>

            <h2 className="creator-subject-name">{cover.subjectName}</h2>
            <h3 className="story-hero-title">{cover.mainStory.headline}</h3>
            <p className="story-abstract">{cover.mainStory.sub}</p>
          </div>

          {/* Footer Bar with Barcode */}
          <div className="mag-bottom-bar">
            <div className="mag-barcode-sticker">
              <svg
                className="barcode-svg"
                viewBox="0 0 115 42"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <rect x="0" y="0" width="2" height="34" fill="#020d24" />
                <rect x="3" y="0" width="2" height="34" fill="#020d24" />
                <rect x="8" y="0" width="3" height="28" fill="#020d24" />
                <rect x="13" y="0" width="1.5" height="28" fill="#020d24" />
                <rect x="17" y="0" width="4" height="28" fill="#020d24" />
                <rect x="23" y="0" width="2" height="28" fill="#020d24" />
                <rect x="27" y="0" width="1" height="28" fill="#020d24" />
                <rect x="31" y="0" width="3.5" height="28" fill="#020d24" />
                <rect x="37" y="0" width="2" height="28" fill="#020d24" />
                <rect x="42" y="0" width="1" height="28" fill="#020d24" />
                <rect x="45" y="0" width="3" height="28" fill="#020d24" />
                <rect x="51" y="0" width="2" height="28" fill="#020d24" />
                <rect x="56" y="0" width="2" height="34" fill="#020d24" />
                <rect x="60" y="0" width="2" height="34" fill="#020d24" />
                <rect x="65" y="0" width="1.5" height="28" fill="#020d24" />
                <rect x="68" y="0" width="3" height="28" fill="#020d24" />
                <rect x="74" y="0" width="2" height="28" fill="#020d24" />
                <rect x="78" y="0" width="4" height="28" fill="#020d24" />
                <rect x="84" y="0" width="1.5" height="28" fill="#020d24" />
                <rect x="88" y="0" width="3" height="28" fill="#020d24" />
                <rect x="94" y="0" width="1" height="28" fill="#020d24" />
                <rect x="97" y="0" width="3.5" height="28" fill="#020d24" />
                <rect x="103" y="0" width="2" height="28" fill="#020d24" />
                <rect x="108" y="0" width="2" height="34" fill="#020d24" />
                <rect x="112" y="0" width="2" height="34" fill="#020d24" />
                <text
                  x="57.5"
                  y="40"
                  textAnchor="middle"
                  fontSize="8.5"
                  fontFamily="monospace"
                  fontWeight="700"
                  letterSpacing="2"
                  fill="#020d24"
                >
                  {cover.barcode}
                </text>
              </svg>
            </div>

            <div className="mag-footer-cta">
              <span className="cta-label">CLICK TO VIEW</span>
              <span className="cta-arrow">IMPACT STATS ↻</span>
            </div>
          </div>
        </article>

        {/* =========================================================
            BACK FACE: IMPACT STATS (ANALYTICS RIG)
            ========================================================= */}
        <article className="mag-face mag-back">
          {/* Header */}
          <div className="stats-back-topbar">
            <div>
              <h3 className="stats-back-heading">IMPACT STATS</h3>
              <span className="stats-back-subhead">REAL NUMBERS. REAL GROWTH.</span>
            </div>
            <div className="stats-back-dots">
              <span></span><span></span><span></span>
            </div>
          </div>

          {/* 4 Stat Modules */}
          <div className="stats-stack">
            {/* Stat 1: Views */}
            <div className="stat-module">
              <div className="stat-icon-disc">
                <svg viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <div className="stat-text-col">
                <div className="stat-number">
                  {cover.stats.views.prefix}{viewsVal}{cover.stats.views.suffix}
                </div>
                <div className="stat-label">{cover.stats.views.label}</div>
                <div className="stat-sub">{cover.stats.views.sub}</div>
              </div>
              <div className="stat-chart-col">
                <span className="stat-arrow-indicator">↗</span>
                <div className="stat-chart-bars">
                  <span style={{ height: "35%" }}></span>
                  <span style={{ height: "55%" }}></span>
                  <span style={{ height: "70%" }}></span>
                  <span style={{ height: "85%" }}></span>
                  <span style={{ height: "100%" }}></span>
                </div>
              </div>
            </div>

            {/* Stat 2: Subs */}
            <div className="stat-module">
              <div className="stat-icon-disc">
                <svg viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="8.5" cy="7" r="4" />
                  <line x1="20" y1="8" x2="20" y2="14" />
                  <line x1="23" y1="11" x2="17" y2="11" />
                </svg>
              </div>
              <div className="stat-text-col">
                <div className="stat-number">
                  {cover.stats.subs.prefix}{subsVal}{cover.stats.subs.suffix}
                </div>
                <div className="stat-label">{cover.stats.subs.label}</div>
                <div className="stat-sub">{cover.stats.subs.sub}</div>
              </div>
              <div className="stat-chart-col">
                <span className="stat-arrow-indicator">↗</span>
                <div className="stat-chart-bars">
                  <span style={{ height: "40%" }}></span>
                  <span style={{ height: "60%" }}></span>
                  <span style={{ height: "72%" }}></span>
                  <span style={{ height: "88%" }}></span>
                  <span style={{ height: "100%" }}></span>
                </div>
              </div>
            </div>

            {/* Stat 3: Retention */}
            <div className="stat-module">
              <div className="stat-icon-disc">
                <svg viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div className="stat-text-col">
                <div className="stat-number">
                  {cover.stats.retention.prefix}{retentionVal}{cover.stats.retention.suffix}
                </div>
                <div className="stat-label">{cover.stats.retention.label}</div>
                <div className="stat-sub">{cover.stats.retention.sub}</div>
              </div>
              <div className="stat-chart-col">
                <span className="stat-arrow-indicator">↗</span>
                <div className="stat-chart-bars">
                  <span style={{ height: "45%" }}></span>
                  <span style={{ height: "65%" }}></span>
                  <span style={{ height: "78%" }}></span>
                  <span style={{ height: "90%" }}></span>
                  <span style={{ height: "100%" }}></span>
                </div>
              </div>
            </div>

            {/* Stat 4: Engagement */}
            <div className="stat-module">
              <div className="stat-icon-disc">
                <svg viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                </svg>
              </div>
              <div className="stat-text-col">
                <div className="stat-number">
                  {cover.stats.engagement.prefix}{engagementVal}{cover.stats.engagement.suffix}
                </div>
                <div className="stat-label">{cover.stats.engagement.label}</div>
                <div className="stat-sub">{cover.stats.engagement.sub}</div>
              </div>
              <div className="stat-chart-col">
                <span className="stat-arrow-indicator">↗</span>
                <div className="stat-chart-bars">
                  <span style={{ height: "30%" }}></span>
                  <span style={{ height: "55%" }}></span>
                  <span style={{ height: "70%" }}></span>
                  <span style={{ height: "85%" }}></span>
                  <span style={{ height: "100%" }}></span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Quote */}
          <div className="stats-back-footer">
            <p className="stats-quote">“Better storytelling. Real results.”</p>
            <span className="stats-author">— Pawan Edits</span>
            <span className="stats-flip-back">FLIP TO COVER ↺</span>
          </div>
        </article>
      </div>
    </div>
  );
}

export default function CaseStudies() {
  const [flipped, setFlipped] = useState({});

  const toggleCard = (id) => {
    setFlipped((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="case-studies-section" id="cases">
      <div className="cs-ambient-glow" aria-hidden="true"></div>

      <div className="cs-header-block">
        <span className="cs-header-tag">COLLECTOR'S EDITION // 85MM</span>
        <h2 className="cs-headline">
          REAL CREATORS. <span>REAL IMPACT.</span>
        </h2>
        <p className="cs-header-sub">
          Editorial deep-dives into high-retention post-production architecture. Click any card to see growth metrics.
        </p>
      </div>

      <div className="covers-rack-container">
        {covers.map((cover) => (
          <CaseCard
            key={cover.id}
            cover={cover}
            isFlipped={!!flipped[cover.id]}
            onToggle={() => toggleCard(cover.id)}
          />
        ))}
      </div>
    </section>
  );
}