import React from 'react';
import { motion } from 'framer-motion';
import { Newspaper, Calendar, MapPin, Tag } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import './Reporting.scss';

const Reporting = () => {
  const { reports = [] } = useContent();

  return (
    <div className="reporting-page">
      {/* Hero Banner */}
      <section className="reporting-hero">
        <div className="container">
          <div className="section-title-wrap">
            <h1 className="main-title">
              <span className="highlight">रिपोर्टिंग</span>
            </h1>
           
            <div className="ornament-divider">
              <span className="line" /><span className="diamond" /><span className="line" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="reporting-content">
        <div className="container">
          {(!reports || reports.length === 0) ? (
            <div className="no-items-found" style={{ textAlign: 'center', padding: '4.5rem 1.5rem', background: '#FFFFFF', borderRadius: '16px', border: '1px solid rgba(197, 160, 89, 0.25)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', margin: '2rem auto', maxWidth: '640px' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(197, 160, 89, 0.12)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.2rem' }}>
                <Newspaper size={28} color="#C5A059" />
              </div>
              <h3 style={{ fontSize: '1.3rem', fontFamily: 'Cinzel, serif', color: '#1C191A', marginBottom: '0.6rem', fontWeight: 700 }}>
                वर्तमान में कोई प्रेस कवरेज / रिपोर्टिंग सूचीबद्ध नहीं है
              </h3>
              <p style={{ color: '#7D6B6E', fontSize: '0.95rem', lineHeight: '1.6' }}>
                राष्ट्रीय समाचार पत्रों, पत्रिकाओं एवं मीडिया में प्रकाशित होने वाली आगामी रिपोर्टें व समीक्षाएँ यहाँ प्रदर्शित की जाएँगी।
              </p>
            </div>
          ) : (
            <div className="reports-grid">
              {reports.map((report, idx) => {
                const tagsList = Array.isArray(report.tags)
                  ? report.tags
                  : (typeof report.tags === 'string' ? report.tags.split(',').map(t => t.trim()).filter(Boolean) : []);

                return (
                  <motion.article
                    key={report.id || idx}
                    className="report-card"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: idx * 0.08 }}
                  >
                    <div className="report-card-top">
                      <span className="report-badge">
                        <Newspaper size={13} />
                        <span>{report.badge || 'समाचार'}</span>
                      </span>
                      {report.media && <span className="report-source">{report.media}</span>}
                    </div>

                    <h3 className="report-title">{report.title}</h3>

                    {(report.date || report.location) && (
                      <div className="report-meta">
                        {report.date && (
                          <div className="meta-item">
                            <Calendar size={14} />
                            <span>{report.date}</span>
                          </div>
                        )}
                        {report.location && (
                          <div className="meta-item">
                            <MapPin size={14} />
                            <span>{report.location}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {report.excerpt && <p className="report-excerpt">{report.excerpt}</p>}

                    {tagsList.length > 0 && (
                      <div className="report-tags">
                        {tagsList.map((t, tIdx) => (
                          <span key={tIdx} className="tag-chip">
                            <Tag size={11} />
                            <span>{t}</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Reporting;
