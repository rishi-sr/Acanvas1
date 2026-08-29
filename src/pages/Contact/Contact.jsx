import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useContent } from '../../context/ContentContext';
import { useLanguage } from '../../context/LanguageContext';
import './Contact.scss';

const Contact = () => {
  const { submitInquiry } = useContent();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    eventType: t('contact.event.1'),
    date: '',
    message: '',
    website_url_hp: '' // Honeypot trap
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [activeFaq, setActiveFaq] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setErrorMessage('');

    const res = await submitInquiry(formData);
    setIsSubmitting(false);

    if (res.success) {
      setSubmitted(true);
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8B0000', '#C5A059', '#C41E3A', '#FFFFFF']
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        city: '',
        eventType: t('contact.event.1'),
        date: '',
        message: '',
        website_url_hp: ''
      });
    } else {
      setErrorMessage(res.message || 'Failed to submit inquiry. Please try again.');
    }
  };

  const faqs = [
    { q: t('contact.faq.q1'), a: t('contact.faq.a1') },
    { q: t('contact.faq.q2'), a: t('contact.faq.a2') },
    { q: t('contact.faq.q3'), a: t('contact.faq.a3') },
    { q: t('contact.faq.q4'), a: t('contact.faq.a4') },
  ];

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="container">
          <div className="section-title-wrap">
            <span className="subtitle">{t('contact.subtitle')}</span>
            <h1 className="main-title">
              {t('contact.title1')} <span className="highlight">{t('contact.title2')}</span>
            </h1>
            <p className="desc">
              {t('contact.desc')}
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
        <div className="contact-layout-grid">
          {/* Left Info Pane */}
          <div className="contact-info-pane">
            <motion.div
              className="info-card"
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="info-title">{t('contact.info.title')}</h2>
              <p className="info-desc">
                {t('contact.info.desc')}
              </p>

              <div className="contact-items-list">
                <div className="contact-item-row">
                  <div className="icon-box">
                    <Mail size={20} />
                  </div>
                  <div className="item-text">
                    <div className="lbl">{t('contact.info.email.lbl')}</div>
                    <div className="val">
                      <a href="mailto:contact@aksharcanvas.com">contact@aksharcanvas.com</a>
                    </div>
                  </div>
                </div>

                <div className="contact-item-row">
                  <div className="icon-box">
                    <Phone size={20} />
                  </div>
                  <div className="item-text">
                    <div className="lbl">{t('contact.info.phone.lbl')}</div>
                    <div className="val">+91 98765 43210 / +91 94512 34567</div>
                  </div>
                </div>

                <div className="contact-item-row">
                  <div className="icon-box">
                    <MapPin size={20} />
                  </div>
                  <div className="item-text">
                    <div className="lbl">{t('contact.info.loc.lbl')}</div>
                    <div className="val">Varanasi • Lucknow • New Delhi (India)</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Booking Form */}
          <motion.div
            className="contact-form-pane"
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {submitted ? (
              <div className="submission-success-banner">
                <CheckCircle size={48} color="#C41E3A" style={{ marginBottom: '1rem' }} />
                <h3 className="success-title">{t('contact.success.title')}</h3>
                <p>
                  {t('contact.success.desc')}
                </p>
                <button
                  className="btn-royal"
                  onClick={() => setSubmitted(false)}
                >
                  <span>{t('contact.success.btn')}</span>
                </button>
              </div>
            ) : (
              <>
                <h2 className="form-heading">{t('contact.form.heading')}</h2>
                <p className="form-sub">
                  {t('contact.form.sub')}
                </p>

                {errorMessage && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.8rem 1rem', background: '#FFEBEE', border: '1px solid #FFCDD2', color: '#C62828', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                    <AlertCircle size={18} />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="booking-form">
                  {/* Bot Honeypot Trap */}
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

                  <div className="form-row">
                    <div className="form-group">
                      <label>{t('contact.form.name')}</label>
                      <input
                        type="text"
                        required
                        placeholder={t('contact.form.namePh')}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>{t('contact.form.email')}</label>
                      <input
                        type="email"
                        required
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>{t('contact.form.phone')}</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 00000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>{t('contact.form.city')}</label>
                      <input
                        type="text"
                        placeholder={t('contact.form.cityPh')}
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>{t('contact.form.eventType')}</label>
                      <select
                        value={formData.eventType}
                        onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                      >
                        <option value={t('contact.event.1')}>{t('contact.event.1')}</option>
                        <option value={t('contact.event.2')}>{t('contact.event.2')}</option>
                        <option value={t('contact.event.3')}>{t('contact.event.3')}</option>
                        <option value={t('contact.event.4')}>{t('contact.event.4')}</option>
                        <option value={t('contact.event.5')}>{t('contact.event.5')}</option>
                        <option value={t('contact.event.6')}>{t('contact.event.6')}</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>{t('contact.form.date')}</label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>{t('contact.form.message')}</label>
                    <textarea
                      required
                      placeholder={t('contact.form.messagePh')}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <button type="submit" disabled={isSubmitting} className="btn-royal" style={{ width: '100%', padding: '1rem', marginTop: '0.5rem' }}>
                    <Send size={16} />
                    <span>{isSubmitting ? 'Sending Request...' : t('contact.form.submit')}</span>
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* FAQs */}
      <section className="faq-section">
        <div className="container">
          <div className="section-title-wrap">
            <span className="subtitle">{t('contact.faq.subtitle')}</span>
            <h2 className="main-title">
              {t('contact.faq.title1')} <span className="highlight">{t('contact.faq.title2')}</span>
            </h2>
            <p className="desc">
              {t('contact.faq.desc')}
            </p>
          </div>

          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div key={i} className="faq-item">
                <button
                  className="faq-question"
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                >
                  <span>{faq.q}</span>
                  {activeFaq === i ? <ChevronUp size={20} color="#8B0000" /> : <ChevronDown size={20} />}
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div
                      className="faq-answer"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <p>{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
