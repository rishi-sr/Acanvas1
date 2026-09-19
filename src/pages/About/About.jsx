import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, BookOpen, Feather, ArrowRight } from 'lucide-react';
import { poetsData as defaultPoetsData } from '../../data/poetsData';
import { useContent } from '../../context/ContentContext';
import { useLanguage } from '../../context/LanguageContext';
import './About.scss';

const About = () => {
  const { authors } = useContent();
  const { t, lang } = useLanguage();
  const isHindi = lang === 'hi';

  const kanchan = authors?.kanchan || defaultPoetsData.kanchan;
  const garima = authors?.garima || defaultPoetsData.garima;
  const synergy = authors?.synergy || defaultPoetsData.synergy;

  const kanchanPortrait = kanchan.avatarUrl || '/assets/kanchan-portrait.png';
  const garimaPortrait = garima.avatarUrl || '/assets/garima-portrait.png';

  return (
    <div className="about-page">
      {/* Hero Banner */}
      <section className="about-hero">
        <div className="container">
          <div className="section-title-wrap">
            <h1 className="main-title">
              {t('about.title1')} <span className="highlight">{t('about.title2')}</span>
            </h1>
            <div className="ornament-divider">
              <span className="line" />
              <span className="diamond" />
              <span className="line" />
            </div>
          </div>

          {/* Mission & Vision Box */}
          <motion.div
            className="synergy-box"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="synergy-desc">
              {isHindi ? synergy.descHindi : synergy.desc}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Deep Bio 1: Kanchan Lata Jaiswal */}
      <section className="poet-bio-block container" id="kanchan">
        <motion.div
          className="bio-card-wrapper"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
        >
          {/* Left Column: Full-height Photo with Published Books/Works Card */}
          <div className="bio-sidebar">
            <div className="bio-photo-hero">
              <img
                src={kanchanPortrait}
                alt={kanchan.name}
                className="bio-photo-img"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="bio-photo-fallback" style={{ display: 'none' }}>
                <span>K</span>
              </div>
              <div className="bio-photo-overlay" />
            </div>

            {/* Published Books & Works */}
            <div className="bio-sidebar-footer">
              <div className="bio-sidebar-section-title">
                <BookOpen size={16} className="icon" />
                <span>{isHindi ? 'प्रकाशित कृतियाँ / पुस्तकें' : 'Published Books & Works'}</span>
              </div>

              <div className="bio-sidebar-books-list">
                {(kanchan.publishedBooks || [
                  { title: isHindi ? 'काव्य संकलन एवं शोध प्रबंध' : 'Poetry & Research', type: isHindi ? 'शोध व काव्य' : 'Research' },
                  { title: isHindi ? 'साहित्यिक आलेख संग्रह' : 'Literary Essays', type: isHindi ? 'समीक्षा' : 'Critique' }
                ]).map((bookItem, bIdx) => (
                  <div key={bIdx} className="bio-sidebar-book-item">
                    <div className="book-dot">❖</div>
                    <div className="book-details">
                      <span className="book-title">{bookItem.title}</span>
                      {bookItem.type && <span className="book-type-tag">{bookItem.type}</span>}
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/books" className="bio-books-link-btn">
                <span>{isHindi ? 'सभी पुस्तकें देखें' : 'View All Books'}</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>

          {/* Right Column: Name, Tagline Quote, Bio & Honors */}
          <div className="bio-content-pane">
            <div className="bio-header-info">
              <div className="bio-role-badge">
                <Feather size={14} />
                <span>{isHindi ? (kanchan.titleHindi || kanchan.title) : (kanchan.title || kanchan.titleHindi)}</span>
              </div>
              <h2 className="bio-poet-name">
                {isHindi ? kanchan.nameHindi : kanchan.name}
              </h2>
              <div className="bio-poet-eng">
                {isHindi ? kanchan.name : kanchan.nameHindi}
              </div>
            </div>

            {(isHindi ? (kanchan.philosophyHindi || kanchan.signatureQuoteHindi) : (kanchan.philosophy || kanchan.signatureQuote)) && (
              <div className="quote-quote-box">
                "{isHindi ? kanchan.philosophyHindi || kanchan.signatureQuoteHindi : kanchan.philosophy || kanchan.signatureQuote}"
              </div>
            )}

            <div className="bio-paragraphs">
              {(Array.isArray(isHindi ? kanchan.fullBioHindi : kanchan.fullBio)
                ? (isHindi ? kanchan.fullBioHindi : kanchan.fullBio)
                : [isHindi ? kanchan.fullBioHindi : kanchan.fullBio]
              ).map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {kanchan.awards && kanchan.awards.length > 0 && (
              <div className="awards-section">
                <div className="awards-title">
                  <Award size={18} color="#C5A059" />
                  <span>{t('about.honors')}</span>
                </div>
                <div className="awards-grid">
                  {kanchan.awards.map((aw, i) => (
                    <div key={i} className="award-badge-card">
                      <div className="award-yr">{aw.year}</div>
                      <div className="award-nm">{aw.title}</div>
                      <div className="award-org">{aw.organization}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </section>

      {/* Deep Bio 2: Garima Singh */}
      <section className="poet-bio-block container" id="garima">
        <motion.div
          className="bio-card-wrapper"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
        >
          {/* Left Column: Full-height Photo with Published Books/Works Card */}
          <div className="bio-sidebar dark-variant">
            <div className="bio-photo-hero">
              <img
                src={garimaPortrait}
                alt={garima.name}
                className="bio-photo-img"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="bio-photo-fallback" style={{ display: 'none' }}>
                <span>G</span>
              </div>
              <div className="bio-photo-overlay" />
            </div>

            {/* Published Books & Works */}
            <div className="bio-sidebar-footer">
              <div className="bio-sidebar-section-title">
                <BookOpen size={16} className="icon" />
                <span>{isHindi ? 'प्रकाशित कृतियाँ / पुस्तकें' : 'Published Books & Works'}</span>
              </div>

              <div className="bio-sidebar-books-list">
                {(garima.publishedBooks || [
                  { title: isHindi ? 'चाक पे माटी सा मन' : 'Chaak Pe Maati Sa Man', type: isHindi ? 'कविता संग्रह' : 'Poetry Collection' },
                  { title: isHindi ? 'त्रिपथ' : 'Tripath', type: isHindi ? 'साँझा काव्य संग्रह' : 'Anthology' },
                  { title: isHindi ? 'नवीन काव्य संग्रह' : 'New Collection', type: isHindi ? 'प्रकाशाधीन' : 'Upcoming' }
                ]).map((bookItem, bIdx) => (
                  <div key={bIdx} className="bio-sidebar-book-item">
                    <div className="book-dot">❖</div>
                    <div className="book-details">
                      <span className="book-title">{bookItem.title}</span>
                      {bookItem.type && <span className="book-type-tag">{bookItem.type}</span>}
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/books" className="bio-books-link-btn">
                <span>{isHindi ? 'सभी पुस्तकें देखें' : 'View All Books'}</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>

          {/* Right Column: Name, Tagline Quote, Bio & Honors */}
          <div className="bio-content-pane">
            <div className="bio-header-info">
              <div className="bio-role-badge">
                <Feather size={14} />
                <span>{isHindi ? (garima.titleHindi || garima.title) : (garima.title || garima.titleHindi)}</span>
              </div>
              <h2 className="bio-poet-name">
                {isHindi ? garima.nameHindi : garima.name}
              </h2>
              <div className="bio-poet-eng">
                {isHindi ? garima.name : garima.nameHindi}
              </div>
            </div>

            {(isHindi ? (garima.philosophyHindi || garima.signatureQuoteHindi) : (garima.philosophy || garima.signatureQuote)) && (
              <div className="quote-quote-box">
                "{isHindi ? garima.philosophyHindi || garima.signatureQuoteHindi : garima.philosophy || garima.signatureQuote}"
              </div>
            )}

            <div className="bio-paragraphs">
              {(Array.isArray(isHindi ? garima.fullBioHindi : garima.fullBio)
                ? (isHindi ? garima.fullBioHindi : garima.fullBio)
                : [isHindi ? garima.fullBioHindi : garima.fullBio]
              ).map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {garima.awards && garima.awards.length > 0 && (
              <div className="awards-section">
                <div className="awards-title">
                  <Award size={18} color="#C5A059" />
                  <span>{t('about.honors')}</span>
                </div>
                <div className="awards-grid">
                  {garima.awards.map((aw, i) => (
                    <div key={i} className="award-badge-card">
                      <div className="award-yr">{aw.year}</div>
                      <div className="award-nm">{aw.title}</div>
                      <div className="award-org">{aw.organization}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
