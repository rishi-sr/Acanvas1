import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Feather, Sparkles, ArrowUpRight, BookOpen, Quote, Home, Info, Mail, PenTool } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import './Navbar.scss';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t, toggleLang, lang } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      return () => {
        const top = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        if (top) {
          window.scrollTo(0, parseInt(top || '0', 10) * -1);
        }
      };
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { 
      path: '/', 
      label: t('nav.home'), 
      num: '01', 
      sub: lang === 'hi' ? 'मुख्य पृष्ठ' : 'Sanctuary Home',
      icon: Home 
    },
    { 
      path: '/about', 
      label: t('nav.about'), 
      num: '02', 
      sub: lang === 'hi' ? 'कवयित्री परिचय' : 'Meet the Poets',
      icon: Info 
    },
    { 
      path: '/poems', 
      label: t('nav.poems'), 
      num: '03', 
      sub: lang === 'hi' ? 'काव्य संग्रह' : 'Poetic River',
      icon: Feather 
    },
    { 
      path: '/books', 
      label: t('nav.books'), 
      num: '04', 
      sub: lang === 'hi' ? 'साहित्यिक कृतियाँ' : 'Published Books',
      icon: BookOpen 
    },
    { 
      path: '/quotes', 
      label: t('nav.quotes'), 
      num: '05', 
      sub: lang === 'hi' ? 'प्रेरणा एवं विचार' : 'Literary Musings',
      icon: Quote 
    },
    { 
      path: '/submit-poem', 
      label: t('nav.submitPoem'), 
      num: '06', 
      sub: lang === 'hi' ? 'काव्य रचना भेजें' : 'Share Your Verse',
      icon: PenTool 
    },
    { 
      path: '/contact', 
      label: t('nav.contact'), 
      num: '07', 
      sub: lang === 'hi' ? 'संवाद एवं आमंत्रण' : 'Letters & Bookings',
      icon: Mail 
    }
  ];

  // Full Screen Menu Animation Variants
  const menuOverlayVariants = {
    closed: {
      opacity: 0,
      clipPath: 'circle(0% at calc(100% - 35px) 35px)',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 35,
        when: 'afterChildren',
        staggerChildren: 0.03,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      clipPath: 'circle(150% at calc(100% - 35px) 35px)',
      transition: {
        type: 'spring',
        stiffness: 180,
        damping: 24,
        when: 'beforeChildren',
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const navItemVariants = {
    closed: {
      opacity: 0,
      y: 22,
      scale: 0.96,
      transition: { duration: 0.2, ease: 'easeInOut' }
    },
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 240,
        damping: 22
      }
    }
  };

  const footerItemVariants = {
    closed: {
      opacity: 0,
      y: 18,
      transition: { duration: 0.15 }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3,
        type: 'spring',
        stiffness: 220,
        damping: 22
      }
    }
  };

  return (
    <>
      <header className={`site-navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="nav-inner">
            {/* Clean Brand Logo */}
            <Link to="/" className="brand-logo-link" aria-label="Akshar Canvas Home">
              <img src="/assets/logo.png" alt="Akshar Canvas" className="brand-img" />
            </Link>

            {/* Desktop Navigation - Clean single line */}
            <nav className="nav-center-nav">
              <ul className="nav-menu-desktop">
                {navLinks.map(link => (
                  <li key={link.path} className="nav-item">
                    <NavLink
                      to={link.path}
                      className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Right Action CTA & Mobile Trigger */}
            <div className="nav-actions">
              {/* Language Toggle */}
              <button
                className="lang-toggle-btn"
                onClick={toggleLang}
                aria-label="Toggle Language"
                title={lang === 'hi' ? 'Switch to English' : 'हिंदी में देखें'}
              >
                <span className="lang-flag">{lang === 'hi' ? '🇬🇧' : '🇮🇳'}</span>
                <span className="lang-label">{t('lang.toggle')}</span>
              </button>

              <Link to="/contact" className="btn-royal nav-cta-btn">
                <Feather size={15} />
                <span>{t('nav.invitePoets')}</span>
              </Link>

              {/* Mobile Hamburger Menu Button */}
              <button
                className={`hamburger-btn ${mobileMenuOpen ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Menu"
              >
                <span className="hamburger-icon-wrapper">
                  {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full Screen Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="mobile-fullscreen-nav"
            variants={menuOverlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {/* Decorative Atmospheric Glows & Watermarks */}
            <div className="menu-atmosphere">
              <div className="glow-orb glow-top-left" />
              <div className="glow-orb glow-bottom-right" />
              <div className="glow-orb glow-center" />
              <div className="watermark-feather">
                <Feather size={240} strokeWidth={0.8} />
              </div>
            </div>

            {/* Fixed Mobile Top Header */}
            <div className="mobile-nav-header">
              <Link
                to="/"
                className="mobile-brand-link"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Akshar Canvas Home"
              >
                <img src="/assets/logo.png" alt="Akshar Canvas" className="mobile-brand-logo" />
              </Link>

              <div className="mobile-header-actions">
                <button
                  className="mobile-lang-pill"
                  onClick={toggleLang}
                  aria-label="Toggle Language"
                >
                  <span className="lang-flag">{lang === 'hi' ? '🇬🇧' : '🇮🇳'}</span>
                  <span className="lang-code">{lang === 'hi' ? 'English' : 'हिंदी'}</span>
                </button>

                <button
                  className="mobile-close-btn"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close Menu"
                >
                  <X size={22} />
                </button>
              </div>
            </div>

            {/* Scrollable Navigation Body */}
            <div className="mobile-nav-content">
              <div className="mobile-nav-container">
                {/* Navigation Links List with Stagger */}
                <motion.ul className="mobile-menu-list">
                  {navLinks.map((link) => {
                    const IconComponent = link.icon;
                    return (
                      <motion.li
                        key={link.path}
                        variants={navItemVariants}
                        className="mobile-menu-item"
                      >
                        <NavLink
                          to={link.path}
                          className={({ isActive }) =>
                            `mobile-menu-link ${isActive ? 'active' : ''}`
                          }
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <div className="link-left">
                            <span className="link-num">{link.num}</span>
                            <div className="link-text-group">
                              <span className="link-title">{link.label}</span>
                              <span className="link-subtitle">{link.sub}</span>
                            </div>
                          </div>
                          
                          <div className="link-right">
                            <span className="link-icon-wrap">
                              <IconComponent size={18} className="link-category-icon" />
                            </span>
                            <span className="link-arrow">
                              <ArrowUpRight size={18} />
                            </span>
                          </div>
                        </NavLink>
                      </motion.li>
                    );
                  })}
                </motion.ul>

                {/* Royal Footer Section */}
                <motion.div variants={footerItemVariants} className="mobile-nav-footer">
                  <div className="royal-divider">
                    <span className="divider-line" />
                    <span className="divider-motif">✦</span>
                    <span className="divider-line" />
                  </div>

                  <Link
                    to="/contact"
                    className="btn-royal mobile-cta-royal"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Sparkles size={18} />
                    <span>{t('nav.invitePoets')}</span>
                  </Link>

                  <div className="poet-tribute">
                    <p className="poet-names">{t('nav.poets')}</p>
                    <p className="poet-tagline">
                      {lang === 'hi'
                        ? 'अक्षर कैनवास • शब्द • कला • आत्मा का संगीत'
                        : 'Akshar Canvas • Words • Art • Music of the Soul'}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
