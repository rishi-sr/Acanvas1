import React from 'react';
import { Link } from 'react-router-dom';
import { Feather, Mail, Send, BookOpen } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import './Footer.scss';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="site-footer">
      <div className="footer-watercolor" />
      <div className="container">
        <div className="footer-grid">
          {/* Brand Col */}
          <div className="footer-col-brand">
            <div className="brand-wrap">
              <img src="/assets/logo.png" alt="Akshar Canvas" className="footer-logo" />
              <div className="title">AKSHAR CANVAS</div>
            </div>
            <p className="brand-desc">
              {t('footer.brand.desc')}
            </p>
            <div className="social-links">
              {/* Instagram */}
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Instagram">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              {/* Facebook */}
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Facebook">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              {/* YouTube */}
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="YouTube">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
                  <polygon points="10 15 15 12 10 9 10 15" fill="currentColor"/>
                </svg>
              </a>
              <a href="mailto:contact@aksharcanvas.com" className="social-icon-btn" aria-label="Email">
                <Mail size={17} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">{t('footer.nav.heading')}</h4>
            <ul className="footer-links">
              <li><Link to="/"><BookOpen size={14} /> {t('footer.nav.home')}</Link></li>
              <li><Link to="/about"><Feather size={14} /> {t('footer.nav.about')}</Link></li>
              <li><Link to="/poems"><Feather size={14} /> {t('footer.nav.poems')}</Link></li>
              <li><Link to="/books"><BookOpen size={14} /> {t('footer.nav.books')}</Link></li>
              <li><Link to="/quotes"><Feather size={14} /> {t('footer.nav.quotes')}</Link></li>
              <li><Link to="/submit-poem"><Send size={14} /> {t('nav.submitPoem')}</Link></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} AKSHAR CANVAS. {t('footer.rights')}
          </div>
          <div>
            {t('footer.authors')} <span className="gold-credit">Kanchan Lata Jaiswal & Garima Singh</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
