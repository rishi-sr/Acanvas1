import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import './Contact.scss';

const Contact = () => {
  const { t } = useLanguage();

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

      <section className="container contact-main-container">
        <motion.div
          className="secretariat-royal-card"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="secretariat-card-header">
            <h2 className="secretariat-title">{t('contact.info.title')}</h2>
            <p className="secretariat-desc">{t('contact.info.desc')}</p>
          </div>

          <div className="secretariat-items-list">
            {/* 1. Email */}
            <div className="secretariat-item-row">
              <div className="icon-box">
                <Mail size={22} />
              </div>
              <div className="item-text">
                <div className="lbl">{t('contact.info.email.lbl')}</div>
                <div className="val">
                  <a href="mailto:aksharcanvas@gmail.com">aksharcanvas@gmail.com</a>
                </div>
              </div>
            </div>

            {/* 2. Coordination Desk / Phone */}
            <div className="secretariat-item-row">
              <div className="icon-box">
                <Phone size={22} />
              </div>
              <div className="item-text">
                <div className="lbl">{t('contact.info.phone.lbl')}</div>
                <div className="val">+91 98765 43210 / +91 94512 34567</div>
              </div>
            </div>

            {/* 3. Location / स्थान */}
            <div className="secretariat-item-row">
              <div className="icon-box">
                <MapPin size={22} />
              </div>
              <div className="item-text">
                <div className="lbl">{t('contact.info.loc.lbl')}</div>
                <div className="val">{t('contact.info.loc.val')}</div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Contact;
