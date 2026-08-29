import React, { useState } from 'react';
import { X, Heart, Copy, Check, Moon, Sun, Volume2, Languages } from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useContent } from '../../context/ContentContext';
import './PoemReaderModal.scss';

const PoemReaderModal = ({ poem, onClose }) => {
  const { toggleLike, likedItems } = useContent();
  const [fontSize, setFontSize] = useState(19);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showOriginalHindi, setShowOriginalHindi] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isReciting, setIsReciting] = useState(false);

  if (!poem) return null;

  const isLiked = !!likedItems[`poem_${poem.id}`];

  const handleCopy = () => {
    const activeStanzas = showOriginalHindi && poem.originalHindiStanzas
      ? poem.originalHindiStanzas
      : poem.stanzas;

    const textToCopy = `"${poem.title}"\nAuthor: ${poem.poet}\nPublished in: ${poem.book || 'Akshar Canvas'}\n\n${activeStanzas.join('\n\n')}\n\n— Akshar Canvas (www.aksharcanvas.com)`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.6 },
      colors: ['#8B0000', '#C5A059', '#C41E3A']
    });
    setTimeout(() => setCopied(false), 3000);
  };

  const handleRecitation = () => {
    if ('speechSynthesis' in window) {
      if (isReciting) {
        window.speechSynthesis.cancel();
        setIsReciting(false);
      } else {
        const textToRecite = showOriginalHindi && poem.originalHindiStanzas
          ? poem.originalHindiStanzas.join('. ')
          : poem.stanzas.join('. ');

        const utterance = new SpeechSynthesisUtterance(textToRecite);
        utterance.lang = showOriginalHindi ? 'hi-IN' : 'en-US';
        utterance.rate = 0.88;
        utterance.pitch = 1.0;
        utterance.onend = () => setIsReciting(false);
        utterance.onerror = () => setIsReciting(false);
        window.speechSynthesis.speak(utterance);
        setIsReciting(true);
      }
    } else {
      alert('Speech synthesis is not supported in this browser.');
    }
  };

  const currentStanzas = showOriginalHindi && poem.originalHindiStanzas
    ? poem.originalHindiStanzas
    : poem.stanzas;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div
        className={`poem-modal-container ${isDarkMode ? 'dark-mode' : ''}`}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.25 }}
      >
        {/* Header */}
        <div className="poem-modal-header">
          <div className="header-info">
            <div className="poem-category-badge">
              <span className="royal-tag">{poem.category}</span>
            </div>
            <h2 className="modal-poem-title">{poem.title}</h2>
            {poem.titleHindi && (
              <div style={{ fontSize: '0.9rem', color: '#7D6B6E', fontStyle: 'italic', marginBottom: '0.2rem' }}>
                Original: {poem.titleHindi}
              </div>
            )}
            <div className="poet-source-line">
              Author: {poem.poet} {poem.book && `• Collection: ${poem.book}`}
            </div>
          </div>

          <div className="header-actions">
            {poem.originalHindiStanzas && (
              <button
                className={`icon-action-btn ${showOriginalHindi ? 'active' : ''}`}
                onClick={() => setShowOriginalHindi(!showOriginalHindi)}
                title={showOriginalHindi ? 'Switch to English' : 'Switch to Original Devanagari Hindi'}
              >
                <Languages size={17} />
              </button>
            )}
            <button
              className="icon-action-btn"
              onClick={() => setIsDarkMode(!isDarkMode)}
              title={isDarkMode ? 'Light Reader Mode' : 'Night Reader Mode'}
            >
              {isDarkMode ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <button className="icon-action-btn" onClick={onClose} title="Close Reader">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="poem-controls-toolbar">
          <div className="font-size-adjuster">
            <span>Font Size:</span>
            <button onClick={() => setFontSize(Math.max(15, fontSize - 2))} title="Smaller">A-</button>
            <span style={{ fontWeight: 700 }}>{fontSize}px</span>
            <button onClick={() => setFontSize(Math.min(26, fontSize + 2))} title="Larger">A+</button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            {poem.originalHindiStanzas && (
              <span style={{ fontSize: '0.8rem', color: '#7D6B6E' }}>
                Mode: <strong>{showOriginalHindi ? 'Devanagari' : 'English Verse'}</strong>
              </span>
            )}
            <button className="audio-recite-btn" onClick={handleRecitation}>
              <Volume2 size={15} />
              <span>{isReciting ? 'Stop Recitation' : 'Voice Recitation'}</span>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="poem-body-scrollable">
          <div
            className="stanzas-area"
            style={{
              fontSize: `${fontSize}px`,
              fontFamily: showOriginalHindi ? "'Tiro Devanagari Hindi', serif" : "'Playfair Display', Georgia, serif"
            }}
          >
            {currentStanzas.map((stanza, idx) => (
              <p key={idx} className="stanza-paragraph">
                {stanza}
              </p>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="poem-modal-footer">
          <button
            className={`like-count-btn ${isLiked ? 'liked' : ''}`}
            onClick={() => toggleLike('poem', poem.id)}
          >
            <Heart size={16} fill={isLiked ? '#C41E3A' : 'none'} />
            <span>{poem.likes || 0} Appreciations</span>
          </button>

          <div className="footer-actions-right">
            <button className="btn-royal-outline" onClick={handleCopy} style={{ padding: '0.5rem 1.1rem', fontSize: '0.85rem' }}>
              {copied ? <Check size={16} /> : <Copy size={16} />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Verse'}</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PoemReaderModal;
