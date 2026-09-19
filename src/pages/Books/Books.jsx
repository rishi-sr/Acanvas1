import React, { useState } from 'react';
import { BookOpen, ShoppingBag, Star, Sparkles, Feather } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContent } from '../../context/ContentContext';
import { useLanguage } from '../../context/LanguageContext';
import BookPreviewModal from '../../components/BookPreviewModal/BookPreviewModal';
import './Books.scss';

const Books = () => {
  const { books } = useContent();
  const { t } = useLanguage();
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
      {/* Hero Section */}
      <section className="books-hero">
        <div className="container">
          <div className="section-title-wrap">
            <span className="subtitle">{t('booksPage.subtitle')}</span>
            <h1 className="main-title">
              {t('booksPage.title1')} <span className="highlight">{t('booksPage.title2')}</span>
            </h1>
            <p className="desc">
              {t('booksPage.desc')}
            </p>
            <div className="ornament-divider">
              <span className="line" />
              <span className="diamond" />
              <span className="line" />
            </div>
          </div>
        </div>
      </section>

      <section className="container">
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
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
          >
            <div className="books-section-block">
              <div className="block-header">
                <h2 className="block-title">
                  <BookOpen size={24} color="#8B0000" />
                  <span>
                    {selectedAuthor === 'garima'
                      ? 'गरिमा सिंह की प्रकाशित पुस्तकें'
                      : selectedAuthor === 'kanchan'
                      ? 'डॉ. कंचन लता जायसवाल की प्रकाशित पुस्तकें'
                      : t('booksPage.published')}
                  </span>
                </h2>
                <span className="royal-tag">{publishedBooks.length} {t('booksPage.titlesAvail')}</span>
              </div>

              {publishedBooks.length === 0 ? (
                <div className="no-books-found">
                  <p>इस अनुभाग में वर्तमान में कोई प्रकाशित पुस्तक उपलब्ध नहीं है।</p>
                </div>
              ) : (
                <div className="books-detailed-grid">
                  {publishedBooks.map((book, idx) => (
                    <motion.div
                      key={book.id}
                      className="detailed-book-card"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                    >
                      <div>
                        <div className="card-top-flex">
                          <div className="card-cover-wrapper">
                            <div
                              className="mini-cover"
                              style={{ background: book.coverGradient || 'linear-gradient(145deg, #8B0000 0%, #3B050B 100%)' }}
                            >
                              <div style={{ fontSize: '0.55rem', letterSpacing: '0.1em', opacity: 0.8 }}>
                                AKSHAR CANVAS
                              </div>
                              <div className="cover-ttl">{book.title}</div>
                              <div className="cover-ath">{book.author}</div>
                            </div>
                          </div>

                          <div className="card-meta-wrap">
                            <div className="book-badge-status">
                              <span className="royal-tag">{t('booksPage.publishedYear')} {book.year}</span>
                            </div>
                            <h3 className="book-heading">{book.title}</h3>
                            <div className="author-line">{t('booksPage.author')} {book.author}</div>
                            <div className="publisher-line">{t('booksPage.publisher')} {book.publisher}</div>

                            <div className="price-rating-tag">
                              <span className="price">{book.price}</span>
                              {book.rating && (
                                <div style={{ fontSize: '0.85rem', color: '#9A7B38', fontWeight: 600 }}>
                                  <Star size={13} fill="#C5A059" style={{ display: 'inline', verticalAlign: 'middle', marginRight: 2 }} />
                                  {book.rating} ({book.reviewsCount} reviews)
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <p className="book-card-synopsis">
                          {book.synopsis}
                        </p>
                      </div>

                      <div className="book-card-actions">
                        <button
                          type="button"
                          className="btn-royal-outline"
                          onClick={() => setSelectedBook(book)}
                          style={{ padding: '0.55rem 1.1rem', fontSize: '0.85rem' }}
                        >
                          <BookOpen size={14} />
                          <span>{t('booksPage.readExcerpt')}</span>
                        </button>

                        {book.buyLinks?.amazon && (
                          <a
                            href={book.buyLinks.amazon}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-royal"
                            style={{ padding: '0.55rem 1.1rem', fontSize: '0.85rem' }}
                          >
                            <ShoppingBag size={14} />
                            <span>{t('booksPage.orderAmazon')}</span>
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
              <div className="books-section-block">
                <div className="block-header">
                  <h2 className="block-title">
                    <Sparkles size={24} color="#C5A059" />
                    <span>{t('booksPage.upcoming')}</span>
                  </h2>
                  <span className="royal-tag gold">{t('booksPage.advanceAnn')}</span>
                </div>

                <div className="books-detailed-grid">
                  {upcomingBooks.map((book, idx) => (
                    <motion.div
                      key={book.id}
                      className="detailed-book-card"
                      style={{ borderColor: 'rgba(197, 160, 89, 0.4)' }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                    >
                      <div>
                        <div className="card-top-flex">
                          <div className="card-cover-wrapper">
                            <div
                              className="mini-cover"
                              style={{ background: book.coverGradient || 'linear-gradient(145deg, #8B0000 0%, #C5A059 100%)' }}
                            >
                              <div style={{ fontSize: '0.55rem', letterSpacing: '0.1em', opacity: 0.8 }}>
                                AKSHAR CANVAS
                              </div>
                              <div className="cover-ttl">{book.title}</div>
                              <div className="cover-ath">{book.author}</div>
                            </div>
                          </div>

                          <div className="card-meta-wrap">
                            <div className="book-badge-status">
                              <span className="royal-tag gold">{t('booksPage.expected')} {book.expectedDate}</span>
                            </div>
                            <h3 className="book-heading">{book.title}</h3>
                            <div className="author-line">{t('booksPage.authors')} {book.author}</div>
                            <div className="publisher-line">{t('booksPage.publisher')} {book.publisher}</div>
                          </div>
                        </div>

                        <p className="book-card-synopsis">
                          {book.synopsis}
                        </p>
                      </div>

                      <div className="book-card-actions">
                        <button
                          type="button"
                          className="btn-royal-outline"
                          onClick={() => setSelectedBook(book)}
                          style={{ padding: '0.55rem 1.1rem', fontSize: '0.85rem' }}
                        >
                          <BookOpen size={14} />
                          <span>{t('booksPage.previewExcerpt')}</span>
                        </button>

                        <a
                          href="#/contact?subject=preorder"
                          className="btn-royal-gold"
                          style={{ padding: '0.55rem 1.1rem', fontSize: '0.85rem' }}
                        >
                          <span>{t('booksPage.preorder')}</span>
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
