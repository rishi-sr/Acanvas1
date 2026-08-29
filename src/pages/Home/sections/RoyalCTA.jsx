import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Sparkles, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../../context/LanguageContext';

const RoyalCTA = () => {
  const { t } = useLanguage();

  return (
    <section className="royal-cta-section">
      <div className="cta-gold-border" />
      <div className="container">
        <motion.div
          className="cta-inner"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
        >
          <span className="royal-tag gold" style={{ marginBottom: '1.2rem' }}>
            <Sparkles size={14} />
            {t('cta.tag')}
          </span>

          <h2 className="cta-heading">
            {t('cta.heading1')} <br />
            {t('cta.heading2')}
          </h2>

          <p className="cta-subtext">
            {t('cta.sub')}
          </p>

          <div className="cta-btn-group">
            <Link to="/contact" className="btn-royal-gold" style={{ padding: '1rem 2.2rem', fontSize: '1rem' }}>
              <Calendar size={18} />
              <span>{t('cta.invite')}</span>
            </Link>
            <Link to="/contact?type=letter" className="btn-royal-outline" style={{ background: 'rgba(255, 255, 255, 0.12)', color: '#FFFFFF', borderColor: 'rgba(255, 255, 255, 0.3)', padding: '1rem 2rem', fontSize: '1rem' }}>
              <Mail size={18} />
              <span>{t('cta.write')}</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RoyalCTA;
