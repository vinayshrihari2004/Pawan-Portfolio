import React from "react";
import Navbar from "./components/layout/Navbar";
import LensScale from "./components/layout/LensScale";
import Hero from "./components/hero/Hero";
import Testimonials from "./components/testimonials/Testimonials";
import CreatorStyles from "./components/CreatorStyles/CreatorStyles";
import EditSuite from "./components/EditSuite/EditSuite";
import CaseStudies from "./components/CaseStudies/CaseStudies";
import BookingSection from "./components/booking/BookingSection"; // Live Calendly Terminal
import AboutMe from "./components/AboutMe/AboutMe";
import Footer from "./components/layout/Footer";
import { useAntiInspect } from "./hooks/useAntiInspect"; // Anti-inspect & DevTools trap hook
import "./App.css";

function App() {
  // Activate client-side inspection blockers & debugger trap
  useAntiInspect();

  return (
    <div className="portfolio-app-root">
      {/* Top Sony FX3 HUD Status Bar */}
      <Navbar />

      {/* Desktop Right Rail / Mobile Bottom Dock Navigation */}
      <LensScale />

      {/* Main Page Content Body */}
      <main className="app-main-content">
        <Hero />
        <Testimonials />
        <CreatorStyles />
        <EditSuite />
        <CaseStudies />

        {/* Active 15-Min Commission & Calendly Terminal (Target of #cta buttons) */}
        <BookingSection />

        <AboutMe />
        <Footer />
      </main>
    </div>
  );
}

export default App;