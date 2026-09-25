import React from "react";
import Navbar from "./components/layout/Navbar";
import LensScale from "./components/layout/LensScale";
import Hero from "./components/hero/Hero";
import Testimonials from "./components/testimonials/Testimonials";
import CreatorStyles from "./components/CreatorStyles/CreatorStyles";
import EditSuite from "./components/EditSuite/EditSuite";
import CaseStudies from "./components/CaseStudies/CaseStudies";
import BookingSection from "./components/booking/BookingSection";
import AboutMe from "./components/AboutMe/AboutMe";
import Footer from "./components/layout/Footer";
import { useAntiInspect } from "./hooks/useAntiInspect";
import "./App.css";

function App() {
  useAntiInspect();

  return (
    <div className="portfolio-app-root">
      <Navbar />
      <LensScale />

      <main className="app-main-content">
        <Hero />
        <Testimonials />
        <CreatorStyles />
        <EditSuite />
        <CaseStudies />
        <BookingSection />
        <AboutMe />
        <Footer />
      </main>
    </div>
  );
}

export default App;