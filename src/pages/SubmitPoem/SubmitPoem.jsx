import React, { useState } from 'react';
import { Feather, Send, Sparkles, CheckCircle2, BookOpen, Heart, User, MapPin, Mail, Tag, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useContent } from '../../context/ContentContext';
import { useLanguage } from '../../context/LanguageContext';
import './SubmitPoem.scss';

const categoriesList = [
  { id: 'love', hi: 'प्रेम एवं विरह (Love & Longing)', en: 'Love & Longing' },
  { id: 'philosophy', hi: 'जीवन दर्शन एवं सत्य (Life Philosophy)', en: 'Life Philosophy' },
  { id: 'ghazal', hi: 'समकालीन ग़ज़ल (Contemporary Ghazal)', en: 'Contemporary Ghazal' },
  { id: 'empowerment', hi: 'स्त्री चेतना एवं शक्ति (Empowerment & Spirit)', en: 'Empowerment & Spirit' },
  { id: 'nature', hi: 'प्रकृति एवं संस्कृति (Nature & Heritage)', en: 'Nature & Heritage' },
  { id: 'other', hi: 'अन्य रचनात्मक छंद (Other Creative)', en: 'Other Creative' },
];

const SubmitPoem = () => {
  const { submitReaderPoem } = useContent();
  const { t, lang } = useLanguage();
  const isHindi = lang === 'hi';

  const [formData, setFormData] = useState({
    poetName: '',
    city: '',
    email: '',
    title: '',
    category: 'जीवन दर्शन एवं सत्य (Life Philosophy)',
    poemText: '',
    reflection: '',
    website_url_hp: '' // Honeypot field for bot protection
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.poetName.trim() || !formData.title.trim() || !formData.poemText.trim()) return;

    setIsSubmitting(true);
    setErrorMessage('');

    const res = await submitReaderPoem(formData);
    setIsSubmitting(false);

    if (res.success) {
      setIsSubmitted(true);
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.55 },
        colors: ['#8B0000', '#C5A059', '#C41E3A', '#FFFFFF']
      });
    } else {
      setErrorMessage(res.message || 'Submission failed. Please check your connection and try again.');
    }
  };

  const handleReset = () => {
    setFormData({
      poetName: '',
      city: '',
      email: '',
      title: '',
      category: 'जीवन दर्शन एवं सत्य (Life Philosophy)',
      poemText: '',
      reflection: '',
      website_url_hp: ''
    });
    setIsSubmitted(false);
    setErrorMessage('');
  };

  return (
    <div className="submit-poem-page">
      <section className="submit-poem-hero">
        <div className="container">
          <div className="section-title-wrap">
            <span className="subtitle">
              {isHindi ? 'साहित्यिक सहभागिता मंच' : 'Literary Contribution Stage'}
            </span>
            <h1 className="main-title">
              {isHindi ? 'अपनी कविता ' : 'Submit Your '}
              <span className="highlight">
                {isHindi ? 'अक्षर Canvas को भेजें' : 'Poetry & Verses'}
              </span>
            </h1>
            <p className="desc">
              {isHindi
                ? 'यदि आप भी कविता, ग़ज़ल या छंद लिखते हैं, तो अपनी रचना यहाँ साझा करें। आपकी रचना अक्षर Canvas की संपादकीय टीम को ईमेल द्वारा प्राप्त होगी और समीक्षा के बाद मंच पर प्रकाशित की जाएगी।'
                : 'If you compose poems, ghazals, or verses, share your creations here. Your submission is instantly routed via editorial email notifications for review and publication.'}
            </p>
            <div className="ornament-divider">
              <span className="line" /><span className="diamond" /><span className="line" />
            </div>
          </div>
        </div>
      </section>

      <section className="container submit-poem-container">
        <motion.div
          className="submit-card-wrapper"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {isSubmitted ? (
            <div className="submission-success-view">
              <div className="success-icon-badge">
                <CheckCircle2 size={54} />
              </div>
              <h2 className="success-heading">
                {isHindi ? 'आपकी रचना सफलतापूर्वक प्राप्त हो गई!' : 'Your Poem Has Been Received!'}
              </h2>
              <p className="success-message">
                {isHindi
                  ? `धन्यवाद ${formData.poetName}! आपकी कविता "${formData.title}" की सूचना संपादकीय टीम को ईमेल द्वारा प्रेषित कर दी गई है।`
                  : `Thank you, ${formData.poetName}! Your composition "${formData.title}" has been transmitted to the Akshar Canvas editorial board with instant email alerts.`}
              </p>
              <div className="success-actions">
                <button className="btn-royal" onClick={handleReset}>
                  <Feather size={16} />
                  <span>{isHindi ? 'एक और कविता भेजें' : 'Submit Another Poem'}</span>
                </button>
                <a href="#/poems" className="btn-royal-outline">
                  <BookOpen size={16} />
                  <span>{isHindi ? 'काव्य संग्रह देखें' : 'Explore Poetry Gallery'}</span>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="poem-submission-form">
              <div className="form-intro-banner">
                <div className="banner-icon">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h4>{isHindi ? 'कवियों और पाठकों के लिए खुला मंच' : 'Open Platform for Poets & Readers'}</h4>
                  <p>
                    {isHindi
                      ? 'अपनी मौलिक कविताएँ, ग़ज़लें, दोहे या मुक्तक भेजें। अक्षर Canvas टीम इसे पढ़कर अपनी समीक्षा के साथ संकलित करेगी।'
                      : 'Submit your original verses, couplets, or poems. The Akshar Canvas team reviews and features inspiring contributions.'}
                  </p>
                </div>
              </div>

              {/* Bot Honeypot Trap - Invisible to humans */}
              <div style={{ display: 'none', position: 'absolute', left: '-9999px' }} aria-hidden="true">
                <label htmlFor="website_url_hp">Do not fill this</label>
                <input
                  id="website_url_hp"
                  type="text"
                  name="website_url_hp"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website_url_hp}
                  onChange={(e) => setFormData({ ...formData, website_url_hp: e.target.value })}
                />
              </div>

              {errorMessage && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.8rem 1rem', background: '#FFEBEE', border: '1px solid #FFCDD2', color: '#C62828', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                  <AlertCircle size={18} />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Author Details */}
              <div className="form-section-title">
                <User size={18} color="#8B0000" />
                <span>{isHindi ? 'रचयिता का विवरण (Author Details)' : 'Author Details'}</span>
              </div>

              <div className="form-grid-two">
                <div className="form-field">
                  <label>
                    {isHindi ? 'आपका नाम / उपनाम *' : 'Your Name / Pen Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={isHindi ? 'जैसे: रोहित शर्मा या अनामिका' : 'e.g. Rohit Sharma'}
                    value={formData.poetName}
                    onChange={(e) => setFormData({ ...formData, poetName: e.target.value })}
                  />
                </div>

                <div className="form-field">
                  <label>
                    {isHindi ? 'शहर / राज्य' : 'City / State'}
                  </label>
                  <input
                    type="text"
                    placeholder={isHindi ? 'जैसे: वाराणसी, उत्तर प्रदेश' : 'e.g. Varanasi, U.P.'}
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-field">
                <label>
                  {isHindi ? 'ईमेल (समीक्षा एवं सूचना प्राप्ति हेतु)' : 'Email Address (for notification updates)'}
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              {/* Poem Details */}
              <div className="form-section-title" style={{ marginTop: '1.8rem' }}>
                <Feather size={18} color="#8B0000" />
                <span>{isHindi ? 'काव्य विवरण एवं पंक्तियाँ (Poem Details)' : 'Poem Details'}</span>
              </div>

              <div className="form-grid-two">
                <div className="form-field">
                  <label>
                    {isHindi ? 'कविता का शीर्षक *' : 'Poem Title *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={isHindi ? 'जैसे: चाँद का कफ़न, मौन की आवाज़' : 'e.g. Whispers of the Moon'}
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                <div className="form-field">
                  <label>
                    {isHindi ? 'काव्य विधा / विषय' : 'Poem Category / Theme'}
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    {categoriesList.map(cat => (
                      <option key={cat.id} value={isHindi ? cat.hi : cat.en}>
                        {isHindi ? cat.hi : cat.en}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-field">
                <label>
                  {isHindi ? 'कविता की पंक्तियाँ / छंद *' : 'Poem Verses / Stanzas *'}
                </label>
                <textarea
                  required
                  rows={8}
                  placeholder={
                    isHindi
                      ? 'यहाँ अपनी कविता लिखें...\n\nछंदों के बीच एक खाली लाइन छोड़ें ताकि वे अलग-अलग पंक्तियों में सुंदर दिखें।'
                      : 'Write your poem here...\n\nLeave a blank line between stanzas for clean formatting.'
                  }
                  value={formData.poemText}
                  onChange={(e) => setFormData({ ...formData, poemText: e.target.value })}
                />
              </div>

              <div className="form-field">
                <label>
                  {isHindi ? 'इस कविता के पीछे का भाव / पृष्ठभूमि (वैकल्पिक)' : 'Inspiration or Note behind this poem (optional)'}
                </label>
                <input
                  type="text"
                  placeholder={
                    isHindi
                      ? 'जैसे: यह कविता बचपन की स्मृतियों से प्रेरित है...'
                      : 'e.g. Inspired by a serene evening by the river...'
                  }
                  value={formData.reflection}
                  onChange={(e) => setFormData({ ...formData, reflection: e.target.value })}
                />
              </div>

              <div className="submit-btn-row">
                <button type="submit" disabled={isSubmitting} className="btn-royal submit-main-btn">
                  <Send size={17} />
                  <span>{isSubmitting ? (isHindi ? 'भेजा जा रहा है...' : 'Dispatching...') : (isHindi ? 'कविता सबमिट करें' : 'Submit Poem to Akshar Canvas')}</span>
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </section>
    </div>
  );
};

export default SubmitPoem;
