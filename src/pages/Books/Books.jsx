import React, { useState } from 'react';
import { BookOpen, ShoppingBag, Star, Sparkles, ExternalLink, Feather } from 'lucide-react';
import { motion } from 'framer-motion';
import { useContent } from '../../context/ContentContext';
import { useLanguage } from '../../context/LanguageContext';
import BookPreviewModal from '../../components/BookPreviewModal/BookPreviewModal';
import './Books.scss';

const Books = () => {
  const { books } = useContent();
  const { t } = useLanguage();
  const [selectedBook, setSelectedBook] = useState(null);

  const publishedBooks = books.filter(b => b.status === 'published');
  const upcomingBooks = books.filter(b => b.status === 'upcoming');

  return (
    <div className="books-page">
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
        {/* Published Books */}
        <div className="books-section-block">
          <div className="block-header">
            <h2 className="block-title">
              <BookOpen size={24} color="#8B0000" />
              <span>{t('booksPage.published')}</span>
            </h2>
            <span className="royal-tag">{publishedBooks.length} {t('booksPage.titlesAvail')}</span>
          </div>

          <div className="books-detailed-grid">
            {publishedBooks.map((book, idx) => (
              <motion.div
                key={book.id}
                className="detailed-book-card"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
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
        </div>

        {/* Upcoming Books */}
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
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
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

        {/* Pre-Order VIP Banner */}
        <div className="preorder-vip-banner">
          <h2 className="vip-title">{t('booksPage.vip.title')}</h2>
          <p className="vip-desc">
            {t('booksPage.vip.desc')}
          </p>
          <a href="#/contact?subject=signed_copy" className="btn-royal">
            <Feather size={16} />
            <span>{t('booksPage.vip.btn')}</span>
          </a>
        </div>
      </section>

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
