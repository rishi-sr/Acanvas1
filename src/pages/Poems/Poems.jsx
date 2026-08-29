import React, { useState, useMemo } from 'react';
import { Search, Feather, BookOpen, Heart, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useContent } from '../../context/ContentContext';
import { useLanguage } from '../../context/LanguageContext';
import PoemReaderModal from '../../components/PoemReaderModal/PoemReaderModal';
import './Poems.scss';

const Poems = () => {
  const { poems, toggleLike, likedItems } = useContent();
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPoet, setSelectedPoet] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeModalPoem, setActiveModalPoem] = useState(null);

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set(poems.map(p => p.category));
    return ['all', ...Array.from(set)];
  }, [poems]);

  // Filter poems
  const filteredPoems = useMemo(() => {
    return poems.filter(poem => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q ||
        poem.title.toLowerCase().includes(q) ||
        (poem.titleHindi && poem.titleHindi.includes(q)) ||
        poem.poet.toLowerCase().includes(q) ||
        poem.stanzas.some(s => s.toLowerCase().includes(q)) ||
        (poem.book && poem.book.toLowerCase().includes(q));

      const poetStr = (poem.poet || '').toLowerCase();
      const isKanchan = poetStr.includes('kanchan') || poetStr.includes('कंचन');
      const isGarima = poetStr.includes('garima') || poetStr.includes('गरिमा');
      const isJoint = poetStr.includes('&') || poetStr.includes('joint') || poetStr.includes('collab') || (isKanchan && isGarima);

      const matchesPoet = selectedPoet === 'all' ||
        (selectedPoet === 'kanchan' && isKanchan && !isJoint) ||
        (selectedPoet === 'garima' && isGarima && !isJoint) ||
        (selectedPoet === 'joint' && isJoint);

      const matchesCategory = selectedCategory === 'all' || poem.category === selectedCategory;

      return matchesSearch && matchesPoet && matchesCategory;
    });
  }, [poems, searchQuery, selectedPoet, selectedCategory]);

  return (
    <div className="poems-page">
      <section className="poems-header">
        <div className="container">
          <div className="section-title-wrap">
            <span className="subtitle">{t('poems.subtitle')}</span>
            <h1 className="main-title">
              {t('poems.title1')} <span className="highlight">{t('poems.title2')}</span>
            </h1>
            <p className="desc">
              {t('poems.desc')}
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
        {/* Filter Toolbar */}
        <div className="poems-filter-bar">
          <div className="search-input-wrap">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder={t('poems.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="filters-row">
            <div className="poet-tabs">
              <button
                className={`tab-btn ${selectedPoet === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedPoet('all')}
              >
                {t('poems.filter.all')} ({poems.length})
              </button>
              <button
                className={`tab-btn ${selectedPoet === 'kanchan' ? 'active' : ''}`}
                onClick={() => setSelectedPoet('kanchan')}
              >
                {t('poems.filter.kanchan')}
              </button>
              <button
                className={`tab-btn ${selectedPoet === 'garima' ? 'active' : ''}`}
                onClick={() => setSelectedPoet('garima')}
              >
                {t('poems.filter.garima')}
              </button>
              <button
                className={`tab-btn ${selectedPoet === 'joint' ? 'active' : ''}`}
                onClick={() => setSelectedPoet('joint')}
              >
                {t('poems.filter.joint')}
              </button>
            </div>

            <div className="category-select-wrap">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">{t('poems.filter.allCats')}</option>
                {categories.filter(c => c !== 'all').map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Poems Grid */}
        {filteredPoems.length === 0 ? (
          <div className="no-poems-found">
            <h3>{t('poems.notFound')}</h3>
            <p>{t('poems.notFoundDesc')}</p>
            <button
              className="btn-royal-outline reset-filter-btn"
              onClick={() => { setSearchQuery(''); setSelectedPoet('all'); setSelectedCategory('all'); }}
            >
              {t('poems.resetFilters')}
            </button>
          </div>
        ) : (
          <div className="poems-list-grid">
            {filteredPoems.map((poem, index) => {
              const isLiked = !!likedItems[`poem_${poem.id}`];

              return (
                <motion.div
                  key={poem.id}
                  className="poem-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <div className="poem-card-top">
                    <div className="poem-category">
                      <span className="royal-tag">{poem.category}</span>
                    </div>
                    <h3 className="poem-title">{poem.title}</h3>
                    <div className="poem-poet">
                      {t('poems.by')} {poem.poet}
                    </div>
                    {poem.book && (
                      <div className="poem-book-tag">
                        <BookOpen size={14} />
                        <span>{t('poems.publishedIn')} {poem.book}</span>
                      </div>
                    )}
                    <div className="poem-snippet">
                      "{poem.excerpt || poem.stanzas[0]}"
                    </div>
                  </div>

                  <div className="poem-card-bottom">
                    <button
                      className="read-btn"
                      onClick={() => setActiveModalPoem(poem)}
                    >
                      <span>{t('poems.readFull')}</span>
                      <ArrowRight size={14} />
                    </button>

                    <button
                      className={`like-btn ${isLiked ? 'active' : ''}`}
                      onClick={() => toggleLike('poem', poem.id)}
                    >
                      <Heart size={15} fill={isLiked ? '#C41E3A' : 'none'} />
                      <span>{poem.likes || 0}</span>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {activeModalPoem && (
        <PoemReaderModal
          poem={activeModalPoem}
          onClose={() => setActiveModalPoem(null)}
        />
      )}
    </div>
  );
};

export default Poems;
