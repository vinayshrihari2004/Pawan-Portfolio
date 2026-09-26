import React, { Suspense, lazy } from "react";
import Navbar from "./components/layout/Navbar";
import LensScale from "./components/layout/LensScale";
import Hero from "./components/hero/Hero";
import Testimonials from "./components/testimonials/Testimonials";
import CreatorStyles from "./components/CreatorStyles/CreatorStyles";
import Footer from "./components/layout/Footer";
import "./App.css";

// Lazy-load heavier below-the-fold sections
const EditSuite = lazy(() => import("./components/EditSuite/EditSuite"));
const CaseStudies = lazy(() => import("./components/CaseStudies/CaseStudies"));
const BookingSection = lazy(() => import("./components/booking/BookingSection"));
const AboutMe = lazy(() => import("./components/AboutMe/AboutMe"));

function App() {
  return (
    <div className="portfolio-app-root">
      <Navbar />
      <LensScale />

      <main className="app-main-content">
        <Hero />
        <Testimonials />
        <CreatorStyles />

        <Suspense fallback={<div style={{ minHeight: "300px" }} />}>
          <EditSuite />
          <CaseStudies />
          <BookingSection />
          <AboutMe />
        </Suspense>

        <Footer />
      </main>
    </div>
  );
}

export default App;