import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Feather } from 'lucide-react';
import { motion } from 'framer-motion';
import { useContent } from '../../../context/ContentContext';
import { useLanguage } from '../../../context/LanguageContext';
import PoemReaderModal from '../../../components/PoemReaderModal/PoemReaderModal';

const FeaturedPoems = () => {
  const { poems, toggleLike, likedItems } = useContent();
  const { t, lang } = useLanguage();
  const [activePoemModal, setActivePoemModal] = useState(null);

  const featured = poems.filter(p => p.featured).slice(0, 3);

  return (
    <section className="featured-poems-section section-padding">
      <div className="container">
        <div className="section-title-wrap">
          <span className="subtitle">{t('featuredPoems.subtitle')}</span>
          <h2 className="main-title">
            {t('featuredPoems.title1')} <span className="highlight">{t('featuredPoems.title2')}</span>
          </h2>
          <p className="desc">
            {t('featuredPoems.desc')}
          </p>
          <div className="ornament-divider">
            <span className="line" />
            <span className="diamond" />
            <span className="line" />
          </div>
        </div>

        {featured.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3.5rem 1.5rem', background: '#FFFFFF', borderRadius: '16px', border: '1px dashed rgba(139, 0, 0, 0.2)', maxWidth: '600px', margin: '0 auto' }}>
            <Feather size={36} color="var(--primary-color, #8B0000)" style={{ opacity: 0.6, margin: '0 auto 1rem' }} />
            <p style={{ color: 'var(--text-muted, #71717A)', fontSize: '1.05rem', margin: 0 }}>
              {lang === 'hi' ? 'जल्द ही नई रचनाएँ यहाँ प्रकाशित की जाएंगी।' : 'New poems and literary works will be published here soon.'}
            </p>
          </div>
        ) : (
          <div className="poems-grid">
            {featured.map((poem, index) => {
              const isLiked = !!likedItems[`poem_${poem.id}`];
              const isHindi = lang === 'hi';
              const displayTitle = isHindi && poem.titleHindi ? poem.titleHindi : poem.title;
              const displayPoet = isHindi && poem.poetHindi ? poem.poetHindi : poem.poet;
              const displayExcerpt = isHindi && poem.originalHindiStanzas?.[0]
                ? poem.originalHindiStanzas[0].split('\n')[0]
                : poem.excerpt;

              return (
                <motion.div
                  key={poem.id}
                  className="poem-card"
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                >
                  <div className="poem-card-top">
                    <div className="poem-category">
                      <span className="royal-tag">{poem.category}</span>
                    </div>
                    <h3 className="poem-title">{displayTitle}</h3>
                    <div className="poem-poet">{t('featuredPoems.by')} {displayPoet}</div>
                    <div className="poem-snippet">
                      "{displayExcerpt}"
                    </div>
                  </div>

                  <div className="poem-card-bottom">
                    <button
                      className="read-btn"
                      onClick={() => setActivePoemModal(poem)}
                    >
                      <span>{t('featuredPoems.readBtn')}</span>
                      <ArrowRight size={14} />
                    </button>

                    <button
                      className={`like-btn ${isLiked ? 'active' : ''}`}
                      onClick={() => toggleLike('poem', poem.id)}
                    >
                      <Heart size={15} fill={isLiked ? '#C41E3A' : 'none'} />
                      <span>{poem.likes || 0}</span>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
          <Link to="/poems" className="btn-royal">
            <Feather size={16} />
            <span>{t('featuredPoems.viewAll')}</span>
          </Link>
        </div>
      </div>

      {activePoemModal && (
        <PoemReaderModal
          poem={activePoemModal}
          onClose={() => setActivePoemModal(null)}
        />
      )}
    </section>
  );
};

export default FeaturedPoems;
