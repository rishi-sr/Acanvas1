import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, Clock, CheckCircle, ArrowRight, Feather, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContent } from '../../context/ContentContext';
import './Workshop.scss';

const Workshop = () => {
  const { workshops = [] } = useContent();

  return (
    <div className="workshop-page">
      {/* Hero Banner */}
      <section className="workshop-hero">
        <div className="container">
          <div className="section-title-wrap">
            <h1 className="main-title">
             <span className="highlight">वर्कशॉप</span>
            </h1>
            <p className="desc">
              काव्य शिल्प, छंद-साधना, स्टोरीटेलिंग और मंच प्रस्तुति की कलात्मक बारीकियों को सीखने का अनूठा मंच।
            </p>
            <div className="ornament-divider">
              <span className="line" /><span className="diamond" /><span className="line" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="workshop-content">
        <div className="container">
          {(!workshops || workshops.length === 0) ? (
            <div className="no-items-found" style={{ textAlign: 'center', padding: '4.5rem 1.5rem', background: '#FFFFFF', borderRadius: '16px', border: '1px solid rgba(197, 160, 89, 0.25)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', margin: '2rem auto', maxWidth: '640px' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(197, 160, 89, 0.12)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.2rem' }}>
                <Sparkles size={28} color="#C5A059" />
              </div>
              <h3 style={{ fontSize: '1.3rem', fontFamily: 'Cinzel, serif', color: '#1C191A', marginBottom: '0.6rem', fontWeight: 700 }}>
                वर्तमान में कोई आगामी कार्यशाला सूचीबद्ध नहीं है
              </h3>
              <p style={{ color: '#7D6B6E', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.8rem' }}>
                शीघ्र ही नए काव्य शिल्प, छंद-साधना एवं स्टोरीटेलिंग सत्रों की तिथियाँ यहाँ घोषित की जाएँगी। विशेष सत्र आयोजन हेतु आप हमसे संपर्क कर सकते हैं।
              </p>
              <Link to="/contact" className="btn-royal" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.65rem 1.4rem' }}>
                <span>कार्यशाला हेतु संपर्क करें</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          ) : (
            <div className="workshop-grid">
              {workshops.map((ws, idx) => {
                const highlightsList = Array.isArray(ws.highlights)
                  ? ws.highlights
                  : (typeof ws.highlights === 'string' ? ws.highlights.split(',').map(h => h.trim()).filter(Boolean) : []);

                return (
                  <motion.div
                    key={ws.id || idx}
                    className="workshop-card"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: idx * 0.08 }}
                  >
                    <div className="card-top">
                      <span className="workshop-badge">
                        <Sparkles size={13} />
                        <span>सत्र #{idx + 1}</span>
                      </span>
                      {ws.mode && <span className="workshop-mode">{ws.mode}</span>}
                    </div>

                    <h3 className="workshop-title">{ws.title}</h3>
                    {ws.mentor && (
                      <p className="workshop-mentor">
                        <Feather size={14} />
                        <span>मार्गदर्शक: {ws.mentor}</span>
                      </p>
                    )}

                    {ws.desc && <p className="workshop-desc">{ws.desc}</p>}

                    {(ws.date || ws.time) && (
                      <div className="workshop-meta">
                        {ws.date && (
                          <div className="meta-item">
                            <Calendar size={14} />
                            <span>{ws.date}</span>
                          </div>
                        )}
                        {ws.time && (
                          <div className="meta-item">
                            <Clock size={14} />
                            <span>{ws.time}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {highlightsList.length > 0 && (
                      <div className="workshop-highlights">
                        <h4 className="highlights-head">प्रमुख विषय:</h4>
                        <ul>
                          {highlightsList.map((h, hIdx) => (
                            <li key={hIdx}>
                              <CheckCircle size={13} className="check-icon" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="card-bottom">
                      <Link to="/contact" className="btn-royal workshop-enroll-btn">
                        <span>कार्यशाला हेतु पंजीकरण करें</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Workshop;
