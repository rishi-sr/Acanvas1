import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, Clock, CheckCircle, ArrowRight, Feather } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Workshop.scss';

const Workshop = () => {
  const workshops = [
    {
      id: 1,
      title: "छंद, लय और ग़ज़ल की बहर साधना",
      mentor: "डॉ. कंचन जायसवाल एवं गरिमा सिंह",
      date: "15 अक्टूबर 2026",
      time: "सायं 4:00 - 6:30 बजे",
      mode: "हाइब्रिड (ऑनलाइन / ऑफलाइन)",
      type: "poetry",
      desc: "ग़ज़ल और छंदोबद्ध कविता के तकनीकी नियमों, काफ़िया-रदीफ़, बहर और मीटर की व्यावहारिक समझ के साथ सृजन का विशेष सत्र।",
      highlights: ["बहर व तक्तीअ की बुनियादी समझ", "रदीफ़-काफ़िया का चयन व दोष-निवारण", "लाइव रचना सुधार एवं समीक्षा", "प्रमाणपत्र एवं मार्गदर्शिका"]
    },
    {
      id: 2,
      title: "स्टोरीटेलिंग एवं रचनात्मक गद्य लेखन",
      mentor: "डॉ. कंचन जायसवाल",
      date: "28 अक्टूबर 2026",
      time: "दोपहर 3:00 - 5:30 बजे",
      mode: "ऑनलाइन (लाइव इंटरैक्टिव)",
      type: "story",
      desc: "कहानियों में पात्र निर्माण, परिवेश चित्रण, संवादों की स्वाभाविकता और भावनात्मक जुड़ाव पैदा करने की कलात्मक विधियाँ।",
      highlights: ["कथावस्तु और कथानक का विन्यास", "पात्रों की मनोवैज्ञानिक गहराई", "संवाद लेखन में प्रभावोत्पादकता", "व्यावहारिक अभ्यास कार्य"]
    },
    {
      id: 3,
      title: "मंच प्रस्तुति, वाणी संस्कार व कविता पाठ",
      mentor: "गरिमा सिंह",
      date: "12 नवंबर 2026",
      time: "सायं 5:00 - 7:30 बजे",
      mode: "ऑफलाइन / स्टूडियो सत्र",
      type: "performance",
      desc: "श्रोताओं के सामने प्रभावी रूप से अपनी बात रखना, स्वर के उतार-चढ़ाव (वॉइस मॉड्यूलेशन) और मंच के भय पर विजय पाना।",
      highlights: ["माइक्रोफोन शिष्टाचार व आवाज़ का नियंत्रण", "भावानुकूल स्वर एवं अभिव्यक्ति", "मंच का आत्मविश्वास", "लाइव फीडबैक व अभ्यास"]
    },
    {
      id: 4,
      title: "युवा रचनाकार बूटकैंप — विचार से पुस्तक तक",
      mentor: "संयुक्त मार्गदर्शन दल",
      date: "25 नवंबर 2026",
      time: "प्रातः 11:00 - 4:00 बजे",
      mode: "ऑफलाइन वर्कशॉप",
      type: "bootcamp",
      desc: "अपनी पहली पांडुलिपि तैयार करने, संपादन, प्रकाशन प्रक्रिया और साहित्यिक मंचों तक पहुँचने का संपूर्ण मार्गदर्शन।",
      highlights: ["पांडुलिपि संकलन व संपादन", "प्रकाशन के विकल्प एवं रॉयल्टी समझ", "साहित्यिक पत्रिकाओं में प्रकाशन", "व्यक्तिगत मेंटरशिप"]
    }
  ];

  return (
    <div className="workshop-page">
      {/* Hero Banner */}
      <section className="workshop-hero">
        <div className="container">
          <div className="section-title-wrap">
            <h1 className="main-title">
              सृजन एवं <span className="highlight">वर्कशॉप्स</span>
            </h1>
            <p className="desc">
              काव्य शिल्प, छंद-साधना, स्टोरीटेलिंग और मंच प्रस्तुति की कलात्मक बारीकियों को सीखने का अनूठा मंच।
            </p>
            <div className="ornament-divider">
              <span className="line" /><span className="diamond" /><span className="line" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content (All workshops directly on single page without tabs) */}
      <section className="workshop-content">
        <div className="container">
          <div className="workshop-grid">
            {workshops.map((ws, idx) => (
              <motion.div
                key={ws.id}
                className="workshop-card"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
              >
                <div className="card-top">
                  <span className="workshop-badge">
                    <Sparkles size={13} />
                    <span>सत्र #{ws.id}</span>
                  </span>
                  <span className="workshop-mode">{ws.mode}</span>
                </div>

                <h3 className="workshop-title">{ws.title}</h3>
                <p className="workshop-mentor">
                  <Feather size={14} />
                  <span>मार्गदर्शक: {ws.mentor}</span>
                </p>

                <p className="workshop-desc">{ws.desc}</p>

                <div className="workshop-meta">
                  <div className="meta-item">
                    <Calendar size={14} />
                    <span>{ws.date}</span>
                  </div>
                  <div className="meta-item">
                    <Clock size={14} />
                    <span>{ws.time}</span>
                  </div>
                </div>

                <div className="workshop-highlights">
                  <h4 className="highlights-head">प्रमुख विषय:</h4>
                  <ul>
                    {ws.highlights.map((h, hIdx) => (
                      <li key={hIdx}>
                        <CheckCircle size={13} className="check-icon" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="card-bottom">
                  <Link to="/contact" className="btn-royal workshop-enroll-btn">
                    <span>कार्यशाला हेतु पंजीकरण करें</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Workshop;
