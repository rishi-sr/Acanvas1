import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { useContent } from '../../../context/ContentContext';
import { useLanguage } from '../../../context/LanguageContext';
import BookPreviewModal from '../../../components/BookPreviewModal/BookPreviewModal';

const BooksShowcase = () => {
  const { books } = useContent();
  const { t } = useLanguage();
  const [selectedBook, setSelectedBook] = useState(null);

  return (
    <section className="books-showcase-section section-padding">
      <div className="container">
        <div className="section-title-wrap">
          <span className="subtitle">{t('books.subtitle')}</span>
          <h2 className="main-title">
            {t('books.title1')} <span className="highlight">{t('books.title2')}</span>
          </h2>
          <p className="desc">
            {t('books.desc')}
          </p>
          <div className="ornament-divider">
            <span className="line" />
            <span className="diamond" />
            <span className="line" />
          </div>
        </div>

        <div className="books-grid">
          {books.map((book, idx) => {
            const isUpcoming = book.status === 'upcoming';

            return (
              <motion.div
                key={book.id}
                className="book-card-item"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
              >
                <div>
                  <div
                    className="book-spine-effect"
                    style={{ background: book.coverGradient || 'linear-gradient(145deg, #8B0000 0%, #3B050B 100%)' }}
                  >
                    <div style={{ fontSize: '0.65rem', letterSpacing: '0.12em', opacity: 0.8 }}>
                      AKSHAR CANVAS
                    </div>
                    <div className="inner-title">{book.title}</div>
                    <div className="inner-author">{book.author}</div>
                  </div>

                  <span className={`royal-tag ${isUpcoming ? 'gold' : ''}`} style={{ marginBottom: '0.8rem' }}>
                    {isUpcoming ? t('books.upcoming') : `${t('books.published')} ${book.year}`}
                  </span>

                  <h3 className="book-title-name">{book.title}</h3>
                  <div className="book-author-name">{book.author}</div>
                </div>

                <button
                  className="btn-royal-outline btn-view-book"
                  onClick={() => setSelectedBook(book)}
                >
                  <BookOpen size={14} />
                  <span>{t('books.viewDetails')}</span>
                </button>
              </motion.div>
            );
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
          <Link to="/books" className="btn-royal">
            <BookOpen size={16} />
            <span>{t('books.viewAll')}</span>
          </Link>
        </div>
      </div>

      {selectedBook && (
        <BookPreviewModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      )}
    </section>
  );
};

export default BooksShowcase;
