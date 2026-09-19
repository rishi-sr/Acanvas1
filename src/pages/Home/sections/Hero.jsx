import React from 'react';
import { Link } from 'react-router-dom';
import { Feather, BookOpen, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../../context/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-grid">
          {/* Left Content */}
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="hero-badge-wrap">
              <span className="royal-tag">
                <Sparkles size={13} />
                {t('hero.badge')}
              </span>
            </div>

            <h1 className="hero-main-title">
              {t('hero.title1')} <br />
              <span className="title-highlight">{t('hero.title2')}</span>
            </h1>

            <div className="hero-subtitle">
              {t('hero.subtitle')}
            </div>

            <p className="hero-lead-text">
              {t('hero.lead')}
            </p>

            <div className="hero-actions-row">
              <Link to="/poems" className="btn-royal">
                <Feather size={17} />
                <span>{t('hero.explorePoems')}</span>
              </Link>
              <Link to="/books" className="btn-royal-outline">
                <BookOpen size={17} />
                <span>{t('hero.discoverBooks')}</span>
              </Link>
            </div>
          </motion.div>

          {/* Right Visual Graphic cleanly fitted into background */}
          <div className="hero-bg-visual-wrapper">
            <img
              src="/assets/hero-right.png"
              alt="Akshar Canvas Literary Showcase"
              className="hero-bg-visual-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
