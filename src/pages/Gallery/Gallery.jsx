import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, ZoomIn, Calendar, MapPin, Tag } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import './Gallery.scss';

const CATEGORY_MAP = {
  stage: 'मंच प्रस्तुतियाँ',
  launch: 'पुस्तक विमोचन',
  meet: 'साहित्यिक गोष्ठी',
  awards: 'सम्मान',
  workshop: 'कार्यशाला'
};

const ASPECT_RATIO_LABELS = {
  '1:1': '1:1 Square',
  '16:9': '16:9 Wide',
  '9:16': '9:16 Portrait'
};

const Gallery = () => {
  const { gallery = [] } = useContent();
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const filteredItems = activeFilter === 'all'
    ? gallery
    : gallery.filter(item => item.category === activeFilter);

  return (
    <div className="gallery-page">
      {/* Hero Banner */}
      <section className="gallery-hero">
        <div className="container">
          <div className="section-title-wrap">
            <h1 className="main-title">
              चित्र <span className="highlight">दीर्घा</span>
            </h1>
            <p className="desc">
              मंच प्रस्तुतियाँ, पुस्तक विमोचन, साहित्यिक गोष्ठियों और अविस्मरणीय क्षणों का कलात्मक संकलन।
            </p>
            <div className="ornament-divider">
              <span className="line" />
              <span className="diamond" />
              <span className="line" />
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="gallery-content">
        <div className="container">
          <div className="gallery-filters">
            <button
              type="button"
              className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              सभी स्मृतियाँ ({gallery.length})
            </button>
            <button
              type="button"
              className={`filter-btn ${activeFilter === 'stage' ? 'active' : ''}`}
              onClick={() => setActiveFilter('stage')}
            >
              मंच प्रस्तुतियाँ
            </button>
            <button
              type="button"
              className={`filter-btn ${activeFilter === 'launch' ? 'active' : ''}`}
              onClick={() => setActiveFilter('launch')}
            >
              पुस्तक विमोचन
            </button>
            <button
              type="button"
              className={`filter-btn ${activeFilter === 'meet' ? 'active' : ''}`}
              onClick={() => setActiveFilter('meet')}
            >
              साहित्यिक गोष्ठी
            </button>
            <button
              type="button"
              className={`filter-btn ${activeFilter === 'awards' ? 'active' : ''}`}
              onClick={() => setActiveFilter('awards')}
            >
              सम्मान
            </button>
            <button
              type="button"
              className={`filter-btn ${activeFilter === 'workshop' ? 'active' : ''}`}
              onClick={() => setActiveFilter('workshop')}
            >
              कार्यशाला
            </button>
          </div>

          {/* Dynamic Masonry Grid */}
          {filteredItems.length === 0 ? (
            <div className="no-gallery-items">
              <p>इस श्रेणी में अभी कोई चित्र उपलब्ध नहीं है।</p>
            </div>
          ) : (
            <div className="gallery-masonry-grid">
              <AnimatePresence mode="popLayout">
                {filteredItems.map(item => {
                  const ratio = item.aspectRatio || '1:1';
                  const ratioClass = ratio === '16:9' ? 'aspect-16-9' : ratio === '9:16' ? 'aspect-9-16' : 'aspect-1-1';

                  return (
                    <motion.div
                      key={item.id}
                      layout
                      className={`gallery-masonry-item ${ratioClass}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.35 }}
                      onClick={() => setSelectedPhoto(item)}
                    >
                      <div className="gallery-card">
                        <div className={`img-container ${ratioClass}`}>
                          <img src={item.image} alt={item.title} loading="lazy" />
                          <div className="ratio-tag-badge">
                            {ratio}
                          </div>
                          <div className="img-overlay">
                            <ZoomIn size={26} className="zoom-icon" />
                            <span className="zoom-text">बड़ा करके देखें</span>
                          </div>
                        </div>

                        <div className="card-info">
                          {item.category && (
                            <span className="card-cat-badge">
                              {CATEGORY_MAP[item.category] || item.category}
                            </span>
                          )}
                          <h3 className="card-title">{item.title}</h3>
                          {(item.date || item.location) && (
                            <div className="card-meta">
                              {item.date && <span><Calendar size={12} /> {item.date}</span>}
                              {item.date && item.location && <span>•</span>}
                              {item.location && <span><MapPin size={12} /> {item.location}</span>}
                            </div>
                          )}
                          {item.caption && <p className="card-caption">{item.caption}</p>}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <div className="gallery-lightbox" onClick={() => setSelectedPhoto(null)}>
            <motion.div
              className="lightbox-content"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="lightbox-close-btn"
                onClick={() => setSelectedPhoto(null)}
                aria-label="Close"
              >
                <X size={22} />
              </button>

              <div className="lightbox-image-wrap">
                <img src={selectedPhoto.image} alt={selectedPhoto.title} />
              </div>

              <div className="lightbox-details">
                <div className="lightbox-header-row">
                  <h3>{selectedPhoto.title}</h3>
                  {selectedPhoto.aspectRatio && (
                    <span className="royal-tag">
                      {ASPECT_RATIO_LABELS[selectedPhoto.aspectRatio] || selectedPhoto.aspectRatio}
                    </span>
                  )}
                </div>
                {(selectedPhoto.date || selectedPhoto.location) && (
                  <div className="lightbox-meta">
                    {selectedPhoto.date && <span><Calendar size={13} /> {selectedPhoto.date}</span>}
                    {selectedPhoto.date && selectedPhoto.location && <span>•</span>}
                    {selectedPhoto.location && <span><MapPin size={13} /> {selectedPhoto.location}</span>}
                  </div>
                )}
                {selectedPhoto.caption && <p>{selectedPhoto.caption}</p>}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
