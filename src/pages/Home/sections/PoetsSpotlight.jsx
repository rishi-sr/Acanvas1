import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, BookOpen, Feather, Sparkles, Star, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { poetsData as defaultPoetsData } from '../../../data/poetsData';
import { useContent } from '../../../context/ContentContext';
import { useLanguage } from '../../../context/LanguageContext';
import './PoetsSpotlight.scss';

const PoetsSpotlight = () => {
  const { authors } = useContent();
  const { t, lang } = useLanguage();
  const isHindi = lang === 'hi';

  const [activePoet, setActivePoet] = useState('garima'); // Default to Garima matching reference or selectable

  const kanchan = authors?.kanchan || defaultPoetsData.kanchan;
  const garima = authors?.garima || defaultPoetsData.garima;

  const currentPoet = activePoet === 'kanchan' ? kanchan : garima;
  const isGarima = activePoet === 'garima';

  // Default images if avatarUrl is not set
  const portraitImage = currentPoet.avatarUrl || (isGarima ? '/assets/garima-portrait.png' : '/assets/kanchan-portrait.png');

  return (
    <section className="poets-spotlight-section section-padding">
      <div className="container">
        {/* Section Header */}
        <div className="section-title-wrap">
          <span className="subtitle">{t('spotlight.subtitle')}</span>
          <h2 className="main-title">
            {t('spotlight.title1')} <span className="highlight">{t('spotlight.title2')}</span>
          </h2>
          <p className="desc">{t('spotlight.desc')}</p>
          <div className="ornament-divider">
            <span className="line" /><span className="diamond" /><span className="line" />
          </div>
        </div>

        {/* Author Switcher Tabs */}
        <div className="parichay-tab-controls">
          <button
            type="button"
            className={`parichay-pill-btn ${activePoet === 'garima' ? 'active' : ''}`}
            onClick={() => setActivePoet('garima')}
          >
            <Feather size={15} />
            <span>{isHindi ? 'गरिमा सिंह' : 'Garima Singh'}</span>
          </button>
          <button
            type="button"
            className={`parichay-pill-btn ${activePoet === 'kanchan' ? 'active' : ''}`}
            onClick={() => setActivePoet('kanchan')}
          >
            <Feather size={15} />
            <span>{isHindi ? 'कंचन लता जायसवाल' : 'Kanchan Lata Jaiswal'}</span>
          </button>
        </div>

        {/* Master Parichay Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePoet}
            className="spotlight-parichay-card"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {/* Background Botanical Watermark */}
            <div className="parichay-card-watermark" aria-hidden="true">
              <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M40 160 C 60 100, 140 100, 160 40 C 120 70, 80 110, 40 160 Z" stroke="rgba(139,0,0,0.06)" strokeWidth="2" fill="none" />
                <path d="M100 110 C 130 90, 150 70, 170 50" stroke="rgba(139,0,0,0.05)" strokeWidth="1.5" />
                <path d="M70 135 C 95 125, 115 105, 130 85" stroke="rgba(139,0,0,0.05)" strokeWidth="1.5" />
              </svg>
            </div>

            {/* Left Content Column */}
            <div className="parichay-content-col">
              {/* Designation Tag */}
              <div className="parichay-role-header">
                <Feather size={17} className="role-feather-icon" />
                <span className="role-text">
                  {isHindi
                    ? (currentPoet.titleHindi || currentPoet.title)
                    : (currentPoet.title || currentPoet.titleHindi)}
                </span>
              </div>

              {/* Poet Display Name */}
              <h2 className="parichay-poet-name">
                {isHindi
                  ? (currentPoet.nameHindi || currentPoet.name)
                  : (currentPoet.name || currentPoet.nameHindi)}
              </h2>

              {/* Golden Ornament Divider */}
              <div className="parichay-gold-flourish">
                <span className="flourish-line" />
                <span className="flourish-motif">❖</span>
                <span className="flourish-line" />
              </div>

              {/* Signature Quote Callout Box */}
              <div className="parichay-quote-box">
                <span className="quote-mark open-mark">“</span>
                <p className="quote-text">
                  {isHindi
                    ? (currentPoet.signatureQuoteHindi || currentPoet.signatureQuote)
                    : (currentPoet.signatureQuote || currentPoet.signatureQuoteHindi)}
                </p>
                <span className="quote-mark close-mark">”</span>

                {/* Corner Botanical Sketch */}
                <div className="quote-corner-sketch" aria-hidden="true">
                  <svg width="64" height="64" viewBox="0 0 100 100" fill="none">
                    <path d="M20 80 Q 50 40 80 20 Q 60 60 20 80 Z" stroke="rgba(139, 0, 0, 0.15)" strokeWidth="1.5" fill="none" />
                    <path d="M45 55 Q 65 45 75 35" stroke="rgba(139, 0, 0, 0.12)" strokeWidth="1" />
                    <path d="M35 68 Q 50 60 60 50" stroke="rgba(139, 0, 0, 0.12)" strokeWidth="1" />
                  </svg>
                </div>
              </div>

              {/* Short Bio Paragraph */}
              <p className="parichay-bio-text">
                {Array.isArray(isHindi ? currentPoet.fullBioHindi : currentPoet.fullBio)
                  ? (isHindi ? currentPoet.fullBioHindi[0] : currentPoet.fullBio[0])
                  : (isHindi ? currentPoet.shortBioHindi || currentPoet.shortBio : currentPoet.shortBio || currentPoet.shortBioHindi)}
              </p>

              {/* Poetic Philosophy (काव्य- दर्शन) Card */}
              <div className="parichay-philosophy-card">
                <div className="philosophy-icon-badge">
                  <BookOpen size={22} color="#FFFFFF" />
                </div>
                <div className="philosophy-text-wrap">
                  <h4 className="philosophy-heading">
                    {isHindi ? 'काव्य- दर्शन' : 'Poetic Philosophy'}
                  </h4>
                  <p className="philosophy-body">
                    {isHindi
                      ? (currentPoet.philosophyHindi || currentPoet.philosophy)
                      : (currentPoet.philosophy || currentPoet.philosophyHindi)}
                  </p>
                </div>
              </div>

              {/* Awards Pill Chips */}
              {currentPoet.awards && currentPoet.awards.length > 0 && (
                <div className="parichay-awards-row">
                  {currentPoet.awards.map((aw, i) => (
                    <div key={i} className="parichay-award-chip">
                      {i % 2 === 0 ? <Trophy size={14} className="award-icon" /> : <Star size={14} className="award-icon" />}
                      <span>{aw.title} ({aw.year})</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Read Full Biography Link */}
              <div className="parichay-action-row">
                <Link
                  to={`/about#${activePoet}`}
                  className="parichay-read-bio-link"
                >
                  <span>{isHindi ? 'पूरी जीवनवृत्त पढ़ें' : 'Read Full Biography'}</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Right Image Column with Organic Curved Dividing Mask */}
            <div className="parichay-image-col">
              {/* Organic Curved SVG Mask Boundary */}
              <div className="organic-curve-overlay" aria-hidden="true">
                <svg
                  viewBox="0 0 120 700"
                  preserveAspectRatio="none"
                  className="curve-svg-shape"
                >
                  <path
                    d="M 0,0 
                       C 80,180 120,320 60,480 
                       C 20,580 80,660 120,700 
                       L 0,700 Z"
                    fill="#FFFFFF"
                  />
                  {/* Subtle Gold Arc Line */}
                  <path
                    d="M 0,0 
                       C 80,180 120,320 60,480 
                       C 20,580 80,660 120,700"
                    fill="none"
                    stroke="#C5A059"
                    strokeWidth="2.5"
                    opacity="0.6"
                  />
                </svg>
              </div>

              {/* Portrait Photo */}
              <img
                src={portraitImage}
                alt={currentPoet.name}
                className="parichay-portrait-photo"
              />

              {/* Floating Dark Crimson Glass Stats Bar */}
              <div className="parichay-floating-stats">
                <div className="floating-stat-item">
                  <Feather size={17} className="stat-icon" />
                  <span className="stat-value">{currentPoet.stats?.publishedBooks || (isGarima ? 3 : 4)}</span>
                  <span className="stat-label">{isHindi ? 'पुस्तकें' : 'Books'}</span>
                </div>

                <div className="floating-stat-divider" />

                <div className="floating-stat-item">
                  <BookOpen size={17} className="stat-icon" />
                  <span className="stat-value">{currentPoet.stats?.poemsCount || (isGarima ? '200+' : '350+')}</span>
                  <span className="stat-label">{isHindi ? (isGarima ? 'ग़ज़लें' : 'कविताएँ') : 'Poems'}</span>
                </div>

                <div className="floating-stat-divider" />

                <div className="floating-stat-item">
                  <Sparkles size={17} className="stat-icon" />
                  <span className="stat-value">{currentPoet.stats?.experience || (isGarima ? '12+ Years' : '25+ Years')}</span>
                  <span className="stat-label">{isHindi ? (isGarima ? 'यात्रा' : 'साधना') : 'Journey'}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PoetsSpotlight;
