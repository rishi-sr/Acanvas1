import React, { useState } from 'react';
import { BookOpen, ShoppingBag, Star, Feather } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContent } from '../../context/ContentContext';
import BookPreviewModal from '../../components/BookPreviewModal/BookPreviewModal';
import './Books.scss';

const Books = () => {
  const { books } = useContent();
  const [selectedAuthor, setSelectedAuthor] = useState('garima');
  const [selectedBook, setSelectedBook] = useState(null);

  // Filter books based on selected author
  const filteredBooks = (books || []).filter(b => {
    if (selectedAuthor === 'all') return true;
    if (selectedAuthor === 'garima') {
      return (
        b.authorId === 'garima' ||
        b.author?.toLowerCase().includes('garima') ||
        b.authorHindi?.includes('गरिमा')
      );
    }
    if (selectedAuthor === 'kanchan') {
      return (
        b.authorId === 'kanchan' ||
        b.author?.toLowerCase().includes('kanchan') ||
        b.authorHindi?.includes('कंचन')
      );
    }
    return true;
  });

  const publishedBooks = filteredBooks.filter(b => b.status === 'published');
  const upcomingBooks = filteredBooks.filter(b => b.status === 'upcoming');

  return (
    <div className="books-page">
      {/* Compact Hero Section */}
      <section className="books-hero">
        <div className="container">
          <div className="section-title-wrap">
            <h1 className="main-title">
              पुस्तकें
            </h1>
            <p className="desc">
              कवयित्री कंचन लता जायसवाल एवं गरिमा सिंह की प्रकाशित एवं आगामी साहित्यिक कृतियाँ।
            </p>
            <div className="ornament-divider">
              <span className="line" />
              <span className="diamond" />
              <span className="line" />
            </div>
          </div>
        </div>
      </section>

      <section className="container books-content-container">
        {/* Author Tabs Navigation */}
        <div className="books-author-tabs-nav">
          <button
            type="button"
            className={`author-tab-pill ${selectedAuthor === 'garima' ? 'active' : ''}`}
            onClick={() => setSelectedAuthor('garima')}
          >
            <Feather size={15} />
            <span>गरिमा सिंह</span>
          </button>
          <button
            type="button"
            className={`author-tab-pill ${selectedAuthor === 'kanchan' ? 'active' : ''}`}
            onClick={() => setSelectedAuthor('kanchan')}
          >
            <Feather size={15} />
            <span>डॉ. कंचन लता जायसवाल</span>
          </button>
        </div>

        {/* Published Books Section */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedAuthor}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            <div className="books-section-block">
              {publishedBooks.length === 0 ? (
                <div className="no-books-found">
                  <BookOpen size={38} className="empty-icon" />
                  <p>इस अनुभाग में वर्तमान में कोई प्रकाशित पुस्तक उपलब्ध नहीं है।</p>
                </div>
              ) : (
                <div className="books-detailed-grid">
                  {publishedBooks.map((book, idx) => (
                    <motion.div
                      key={book.id}
                      className="detailed-book-card"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: idx * 0.08 }}
                    >
                      <div className="card-top-content">
                        <div className="card-cover-wrapper">
                          <div
                            className="mini-cover"
                            style={{ background: book.coverGradient || 'linear-gradient(145deg, #8B0000 0%, #3B050B 100%)' }}
                          >
                            <div className="cover-brand">
                              AKSHAR CANVAS
                            </div>
                            <div className="cover-ttl">{book.title}</div>
                            <div className="cover-ath">{book.authorHindi || book.author}</div>
                          </div>
                        </div>

                        <div className="card-meta-wrap">
                          <div className="book-badge-status">
                            <span className="royal-tag">प्रकाशित {book.year}</span>
                          </div>
                          <h3 className="book-heading">{book.title}</h3>
                          <div className="author-line">{book.authorHindi || book.author}</div>
                          <div className="publisher-line">{book.publisher}</div>

                          <div className="price-rating-tag">
                            <span className="price">{book.price}</span>
                            {book.rating && (
                              <div className="rating-tag">
                                <Star size={13} fill="#C5A059" />
                                <span>{book.rating}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <p className="book-card-synopsis">
                        {book.synopsis}
                      </p>

                      <div className="book-card-actions">
                        <button
                          type="button"
                          className="btn-royal-outline"
                          onClick={() => setSelectedBook(book)}
                        >
                          <BookOpen size={14} />
                          <span>अंश पढ़ें</span>
                        </button>

                        {book.buyLinks?.amazon && (
                          <a
                            href={book.buyLinks.amazon}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-royal"
                          >
                            <ShoppingBag size={14} />
                            <span>Amazon पर ऑर्डर करें</span>
                          </a>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Upcoming Books Section (if any for selected author) */}
            {upcomingBooks.length > 0 && (
              <div className="books-section-block upcoming-block">
                <div className="upcoming-header">
                  <span className="royal-tag gold">✨ आगामी प्रकाशन</span>
                </div>

                <div className="books-detailed-grid">
                  {upcomingBooks.map((book, idx) => (
                    <motion.div
                      key={book.id}
                      className="detailed-book-card upcoming-card"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: idx * 0.08 }}
                    >
                      <div className="card-top-content">
                        <div className="card-cover-wrapper">
                          <div
                            className="mini-cover"
                            style={{ background: book.coverGradient || 'linear-gradient(145deg, #8B0000 0%, #C5A059 100%)' }}
                          >
                            <div className="cover-brand">
                              AKSHAR CANVAS
                            </div>
                            <div className="cover-ttl">{book.title}</div>
                            <div className="cover-ath">{book.authorHindi || book.author}</div>
                          </div>
                        </div>

                        <div className="card-meta-wrap">
                          <div className="book-badge-status">
                            <span className="royal-tag gold">अपेक्षित {book.expectedDate}</span>
                          </div>
                          <h3 className="book-heading">{book.title}</h3>
                          <div className="author-line">{book.authorHindi || book.author}</div>
                          <div className="publisher-line">{book.publisher}</div>
                        </div>
                      </div>

                      <p className="book-card-synopsis">
                        {book.synopsis}
                      </p>

                      <div className="book-card-actions">
                        <button
                          type="button"
                          className="btn-royal-outline"
                          onClick={() => setSelectedBook(book)}
                        >
                          <BookOpen size={14} />
                          <span>अंश देखें</span>
                        </button>

                        <a
                          href="#/contact?subject=preorder"
                          className="btn-royal-gold"
                        >
                          <span>पूर्व-ऑर्डर पूछताछ</span>
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Excerpt Modal */}
      {selectedBook && (
        <BookPreviewModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      )}
    </div>
  );
};

export default Books;
