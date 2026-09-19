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
        {/* Horizontal Brand Row */}
        <div className="footer-brand-horizontal">
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

        {/* Horizontal Navigation Links */}
        <nav className="footer-horizontal-nav" aria-label="Footer Navigation">
          <ul className="footer-nav-list">
            <li><Link to="/"><BookOpen size={14} /> {t('nav.home') || 'होम'}</Link></li>
            <li><Link to="/about"><Feather size={14} /> {t('nav.parichay') || 'परिचय'}</Link></li>
            <li><Link to="/books"><BookOpen size={14} /> {t('nav.pustake') || 'पुस्तकें'}</Link></li>
            <li><Link to="/sahitya"><Feather size={14} /> {t('nav.sahitya') || 'साहित्य'}</Link></li>
            <li><Link to="/workshop"><Feather size={14} /> {t('nav.workshop') || 'वर्कशॉप'}</Link></li>
            <li><Link to="/reporting"><Feather size={14} /> {t('nav.reporting') || 'रिपोर्टिंग'}</Link></li>
            <li><Link to="/samkalieen"><Feather size={14} /> {t('nav.samkalieen') || 'समकालीन'}</Link></li>
            <li><Link to="/gallery"><Feather size={14} /> {t('nav.gallary') || 'गैलरी'}</Link></li>
          </ul>
        </nav>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            © {new Date().getFullYear()} AKSHAR CANVAS. {t('footer.rights')}
          </div>
          <div className="footer-managed-by">
            <span>Managed by </span>
            <a
              href="https://murtihub.co.in"
              target="_blank"
              rel="noopener noreferrer"
              className="managed-link"
            >
              murtihub.co.in
            </a>
          </div>
          <div className="footer-authors">
            {t('footer.authors')} <span className="gold-credit">डॉ. कंचन जायसवाल एवं गरिमा सिंह</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
