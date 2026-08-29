import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Quote, Heart, Share2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useContent } from '../../../context/ContentContext';
import { useLanguage } from '../../../context/LanguageContext';
import QuoteShareModal from '../../../components/QuoteShareModal/QuoteShareModal';

const QuotesCarousel = () => {
  const { quotes, toggleLike, likedItems } = useContent();
  const { t, lang } = useLanguage();
  const isHindi = lang === 'hi';
  const [selectedQuote, setSelectedQuote] = useState(null);

  const displayQuotes = quotes.slice(0, 3);

  return (
    <section className="quotes-preview-section section-padding">
      <div className="container">
        <div className="section-title-wrap">
          <span className="subtitle">{t('quotes.subtitle')}</span>
          <h2 className="main-title">
            {t('quotes.title1')} <span className="highlight">{t('quotes.title2')}</span>
          </h2>
          <p className="desc">
            {t('quotes.desc')}
          </p>
          <div className="ornament-divider">
            <span className="line" />
            <span className="diamond" />
            <span className="line" />
          </div>
        </div>

        {displayQuotes.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3.5rem 1.5rem', background: '#FFFFFF', borderRadius: '16px', border: '1px dashed rgba(139, 0, 0, 0.2)', maxWidth: '600px', margin: '0 auto' }}>
            <Quote size={36} color="var(--primary-color, #8B0000)" style={{ opacity: 0.6, margin: '0 auto 1rem' }} />
            <p style={{ color: 'var(--text-muted, #71717A)', fontSize: '1.05rem', margin: 0 }}>
              {t('quotes.subtitle')}: जल्द ही अनमोल विचार यहाँ जोड़े जाएंगे।
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {displayQuotes.map((item, idx) => {
              const isLiked = !!likedItems[`quote_${item.id}`];
              const displayVerse = isHindi && item.originalVerse ? item.originalVerse : item.quote;
              const displayAuthor = isHindi && item.authorHindi ? item.authorHindi : item.author;
              const aksharReview = isHindi && item.aksharCanvasReview ? item.aksharCanvasReview : item.poetReflection;

              return (
                <motion.div
                  key={item.id}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: '16px',
                    padding: '2.5rem 2rem',
                    boxShadow: '0 10px 30px rgba(139, 0, 0, 0.06)',
                    border: '1px solid rgba(139, 0, 0, 0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative'
                  }}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                >
                  <div>
                    <Quote size={32} color="#C41E3A" style={{ opacity: 0.35, marginBottom: '0.75rem' }} />
                    <div
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: '1.2rem',
                        lineHeight: 1.8,
                        color: '#1A1617',
                        marginBottom: '1.2rem',
                        whiteSpace: 'pre-line'
                      }}
                    >
                      "{displayVerse}"
                    </div>

                    <div style={{ fontSize: '1rem', fontWeight: 600, color: '#8B0000', marginBottom: '0.4rem' }}>
                      — {displayAuthor}
                    </div>

                    {item.sourceBook && (
                      <div style={{ fontSize: '0.82rem', color: '#71717A', fontStyle: 'italic', marginBottom: '1rem' }}>
                        {item.sourceBook}
                      </div>
                    )}

                    {aksharReview && (
                      <div
                        style={{
                          background: 'rgba(196, 30, 58, 0.04)',
                          borderRadius: '8px',
                          padding: '0.9rem',
                          borderLeft: '3px solid #C41E3A',
                          fontSize: '0.85rem',
                          color: '#4A4647',
                          lineHeight: 1.6
                        }}
                      >
                        {aksharReview}
                      </div>
                    )}
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: '1.8rem',
                      paddingTop: '1.2rem',
                      borderTop: '1px solid rgba(139, 0, 0, 0.08)'
                    }}
                  >
                    <button
                      className={`like-btn ${isLiked ? 'active' : ''}`}
                      onClick={() => toggleLike('quote', item.id)}
                    >
                      <Heart size={15} fill={isLiked ? '#C41E3A' : 'none'} />
                      <span>{item.likes || 0}</span>
                    </button>

                    <button
                      className="btn-royal-outline"
                      onClick={() => setSelectedQuote(item)}
                      style={{ padding: '0.4rem 0.9rem', fontSize: '0.82rem' }}
                    >
                      <Share2 size={13} />
                      <span>{t('quotes.viewCard')}</span>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
          <Link to="/quotes" className="btn-royal">
            <Sparkles size={16} />
            <span>{t('quotes.viewAll')}</span>
          </Link>
        </div>
      </div>

      {selectedQuote && (
        <QuoteShareModal
          quote={selectedQuote}
          onClose={() => setSelectedQuote(null)}
        />
      )}
    </section>
  );
};

export default QuotesCarousel;
