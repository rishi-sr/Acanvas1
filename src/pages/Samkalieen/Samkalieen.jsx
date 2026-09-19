import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Feather, Calendar, Clock, ArrowRight, Sparkles, X, Share2, Quote } from 'lucide-react';
import './Samkalieen.scss';

const Samkalieen = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);

  const articles = [
    {
      id: 1,
      title: "समकालीन जीवन में संवेदना का अस्तित्व और कविता की भूमिका",
      author: "डॉ. कंचन जायसवाल",
      category: "दार्शनिक चिंतन",
      date: "फरवरी 2026",
      readTime: "5 मिनट पाठ",
      lead: "तकनीक और गति के इस युग में मानवीय संवेदनाएँ किस प्रकार साहित्य के माध्यम से अपनी आत्मा को सुरक्षित रखती हैं।",
      paragraphs: [
        "आधुनिक सभ्यता ने हमें असीम भौतिक सुविधाएँ और त्वरित संचार के साधन तो दिए हैं, किंतु मनुष्य के आंतरिक एकांत और संवेदनशीलता पर इसका गहरा प्रभाव पड़ा है। कविता केवल शब्दों का विन्यास नहीं है, यह अंतर्मन का वह आईना है जिसमें व्यक्ति अपनी खोई हुई निश्छलता को पुनः प्राप्त करता है।",
        "जब एक रचनाकार अपनी कलम उठाता है, तो वह केवल अपने व्यक्तिगत सुख-दुख को नहीं लिखता, अपितु समूचे समाज की अनकही पीड़ा, आकांक्षा और सांस्कृतिक अस्मिता को वाणी देता है। समकालीन कविता आज अस्तित्ववादी संकटों से जूझ रहे मनुष्य के लिए संबल का कार्य कर रही है।",
        "भारतीय परंपरा में काव्य को केवल मनोरंजन नहीं, बल्कि जीवन-दर्शन और आत्म-साक्षात्कार का मार्ग माना गया है। हमें आज के डिजिटल परिवेश में भी शब्दों की इस पवित्रता और दायित्व को अक्षुण्ण रखना होगा।"
      ],
      quote: "काव्य अंततः मानवीय करुणा और चेतना का शाश्वत उद्घोष है।"
    },
    {
      id: 2,
      title: "स्त्री अस्मिता, संघर्ष और समकालीन ग़ज़ल का नया तेवर",
      author: "गरिमा सिंह",
      category: "स्त्री चेतना",
      date: "जनवरी 2026",
      readTime: "6 मिनट पाठ",
      lead: "परंपरागत रूढ़ियों से परे, समकालीन ग़ज़लों में स्त्री के स्वतंत्र व्यक्तित्व, स्वप्नों और स्वाभिमान की सशक्त अभिव्यक्ति।",
      paragraphs: [
        "हिंदी और उर्दू ग़ज़ल परंपरा में लंबे समय तक स्त्री को केवल सौंदर्य और विरह की विषय-वस्तु के रूप में देखा गया। किंतु 21वीं सदी की ग़ज़ल में स्त्री केवल उपमेय नहीं, स्वयं रचनाकार और दृष्टा बनकर उभरी है।",
        "आज की युवा कवयित्रियाँ जब ग़ज़ल कहती हैं, तो उनके अशआर में रसोई की दीवारों से लेकर अंतरिक्ष की ऊँचाइयों तक का यथार्थ गूँजता है। यह विद्रोह केवल आक्रोश का नहीं, बल्कि स्वाभिमान, समान अधिकार और मानवीय गरिमा की प्रतिष्ठा का सशक्त स्वर है।",
        "कविता और ग़ज़ल जब जन-संवेदना से जुड़ती हैं, तभी वे कालजयी बनती हैं। आज का समकालीन काव्य परिदृश्य इस बात का प्रमाण है कि कलम जब सच लिखती है, तो वह बदलाव की सबसे बड़ी ताकत बन जाती है।"
      ],
      quote: "जो धड़कन में अनकहा रह गया, वही कागज़ पर उतरकर ग़ज़ल बन गया।"
    },
    {
      id: 3,
      title: "सांस्कृतिक जड़ें और आधुनिकता का द्वंद्व — एक सेतु की आवश्यकता",
      author: "डॉ. कंचन जायसवाल",
      category: "संस्कृति एवं समाज",
      date: "दिसंबर 2025",
      readTime: "4 मिनट पाठ",
      lead: "पुरातन मूल्यों की सुगंध और आधुनिक जीवन की वास्तविकताओं के बीच एक सामंजस्यपूर्ण साहित्यिक सेतु का निर्माण।",
      paragraphs: [
        "किसी भी समाज की जीवंतता इस बात में है कि वह अपने अतीत के गौरव को संजोते हुए वर्तमान की चुनौतियों का स्वागत कैसे करता है। परंपरा कोई जड़ वस्तु नहीं है; वह बहती नदी के समान है जो हर मोड़ पर नए जल को आत्मसात करती है।",
        "अक्षर कैनवास का उद्देश्य भी यही है कि हम दो पीढ़ियों के दृष्टिकोणों को एक साथ लाकर एक ऐसा संवाद रचें जहाँ अनुभव की गहराई और युवा ऊर्जा का विमर्श मिलकर एक नई साहित्यिक चेतना का सृजन कर सकें।"
      ],
      quote: "परंपरा जब विचार बनती है, तभी वह आधुनिकता को अर्थ देती है।"
    }
  ];

  return (
    <div className="samkalieen-page">
      {/* Hero Banner */}
      <section className="samkalieen-hero">
        <div className="container">
          <div className="section-title-wrap">
            <span className="subtitle">साहित्यिक स्तंभ एवं विमर्श</span>
            <h1 className="main-title">
              समकालीन <span className="highlight">आलेख व चिंतन</span>
            </h1>
            <p className="desc">
              आधुनिक चेतना, मानवीय सरोकार, स्त्री अस्मिता और सांस्कृतिक मूल्यों पर दोनों रचनाकारों के वैचारिक आलेख।
            </p>
            <div className="ornament-divider">
              <span className="line" /><span className="diamond" /><span className="line" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Articles Grid */}
      <section className="samkalieen-content section-padding">
        <div className="container">
          <div className="articles-grid">
            {articles.map(article => (
              <motion.article
                key={article.id}
                className="article-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="article-card-top">
                  <span className="category-pill">{article.category}</span>
                  <span className="read-time">{article.readTime}</span>
                </div>

                <h3 className="article-title">{article.title}</h3>

                <div className="article-meta">
                  <span className="meta-author">
                    <Feather size={14} />
                    <span>लेखक: {article.author}</span>
                  </span>
                  <span className="meta-date">
                    <Calendar size={14} />
                    <span>{article.date}</span>
                  </span>
                </div>

                <p className="article-lead">{article.lead}</p>

                <div className="card-action">
                  <button
                    type="button"
                    className="read-article-btn"
                    onClick={() => setSelectedArticle(article)}
                  >
                    <span>पूरा आलेख पढ़ें</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Article Detail Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="article-modal-overlay" onClick={() => setSelectedArticle(null)}>
            <motion.div
              className="article-modal"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setSelectedArticle(null)}
                aria-label="Close"
              >
                <X size={20} />
              </button>

              <div className="modal-header">
                <span className="modal-category">{selectedArticle.category}</span>
                <h2 className="modal-title">{selectedArticle.title}</h2>
                <div className="modal-meta">
                  <span>लेखक: <strong>{selectedArticle.author}</strong></span>
                  <span>•</span>
                  <span>{selectedArticle.date}</span>
                  <span>•</span>
                  <span>{selectedArticle.readTime}</span>
                </div>
              </div>

              <div className="modal-body">
                {selectedArticle.quote && (
                  <blockquote className="article-quote-box">
                    <Quote size={24} className="quote-icon" />
                    <p>{selectedArticle.quote}</p>
                  </blockquote>
                )}

                {selectedArticle.paragraphs.map((p, idx) => (
                  <p key={idx} className="article-p">{p}</p>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Samkalieen;

