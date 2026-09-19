import React, { useState, useMemo } from 'react';
import { Search, Feather, BookOpen, Heart, ArrowRight, Sparkles, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContent } from '../../context/ContentContext';
import PoemReaderModal from '../../components/PoemReaderModal/PoemReaderModal';
import './Poems.scss';

const RACHNAYE_TABS = [
  { id: 'anamika', label: 'अनामिका', icon: '✦' },
  { id: 'bioscope', label: 'बाइस्कोप', icon: '✦' },
  { id: 'kalam_ka_karwan', label: 'कलम का कारवां', icon: '✦' },
  { id: 'kshitiz_ki_aor', label: 'क्षितिज की ओर', icon: '✦' },
  { id: 'udharan', label: 'उद्धरण', icon: '✦' }
];

const Poems = () => {
  const { poems = [], quotes = [], toggleLike, likedItems = {} } = useContent();
  const [activeTab, setActiveTab] = useState('anamika');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalPoem, setActiveModalPoem] = useState(null);

  // Filter items based on active tab
  const tabItems = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    if (activeTab === 'udharan') {
      return (quotes || []).filter(item => {
        if (!q) return true;
        return (
          item.quote?.toLowerCase().includes(q) ||
          item.author?.toLowerCase().includes(q) ||
          item.authorHindi?.includes(q) ||
          item.sourceBook?.toLowerCase().includes(q)
        );
      });
    }

    // For other tabs (Anamika, Bioscope, Kalam Ka Karwan, Kshitiz Ki Aor)
    return (poems || []).filter(item => {
      const cat = (item.category || '').toLowerCase();
      const tabKey = activeTab.toLowerCase();

      // Check if poem matches this specific tab category
      const matchesTab =
        cat.includes(tabKey) ||
        (activeTab === 'anamika' && (cat.includes('anamika') || cat.includes('अनामिका'))) ||
        (activeTab === 'bioscope' && (cat.includes('bioscope') || cat.includes('bicescope') || cat.includes('बायोस्कोप') || cat.includes('बाइस्कोप'))) ||
        (activeTab === 'kalam_ka_karwan' && (cat.includes('kalam') || cat.includes('karwan') || cat.includes('कलम') || cat.includes('कारवां'))) ||
        (activeTab === 'kshitiz_ki_aor' && (cat.includes('kshitiz') || cat.includes('क्षितिज')));

      if (!matchesTab) return false;

      if (!q) return true;
      return (
        item.title?.toLowerCase().includes(q) ||
        item.titleHindi?.includes(q) ||
        item.poet?.toLowerCase().includes(q) ||
        (item.stanzas && item.stanzas.some(s => s.toLowerCase().includes(q))) ||
        (item.book && item.book.toLowerCase().includes(q))
      );
    });
  }, [poems, quotes, activeTab, searchQuery]);

  return (
    <div className="poems-page">
      {/* Hero Header */}
      <section className="poems-hero">
        <div className="container">
          <div className="section-title-wrap">
            <h1 className="main-title">
              रचनाएँ
            </h1>
            <p className="desc">
              अस्तित्वगत सत्य, कोमल प्रेम और सांस्कृतिक अनुगूँज को समेटे चुनिंदा रचनाएँ।
            </p>
            <div className="ornament-divider">
              <span className="line" />
              <span className="diamond" />
              <span className="line" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Tabs and Content Section */}
      <section className="container rachnaye-container">
        {/* Category Tabs Bar */}
        <div className="rachnaye-tabs-nav">
          {RACHNAYE_TABS.map(tab => (
            <button
              key={tab.id}
              type="button"
              className={`rachnaye-tab-pill ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(tab.id);
                setSearchQuery('');
              }}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-text">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="rachnaye-search-wrap">
          <div className="search-input-box">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              placeholder="रचना, शीर्षक या पंक्ति खोजें..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => setSearchQuery('')}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Tab Content Display */}
        <AnimatePresence mode="wait">
          {tabItems.length === 0 ? (
            <motion.div
              key={`empty-${activeTab}`}
              className="rachnaye-empty-state"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              <div className="empty-icon-wrap">
                <Feather size={38} className="empty-icon" />
              </div>
              <h3 className="empty-title">जल्द ही रचनाएँ यहाँ प्रकाशित की जाएँगी</h3>
              <p className="empty-subtitle">
                इस अनुभाग में नवीन रचनाओं का संकलन शीघ्र उपलब्ध होगा।
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={`grid-${activeTab}`}
              className="rachnaye-content-grid"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              {activeTab === 'udharan' ? (
                // Quotes Layout
                tabItems.map((quoteItem, idx) => {
                  const isLiked = !!likedItems[`quote_${quoteItem.id}`];
                  return (
                    <div key={quoteItem.id || idx} className="quote-rachna-card">
                      <div className="quote-mark-icon">
                        <Quote size={28} />
                      </div>
                      <p className="quote-body-text">
                        "{quoteItem.quote}"
                      </p>
                      <div className="quote-author-info">
                        <span className="quote-author-name">
                          — {quoteItem.authorHindi || quoteItem.author}
                        </span>
                        {quoteItem.sourceBook && (
                          <span className="quote-source">({quoteItem.sourceBook})</span>
                        )}
                      </div>
                      <div className="quote-card-footer">
                        <button
                          type="button"
                          className={`like-pill-btn ${isLiked ? 'active' : ''}`}
                          onClick={() => toggleLike('quote', quoteItem.id)}
                        >
                          <Heart size={14} fill={isLiked ? '#C41E3A' : 'none'} />
                          <span>{quoteItem.likes || 0}</span>
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                // Poems Layout
                tabItems.map((poem, index) => {
                  const isLiked = !!likedItems[`poem_${poem.id}`];

                  return (
                    <div key={poem.id || index} className="poem-rachna-card">
                      <div className="poem-card-top">
                        <div className="poem-category-badge">
                          <span>{poem.category}</span>
                        </div>
                        <h3 className="poem-card-title">{poem.title}</h3>
                        <div className="poem-card-author">
                          द्वारा: {poem.poet}
                        </div>
                        {poem.book && (
                          <div className="poem-book-tag">
                            <BookOpen size={13} />
                            <span>{poem.book}</span>
                          </div>
                        )}
                        <div className="poem-snippet-text">
                          "{poem.excerpt || (poem.stanzas && poem.stanzas[0])}"
                        </div>
                      </div>

                      <div className="poem-card-bottom">
                        <button
                          type="button"
                          className="read-modal-btn"
                          onClick={() => setActiveModalPoem(poem)}
                        >
                          <span>पूरा पढ़ें</span>
                          <ArrowRight size={14} />
                        </button>

                        <button
                          type="button"
                          className={`like-pill-btn ${isLiked ? 'active' : ''}`}
                          onClick={() => toggleLike('poem', poem.id)}
                        >
                          <Heart size={14} fill={isLiked ? '#C41E3A' : 'none'} />
                          <span>{poem.likes || 0}</span>
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Reader Modal */}
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
