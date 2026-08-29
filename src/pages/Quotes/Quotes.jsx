import React, { useState, useMemo } from 'react';
import { Quote, Heart, Share2, Sparkles, Copy, Check, Send, BookOpen, Star, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useContent } from '../../context/ContentContext';
import { useLanguage } from '../../context/LanguageContext';
import QuoteShareModal from '../../components/QuoteShareModal/QuoteShareModal';
import './Quotes.scss';

const Quotes = () => {
  const { quotes, toggleLike, likedItems, addQuote } = useContent();
  const { t, lang } = useLanguage();
  const isHindi = lang === 'hi';

  const [filterType, setFilterType] = useState('all');
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [submitData, setSubmitData] = useState({ authorName: '', city: '', verse: '', sourceBook: '' });
  const [submitDone, setSubmitDone] = useState(false);

  const filteredQuotes = useMemo(() => {
    return quotes.filter(item => {
      if (filterType === 'all') return true;
      if (filterType === 'external') return item.sourceType !== 'reader_submission';
      if (filterType === 'reader') return item.sourceType === 'reader_submission';
      const c = (item.curatedBy || '').toLowerCase();
      if (filterType === 'kanchan') return c.includes('kanchan');
      if (filterType === 'garima') return c.includes('garima');
      return true;
    });
  }, [quotes, filterType]);

  const handleCopyQuote = (item) => {
    const verse = isHindi && item.originalVerse ? item.originalVerse : item.quote;
    const textToCopy = `"${verse}"\n\n— ${isHindi && item.authorHindi ? item.authorHindi : item.author}\nSource: ${item.sourceBook}\n\nअक्षर Canvas समीक्षा | Akshar Canvas | www.aksharcanvas.com`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(item.id);
    confetti({ particleCount: 25, spread: 45, origin: { y: 0.6 }, colors: ['#8B0000', '#C5A059', '#C41E3A'] });
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!submitData.verse.trim() || !submitData.authorName.trim()) return;

    addQuote({
      quote: submitData.verse,
      originalVerse: submitData.verse,
      author: `${submitData.authorName}${submitData.city ? `, ${submitData.city}` : ''}`,
      authorHindi: `एक पाठक — ${submitData.authorName}${submitData.city ? `, ${submitData.city}` : ''}`,
      sourceBook: submitData.sourceBook || 'पाठक-काव्य संग्रह',
      sourceType: 'reader_submission',
      curatedBy: 'Akshar Canvas',
      aksharCanvasReview: 'यह रचना अक्षर कैनवास के पाठक-काव्य संग्रह में शामिल है। हम इस भावपूर्ण अभिव्यक्ति के लिए रचयिता को धन्यवाद देते हैं।',
      poetReflection: 'This composition has been added to the Akshar Canvas Reader Poetry Collection. We thank the author for this heartfelt expression.',
      tags: ['Reader Submission', 'Hindi'],
      submittedBy: submitData.authorName,
      submittedByCity: submitData.city
    });

    setSubmitDone(true);
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.5 }, colors: ['#8B0000', '#C5A059', '#FFFFFF'] });
    setTimeout(() => { setSubmitDone(false); setShowSubmitForm(false); setSubmitData({ authorName: '', city: '', verse: '', sourceBook: '' }); }, 4000);
  };

  return (
    <div className="quotes-page">
      <section className="quotes-hero">
        <div className="container">
          <div className="section-title-wrap">
            <span className="subtitle">{t('quotesPage.subtitle')}</span>
            <h1 className="main-title">
              {t('quotesPage.title1')} <span className="highlight">{t('quotesPage.title2')}</span>
            </h1>
            <p className="desc">{t('quotesPage.desc')}</p>
            <div className="ornament-divider">
              <span className="line" /><span className="diamond" /><span className="line" />
            </div>

            {/* Akshar Canvas Reading Nook banner */}
            <div className="akshar-review-banner">
              <div className="review-banner-icon">
                <BookOpen size={20} />
              </div>
              <div>
                <div className="review-banner-title">
                  {isHindi ? 'अक्षर Canvas — काव्य समीक्षा मंच' : 'Akshar Canvas — Poetry Review Platform'}
                </div>
                <p className="review-banner-desc">
                  {isHindi
                    ? 'जब भी कोई कविता हृदय को स्पर्श करती है — चाहे किसी महान रचयिता की हो या किसी पाठक की — अक्षर कैनवास उसे अपनी समीक्षा के साथ यहाँ सहेजता है।'
                    : 'Whenever a verse touches the heart — whether from a legendary author or a reader — Akshar Canvas preserves it here with its own review and reflection.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        {/* Filter + Submit Row */}
        <div className="quotes-toolbar">
          <div className="quotes-filter-nav">
            {[
              { key: 'all', labelHi: `सभी (${quotes.length})`, labelEn: `All (${quotes.length})` },
              { key: 'external', labelHi: 'प्रसिद्ध रचयिता', labelEn: 'Famous Authors' },
              { key: 'reader', labelHi: 'पाठक रचनाएँ', labelEn: 'Reader Poems' },
            ].map(f => (
              <button
                key={f.key}
                className={`filter-chip-btn ${filterType === f.key ? 'active' : ''}`}
                onClick={() => setFilterType(f.key)}
              >
                {isHindi ? f.labelHi : f.labelEn}
              </button>
            ))}
          </div>

          <button className="submit-poem-trigger" onClick={() => setShowSubmitForm(!showSubmitForm)}>
            <Send size={15} />
            <span>{isHindi ? 'कविता / पंक्ति भेजें' : 'Submit a Poem / Verse'}</span>
          </button>
        </div>

        {/* ── Submit Form ── */}
        <AnimatePresence>
          {showSubmitForm && (
            <motion.div
              className="reader-submit-form-wrap"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              {submitDone ? (
                <div className="submit-success">
                  <Sparkles size={32} color="#C5A059" />
                  <p>{isHindi ? '✨ आपकी रचना प्राप्त हो गई! अक्षर Canvas समीक्षा के साथ इसे जल्द प्रकाशित किया जाएगा।' : '✨ Your poem has been received! It will be published here with an Akshar Canvas review.'}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="reader-submit-form">
                  <div className="submit-form-header">
                    <Users size={18} color="#8B0000" />
                    <h3>{isHindi ? 'अपनी रचना या पसंदीदा पंक्ति यहाँ भेजें' : 'Share Your Poem or a Beloved Verse Here'}</h3>
                  </div>
                  <p className="submit-form-desc">
                    {isHindi
                      ? 'आपकी रचना अक्षर Canvas की समीक्षा के साथ इस संग्रह में "अक्षर Canvas" के नाम से प्रकाशित होगी।'
                      : 'Your poem will be published in this collection under "Akshar Canvas" review — showcasing voices we love.'}
                  </p>
                  <div className="submit-form-grid">
                    <div className="form-group">
                      <label>{isHindi ? 'आपका नाम *' : 'Your Name *'}</label>
                      <input type="text" required placeholder={isHindi ? 'जैसे: प्रिया शर्मा' : 'e.g. Priya Sharma'}
                        value={submitData.authorName} onChange={e => setSubmitData({ ...submitData, authorName: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label>{isHindi ? 'शहर (वैकल्पिक)' : 'City (optional)'}</label>
                      <input type="text" placeholder={isHindi ? 'जैसे: लखनऊ' : 'e.g. Lucknow'}
                        value={submitData.city} onChange={e => setSubmitData({ ...submitData, city: e.target.value })} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>{isHindi ? 'कविता / उद्धरण *' : 'Poem / Quote *'}</label>
                    <textarea required rows={5}
                      placeholder={isHindi ? 'यहाँ अपनी कविता या किसी महान रचयिता की पसंदीदा पंक्ति लिखें...' : 'Write your poem or a beloved verse from any great author...'}
                      value={submitData.verse} onChange={e => setSubmitData({ ...submitData, verse: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label>{isHindi ? 'पुस्तक / स्रोत (वैकल्पिक)' : 'Book / Source (optional)'}</label>
                    <input type="text" placeholder={isHindi ? 'जैसे: दिवान-ए-ग़ालिब' : 'e.g. Diwan-e-Ghalib'}
                      value={submitData.sourceBook} onChange={e => setSubmitData({ ...submitData, sourceBook: e.target.value })} />
                  </div>
                  <button type="submit" className="btn-royal">
                    <Send size={15} />
                    <span>{isHindi ? 'अक्षर Canvas को भेजें' : 'Send to Akshar Canvas'}</span>
                  </button>
                </form>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Quotes Masonry ── */}
        <div className="quotes-masonry-grid">
          {filteredQuotes.map((item, idx) => {
            const isLiked = !!likedItems[`quote_${item.id}`];
            const isCopied = copiedId === item.id;
            const isReaderSubmission = item.sourceType === 'reader_submission';
            const displayVerse = isHindi && item.originalVerse ? item.originalVerse : item.quote;
            const displayAuthor = isHindi && item.authorHindi ? item.authorHindi : item.author;
            const aksharReview = isHindi && item.aksharCanvasReview ? item.aksharCanvasReview : item.poetReflection;

            return (
              <motion.div
                key={item.id}
                className={`quote-item-card ${isReaderSubmission ? 'reader-card' : ''}`}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: idx * 0.07 }}
              >
                {/* Reader badge */}
                {isReaderSubmission && (
                  <div className="reader-submission-badge">
                    <Users size={11} />
                    {isHindi ? 'पाठक रचना' : 'Reader Poem'}
                  </div>
                )}

                <div className="card-quote-top">
                  <div className="quote-symbol">"</div>
                  <div className={`quote-main-content ${isHindi && item.originalVerse ? 'devanagari-verse' : ''}`}>
                    {displayVerse}
                  </div>

                  <div className="quote-author-badge">
                    — {displayAuthor}
                  </div>
                  <div className="quote-book-source">
                    {t('quotesPage.source')} {item.sourceBook}
                  </div>

                  {/* Akshar Canvas Review Box */}
                  {aksharReview && (
                    <div className="akshar-canvas-review">
                      <div className="review-header">
                        <div className="akshar-logo-mini">अक्षर</div>
                        <div className="review-meta">
                          <span className="review-brand">अक्षर Canvas</span>
                          <span className="review-role">{isHindi ? 'समीक्षा' : 'Review'}</span>
                        </div>
                      </div>
                      <p className="review-text">"{aksharReview}"</p>
                    </div>
                  )}
                </div>

                <div className="card-quote-bottom">
                  <button
                    className={`like-btn ${isLiked ? 'active' : ''}`}
                    onClick={() => toggleLike('quote', item.id)}
                  >
                    <Heart size={16} fill={isLiked ? '#C41E3A' : 'none'} />
                    <span>{item.likes || 0} {t('quotesPage.likes')}</span>
                  </button>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      className="btn-royal-outline"
                      onClick={() => handleCopyQuote(item)}
                      style={{ padding: '0.45rem 0.9rem', fontSize: '0.82rem' }}
                    >
                      {isCopied ? <Check size={14} /> : <Copy size={14} />}
                      <span>{isCopied ? t('quotesPage.copied') : t('quotesPage.copy')}</span>
                    </button>

                    <button
                      className="btn-royal"
                      onClick={() => setSelectedQuote(item)}
                      style={{ padding: '0.45rem 1rem', fontSize: '0.82rem' }}
                    >
                      <Share2 size={14} />
                      <span>{t('quotesPage.artCard')}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {selectedQuote && (
        <QuoteShareModal quote={selectedQuote} onClose={() => setSelectedQuote(null)} />
      )}
    </div>
  );
};

export default Quotes;
