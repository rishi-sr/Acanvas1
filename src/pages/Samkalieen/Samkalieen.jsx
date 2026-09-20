import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Feather, Calendar, Clock, ArrowRight, Sparkles, X, Share2, Quote } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import './Samkalieen.scss';

const Samkalieen = () => {
  const { samkalieen = [] } = useContent();
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <div className="samkalieen-page">
      {/* Hero Banner */}
      <section className="samkalieen-hero">
        <div className="container">
          <div className="section-title-wrap">
            
            <h1 className="main-title">
              <span className="highlight">समकालीन</span>
            </h1>
            <p className="desc">
              अक्षर कैनवास पर सद्यः प्रकाशित रचनाओं के लिए क्लिक करें 
            </p>
            <div className="ornament-divider">
              <span className="line" /><span className="diamond" /><span className="line" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Articles Grid */}
      <section className="samkalieen-content section-padding">
        <div className="container">
          {(!samkalieen || samkalieen.length === 0) ? (
            <div className="no-items-found" style={{ textAlign: 'center', padding: '4.5rem 1.5rem', background: '#FFFFFF', borderRadius: '16px', border: '1px solid rgba(197, 160, 89, 0.25)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', margin: '2rem auto', maxWidth: '640px' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(197, 160, 89, 0.12)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.2rem' }}>
                <BookOpen size={28} color="#C5A059" />
              </div>
              <h3 style={{ fontSize: '1.3rem', fontFamily: 'Cinzel, serif', color: '#1C191A', marginBottom: '0.6rem', fontWeight: 700 }}>
                वर्तमान में कोई समकालीन आलेख सूचीबद्ध नहीं है।
              </h3>
              <p style={{ color: '#7D6B6E', fontSize: '0.95rem', lineHeight: '1.6' }}>
                नवीन साहित्यिक, दार्शनिक एवं समकालीन चिंतन से संबंधित आलेख शीघ्र ही यहाँ प्रकाशित किए जाएँगे।
              </p>
            </div>
          ) : (
            <div className="articles-grid">
              {samkalieen.map((article, idx) => (
                <motion.article
                  key={article.id || idx}
                  className="article-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                >
                  <div className="article-card-top">
                    <span className="category-pill">{article.category || 'साहित्यिक विमर्श'}</span>
                    {article.readTime && <span className="read-time">{article.readTime}</span>}
                  </div>

                  <h3 className="article-title">{article.title}</h3>

                  <div className="article-meta">
                    {article.author && (
                      <span className="meta-author">
                        <Feather size={14} />
                        <span>लेखक: {article.author}</span>
                      </span>
                    )}
                    {article.date && (
                      <span className="meta-date">
                        <Calendar size={14} />
                        <span>{article.date}</span>
                      </span>
                    )}
                  </div>

                  {article.lead && <p className="article-lead">{article.lead}</p>}

                  <div className="card-action">
                    <button
                      type="button"
                      className="read-article-btn"
                      onClick={() => setSelectedArticle(article)}
                    >
                      <span>पूरा आलेख पढ़ें</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Article Detail Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="article-modal-overlay" onClick={() => setSelectedArticle(null)}>
            <motion.div
              className="article-modal"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setSelectedArticle(null)}
                aria-label="Close"
              >
                <X size={20} />
              </button>

              <div className="modal-header">
                {selectedArticle.category && <span className="modal-category">{selectedArticle.category}</span>}
                <h2 className="modal-title">{selectedArticle.title}</h2>
                <div className="modal-meta">
                  {selectedArticle.author && <span>लेखक: <strong>{selectedArticle.author}</strong></span>}
                  {selectedArticle.date && (
                    <>
                      <span>•</span>
                      <span>{selectedArticle.date}</span>
                    </>
                  )}
                  {selectedArticle.readTime && (
                    <>
                      <span>•</span>
                      <span>{selectedArticle.readTime}</span>
                    </>
                  )}
                </div>
              </div>

              <div className="modal-body">
                {selectedArticle.quote && (
                  <blockquote className="article-quote-box">
                    <Quote size={24} className="quote-icon" />
                    <p>{selectedArticle.quote}</p>
                  </blockquote>
                )}

                {(() => {
                  const paraList = Array.isArray(selectedArticle.paragraphs)
                    ? selectedArticle.paragraphs
                    : (typeof selectedArticle.paragraphs === 'string'
                        ? selectedArticle.paragraphs.split('\n\n').map(p => p.trim()).filter(Boolean)
                        : (selectedArticle.lead ? [selectedArticle.lead] : []));

                  return paraList.map((p, idx) => (
                    <p key={idx} className="article-p">{p}</p>
                  ));
                })()}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Samkalieen;

