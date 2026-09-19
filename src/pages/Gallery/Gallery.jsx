import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Calendar, MapPin, Sparkles, Tag, Feather } from 'lucide-react';
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
  '16:9': '16:9 Landscape',
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

          {/* Pure Image Masonry Grid - NO TEXT BLOCKS BELOW */}
          {filteredItems.length === 0 ? (
            <div className="no-gallery-items">
              <Feather size={36} className="empty-icon" />
              <h3>जल्द ही चित्र दीर्घा में साहित्यिक स्मृतियाँ प्रकाशित की जाएँगी</h3>
              <p>इस अनुभाग में नई तस्वीरें और मंच प्रस्तुतियाँ शीघ्र जोड़ी जाएँगी।</p>
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
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => setSelectedPhoto(item)}
                    >
                      <div className="pure-gallery-card">
                        <div className={`img-wrapper ${ratioClass}`}>
                          <img src={item.image} alt={item.title} loading="lazy" />
                          
                          {/* Subtle overlay on hover */}
                          <div className="img-hover-overlay">
                            <div className="overlay-content">
                              <ZoomIn size={28} className="zoom-icon" />
                              <span className="view-text">विवरण देखें</span>
                            </div>
                          </div>
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

      {/* 2-COLUMN SIDE-BY-SIDE LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedPhoto && (
          <div className="gallery-lightbox-backdrop" onClick={() => setSelectedPhoto(null)}>
            <motion.div
              className="gallery-lightbox-modal"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                className="lightbox-close-btn"
                onClick={() => setSelectedPhoto(null)}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              {/* Left Column: Full Image Display */}
              <div className="lightbox-media-pane">
                <img src={selectedPhoto.image} alt={selectedPhoto.title} />
              </div>

              {/* Right Column: Image Details Pane */}
              <div className="lightbox-info-pane">
                <div className="info-top-tags">
                  {selectedPhoto.category && (
                    <span className="royal-tag">
                      {CATEGORY_MAP[selectedPhoto.category] || selectedPhoto.category}
                    </span>
                  )}
                  {selectedPhoto.aspectRatio && (
                    <span className="royal-tag gold">
                      {ASPECT_RATIO_LABELS[selectedPhoto.aspectRatio] || selectedPhoto.aspectRatio}
                    </span>
                  )}
                </div>

                <h2 className="modal-photo-title">
                  {selectedPhoto.title}
                </h2>

                {(selectedPhoto.date || selectedPhoto.location) && (
                  <div className="modal-photo-meta">
                    {selectedPhoto.date && (
                      <span className="meta-item">
                        <Calendar size={14} />
                        <span>{selectedPhoto.date}</span>
                      </span>
                    )}
                    {selectedPhoto.date && selectedPhoto.location && <span className="meta-sep">•</span>}
                    {selectedPhoto.location && (
                      <span className="meta-item">
                        <MapPin size={14} />
                        <span>{selectedPhoto.location}</span>
                      </span>
                    )}
                  </div>
                )}

                <div className="modal-divider" />

                <div className="modal-photo-caption">
                  {selectedPhoto.caption ? (
                    <p>{selectedPhoto.caption}</p>
                  ) : (
                    <p className="no-caption">अक्षर कैनवास साहित्यिक दीर्घा का अविस्मरणीय क्षण।</p>
                  )}
                </div>

                <div className="modal-footer-brand">
                  <Feather size={14} />
                  <span>अक्षर कैनवास • कला एवं संस्कृति की त्रिवेणी</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
