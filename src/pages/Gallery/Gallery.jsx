import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, Sparkles, X, ZoomIn, Calendar, MapPin } from 'lucide-react';
import './Gallery.scss';

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const galleryItems = [
    {
      id: 1,
      title: "साहित्य कुंभ — काव्य पाठ",
      category: "stage",
      date: "फरवरी 2026",
      location: "नई दिल्ली",
      image: "/assets/kanchan-portrait.png",
      caption: "डॉ. कंचन जायसवाल का राष्ट्रीय मंच पर भावपूर्ण काव्य पाठ।"
    },
    {
      id: 2,
      title: "युवा काव्य संध्या — ग़ज़ल प्रस्तुति",
      category: "stage",
      date: "जनवरी 2026",
      location: "लखनऊ",
      image: "/assets/garima-portrait.png",
      caption: "गरिमा सिंह अपनी चर्चित ग़ज़लों की प्रस्तुति देते हुए।"
    },
    {
      id: 3,
      title: "काव्य संग्रह लोकार्पण समारोह",
      category: "launch",
      date: "दिसंबर 2025",
      location: "वाराणसी",
      image: "/assets/garima-portrait.png",
      caption: "साहित्यिक विभूतियों के सान्निध्य में पुस्तक विमोचन का ऐतिहासिक क्षण।"
    },
    {
      id: 4,
      title: "सांस्कृतिक संवाद एवं विचार गोष्ठी",
      category: "meet",
      date: "नवंबर 2025",
      location: "प्रयागराज",
      image: "/assets/kanchan-portrait.png",
      caption: "दो पीढ़ियों के दृष्टिकोण पर केंद्रित अंतरंग साहित्यिक परिचर्चा।"
    },
    {
      id: 5,
      title: "साहित्य गौरव सम्मान अलंकरण",
      category: "awards",
      date: "अक्टूबर 2025",
      location: "भोपाल",
      image: "/assets/garima-portrait.png",
      caption: "काव्य जगत में उल्लेखनीय योगदान हेतु प्रशस्ति पत्र व सम्मान अर्पण।"
    },
    {
      id: 6,
      title: "काव्य कार्यशाला — युवा प्रतिभाओं के साथ",
      category: "workshop",
      date: "सितंबर 2025",
      location: "जौनपुर",
      image: "/assets/kanchan-portrait.png",
      caption: "छंद और रचनात्मक लेखन सत्र में नए रचनाकारों का मार्गदर्शन।"
    }
  ];

  const filteredItems = activeFilter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <div className="gallery-page">
      {/* Hero Banner */}
      <section className="gallery-hero">
        <div className="container">
          <div className="section-title-wrap">
            <span className="subtitle">साहित्यिक स्मृतियाँ</span>
            <h1 className="main-title">
              चित्र <span className="highlight">दीर्घा</span>
            </h1>
            <p className="desc">
              मंच प्रस्तुतियाँ, पुस्तक विमोचन, साहित्यिक गोष्ठियों और अविस्मरणीय क्षणों का एक कलात्मक संकलन।
            </p>
            <div className="ornament-divider">
              <span className="line" /><span className="diamond" /><span className="line" />
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="gallery-content section-padding">
        <div className="container">
          <div className="gallery-filters">
            <button
              type="button"
              className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              सभी स्मृतियाँ
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
          </div>

          {/* Gallery Masonry / Grid */}
          <div className="gallery-grid">
            {filteredItems.map(item => (
              <motion.div
                key={item.id}
                className="gallery-card"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
                onClick={() => setSelectedPhoto(item)}
              >
                <div className="img-container">
                  <img src={item.image} alt={item.title} />
                  <div className="img-overlay">
                    <ZoomIn size={24} className="zoom-icon" />
                    <span className="zoom-text">बड़ा करके देखें</span>
                  </div>
                </div>

                <div className="card-info">
                  <h3 className="card-title">{item.title}</h3>
                  <div className="card-meta">
                    <span><Calendar size={13} /> {item.date}</span>
                    <span>•</span>
                    <span><MapPin size={13} /> {item.location}</span>
                  </div>
                  <p className="card-caption">{item.caption}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <div className="gallery-lightbox" onClick={() => setSelectedPhoto(null)}>
            <motion.div
              className="lightbox-content"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
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
                <h3>{selectedPhoto.title}</h3>
                <div className="lightbox-meta">
                  <span>{selectedPhoto.date}</span>
                  <span>•</span>
                  <span>{selectedPhoto.location}</span>
                </div>
                <p>{selectedPhoto.caption}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;

