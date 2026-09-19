import React from 'react';
import { Link } from 'react-router-dom';
import { Feather, BookOpen, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useContent } from '../../../context/ContentContext';
import { useLanguage } from '../../../context/LanguageContext';

const Hero = () => {
  const { siteSettings } = useContent();
  const { t } = useLanguage();

  const heroData = siteSettings?.hero || {};

  const badgeText = heroData.badge || t('hero.badge');
  const title1 = heroData.title1 || t('hero.title1');
  const title2 = heroData.title2 || t('hero.title2');
  const subtitle = heroData.subtitle || t('hero.subtitle');
  const leadText = heroData.lead || t('hero.lead');
  const exploreText = heroData.explorePoemsText || t('hero.explorePoems');
  const exploreLink = heroData.explorePoemsLink || '/poems';
  const discoverText = heroData.discoverBooksText || t('hero.discoverBooks');
  const discoverLink = heroData.discoverBooksLink || '/books';

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
                {badgeText}
              </span>
            </div>

            <h1 className="hero-main-title">
              {title1} <br />
              <span className="title-highlight">{title2}</span>
            </h1>

            <div className="hero-subtitle">
              {subtitle}
            </div>

            <p className="hero-lead-text">
              {leadText}
            </p>

            <div className="hero-actions-row">
              <Link to={exploreLink} className="btn-royal">
                <Feather size={17} />
                <span>{exploreText}</span>
              </Link>
              <Link to={discoverLink} className="btn-royal-outline">
                <BookOpen size={17} />
                <span>{discoverText}</span>
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
