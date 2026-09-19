import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Newspaper, Calendar, MapPin, Tag, ExternalLink, Sparkles, Feather, Award } from 'lucide-react';
import './Reporting.scss';

const Reporting = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const reports = [
    {
      id: 1,
      title: "अखिल भारतीय काव्य कुंभ — 'अक्षर कैनवास' की गूंज",
      media: "राष्ट्रीय साहित्य दर्पण",
      date: "फरवरी 2026",
      location: "नई दिल्ली",
      category: "media",
      badge: "मुख्य समाचार",
      excerpt: "दो पीढ़ियों के सशक्त काव्य मिलन 'अक्षर कैनवास' को राष्ट्रीय मंच पर श्रोताओं और आलोचकों द्वारा अभूतपूर्व सराहना मिली। डॉ. कंचन जायसवाल के दार्शनिक चिंतन और गरिमा सिंह की ओजस्वी ग़ज़लों ने श्रोताओं को मंत्रमुग्ध कर दिया।",
      tags: ["काव्य मंच", "राष्ट्रीय सम्मान", "साहित्य समागम"]
    },
    {
      id: 2,
      title: "काव्य संग्रह 'चाक पे माटी सा मन' का भव्य लोकार्पण",
      media: "दैनिक साहित्यालोक",
      date: "जनवरी 2026",
      location: "वाराणसी",
      category: "release",
      badge: "पुस्तक विमोचन",
      excerpt: "गरिमा सिंह के चर्चित काव्य संग्रह 'चाक पे माटी सा मन' का विमोचन देश के मूर्धन्य साहित्यकारों की उपस्थिति में संपन्न हुआ। वक्ताओं ने इसे आधुनिक हिंदी कविता में संवेदना का नया क्षितिज बताया।",
      tags: ["पुस्तक विमोचन", "चाक पे माटी सा मन", "समीक्षा"]
    },
    {
      id: 3,
      title: "परंपरा और आधुनिकता का संतुलन: डॉ. कंचन जायसवाल का विशेष साक्षात्कार",
      media: "सांस्कृतिक चेतना मासिक",
      date: "दिसंबर 2025",
      location: "प्रयागराज",
      category: "interview",
      badge: "विशेष साक्षात्कार",
      excerpt: "वरिष्ठ लेखिका डॉ. कंचन जायसवाल ने अपने विस्तृत साक्षात्कार में भारतीय सांस्कृतिक मूल्यों, स्त्री चेतना और समकालीन कविता की दिशा पर अपने गहन विचार साझा किए।",
      tags: ["साक्षात्कार", "संस्कृति", "विमर्श"]
    },
    {
      id: 4,
      title: "साहित्यिक महोत्सव 2025 में 'युवा गौरव सम्मान' से अलंकृत",
      media: "कला एवं अक्षर पत्रिका",
      date: "नवंबर 2025",
      location: "लखनऊ",
      category: "award",
      badge: "सम्मान एवं अलंकरण",
      excerpt: "साहित्यिक क्षेत्र में निरंतर रचनात्मक योगदान और मौलिक रचनाधर्मिता के लिए गरिमा सिंह को प्रतिष्ठित 'युवा रचनाकार सम्मान' प्रदान किया गया।",
      tags: ["सम्मान", "पुरस्कार", "युवा प्रतिभा"]
    },
    {
      id: 5,
      title: "आकाशवाणी पर विशेष काव्य पाठ व साहित्यिक वार्ता",
      media: "आकाशवाणी (AIR)",
      date: "अक्टूबर 2025",
      location: "राष्ट्रीय प्रसारण",
      category: "broadcast",
      badge: "आकाशवाणी प्रसारण",
      excerpt: "आकाशवाणी के राष्ट्रीय साहित्यिक कार्यक्रम में डॉ. कंचन जायसवाल और गरिमा सिंह की चुनिंदा कविताओं का प्रसारण किया गया, जिसे देश भर के श्रोताओं का भरपूर स्नेह मिला।",
      tags: ["आकाशवाणी", "रेडियो पाठ", "काव्य धारा"]
    }
  ];

  const filteredReports = activeCategory === 'all'
    ? reports
    : reports.filter(r => r.category === activeCategory);

  return (
    <div className="reporting-page">
      {/* Hero Banner */}
      <section className="reporting-hero">
        <div className="container">
          <div className="section-title-wrap">
            <span className="subtitle">मीडिया एवं मंच</span>
            <h1 className="main-title">
              साहित्यिक <span className="highlight">रिपोर्टिंग</span>
            </h1>
            <p className="desc">
              राष्ट्रीय मंचों, पत्र-पत्रिकाओं, आकाशवाणी और साहित्यिक समारोहों में 'अक्षर कैनवास' की उपस्थिति व समीक्षाएँ।
            </p>
            <div className="ornament-divider">
              <span className="line" /><span className="diamond" /><span className="line" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="reporting-content section-padding">
        <div className="container">
          {/* Category Filter */}
          <div className="reporting-filters">
            <button
              type="button"
              className={`filter-btn ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              सभी रिपोर्टिंग
            </button>
            <button
              type="button"
              className={`filter-btn ${activeCategory === 'media' ? 'active' : ''}`}
              onClick={() => setActiveCategory('media')}
            >
              मंच एवं समाचार
            </button>
            <button
              type="button"
              className={`filter-btn ${activeCategory === 'release' ? 'active' : ''}`}
              onClick={() => setActiveCategory('release')}
            >
              पुस्तक विमोचन
            </button>
            <button
              type="button"
              className={`filter-btn ${activeCategory === 'interview' ? 'active' : ''}`}
              onClick={() => setActiveCategory('interview')}
            >
              साक्षात्कार
            </button>
            <button
              type="button"
              className={`filter-btn ${activeCategory === 'award' ? 'active' : ''}`}
              onClick={() => setActiveCategory('award')}
            >
              सम्मान
            </button>
          </div>

          {/* Reports Grid */}
          <div className="reports-grid">
            {filteredReports.map(report => (
              <motion.article
                key={report.id}
                className="report-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="report-card-top">
                  <span className="report-badge">
                    <Newspaper size={13} />
                    <span>{report.badge}</span>
                  </span>
                  <span className="report-source">{report.media}</span>
                </div>

                <h3 className="report-title">{report.title}</h3>

                <div className="report-meta">
                  <div className="meta-item">
                    <Calendar size={14} />
                    <span>{report.date}</span>
                  </div>
                  <div className="meta-item">
                    <MapPin size={14} />
                    <span>{report.location}</span>
                  </div>
                </div>

                <p className="report-excerpt">{report.excerpt}</p>

                <div className="report-tags">
                  {report.tags.map((t, idx) => (
                    <span key={idx} className="tag-chip">
                      <Tag size={11} />
                      <span>{t}</span>
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reporting;
