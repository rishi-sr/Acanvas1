import React, { useState } from 'react';
import { X, Copy, Check, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useContent } from '../../context/ContentContext';
import './QuoteShareModal.scss';

const QuoteShareModal = ({ quote, onClose }) => {
  const { toggleLike, likedItems } = useContent();
  const [copied, setCopied] = useState(false);

  if (!quote) return null;

  const isLiked = !!likedItems[`quote_${quote.id}`];

  const handleCopy = () => {
    const textToCopy = `"${quote.quote}"\n\n— ${quote.author} (${quote.sourceBook || 'Literature'})\nCurated by: ${quote.curatedBy}\n\nAkshar Canvas | www.aksharcanvas.com`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#8B0000', '#C5A059', '#C41E3A']
    });
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div
        className="quote-modal-container"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
      >
        <div style={{ padding: '0.8rem 1.5rem', display: 'flex', justifyContent: 'flex-end', background: '#FFF8F8' }}>
          <button
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#1A1617' }}
          >
            <X size={20} />
          </button>
        </div>

        <div className="quote-card-preview">
          <div className="quote-mark-icon">“</div>
          <div className="modal-quote-text">{quote.quote}</div>
          {quote.originalVerse && (
            <div style={{ color: '#7D6B6E', fontSize: '1rem', marginBottom: '1.2rem', fontStyle: 'italic' }}>
              "{quote.originalVerse}"
            </div>
          )}
          <div className="modal-quote-author">{quote.author}</div>
          <div className="modal-quote-source">Source: {quote.sourceBook}</div>

          {quote.poetReflection && (
            <div className="reflection-callout">
              <span className="curator-tag">💡 In the Words of {quote.curatedBy}:</span>
              <p>"{quote.poetReflection}"</p>
            </div>
          )}
        </div>

        <div className="quote-modal-actions">
          <button
            className={`btn-royal-outline ${isLiked ? 'liked' : ''}`}
            onClick={() => toggleLike('quote', quote.id)}
            style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
          >
            <Heart size={16} fill={isLiked ? '#C41E3A' : 'none'} />
            <span>{quote.likes || 0} Likes</span>
          </button>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="btn-royal" onClick={handleCopy} style={{ padding: '0.5rem 1.2rem', fontSize: '0.85rem' }}>
              {copied ? <Check size={16} /> : <Copy size={16} />}
              <span>{copied ? 'Copied Quote!' : 'Copy Quote Card'}</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default QuoteShareModal;
