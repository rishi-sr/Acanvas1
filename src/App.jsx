import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ParticleCanvas from './components/ParticleCanvas/ParticleCanvas';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Poems from './pages/Poems/Poems';
import Books from './pages/Books/Books';
import Quotes from './pages/Quotes/Quotes';
import SubmitPoem from './pages/SubmitPoem/SubmitPoem';
import Contact from './pages/Contact/Contact';
import Admin from './pages/Admin/Admin';
import { ContentProvider } from './context/ContentContext';
import { AudioProvider } from './context/AudioContext';
import { LanguageProvider } from './context/LanguageContext';
import './styles/global.scss';

// Layout wrapper to conditionally show footer or extra padding
const AppContent = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="app-layout">
      <ParticleCanvas />
      <ScrollToTop />
      <Navbar />
      <main className="main-content-flow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/poems" element={<Poems />} />
          <Route path="/books" element={<Books />} />
          <Route path="/quotes" element={<Quotes />} />
          <Route path="/submit-poem" element={<SubmitPoem />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {!isAdmin && <Footer />}
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <ContentProvider>
        <AudioProvider>
          <Router>
            <AppContent />
          </Router>
        </AudioProvider>
      </ContentProvider>
    </LanguageProvider>
  );
}

export default App;
