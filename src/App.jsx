import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Disclaimer from './components/Disclaimer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PracticePage from './pages/PracticePage';
import ExpertisePage from './pages/ExpertisePage';
import PeoplePage from './pages/PeoplePage';
import NewsEventsPage from './pages/NewsEventsPage';
import LegacyPage from './pages/LegacyPage';
import ComplianceDeskPage from './pages/ComplianceDeskPage';

function AppContent() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const loaderRef = React.useRef(null);

  // Scroll to top when navigating to a new page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (loaderRef.current) {
        gsap.to(loaderRef.current, {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            setIsLoading(false);
          },
        });
      } else {
        setIsLoading(false);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white w-full min-w-0 overflow-x-hidden">
      {/* Disclaimer Modal */}
      <Disclaimer />

      {/* Loading Screen */}
      {isLoading && (
        <div
          ref={loaderRef}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-primary-600"
        >
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white text-xl font-semibold">Loading...</p>
          </div>
        </div>
      )}

      <Navbar />
      <main className={`pt-20 w-full min-w-0 overflow-x-hidden ${location.pathname === '/' ? 'bg-black md:bg-white' : ''}`}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/expertise" element={<ExpertisePage />} />
          <Route path="/people" element={<PeoplePage />} />
          <Route path="/news-events" element={<NewsEventsPage />} />
          <Route path="/legacy" element={<LegacyPage />} />
          <Route path="/compliance-desk" element={<ComplianceDeskPage />} />
        </Routes>
      </main>

      {/* Hide footer on home page only */}
      {location.pathname !== '/' && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
