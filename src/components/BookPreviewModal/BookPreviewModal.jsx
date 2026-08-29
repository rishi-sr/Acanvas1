import React from 'react';
import { X, ShoppingBag, Star, BookOpen, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import './BookPreviewModal.scss';

const BookPreviewModal = ({ book, onClose }) => {
  if (!book) return null;

  const isUpcoming = book.status === 'upcoming';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div
        className="book-modal-container"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.25 }}
      >
        {/* Header */}
        <div className="book-modal-header">
          <div className="modal-book-badge">
            <span className={`royal-tag ${isUpcoming ? 'gold' : ''}`}>
              {isUpcoming ? '✨ Upcoming Masterpiece' : '📖 Published Poetry Collection'}
            </span>
          </div>
          <button className="btn-close" onClick={onClose} title="Close Preview">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="book-modal-body">
          {/* Left 3D Cover */}
          <div className="book-cover-col">
            <div
              className="book-cover-3d"
              style={{ background: book.coverGradient || 'linear-gradient(145deg, #8B0000 0%, #3B050B 100%)' }}
            >
              <div style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.8 }}>
                AKSHAR CANVAS
              </div>
              <div className="cover-top">{book.title}</div>
              <div className="cover-author">{book.author}</div>
            </div>

            <div className="price-rating-row">
              <span className="price">{book.price || 'Available Soon'}</span>
              {book.rating && (
                <div className="rating">
                  <Star size={14} fill="#C5A059" style={{ display: 'inline', verticalAlign: 'middle', marginRight: 2 }} />
                  {book.rating} ({book.reviewsCount} reviews)
                </div>
              )}
            </div>
          </div>

          {/* Right Details */}
          <div className="book-details-col">
            <h2 className="book-main-title">{book.title}</h2>
            <div style={{ color: '#8B0000', fontWeight: 600, fontSize: '1.05rem' }}>
              Author: {book.author}
            </div>

            <p style={{ fontStyle: 'italic', color: '#4A3E40', fontWeight: 500 }}>
              "{book.tagline}"
            </p>

            <div className="book-meta-grid">
              <div className="meta-item">
                <strong>Publisher:</strong>
                <span>{book.publisher}</span>
              </div>
              <div className="meta-item">
                <strong>{isUpcoming ? 'Expected Date:' : 'Year of Release:'}</strong>
                <span>{isUpcoming ? book.expectedDate : book.year}</span>
              </div>
              <div className="meta-item">
                <strong>Page Count:</strong>
                <span>{book.pages} Pages</span>
              </div>
              <div className="meta-item">
                <strong>ISBN:</strong>
                <span>{book.isbn}</span>
              </div>
            </div>

            <p className="book-synopsis">{book.synopsis}</p>

            {book.sampleExcerpt && (
              <div className="excerpt-section">
                <div className="excerpt-label">Selected Excerpt</div>
                <p>"{book.sampleExcerpt}"</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="book-modal-footer">
          <div style={{ fontSize: '0.85rem', color: '#7D6B6E' }}>
            Akshar Canvas Authorized Literary Edition
          </div>

          <div className="buy-options">
            {isUpcoming ? (
              <a
                href="#/contact?subject=preorder"
                className="btn-royal-gold"
                onClick={onClose}
              >
                <span>Reserve Advance Copy</span>
              </a>
            ) : (
              <>
                {book.buyLinks?.amazon && (
                  <a
                    href={book.buyLinks.amazon}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-royal"
                    style={{ padding: '0.6rem 1.2rem', fontSize: '0.88rem' }}
                  >
                    <ShoppingBag size={15} />
                    <span>Order on Amazon</span>
                  </a>
                )}
                {book.buyLinks?.flipkart && (
                  <a
                    href={book.buyLinks.flipkart}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-royal-outline"
                    style={{ padding: '0.6rem 1.2rem', fontSize: '0.88rem' }}
                  >
                    <ExternalLink size={15} />
                    <span>Flipkart</span>
                  </a>
                )}
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BookPreviewModal;
