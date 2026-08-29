import React from 'react';
import { motion } from 'framer-motion';
import { Award, BookOpen, Feather, Sparkles } from 'lucide-react';
import { poetsData as defaultPoetsData } from '../../data/poetsData';
import { useContent } from '../../context/ContentContext';
import { useLanguage } from '../../context/LanguageContext';
import './About.scss';

const About = () => {
  const { authors } = useContent();
  const { t, lang } = useLanguage();
  const isHindi = lang === 'hi';

  const kanchan = authors?.kanchan || defaultPoetsData.kanchan;
  const garima = authors?.garima || defaultPoetsData.garima;
  const synergy = authors?.synergy || defaultPoetsData.synergy;

  const milestones = [
    {
      year: "1998",
      title: t('about.milestone.1.title') || "The Genesis of a Literary Odyssey",
      desc: t('about.milestone.1.desc') || "Kanchan Lata Jaiswal's early classical verses received widespread recognition in leading national literary journals."
    },
    {
      year: "2012",
      title: t('about.milestone.2.title') || "Garima Singh's Poetic Emergence",
      desc: t('about.milestone.2.desc') || "Young poetess Garima Singh achieved top honors across prestigious university poetry slams and regional literary gatherings."
    },
    {
      year: "2021",
      title: t('about.milestone.3.title') || "Publication of 'Alpana of Dreams'",
      desc: t('about.milestone.3.desc') || "Kanchan Lata Ji's celebrated anthology was decorated with state-level literary honors for its exploration of cultural heritage."
    },
    {
      year: "2023–2024",
      title: t('about.milestone.4.title') || "Bestselling Anthologies & Ghazals",
      desc: t('about.milestone.4.desc') || "'Echoes of the Inner Mind' and 'Ghazals on the Threshold' gained widespread acclaim among poetry lovers across India and abroad."
    },
    {
      year: "2025–Present",
      title: t('about.milestone.5.title') || "Establishment of Akshar Canvas",
      desc: t('about.milestone.5.desc') || "Uniting the perspectives of two generations under 'Akshar Canvas' and announcing the forthcoming Grand Joint Anthology."
    }
  ];

  return (
    <div className="about-page">
      {/* Hero Banner */}
      <section className="about-hero">
        <div className="container">
          <div className="section-title-wrap">
            <span className="subtitle">{t('about.subtitle')}</span>
            <h1 className="main-title">
              {t('about.title1')} <span className="highlight">{t('about.title2')}</span>
            </h1>
            <p className="desc">
              {t('about.desc')}
            </p>
            <div className="ornament-divider">
              <span className="line" />
              <span className="diamond" />
              <span className="line" />
            </div>
          </div>

          {/* Synergy Box */}
          <motion.div
            className="synergy-box"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="synergy-title">
              {isHindi ? synergy.titleHindi : synergy.title}
            </h2>
            <p className="synergy-desc">
              {isHindi ? synergy.descHindi : synergy.desc}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Deep Bio 1: Kanchan Lata Jaiswal */}
      <section className="poet-bio-block container" id="kanchan">
        <motion.div
          className="bio-card-wrapper"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
        >
          <div className="bio-sidebar">
            {kanchan.avatarUrl ? (
              <img src={kanchan.avatarUrl} alt={kanchan.name} className="bio-monogram" style={{ objectFit: 'cover' }} />
            ) : (
              <div className="bio-monogram">K</div>
            )}
            <h2 className="bio-poet-name">
              {isHindi ? kanchan.nameHindi : kanchan.name}
            </h2>
            <div className="bio-poet-eng">
              {isHindi ? kanchan.name : kanchan.nameHindi}
            </div>
            <div className="bio-poet-role">
              {isHindi ? kanchan.titleHindi : kanchan.title}
            </div>

            <div className="sidebar-stats-list">
              <div className="side-stat-row">
                <span>{t('about.stat.volumes')}</span>
                <strong>{kanchan.stats?.publishedBooks || 4} {isHindi ? 'पुस्तकें' : 'Books'}</strong>
              </div>
              <div className="side-stat-row">
                <span>{t('about.stat.verses')}</span>
                <strong>{kanchan.stats?.poemsCount || '350+'}</strong>
              </div>
              <div className="side-stat-row">
                <span>{t('about.stat.dedication')}</span>
                <strong>{kanchan.stats?.experience || '25+ Years'}</strong>
              </div>
            </div>
          </div>

          <div className="bio-content-pane">
            <div className="quote-quote-box">
              "{isHindi ? kanchan.philosophyHindi || kanchan.philosophy : kanchan.philosophy || kanchan.philosophyHindi}"
            </div>

            <div className="bio-paragraphs">
              {(Array.isArray(isHindi ? kanchan.fullBioHindi : kanchan.fullBio)
                ? (isHindi ? kanchan.fullBioHindi : kanchan.fullBio)
                : [isHindi ? kanchan.fullBioHindi : kanchan.fullBio]
              ).map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {kanchan.awards && kanchan.awards.length > 0 && (
              <div className="awards-section">
                <div className="awards-title">
                  <Award size={18} color="#C5A059" />
                  <span>{t('about.honors')}</span>
                </div>
                <div className="awards-grid">
                  {kanchan.awards.map((aw, i) => (
                    <div key={i} className="award-badge-card">
                      <div className="award-yr">{aw.year}</div>
                      <div className="award-nm">{aw.title}</div>
                      <div className="award-org">{aw.organization}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </section>

      {/* Deep Bio 2: Garima Singh */}
      <section className="poet-bio-block container" id="garima">
        <motion.div
          className="bio-card-wrapper"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
        >
          <div className="bio-sidebar dark-variant">
            {garima.avatarUrl ? (
              <img src={garima.avatarUrl} alt={garima.name} className="bio-monogram" style={{ objectFit: 'cover' }} />
            ) : (
              <div className="bio-monogram">G</div>
            )}
            <h2 className="bio-poet-name">
              {isHindi ? garima.nameHindi : garima.name}
            </h2>
            <div className="bio-poet-eng">
              {isHindi ? garima.name : garima.nameHindi}
            </div>
            <div className="bio-poet-role">
              {isHindi ? garima.titleHindi : garima.title}
            </div>

            <div className="sidebar-stats-list">
              <div className="side-stat-row">
                <span>{t('about.stat.volumes')}</span>
                <strong>{garima.stats?.publishedBooks || 3} {isHindi ? 'पुस्तकें' : 'Books'}</strong>
              </div>
              <div className="side-stat-row">
                <span>{t('about.stat.ghazals')}</span>
                <strong>{garima.stats?.poemsCount || '200+'}</strong>
              </div>
              <div className="side-stat-row">
                <span>{t('about.stat.journey')}</span>
                <strong>{garima.stats?.experience || '12+ Years'}</strong>
              </div>
            </div>
          </div>

          <div className="bio-content-pane">
            <div className="quote-quote-box">
              "{isHindi ? garima.philosophyHindi || garima.philosophy : garima.philosophy || garima.philosophyHindi}"
            </div>

            <div className="bio-paragraphs">
              {(Array.isArray(isHindi ? garima.fullBioHindi : garima.fullBio)
                ? (isHindi ? garima.fullBioHindi : garima.fullBio)
                : [isHindi ? garima.fullBioHindi : garima.fullBio]
              ).map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {garima.awards && garima.awards.length > 0 && (
              <div className="awards-section">
                <div className="awards-title">
                  <Award size={18} color="#C5A059" />
                  <span>{t('about.honors')}</span>
                </div>
                <div className="awards-grid">
                  {garima.awards.map((aw, i) => (
                    <div key={i} className="award-badge-card">
                      <div className="award-yr">{aw.year}</div>
                      <div className="award-nm">{aw.title}</div>
                      <div className="award-org">{aw.organization}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </section>

      {/* Interactive Milestones Timeline */}
      <section className="timeline-section">
        <div className="container">
          <div className="section-title-wrap">
            <span className="subtitle">{t('about.timeline.subtitle')}</span>
            <h2 className="main-title">
              {t('about.timeline.title1')} <span className="highlight">{t('about.timeline.title2')}</span>
            </h2>
            <p className="desc">
              {t('about.timeline.desc')}
            </p>
          </div>

          <div className="timeline-track">
            {milestones.map((item, idx) => (
              <motion.div
                key={idx}
                className="timeline-node"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="timeline-marker" />
                <div className="timeline-card">
                  <div className="time-yr">{item.year}</div>
                  <h3 className="time-heading">{item.title}</h3>
                  <p className="time-desc">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
