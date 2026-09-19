import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Lock,
  Unlock,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  Download,
  Feather,
  BookOpen,
  Quote,
  Inbox,
  Users,
  CheckCircle,
  XCircle,
  Upload,
  Shield,
  Mail,
  Save,
  Sparkles,
  Image as ImageIcon,
  Newspaper,
  GraduationCap,
  FileText,
  Check,
  X,
  ChevronDown,
  Layers,
  ChevronRight,
  Globe,
  ArrowLeft,
  Key,
  Eye,
  EyeOff
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContent } from '../../context/ContentContext';
import './Admin.scss';

const Admin = () => {
  const {
    authors,
    poems,
    books,
    workshops,
    reports,
    samkalieen,
    quotes,
    gallery,
    submissions,
    inquiries,
    systemStatus,
    isAdminLoggedIn,
    adminLogin,
    adminLogout,
    updateAuthorProfile,
    uploadAuthorAvatar,
    addPoem,
    updatePoem,
    deletePoem,
    addBook,
    updateBook,
    deleteBook,
    addWorkshop,
    updateWorkshop,
    deleteWorkshop,
    addReport,
    updateReport,
    deleteReport,
    addSamkalieen,
    updateSamkalieen,
    deleteSamkalieen,
    addQuote,
    updateQuote,
    deleteQuote,
    addGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
    uploadGalleryImage,
    approveSubmission,
    updateSubmissionStatus,
    deleteSubmission,
    updateInquiryStatus,
    deleteInquiry,
    exportDatabase,
    changeAdminPassword
  } = useContent();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('authors');
  const [isSectionDropdownOpen, setIsSectionDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Change Password State
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [passChangeLoading, setPassChangeLoading] = useState(false);
  const [passChangeError, setPassChangeError] = useState('');
  const [passChangeSuccess, setPassChangeSuccess] = useState('');

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsSectionDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Section list with metadata for dropdown
  const sections = [
    {
      id: 'authors',
      label: 'लेखक प्रोफाइल (Authors Profile)',
      shortLabel: 'लेखक प्रोफाइल',
      icon: <Users size={18} />,
      badge: `${Object.keys(authors || {}).filter(k => k !== 'synergy').length} प्रोफाइल`
    },
    {
      id: 'books',
      label: `पुस्तकें (Books Catalog)`,
      shortLabel: 'पुस्तकें',
      icon: <BookOpen size={18} />,
      badge: `${books?.length || 0} पुस्तकें`
    },
    {
      id: 'workshops',
      label: `कार्यशाला (Workshops)`,
      shortLabel: 'कार्यशाला',
      icon: <GraduationCap size={18} />,
      badge: `${workshops?.length || 0} सत्र`
    },
    {
      id: 'reports',
      label: `साहित्यिक रिपोर्टिंग (Press & Media)`,
      shortLabel: 'रिपोर्टिंग',
      icon: <Newspaper size={18} />,
      badge: `${reports?.length || 0} कवरेज`
    },
    {
      id: 'samkalieen',
      label: `समकालीन आलेख (Contemporary Articles)`,
      shortLabel: 'समकालीन आलेख',
      icon: <FileText size={18} />,
      badge: `${samkalieen?.length || 0} आलेख`
    },
    {
      id: 'poems',
      label: `कविता संग्रह (Poetry Catalog)`,
      shortLabel: 'कविता संग्रह',
      icon: <Feather size={18} />,
      badge: `${poems?.length || 0} कविताएँ`
    },
    {
      id: 'quotes',
      label: `सूक्तियां (Master Quotes)`,
      shortLabel: 'सूक्तियां',
      icon: <Quote size={18} />,
      badge: `${quotes?.length || 0} सूक्तियां`
    },
    {
      id: 'gallery',
      label: `चित्र दीर्घा (Gallery Management)`,
      shortLabel: 'चित्र दीर्घा',
      icon: <ImageIcon size={18} />,
      badge: `${gallery?.length || 0} चित्र`
    },
    {
      id: 'submissions',
      label: `पाठक रचनाएँ (Reader Submissions)`,
      shortLabel: 'पाठक रचनाएँ',
      icon: <Sparkles size={18} />,
      badge: `${submissions?.length || 0} प्रविष्टियाँ`
    },
    {
      id: 'inquiries',
      label: `संदेश इनबॉक्स (Inquiries & Letters)`,
      shortLabel: 'संदेश इनबॉक्स',
      icon: <Inbox size={18} />,
      badge: `${inquiries?.length || 0} संदेश`
    }
  ];

  const currentSection = sections.find(s => s.id === activeTab) || sections[0];

  // Author Management State
  const [selectedAuthorId, setSelectedAuthorId] = useState('kanchan');
  const [authorForm, setAuthorForm] = useState(authors?.kanchan || {});
  const [authorSaveMsg, setAuthorSaveMsg] = useState('');
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  // Sync author form when author tab or author state changes
  useEffect(() => {
    if (authors && authors[selectedAuthorId]) {
      setAuthorForm(authors[selectedAuthorId]);
    }
  }, [selectedAuthorId, authors]);

  // ==========================================
  // BOOKS STATE
  // ==========================================
  const [showAddBook, setShowAddBook] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [newBook, setNewBook] = useState({
    title: '',
    titleHindi: '',
    author: 'Garima Singh',
    authorHindi: 'गरिमा सिंह',
    authorId: 'garima',
    status: 'published',
    year: '2026',
    expectedDate: '',
    publisher: 'अक्षर कैनवास पब्लिकेशन्स',
    pages: 180,
    isbn: '978-93-XXXXX-XX-X',
    price: '₹299',
    tagline: 'कविता संग्रह',
    synopsis: '',
    sampleExcerpt: '',
    coverGradient: 'linear-gradient(145deg, #1C191A 0%, #8B0000 100%)',
    accentColor: '#C5A059',
    buyAmazon: '',
    buyFlipkart: ''
  });

  // ==========================================
  // WORKSHOPS STATE
  // ==========================================
  const [showAddWorkshop, setShowAddWorkshop] = useState(false);
  const [editingWorkshop, setEditingWorkshop] = useState(null);
  const [newWorkshop, setNewWorkshop] = useState({
    title: '',
    mentor: 'डॉ. कंचन जायसवाल एवं गरिमा सिंह',
    date: '',
    time: '',
    mode: 'हाइब्रिड (ऑनलाइन / ऑफलाइन)',
    type: 'poetry',
    desc: '',
    highlights: ''
  });

  // ==========================================
  // REPORTING STATE
  // ==========================================
  const [showAddReport, setShowAddReport] = useState(false);
  const [editingReport, setEditingReport] = useState(null);
  const [newReport, setNewReport] = useState({
    title: '',
    media: '',
    date: '',
    location: '',
    category: 'media',
    badge: 'मुख्य समाचार',
    excerpt: '',
    tags: ''
  });

  // ==========================================
  // SAMKALIEEN (ARTICLES) STATE
  // ==========================================
  const [showAddSamkalieen, setShowAddSamkalieen] = useState(false);
  const [editingSamkalieen, setEditingSamkalieen] = useState(null);
  const [newSamkalieen, setNewSamkalieen] = useState({
    title: '',
    author: 'डॉ. कंचन जायसवाल',
    category: 'दार्शनिक चिंतन',
    date: '',
    readTime: '5 मिनट पाठ',
    quote: '',
    lead: '',
    paragraphs: ''
  });

  // ==========================================
  // POEMS STATE
  // ==========================================
  const [showAddPoem, setShowAddPoem] = useState(false);
  const [newPoem, setNewPoem] = useState({
    title: '',
    titleHindi: '',
    poet: 'Kanchan Lata Jaiswal',
    book: '',
    category: 'Life Philosophy',
    stanzas: '',
    featured: true
  });

  // ==========================================
  // QUOTES STATE
  // ==========================================
  const [showAddQuote, setShowAddQuote] = useState(false);
  const [newQuote, setNewQuote] = useState({
    quote: '',
    originalVerse: '',
    author: '',
    sourceBook: '',
    curatedBy: 'Kanchan Lata Jaiswal',
    poetReflection: '',
    tags: 'Literature'
  });

  // ==========================================
  // GALLERY STATE
  // ==========================================
  const [showAddGallery, setShowAddGallery] = useState(false);
  const [galleryImageFile, setGalleryImageFile] = useState(null);
  const [galleryImagePreview, setGalleryImagePreview] = useState('');
  const [uploadingGalleryImg, setUploadingGalleryImg] = useState(false);
  const [newGalleryItem, setNewGalleryItem] = useState({
    title: '',
    category: 'stage',
    date: '',
    location: '',
    image: '',
    aspectRatio: '1:1',
    caption: ''
  });

  // ==========================================
  // HANDLERS
  // ==========================================
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    const res = await adminLogin(username, password);
    if (!res.success) {
      setLoginError(res.message);
    }
  };

  const handleSaveAuthor = async (e) => {
    e.preventDefault();
    setAuthorSaveMsg('');
    const res = await updateAuthorProfile(selectedAuthorId, authorForm);
    if (res.success) {
      setAuthorSaveMsg('✅ लेखक प्रोफाइल सफलतापूर्वक सहेजी गई!');
      setTimeout(() => setAuthorSaveMsg(''), 4000);
    } else {
      setAuthorSaveMsg(`❌ ${res.message}`);
    }
  };

  const handleAvatarFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingAvatar(true);
    const res = await uploadAuthorAvatar(selectedAuthorId, file);
    setUploadingAvatar(false);

    if (res.success) {
      setAuthorSaveMsg('✅ फोटो सफलतापूर्वक अपलोड की गई!');
      setTimeout(() => setAuthorSaveMsg(''), 4000);
    } else {
      setAuthorSaveMsg(`❌ ${res.message}`);
    }
  };

  // --- BOOKS HANDLERS ---
  const handleCreateBook = async (e) => {
    e.preventDefault();
    if (!newBook.title) return;

    const bookPayload = {
      ...newBook,
      buyLinks: {
        amazon: newBook.buyAmazon || '#',
        flipkart: newBook.buyFlipkart || '#'
      }
    };
    await addBook(bookPayload);
    setShowAddBook(false);
    setNewBook({
      title: '',
      titleHindi: '',
      author: 'Garima Singh',
      authorHindi: 'गरिमा सिंह',
      authorId: 'garima',
      status: 'published',
      year: '2026',
      expectedDate: '',
      publisher: 'अक्षर कैनवास पब्लिकेशन्स',
      pages: 180,
      isbn: '978-93-XXXXX-XX-X',
      price: '₹299',
      tagline: 'कविता संग्रह',
      synopsis: '',
      sampleExcerpt: '',
      coverGradient: 'linear-gradient(145deg, #1C191A 0%, #8B0000 100%)',
      accentColor: '#C5A059',
      buyAmazon: '',
      buyFlipkart: ''
    });
  };

  const handleUpdateBook = async (e) => {
    e.preventDefault();
    if (!editingBook || !editingBook.title) return;

    const bookPayload = {
      ...editingBook,
      buyLinks: {
        amazon: editingBook.buyAmazon || editingBook.buyLinks?.amazon || '#',
        flipkart: editingBook.buyFlipkart || editingBook.buyLinks?.flipkart || '#'
      }
    };
    await updateBook(editingBook.id, bookPayload);
    setEditingBook(null);
  };

  // --- WORKSHOPS HANDLERS ---
  const handleCreateWorkshop = async (e) => {
    e.preventDefault();
    if (!newWorkshop.title) return;

    const highlightsArray = typeof newWorkshop.highlights === 'string'
      ? newWorkshop.highlights.split('\n').map(h => h.trim()).filter(Boolean)
      : newWorkshop.highlights;

    await addWorkshop({
      ...newWorkshop,
      highlights: highlightsArray
    });

    setShowAddWorkshop(false);
    setNewWorkshop({
      title: '',
      mentor: 'डॉ. कंचन जायसवाल एवं गरिमा सिंह',
      date: '',
      time: '',
      mode: 'हाइब्रिड (ऑनलाइन / ऑफलाइन)',
      type: 'poetry',
      desc: '',
      highlights: ''
    });
  };

  const handleUpdateWorkshop = async (e) => {
    e.preventDefault();
    if (!editingWorkshop || !editingWorkshop.title) return;

    const highlightsArray = typeof editingWorkshop.highlights === 'string'
      ? editingWorkshop.highlights.split('\n').map(h => h.trim()).filter(Boolean)
      : (Array.isArray(editingWorkshop.highlights) ? editingWorkshop.highlights : []);

    await updateWorkshop(editingWorkshop.id, {
      ...editingWorkshop,
      highlights: highlightsArray
    });
    setEditingWorkshop(null);
  };

  // --- REPORTING HANDLERS ---
  const handleCreateReport = async (e) => {
    e.preventDefault();
    if (!newReport.title) return;

    const tagsArray = typeof newReport.tags === 'string'
      ? newReport.tags.split(',').map(t => t.trim()).filter(Boolean)
      : newReport.tags;

    await addReport({
      ...newReport,
      tags: tagsArray
    });

    setShowAddReport(false);
    setNewReport({
      title: '',
      media: '',
      date: '',
      location: '',
      category: 'media',
      badge: 'मुख्य समाचार',
      excerpt: '',
      tags: ''
    });
  };

  const handleUpdateReport = async (e) => {
    e.preventDefault();
    if (!editingReport || !editingReport.title) return;

    const tagsArray = typeof editingReport.tags === 'string'
      ? editingReport.tags.split(',').map(t => t.trim()).filter(Boolean)
      : (Array.isArray(editingReport.tags) ? editingReport.tags : []);

    await updateReport(editingReport.id, {
      ...editingReport,
      tags: tagsArray
    });
    setEditingReport(null);
  };

  // --- SAMKALIEEN HANDLERS ---
  const handleCreateSamkalieen = async (e) => {
    e.preventDefault();
    if (!newSamkalieen.title) return;

    const paraArray = typeof newSamkalieen.paragraphs === 'string'
      ? newSamkalieen.paragraphs.split('\n\n').map(p => p.trim()).filter(Boolean)
      : newSamkalieen.paragraphs;

    await addSamkalieen({
      ...newSamkalieen,
      paragraphs: paraArray
    });

    setShowAddSamkalieen(false);
    setNewSamkalieen({
      title: '',
      author: 'डॉ. कंचन जायसवाल',
      category: 'दार्शनिक चिंतन',
      date: '',
      readTime: '5 मिनट पाठ',
      quote: '',
      lead: '',
      paragraphs: ''
    });
  };

  const handleUpdateSamkalieen = async (e) => {
    e.preventDefault();
    if (!editingSamkalieen || !editingSamkalieen.title) return;

    const paraArray = typeof editingSamkalieen.paragraphs === 'string'
      ? editingSamkalieen.paragraphs.split('\n\n').map(p => p.trim()).filter(Boolean)
      : (Array.isArray(editingSamkalieen.paragraphs) ? editingSamkalieen.paragraphs : []);

    await updateSamkalieen(editingSamkalieen.id, {
      ...editingSamkalieen,
      paragraphs: paraArray
    });
    setEditingSamkalieen(null);
  };

  // --- POEM HANDLERS ---
  const handleCreatePoem = async (e) => {
    e.preventDefault();
    if (!newPoem.title || !newPoem.stanzas) return;

    const stanzasArray = newPoem.stanzas.split('\n\n').filter(s => s.trim());
    await addPoem({
      ...newPoem,
      stanzas: stanzasArray,
      excerpt: stanzasArray[0]?.slice(0, 120) + '...'
    });

    setNewPoem({
      title: '',
      titleHindi: '',
      poet: 'Kanchan Lata Jaiswal',
      book: '',
      category: 'Life Philosophy',
      stanzas: '',
      featured: false
    });
    setShowAddPoem(false);
  };

  // --- QUOTE HANDLERS ---
  const handleCreateQuote = async (e) => {
    e.preventDefault();
    if (!newQuote.quote || !newQuote.author) return;

    await addQuote({
      ...newQuote,
      tags: newQuote.tags.split(',').map(t => t.trim())
    });
    setShowAddQuote(false);
  };

  // --- GALLERY HANDLERS ---
  const handleCreateGalleryItem = async (e) => {
    e.preventDefault();
    let imgUrl = newGalleryItem.image;

    if (galleryImageFile) {
      setUploadingGalleryImg(true);
      const upRes = await uploadGalleryImage(galleryImageFile);
      setUploadingGalleryImg(false);
      if (upRes.success && upRes.imageUrl) {
        imgUrl = upRes.imageUrl;
      }
    }

    if (!imgUrl) {
      imgUrl = '/assets/kanchan-portrait.png';
    }

    await addGalleryItem({
      ...newGalleryItem,
      image: imgUrl
    });

    setShowAddGallery(false);
    setGalleryImageFile(null);
    setGalleryImagePreview('');
    setNewGalleryItem({
      title: '',
      category: 'stage',
      date: '',
      location: '',
      image: '',
      aspectRatio: '1:1',
      caption: ''
    });
  };

  // --- PASSWORD CHANGE HANDLER ---
  const handleChangePasswordSubmit = async (e) => {
    e.preventDefault();
    setPassChangeError('');
    setPassChangeSuccess('');

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPassChangeError('कृपया सभी आवश्यक फ़ील्ड्स भरें।');
      return;
    }

    if (newPassword.length < 6) {
      setPassChangeError('नया पासवर्ड कम से कम 6 अक्षरों का होना चाहिए।');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPassChangeError('नया पासवर्ड और पुष्टि पासवर्ड मेल नहीं खाते।');
      return;
    }

    setPassChangeLoading(true);
    const res = await changeAdminPassword(currentPassword, newPassword);
    setPassChangeLoading(false);

    if (res.success) {
      setPassChangeSuccess('✅ ' + (res.message || 'पासवर्ड सफलतापूर्वक बदल दिया गया है!'));
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        setIsPasswordModalOpen(false);
        setPassChangeSuccess('');
      }, 2500);
    } else {
      setPassChangeError('❌ ' + (res.message || 'पासवर्ड बदलने में त्रुटि हुई।'));
    }
  };

  // Lock Screen
  if (!isAdminLoggedIn) {
    return (
      <div className="admin-page-wrap">
        <div className="container">
          <motion.div
            className="admin-login-card"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
          >
            <div className="lock-monogram">
              <Lock size={32} />
            </div>
            <h1 className="login-title">Akshar Canvas Control Hub</h1>
            <p className="login-sub">Secure Literary Content & Management Portal</p>

            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                <label>Admin Username</label>
                <input
                  type="text"
                  required
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Secret Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button type="submit" className="btn-royal" style={{ width: '100%', marginTop: '0.8rem' }}>
                <Unlock size={16} />
                <span>Authenticate into Control Hub</span>
              </button>
            </form>

            {loginError && <div className="error-msg">{loginError}</div>}

            <div className="demo-credentials-hint">
              🛡️ <strong>Encrypted JWT Authorization</strong> & Cloud Database Sync Active
            </div>

            <div style={{ marginTop: '1.2rem', textAlign: 'center' }}>
              <Link to="/" style={{ color: '#8B0000', fontSize: '0.88rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
                <ArrowLeft size={15} />
                <span>मुख्य वेबसाइट पर जाएँ (Back to Website)</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Dashboard View
  return (
    <div className="admin-page-wrap">
      <div className="container admin-dashboard">
        {/* Dashboard Header */}
        <div className="dashboard-header-bar">
          <div className="dash-title-wrap">
            <h1 className="dash-title">Akshar Canvas Administration</h1>
            <span className="dash-subtitle">साहित्यिक सामग्री, आलेख, पुस्तकें एवं संपूर्ण पोर्टल प्रबंधन</span>
          </div>

          <div className="dash-actions">
            <Link to="/" className="btn-royal-outline" title="मुख्य वेबसाइट देखें" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Globe size={15} />
              <span>वेबसाइट देखें</span>
            </Link>
            <button
              className="btn-royal-outline"
              onClick={() => {
                setIsPasswordModalOpen(true);
                setPassChangeError('');
                setPassChangeSuccess('');
              }}
              title="एडमिन पासवर्ड बदलें (Change Admin Password)"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <Key size={15} />
              <span>पासवर्ड बदलें</span>
            </button>
            <button className="btn-royal-outline" onClick={exportDatabase} title="Export JSON Database">
              <Download size={15} />
              <span>Export Backup</span>
            </button>
            <button className="btn-royal" onClick={adminLogout} style={{ padding: '0.55rem 1.1rem' }}>
              <LogOut size={15} />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* System Security Ribbon */}
        <div className="system-status-ribbon">
          <div className="status-group">
            <span><Shield size={14} color="#8B0000" style={{ verticalAlign: 'middle', marginRight: '4px' }} /><strong>Security:</strong></span>
            <span className="status-chip live">JWT Authorized</span>
            <span className="status-chip live">Dynamic CRUD Active</span>
            <span className="status-chip live">Hosting Ready</span>
          </div>

          <div className="status-group">
            <span><Mail size={14} color="#C5A059" style={{ verticalAlign: 'middle', marginRight: '4px' }} /><strong>Email Dispatcher:</strong></span>
            <span className={`status-chip ${systemStatus?.emailService?.mode === 'live_smtp' ? 'live' : 'notice'}`}>
              {systemStatus?.emailService?.mode === 'live_smtp' ? 'Live SMTP Ready' : 'Simulated Logger Mode'}
            </span>
          </div>
        </div>

        {/* ==========================================
            LUXURY SECTION SELECTOR DROPDOWN
        ========================================== */}
        <div className="admin-section-dropdown-wrapper" ref={dropdownRef}>
          <div className="dropdown-label-bar">
            <span className="dropdown-title">
              <Layers size={17} color="#8B0000" />
              <span>प्रबंधन अनुभाग चुनें (Select Admin Section):</span>
            </span>
            <span className="dropdown-active-pill">
              सक्रिय: <strong>{currentSection.shortLabel}</strong>
            </span>
          </div>

          <div className="custom-dropdown-container">
            <button
              type="button"
              className={`dropdown-trigger-btn ${isSectionDropdownOpen ? 'open' : ''}`}
              onClick={() => setIsSectionDropdownOpen(!isSectionDropdownOpen)}
            >
              <div className="trigger-current-item">
                <span className="trigger-icon">{currentSection.icon}</span>
                <span className="trigger-label">{currentSection.label}</span>
              </div>
              <div className="trigger-right">
                <span className="trigger-badge">{currentSection.badge}</span>
                <ChevronDown size={19} className={`chevron-icon ${isSectionDropdownOpen ? 'rotated' : ''}`} />
              </div>
            </button>

            <AnimatePresence>
              {isSectionDropdownOpen && (
                <motion.div
                  className="dropdown-menu-list"
                  initial={{ opacity: 0, y: -10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="dropdown-menu-header">
                    <span>अनुभाग सूची (All Admin Modules)</span>
                    <span className="menu-count">{sections.length} Modules</span>
                  </div>
                  <div className="dropdown-menu-items-grid">
                    {sections.map(section => (
                      <button
                        key={section.id}
                        type="button"
                        className={`dropdown-menu-item ${activeTab === section.id ? 'active' : ''}`}
                        onClick={() => {
                          setActiveTab(section.id);
                          setIsSectionDropdownOpen(false);
                        }}
                      >
                        <div className="item-icon-wrap">
                          {section.icon}
                        </div>
                        <div className="item-text-wrap">
                          <span className="item-title">{section.label}</span>
                          <span className="item-badge-text">{section.badge}</span>
                        </div>
                        {activeTab === section.id && (
                          <div className="item-check-icon">
                            <Check size={16} />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ==========================================
            TAB 0: AUTHORS MANAGEMENT
        ========================================== */}
        {activeTab === 'authors' && (
          <div className="admin-panel-content">
            <div className="panel-top-bar">
              <h2 className="panel-heading">लेखक प्रोफाइल एवं साहित्यिक परिचय (Authors Bio Manager)</h2>
            </div>

            {/* Author Switcher */}
            <div className="author-select-pills">
              <button
                type="button"
                className={`author-pill-btn ${selectedAuthorId === 'kanchan' ? 'active' : ''}`}
                onClick={() => setSelectedAuthorId('kanchan')}
              >
                डॉ. कंचन लता जायसवाल (Dr. Kanchan Jaiswal)
              </button>
              <button
                type="button"
                className={`author-pill-btn ${selectedAuthorId === 'garima' ? 'active' : ''}`}
                onClick={() => setSelectedAuthorId('garima')}
              >
                गरिमा सिंह (Garima Singh)
              </button>
            </div>

            {authorSaveMsg && (
              <div className="alert-box-success">
                {authorSaveMsg}
              </div>
            )}

            <form onSubmit={handleSaveAuthor} className="author-editor-card">
              <div className="author-header-flex">
                {/* Avatar upload */}
                <div className="author-avatar-upload-box">
                  {authorForm.avatarUrl ? (
                    <img src={authorForm.avatarUrl} alt={authorForm.name} className="avatar-preview-circle" />
                  ) : (
                    <div className="avatar-placeholder-circle">
                      {selectedAuthorId === 'kanchan' ? 'K' : 'G'}
                    </div>
                  )}

                  <label className="upload-label-btn">
                    <Upload size={14} />
                    <span>{uploadingAvatar ? 'Uploading...' : 'Upload Photo'}</span>
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/webp"
                      style={{ display: 'none' }}
                      onChange={handleAvatarFileChange}
                    />
                  </label>
                </div>

                <div className="author-name-inputs">
                  <div className="form-group-split">
                    <div className="form-field">
                      <label>English Name</label>
                      <input
                        type="text"
                        value={authorForm.name || ''}
                        onChange={(e) => setAuthorForm({ ...authorForm, name: e.target.value })}
                      />
                    </div>
                    <div className="form-field">
                      <label>हिंदी नाम</label>
                      <input
                        type="text"
                        value={authorForm.nameHindi || ''}
                        onChange={(e) => setAuthorForm({ ...authorForm, nameHindi: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group-split">
                    <div className="form-field">
                      <label>Title / Literary Designation (English)</label>
                      <input
                        type="text"
                        value={authorForm.title || ''}
                        onChange={(e) => setAuthorForm({ ...authorForm, title: e.target.value })}
                      />
                    </div>
                    <div className="form-field">
                      <label>उपाधि / साहित्यिक पद (हिंदी)</label>
                      <input
                        type="text"
                        value={authorForm.titleHindi || ''}
                        onChange={(e) => setAuthorForm({ ...authorForm, titleHindi: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-row-full">
                <label>Signature Quote (हस्ताक्षर पंक्ति - हिंदी)</label>
                <input
                  type="text"
                  value={authorForm.signatureQuoteHindi || ''}
                  onChange={(e) => setAuthorForm({ ...authorForm, signatureQuoteHindi: e.target.value })}
                />
              </div>

              <div className="form-row-full">
                <label>Short Bio (संक्षिप्त परिचय - हिंदी)</label>
                <textarea
                  rows={4}
                  value={authorForm.shortBioHindi || ''}
                  onChange={(e) => setAuthorForm({ ...authorForm, shortBioHindi: e.target.value })}
                />
              </div>

              <button type="submit" className="btn-royal" style={{ marginTop: '1rem' }}>
                <Save size={16} />
                <span>Save Profile Changes</span>
              </button>
            </form>
          </div>
        )}

        {/* ==========================================
            TAB 1: BOOKS MANAGEMENT
        ========================================== */}
        {activeTab === 'books' && (
          <div className="admin-panel-content">
            <div className="panel-top-bar">
              <h2 className="panel-heading">पुस्तकें प्रबंधन (Books Management)</h2>
              <button className="btn-royal" onClick={() => { setShowAddBook(!showAddBook); setEditingBook(null); }}>
                <Plus size={16} />
                <span>{showAddBook ? 'Close Form' : 'नई पुस्तक जोड़ें / Add Book'}</span>
              </button>
            </div>

            {/* Add Book Form */}
            {showAddBook && (
              <form onSubmit={handleCreateBook} className="admin-form-modal">
                <h3 className="modal-title">नई पुस्तक विवरण (New Book Details)</h3>
                <div className="modal-grid">
                  <div className="form-row-full">
                    <label>पुस्तक का शीर्षक (Book Title) *</label>
                    <input
                      type="text"
                      required
                      placeholder="उदा. चाक पे माटी सा मन"
                      value={newBook.title}
                      onChange={(e) => setNewBook({ ...newBook, title: e.target.value, titleHindi: e.target.value })}
                    />
                  </div>
                  <div className="form-row-full">
                    <label>लेखक / रचनाकार चुनें (Author) *</label>
                    <select
                      value={newBook.authorId}
                      onChange={(e) => {
                        const aid = e.target.value;
                        if (aid === 'garima') {
                          setNewBook({ ...newBook, authorId: 'garima', author: 'Garima Singh', authorHindi: 'गरिमा सिंह' });
                        } else if (aid === 'kanchan') {
                          setNewBook({ ...newBook, authorId: 'kanchan', author: 'Dr. Kanchan Jaiswal', authorHindi: 'डॉ. कंचन लता जायसवाल' });
                        } else {
                          setNewBook({ ...newBook, authorId: 'joint', author: 'Joint Collaboration', authorHindi: 'संयुक्त संकलन' });
                        }
                      }}
                    >
                      <option value="garima">गरिमा सिंह (Garima Singh)</option>
                      <option value="kanchan">डॉ. कंचन लता जायसवाल (Dr. Kanchan Jaiswal)</option>
                      <option value="joint">संयुक्त संकलन (Joint)</option>
                    </select>
                  </div>
                  <div className="form-row-full">
                    <label>प्रकाशन स्थिति (Status) *</label>
                    <select
                      value={newBook.status}
                      onChange={(e) => setNewBook({ ...newBook, status: e.target.value })}
                    >
                      <option value="published">प्रकाशित (Published)</option>
                      <option value="upcoming">आगामी (Upcoming)</option>
                    </select>
                  </div>
                  <div className="form-row-full">
                    <label>प्रकाशन वर्ष / अपेक्षित तिथि (Year / Date)</label>
                    <input
                      type="text"
                      placeholder="उदा. 2026 या शीघ्र प्रकाशाधीन"
                      value={newBook.year}
                      onChange={(e) => setNewBook({ ...newBook, year: e.target.value })}
                    />
                  </div>
                  <div className="form-row-full">
                    <label>प्रकाशक (Publisher)</label>
                    <input
                      type="text"
                      placeholder="उदा. अक्षर कैनवास पब्लिकेशन्स"
                      value={newBook.publisher}
                      onChange={(e) => setNewBook({ ...newBook, publisher: e.target.value })}
                    />
                  </div>
                  <div className="form-row-full">
                    <label>मूल्य (Price)</label>
                    <input
                      type="text"
                      placeholder="उदा. ₹299"
                      value={newBook.price}
                      onChange={(e) => setNewBook({ ...newBook, price: e.target.value })}
                    />
                  </div>
                  <div className="form-row-full">
                    <label>Amazon Buy Link (URL)</label>
                    <input
                      type="text"
                      placeholder="https://amazon.in/dp/..."
                      value={newBook.buyAmazon}
                      onChange={(e) => setNewBook({ ...newBook, buyAmazon: e.target.value })}
                    />
                  </div>
                  <div className="form-row-full">
                    <label>Flipkart Buy Link (URL)</label>
                    <input
                      type="text"
                      placeholder="https://flipkart.com/..."
                      value={newBook.buyFlipkart}
                      onChange={(e) => setNewBook({ ...newBook, buyFlipkart: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row-full" style={{ marginTop: '0.8rem' }}>
                  <label>पुस्तक का संक्षिप्त परिचय (Synopsis / Description)</label>
                  <textarea
                    rows={3}
                    placeholder="पुस्तक की विषय-वस्तु, संवेदना और साहित्यिक महत्व का विवरण..."
                    value={newBook.synopsis}
                    onChange={(e) => setNewBook({ ...newBook, synopsis: e.target.value })}
                  />
                </div>

                <div className="form-row-full" style={{ marginTop: '0.8rem' }}>
                  <label>पुस्तक का मुख्य अंश (Sample Excerpt)</label>
                  <textarea
                    rows={2}
                    placeholder="उदा. माटी का मन चाक पे घूमे, सांसों की लय साधे..."
                    value={newBook.sampleExcerpt}
                    onChange={(e) => setNewBook({ ...newBook, sampleExcerpt: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn-royal" style={{ marginTop: '1.2rem' }}>
                  <Plus size={16} />
                  <span>Save Book</span>
                </button>
              </form>
            )}

            {/* Edit Book Modal */}
            {editingBook && (
              <form onSubmit={handleUpdateBook} className="admin-form-modal" style={{ border: '2px solid #C5A059' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 className="modal-title" style={{ color: '#8B0000', margin: 0 }}>पुस्तक संपादित करें (Edit Book)</h3>
                  <button type="button" onClick={() => setEditingBook(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    <X size={20} />
                  </button>
                </div>
                <div className="modal-grid" style={{ marginTop: '1rem' }}>
                  <div className="form-row-full">
                    <label>पुस्तक शीर्षक *</label>
                    <input
                      type="text"
                      required
                      value={editingBook.title || ''}
                      onChange={(e) => setEditingBook({ ...editingBook, title: e.target.value, titleHindi: e.target.value })}
                    />
                  </div>
                  <div className="form-row-full">
                    <label>लेखक चुनें *</label>
                    <select
                      value={editingBook.authorId || 'garima'}
                      onChange={(e) => {
                        const aid = e.target.value;
                        if (aid === 'garima') {
                          setEditingBook({ ...editingBook, authorId: 'garima', author: 'Garima Singh', authorHindi: 'गरिमा सिंह' });
                        } else if (aid === 'kanchan') {
                          setEditingBook({ ...editingBook, authorId: 'kanchan', author: 'Dr. Kanchan Jaiswal', authorHindi: 'डॉ. कंचन लता जायसवाल' });
                        } else {
                          setEditingBook({ ...editingBook, authorId: 'joint', author: 'Joint Collaboration', authorHindi: 'संयुक्त संकलन' });
                        }
                      }}
                    >
                      <option value="garima">गरिमा सिंह (Garima Singh)</option>
                      <option value="kanchan">डॉ. कंचन लता जायसवाल (Dr. Kanchan Jaiswal)</option>
                      <option value="joint">संयुक्त संकलन (Joint)</option>
                    </select>
                  </div>
                  <div className="form-row-full">
                    <label>स्थिति</label>
                    <select
                      value={editingBook.status || 'published'}
                      onChange={(e) => setEditingBook({ ...editingBook, status: e.target.value })}
                    >
                      <option value="published">प्रकाशित (Published)</option>
                      <option value="upcoming">आगामी (Upcoming)</option>
                    </select>
                  </div>
                  <div className="form-row-full">
                    <label>वर्ष / अपेक्षित तिथि</label>
                    <input
                      type="text"
                      value={editingBook.year || ''}
                      onChange={(e) => setEditingBook({ ...editingBook, year: e.target.value })}
                    />
                  </div>
                  <div className="form-row-full">
                    <label>प्रकाशक</label>
                    <input
                      type="text"
                      value={editingBook.publisher || ''}
                      onChange={(e) => setEditingBook({ ...editingBook, publisher: e.target.value })}
                    />
                  </div>
                  <div className="form-row-full">
                    <label>मूल्य</label>
                    <input
                      type="text"
                      value={editingBook.price || ''}
                      onChange={(e) => setEditingBook({ ...editingBook, price: e.target.value })}
                    />
                  </div>
                  <div className="form-row-full">
                    <label>Amazon URL</label>
                    <input
                      type="text"
                      value={editingBook.buyAmazon || editingBook.buyLinks?.amazon || ''}
                      onChange={(e) => setEditingBook({ ...editingBook, buyAmazon: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row-full" style={{ marginTop: '0.8rem' }}>
                  <label>पुस्तक परिचय</label>
                  <textarea
                    rows={3}
                    value={editingBook.synopsis || ''}
                    onChange={(e) => setEditingBook({ ...editingBook, synopsis: e.target.value })}
                  />
                </div>

                <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1.2rem' }}>
                  <button type="submit" className="btn-royal">
                    <Save size={16} />
                    <span>Update Book</span>
                  </button>
                  <button type="button" className="btn-royal-outline" onClick={() => setEditingBook(null)}>
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* Books Table */}
            <div style={{ overflowX: 'auto' }}>
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Status</th>
                    <th>Publisher</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {books.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{ textAlign: 'center', color: '#7D6B6E', padding: '2.5rem' }}>
                        वर्तमान में कोई पुस्तक उपलब्ध नहीं है। ऊपर "नई पुस्तक जोड़ें" बटन दबाकर नई पुस्तक जोड़ें।
                      </td>
                    </tr>
                  ) : (
                    books.map(b => (
                      <tr key={b.id}>
                        <td style={{ fontWeight: 700 }}>{b.title}</td>
                        <td>{b.authorHindi || b.author}</td>
                        <td>
                          <span className={`royal-tag ${b.status === 'upcoming' ? 'gold' : ''}`}>
                            {b.status}
                          </span>
                        </td>
                        <td>{b.publisher || '—'}</td>
                        <td>{b.price || '—'}</td>
                        <td>
                          <div className="table-actions-cell">
                            <button
                              className="btn-table-edit"
                              onClick={() => { setEditingBook(b); setShowAddBook(false); }}
                              title="Edit Book"
                            >
                              <Edit2 size={14} />
                            </button>
                            <button
                              className="btn-table-del"
                              onClick={() => deleteBook(b.id)}
                              title="Delete Book"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ==========================================
            TAB 2: WORKSHOPS MANAGEMENT
        ========================================== */}
        {activeTab === 'workshops' && (
          <div className="admin-panel-content">
            <div className="panel-top-bar">
              <h2 className="panel-heading">कार्यशाला प्रबंधन (Workshops Management)</h2>
              <button className="btn-royal" onClick={() => { setShowAddWorkshop(!showAddWorkshop); setEditingWorkshop(null); }}>
                <Plus size={16} />
                <span>{showAddWorkshop ? 'Close Form' : 'नई कार्यशाला जोड़ें / Add Workshop'}</span>
              </button>
            </div>

            {/* Add Workshop Form */}
            {showAddWorkshop && (
              <form onSubmit={handleCreateWorkshop} className="admin-form-modal">
                <h3 className="modal-title">नई कार्यशाला सत्र दर्ज करें (Enter Workshop Details)</h3>
                <div className="modal-grid">
                  <div className="form-row-full">
                    <label>कार्यशाला शीर्षक (Workshop Title) *</label>
                    <input
                      type="text"
                      required
                      placeholder="उदा. छंद, लय और ग़ज़ल की बहर साधना"
                      value={newWorkshop.title}
                      onChange={(e) => setNewWorkshop({ ...newWorkshop, title: e.target.value })}
                    />
                  </div>
                  <div className="form-row-full">
                    <label>मार्गदर्शक (Mentor / Facilitator) *</label>
                    <input
                      type="text"
                      required
                      placeholder="उदा. डॉ. कंचन जायसवाल एवं गरिमा सिंह"
                      value={newWorkshop.mentor}
                      onChange={(e) => setNewWorkshop({ ...newWorkshop, mentor: e.target.value })}
                    />
                  </div>
                  <div className="form-row-full">
                    <label>माध्यम (Mode) *</label>
                    <select
                      value={newWorkshop.mode}
                      onChange={(e) => setNewWorkshop({ ...newWorkshop, mode: e.target.value })}
                    >
                      <option value="हाइब्रिड (ऑनलाइन / ऑफलाइन)">हाइब्रिड (ऑनलाइन / ऑफलाइन)</option>
                      <option value="ऑनलाइन (लाइव इंटरैक्टिव)">ऑनलाइन (लाइव इंटरैक्टिव)</option>
                      <option value="ऑफलाइन / स्टूडियो सत्र">ऑफलाइन / स्टूडियो सत्र</option>
                      <option value="विशेष बूटकैंप">विशेष बूटकैंप</option>
                    </select>
                  </div>
                  <div className="form-row-full">
                    <label>तिथि (Date)</label>
                    <input
                      type="text"
                      placeholder="उदा. 15 अक्टूबर 2026"
                      value={newWorkshop.date}
                      onChange={(e) => setNewWorkshop({ ...newWorkshop, date: e.target.value })}
                    />
                  </div>
                  <div className="form-row-full">
                    <label>समय (Time)</label>
                    <input
                      type="text"
                      placeholder="उदा. सायं 4:00 - 6:30 बजे"
                      value={newWorkshop.time}
                      onChange={(e) => setNewWorkshop({ ...newWorkshop, time: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row-full" style={{ marginTop: '0.8rem' }}>
                  <label>कार्यशाला का विवरण (Description)</label>
                  <textarea
                    rows={2}
                    placeholder="कार्यशाला का उद्देश्य और विषयवस्तु..."
                    value={newWorkshop.desc}
                    onChange={(e) => setNewWorkshop({ ...newWorkshop, desc: e.target.value })}
                  />
                </div>

                <div className="form-row-full" style={{ marginTop: '0.8rem' }}>
                  <label>प्रमुख विषय / Highlights (प्रत्येक बिंदु को नई पंक्ति / Enter दबाकर लिखें)</label>
                  <textarea
                    rows={3}
                    placeholder="बहर व तक्तीअ की बुनियादी समझ&#10;रदीफ़-काफ़िया का चयन व दोष-निवारण&#10;लाइव रचना सुधार एवं समीक्षा"
                    value={newWorkshop.highlights}
                    onChange={(e) => setNewWorkshop({ ...newWorkshop, highlights: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn-royal" style={{ marginTop: '1.2rem' }}>
                  <Plus size={16} />
                  <span>Save Workshop</span>
                </button>
              </form>
            )}

            {/* Edit Workshop Modal */}
            {editingWorkshop && (
              <form onSubmit={handleUpdateWorkshop} className="admin-form-modal" style={{ border: '2px solid #C5A059' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 className="modal-title" style={{ color: '#8B0000', margin: 0 }}>कार्यशाला संपादित करें (Edit Workshop)</h3>
                  <button type="button" onClick={() => setEditingWorkshop(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    <X size={20} />
                  </button>
                </div>
                <div className="modal-grid" style={{ marginTop: '1rem' }}>
                  <div className="form-row-full">
                    <label>कार्यशाला शीर्षक *</label>
                    <input
                      type="text"
                      required
                      value={editingWorkshop.title || ''}
                      onChange={(e) => setEditingWorkshop({ ...editingWorkshop, title: e.target.value })}
                    />
                  </div>
                  <div className="form-row-full">
                    <label>मार्गदर्शक *</label>
                    <input
                      type="text"
                      required
                      value={editingWorkshop.mentor || ''}
                      onChange={(e) => setEditingWorkshop({ ...editingWorkshop, mentor: e.target.value })}
                    />
                  </div>
                  <div className="form-row-full">
                    <label>माध्यम</label>
                    <input
                      type="text"
                      value={editingWorkshop.mode || ''}
                      onChange={(e) => setEditingWorkshop({ ...editingWorkshop, mode: e.target.value })}
                    />
                  </div>
                  <div className="form-row-full">
                    <label>तिथि</label>
                    <input
                      type="text"
                      value={editingWorkshop.date || ''}
                      onChange={(e) => setEditingWorkshop({ ...editingWorkshop, date: e.target.value })}
                    />
                  </div>
                  <div className="form-row-full">
                    <label>समय</label>
                    <input
                      type="text"
                      value={editingWorkshop.time || ''}
                      onChange={(e) => setEditingWorkshop({ ...editingWorkshop, time: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row-full" style={{ marginTop: '0.8rem' }}>
                  <label>विवरण</label>
                  <textarea
                    rows={2}
                    value={editingWorkshop.desc || ''}
                    onChange={(e) => setEditingWorkshop({ ...editingWorkshop, desc: e.target.value })}
                  />
                </div>

                <div className="form-row-full" style={{ marginTop: '0.8rem' }}>
                  <label>प्रमुख बिंदु / Highlights</label>
                  <textarea
                    rows={3}
                    value={Array.isArray(editingWorkshop.highlights) ? editingWorkshop.highlights.join('\n') : (editingWorkshop.highlights || '')}
                    onChange={(e) => setEditingWorkshop({ ...editingWorkshop, highlights: e.target.value })}
                  />
                </div>

                <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1.2rem' }}>
                  <button type="submit" className="btn-royal">
                    <Save size={16} />
                    <span>Update Workshop</span>
                  </button>
                  <button type="button" className="btn-royal-outline" onClick={() => setEditingWorkshop(null)}>
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* Workshops Table */}
            <div style={{ overflowX: 'auto' }}>
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Mentor</th>
                    <th>Mode</th>
                    <th>Date & Time</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {workshops.length === 0 ? (
                    <tr>
                      <td colSpan={5} style={{ textAlign: 'center', color: '#7D6B6E', padding: '2.5rem' }}>
                        वर्तमान में कोई कार्यशाला उपलब्ध नहीं है। ऊपर "नई कार्यशाला जोड़ें" बटन दबाकर सत्र जोड़ें।
                      </td>
                    </tr>
                  ) : (
                    workshops.map(ws => (
                      <tr key={ws.id}>
                        <td style={{ fontWeight: 700 }}>{ws.title}</td>
                        <td>{ws.mentor}</td>
                        <td><span className="royal-tag">{ws.mode}</span></td>
                        <td>{ws.date} {ws.time ? `• ${ws.time}` : ''}</td>
                        <td>
                          <div className="table-actions-cell">
                            <button
                              className="btn-table-edit"
                              onClick={() => { setEditingWorkshop(ws); setShowAddWorkshop(false); }}
                              title="Edit Workshop"
                            >
                              <Edit2 size={14} />
                            </button>
                            <button
                              className="btn-table-del"
                              onClick={() => deleteWorkshop(ws.id)}
                              title="Delete Workshop"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ==========================================
            TAB 3: REPORTING MANAGEMENT
        ========================================== */}
        {activeTab === 'reports' && (
          <div className="admin-panel-content">
            <div className="panel-top-bar">
              <h2 className="panel-heading">साहित्यिक रिपोर्टिंग व प्रेस कवरेज (Press & Coverage)</h2>
              <button className="btn-royal" onClick={() => { setShowAddReport(!showAddReport); setEditingReport(null); }}>
                <Plus size={16} />
                <span>{showAddReport ? 'Close Form' : 'नई रिपोर्टिंग जोड़ें / Add Press Item'}</span>
              </button>
            </div>

            {/* Add Report Form */}
            {showAddReport && (
              <form onSubmit={handleCreateReport} className="admin-form-modal">
                <h3 className="modal-title">नई रिपोर्टिंग दर्ज करें (Enter Press Coverage)</h3>
                <div className="modal-grid">
                  <div className="form-row-full">
                    <label>रिपोर्टिंग शीर्षक (Title) *</label>
                    <input
                      type="text"
                      required
                      placeholder="उदा. अखिल भारतीय काव्य कुंभ — 'अक्षर कैनवास' की गूंज"
                      value={newReport.title}
                      onChange={(e) => setNewReport({ ...newReport, title: e.target.value })}
                    />
                  </div>
                  <div className="form-row-full">
                    <label>प्रकाशन / समाचार माध्यम (Media Source) *</label>
                    <input
                      type="text"
                      required
                      placeholder="उदा. राष्ट्रीय साहित्य दर्पण / आकाशवाणी"
                      value={newReport.media}
                      onChange={(e) => setNewReport({ ...newReport, media: e.target.value })}
                    />
                  </div>
                  <div className="form-row-full">
                    <label>बैज / श्रेणी (Badge / Category)</label>
                    <input
                      type="text"
                      placeholder="उदा. मुख्य समाचार / पुस्तक विमोचन / विशेष साक्षात्कार"
                      value={newReport.badge}
                      onChange={(e) => setNewReport({ ...newReport, badge: e.target.value })}
                    />
                  </div>
                  <div className="form-row-full">
                    <label>माह / वर्ष (Date)</label>
                    <input
                      type="text"
                      placeholder="उदा. फरवरी 2026"
                      value={newReport.date}
                      onChange={(e) => setNewReport({ ...newReport, date: e.target.value })}
                    />
                  </div>
                  <div className="form-row-full">
                    <label>स्थान (Location)</label>
                    <input
                      type="text"
                      placeholder="उदा. नई दिल्ली / वाराणसी"
                      value={newReport.location}
                      onChange={(e) => setNewReport({ ...newReport, location: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row-full" style={{ marginTop: '0.8rem' }}>
                  <label>रिपोर्टिंग विवरण / मुख्य अंश (Excerpt / Summary) *</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="प्रेस रिपोर्ट का मुख्य विवरण और समीक्षा सारांश..."
                    value={newReport.excerpt}
                    onChange={(e) => setNewReport({ ...newReport, excerpt: e.target.value })}
                  />
                </div>

                <div className="form-row-full" style={{ marginTop: '0.8rem' }}>
                  <label>टैग्स / Tags (अल्पविराम से अलग करें)</label>
                  <input
                    type="text"
                    placeholder="काव्य मंच, राष्ट्रीय सम्मान, साहित्य समागम"
                    value={newReport.tags}
                    onChange={(e) => setNewReport({ ...newReport, tags: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn-royal" style={{ marginTop: '1.2rem' }}>
                  <Plus size={16} />
                  <span>Save Report</span>
                </button>
              </form>
            )}

            {/* Edit Report Modal */}
            {editingReport && (
              <form onSubmit={handleUpdateReport} className="admin-form-modal" style={{ border: '2px solid #C5A059' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 className="modal-title" style={{ color: '#8B0000', margin: 0 }}>रिपोर्ट संपादित करें (Edit Report)</h3>
                  <button type="button" onClick={() => setEditingReport(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    <X size={20} />
                  </button>
                </div>
                <div className="modal-grid" style={{ marginTop: '1rem' }}>
                  <div className="form-row-full">
                    <label>शीर्षक *</label>
                    <input
                      type="text"
                      required
                      value={editingReport.title || ''}
                      onChange={(e) => setEditingReport({ ...editingReport, title: e.target.value })}
                    />
                  </div>
                  <div className="form-row-full">
                    <label>समाचार माध्यम *</label>
                    <input
                      type="text"
                      required
                      value={editingReport.media || ''}
                      onChange={(e) => setEditingReport({ ...editingReport, media: e.target.value })}
                    />
                  </div>
                  <div className="form-row-full">
                    <label>बैज</label>
                    <input
                      type="text"
                      value={editingReport.badge || ''}
                      onChange={(e) => setEditingReport({ ...editingReport, badge: e.target.value })}
                    />
                  </div>
                  <div className="form-row-full">
                    <label>तिथि</label>
                    <input
                      type="text"
                      value={editingReport.date || ''}
                      onChange={(e) => setEditingReport({ ...editingReport, date: e.target.value })}
                    />
                  </div>
                  <div className="form-row-full">
                    <label>स्थान</label>
                    <input
                      type="text"
                      value={editingReport.location || ''}
                      onChange={(e) => setEditingReport({ ...editingReport, location: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row-full" style={{ marginTop: '0.8rem' }}>
                  <label>मुख्य विवरण</label>
                  <textarea
                    rows={3}
                    value={editingReport.excerpt || ''}
                    onChange={(e) => setEditingReport({ ...editingReport, excerpt: e.target.value })}
                  />
                </div>

                <div className="form-row-full" style={{ marginTop: '0.8rem' }}>
                  <label>टैग्स</label>
                  <input
                    type="text"
                    value={Array.isArray(editingReport.tags) ? editingReport.tags.join(', ') : (editingReport.tags || '')}
                    onChange={(e) => setEditingReport({ ...editingReport, tags: e.target.value })}
                  />
                </div>

                <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1.2rem' }}>
                  <button type="submit" className="btn-royal">
                    <Save size={16} />
                    <span>Update Report</span>
                  </button>
                  <button type="button" className="btn-royal-outline" onClick={() => setEditingReport(null)}>
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* Reports Table */}
            <div style={{ overflowX: 'auto' }}>
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Media Source</th>
                    <th>Badge</th>
                    <th>Date & Location</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.length === 0 ? (
                    <tr>
                      <td colSpan={5} style={{ textAlign: 'center', color: '#7D6B6E', padding: '2.5rem' }}>
                        वर्तमान में कोई रिपोर्टिंग उपलब्ध नहीं है। ऊपर "नई रिपोर्टिंग जोड़ें" बटन दबाकर प्रेस कवरेज दर्ज करें।
                      </td>
                    </tr>
                  ) : (
                    reports.map(rep => (
                      <tr key={rep.id}>
                        <td style={{ fontWeight: 700 }}>{rep.title}</td>
                        <td>{rep.media}</td>
                        <td><span className="royal-tag gold">{rep.badge || 'समाचार'}</span></td>
                        <td>{rep.date} {rep.location ? `• ${rep.location}` : ''}</td>
                        <td>
                          <div className="table-actions-cell">
                            <button
                              className="btn-table-edit"
                              onClick={() => { setEditingReport(rep); setShowAddReport(false); }}
                              title="Edit Report"
                            >
                              <Edit2 size={14} />
                            </button>
                            <button
                              className="btn-table-del"
                              onClick={() => deleteReport(rep.id)}
                              title="Delete Report"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ==========================================
            TAB 4: SAMKALIEEN (ARTICLES) MANAGEMENT
        ========================================== */}
        {activeTab === 'samkalieen' && (
          <div className="admin-panel-content">
            <div className="panel-top-bar">
              <h2 className="panel-heading">समकालीन आलेख व चिंतन प्रबंधन (Contemporary Articles)</h2>
              <button className="btn-royal" onClick={() => { setShowAddSamkalieen(!showAddSamkalieen); setEditingSamkalieen(null); }}>
                <Plus size={16} />
                <span>{showAddSamkalieen ? 'Close Form' : 'नया आलेख जोड़ें / Add Article'}</span>
              </button>
            </div>

            {/* Add Samkalieen Form */}
            {showAddSamkalieen && (
              <form onSubmit={handleCreateSamkalieen} className="admin-form-modal">
                <h3 className="modal-title">नया समकालीन आलेख दर्ज करें (Enter Article Details)</h3>
                <div className="modal-grid">
                  <div className="form-row-full">
                    <label>आलेख शीर्षक (Article Title) *</label>
                    <input
                      type="text"
                      required
                      placeholder="उदा. समकालीन जीवन में संवेदना का अस्तित्व और कविता की भूमिका"
                      value={newSamkalieen.title}
                      onChange={(e) => setNewSamkalieen({ ...newSamkalieen, title: e.target.value })}
                    />
                  </div>
                  <div className="form-row-full">
                    <label>लेखक (Author) *</label>
                    <select
                      value={newSamkalieen.author}
                      onChange={(e) => setNewSamkalieen({ ...newSamkalieen, author: e.target.value })}
                    >
                      <option value="डॉ. कंचन जायसवाल">डॉ. कंचन जायसवाल</option>
                      <option value="गरिमा सिंह">गरिमा सिंह</option>
                      <option value="डॉ. कंचन जायसवाल एवं गरिमा सिंह">डॉ. कंचन जायसवाल एवं गरिमा सिंह (संयुक्त)</option>
                    </select>
                  </div>
                  <div className="form-row-full">
                    <label>श्रेणी (Category) *</label>
                    <input
                      type="text"
                      required
                      placeholder="उदा. दार्शनिक चिंतन / स्त्री चेतना / संस्कृति एवं समाज"
                      value={newSamkalieen.category}
                      onChange={(e) => setNewSamkalieen({ ...newSamkalieen, category: e.target.value })}
                    />
                  </div>
                  <div className="form-row-full">
                    <label>माह / वर्ष (Date)</label>
                    <input
                      type="text"
                      placeholder="उदा. फरवरी 2026"
                      value={newSamkalieen.date}
                      onChange={(e) => setNewSamkalieen({ ...newSamkalieen, date: e.target.value })}
                    />
                  </div>
                  <div className="form-row-full">
                    <label>पठन समय (Read Time)</label>
                    <input
                      type="text"
                      placeholder="उदा. 5 मिनट पाठ"
                      value={newSamkalieen.readTime}
                      onChange={(e) => setNewSamkalieen({ ...newSamkalieen, readTime: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row-full" style={{ marginTop: '0.8rem' }}>
                  <label>मुख्य विचार सूत्र / उद्धरण (Signature Quote)</label>
                  <input
                    type="text"
                    placeholder="उदा. काव्य अंततः मानवीय करुणा और चेतना का शाश्वत उद्घोष है।"
                    value={newSamkalieen.quote}
                    onChange={(e) => setNewSamkalieen({ ...newSamkalieen, quote: e.target.value })}
                  />
                </div>

                <div className="form-row-full" style={{ marginTop: '0.8rem' }}>
                  <label>संक्षिप्त भूमिका (Lead / Excerpt)</label>
                  <textarea
                    rows={2}
                    placeholder="आलेख की संक्षिप्त भूमिका..."
                    value={newSamkalieen.lead}
                    onChange={(e) => setNewSamkalieen({ ...newSamkalieen, lead: e.target.value })}
                  />
                </div>

                <div className="form-row-full" style={{ marginTop: '0.8rem' }}>
                  <label>विस्तृत आलेख अनुच्छेद (Paragraphs - प्रत्येक पैराग्राफ को खाली पंक्ति / Double Enter से अलग करें) *</label>
                  <textarea
                    rows={6}
                    required
                    placeholder="पहला अनुच्छेद...&#10;&#10;दूसरा अनुच्छेद...&#10;&#10;तीसरा अनुच्छेद..."
                    value={newSamkalieen.paragraphs}
                    onChange={(e) => setNewSamkalieen({ ...newSamkalieen, paragraphs: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn-royal" style={{ marginTop: '1.2rem' }}>
                  <Plus size={16} />
                  <span>Save Article</span>
                </button>
              </form>
            )}

            {/* Edit Samkalieen Modal */}
            {editingSamkalieen && (
              <form onSubmit={handleUpdateSamkalieen} className="admin-form-modal" style={{ border: '2px solid #C5A059' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 className="modal-title" style={{ color: '#8B0000', margin: 0 }}>आलेख संपादित करें (Edit Article)</h3>
                  <button type="button" onClick={() => setEditingSamkalieen(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    <X size={20} />
                  </button>
                </div>
                <div className="modal-grid" style={{ marginTop: '1rem' }}>
                  <div className="form-row-full">
                    <label>शीर्षक *</label>
                    <input
                      type="text"
                      required
                      value={editingSamkalieen.title || ''}
                      onChange={(e) => setEditingSamkalieen({ ...editingSamkalieen, title: e.target.value })}
                    />
                  </div>
                  <div className="form-row-full">
                    <label>लेखक *</label>
                    <select
                      value={editingSamkalieen.author || 'डॉ. कंचन जायसवाल'}
                      onChange={(e) => setEditingSamkalieen({ ...editingSamkalieen, author: e.target.value })}
                    >
                      <option value="डॉ. कंचन जायसवाल">डॉ. कंचन जायसवाल</option>
                      <option value="गरिमा सिंह">गरिमा सिंह</option>
                      <option value="डॉ. कंचन जायसवाल एवं गरिमा सिंह">डॉ. कंचन जायसवाल एवं गरिमा सिंह (संयुक्त)</option>
                    </select>
                  </div>
                  <div className="form-row-full">
                    <label>श्रेणी *</label>
                    <input
                      type="text"
                      required
                      value={editingSamkalieen.category || ''}
                      onChange={(e) => setEditingSamkalieen({ ...editingSamkalieen, category: e.target.value })}
                    />
                  </div>
                  <div className="form-row-full">
                    <label>तिथि</label>
                    <input
                      type="text"
                      value={editingSamkalieen.date || ''}
                      onChange={(e) => setEditingSamkalieen({ ...editingSamkalieen, date: e.target.value })}
                    />
                  </div>
                  <div className="form-row-full">
                    <label>पठन समय</label>
                    <input
                      type="text"
                      value={editingSamkalieen.readTime || ''}
                      onChange={(e) => setEditingSamkalieen({ ...editingSamkalieen, readTime: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row-full" style={{ marginTop: '0.8rem' }}>
                  <label>उद्धरण (Quote)</label>
                  <input
                    type="text"
                    value={editingSamkalieen.quote || ''}
                    onChange={(e) => setEditingSamkalieen({ ...editingSamkalieen, quote: e.target.value })}
                  />
                </div>

                <div className="form-row-full" style={{ marginTop: '0.8rem' }}>
                  <label>संक्षिप्त भूमिका</label>
                  <textarea
                    rows={2}
                    value={editingSamkalieen.lead || ''}
                    onChange={(e) => setEditingSamkalieen({ ...editingSamkalieen, lead: e.target.value })}
                  />
                </div>

                <div className="form-row-full" style={{ marginTop: '0.8rem' }}>
                  <label>विस्तृत आलेख अनुच्छेद</label>
                  <textarea
                    rows={6}
                    value={Array.isArray(editingSamkalieen.paragraphs) ? editingSamkalieen.paragraphs.join('\n\n') : (editingSamkalieen.paragraphs || '')}
                    onChange={(e) => setEditingSamkalieen({ ...editingSamkalieen, paragraphs: e.target.value })}
                  />
                </div>

                <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1.2rem' }}>
                  <button type="submit" className="btn-royal">
                    <Save size={16} />
                    <span>Update Article</span>
                  </button>
                  <button type="button" className="btn-royal-outline" onClick={() => setEditingSamkalieen(null)}>
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* Samkalieen Table */}
            <div style={{ overflowX: 'auto' }}>
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Category</th>
                    <th>Read Time</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {samkalieen.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{ textAlign: 'center', color: '#7D6B6E', padding: '2.5rem' }}>
                        वर्तमान में कोई समकालीन आलेख उपलब्ध नहीं है। ऊपर "नया आलेख जोड़ें" बटन दबाकर आलेख दर्ज करें।
                      </td>
                    </tr>
                  ) : (
                    samkalieen.map(art => (
                      <tr key={art.id}>
                        <td style={{ fontWeight: 700 }}>{art.title}</td>
                        <td>{art.author}</td>
                        <td><span className="royal-tag">{art.category}</span></td>
                        <td>{art.readTime || '—'}</td>
                        <td>{art.date || '—'}</td>
                        <td>
                          <div className="table-actions-cell">
                            <button
                              className="btn-table-edit"
                              onClick={() => { setEditingSamkalieen(art); setShowAddSamkalieen(false); }}
                              title="Edit Article"
                            >
                              <Edit2 size={14} />
                            </button>
                            <button
                              className="btn-table-del"
                              onClick={() => deleteSamkalieen(art.id)}
                              title="Delete Article"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ==========================================
            TAB 5: POETRY CATALOG
        ========================================== */}
        {activeTab === 'poems' && (
          <div className="admin-panel-content">
            <div className="panel-top-bar">
              <h2 className="panel-heading">कविता संग्रह प्रबंधन (Poetry Catalog)</h2>
              <button className="btn-royal" onClick={() => setShowAddPoem(!showAddPoem)}>
                <Plus size={16} />
                <span>{showAddPoem ? 'Close Form' : 'नई कविता जोड़ें / Add Poem'}</span>
              </button>
            </div>

            {showAddPoem && (
              <form onSubmit={handleCreatePoem} className="admin-form-modal">
                <h3 className="modal-title">नई कविता दर्ज करें (Enter Poem Details)</h3>
                <div className="modal-grid">
                  <div className="form-row-full">
                    <label>Poem Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="उदा. Whispers of Horizon"
                      value={newPoem.title}
                      onChange={(e) => setNewPoem({ ...newPoem, title: e.target.value })}
                    />
                  </div>
                  <div className="form-row-full">
                    <label>Author *</label>
                    <select
                      value={newPoem.poet}
                      onChange={(e) => setNewPoem({ ...newPoem, poet: e.target.value })}
                    >
                      <option value="Kanchan Lata Jaiswal">Kanchan Lata Jaiswal</option>
                      <option value="Garima Singh">Garima Singh</option>
                      <option value="Kanchan Lata Jaiswal & Garima Singh">Kanchan Lata Jaiswal & Garima Singh (Joint)</option>
                    </select>
                  </div>
                  <div className="form-row-full">
                    <label>Published Book Name</label>
                    <input
                      type="text"
                      placeholder="उदा. Echoes of the Inner Mind"
                      value={newPoem.book}
                      onChange={(e) => setNewPoem({ ...newPoem, book: e.target.value })}
                    />
                  </div>
                  <div className="form-row-full">
                    <label>Category / Theme</label>
                    <select
                      value={newPoem.category}
                      onChange={(e) => setNewPoem({ ...newPoem, category: e.target.value })}
                    >
                      <option value="Life Philosophy">Life Philosophy</option>
                      <option value="Love & Longing">Love & Longing</option>
                      <option value="Heritage & Memories">Heritage & Memories</option>
                      <option value="Empowerment & Spirit">Empowerment & Spirit</option>
                      <option value="Masterpiece Collab">Masterpiece Collab</option>
                    </select>
                  </div>
                </div>

                <div className="form-row-full" style={{ marginTop: '0.8rem' }}>
                  <label>Poetic Stanzas (Separate stanzas with a blank line) *</label>
                  <textarea
                    rows={6}
                    required
                    placeholder="Stanza 1...\n\nStanza 2..."
                    value={newPoem.stanzas}
                    onChange={(e) => setNewPoem({ ...newPoem, stanzas: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn-royal" style={{ marginTop: '1rem' }}>
                  <Plus size={16} />
                  <span>Save Poem</span>
                </button>
              </form>
            )}

            <div style={{ overflowX: 'auto' }}>
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Published Book</th>
                    <th>Category</th>
                    <th>Appreciations</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {poems.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{ textAlign: 'center', color: '#7D6B6E', padding: '2.5rem' }}>
                        वर्तमान में कोई कविता उपलब्ध नहीं है।
                      </td>
                    </tr>
                  ) : (
                    poems.map(p => (
                      <tr key={p.id}>
                        <td style={{ fontWeight: 700 }}>{p.title}</td>
                        <td>{p.poet}</td>
                        <td>{p.book || '—'}</td>
                        <td><span className="royal-tag">{p.category}</span></td>
                        <td>{p.likes || 0}</td>
                        <td>
                          <button
                            className="btn-table-del"
                            onClick={() => deletePoem(p.id)}
                            title="Delete Poem"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ==========================================
            TAB 6: MASTER QUOTES
        ========================================== */}
        {activeTab === 'quotes' && (
          <div className="admin-panel-content">
            <div className="panel-top-bar">
              <h2 className="panel-heading">सूक्तियां व उद्धरण (Curated Master Quotes)</h2>
              <button className="btn-royal" onClick={() => setShowAddQuote(!showAddQuote)}>
                <Plus size={16} />
                <span>{showAddQuote ? 'Close Form' : 'Add New Quote'}</span>
              </button>
            </div>

            {showAddQuote && (
              <form onSubmit={handleCreateQuote} className="admin-form-modal">
                <h3 className="modal-title">Archive Master Author Quote</h3>
                <div className="form-row-full">
                  <label>Quote Content *</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Enter quote here..."
                    value={newQuote.quote}
                    onChange={(e) => setNewQuote({ ...newQuote, quote: e.target.value })}
                  />
                </div>

                <div className="modal-grid">
                  <div className="form-row-full">
                    <label>Original Author *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mirza Ghalib / Rumi"
                      value={newQuote.author}
                      onChange={(e) => setNewQuote({ ...newQuote, author: e.target.value })}
                    />
                  </div>
                  <div className="form-row-full">
                    <label>Source Volume</label>
                    <input
                      type="text"
                      placeholder="e.g. Diwan-e-Ghalib"
                      value={newQuote.sourceBook}
                      onChange={(e) => setNewQuote({ ...newQuote, sourceBook: e.target.value })}
                    />
                  </div>
                  <div className="form-row-full">
                    <label>Curated By</label>
                    <select
                      value={newQuote.curatedBy}
                      onChange={(e) => setNewQuote({ ...newQuote, curatedBy: e.target.value })}
                    >
                      <option value="Kanchan Lata Jaiswal">Kanchan Lata Jaiswal</option>
                      <option value="Garima Singh">Garima Singh</option>
                      <option value="Kanchan Lata Jaiswal & Garima Singh">Both Poets</option>
                    </select>
                  </div>
                </div>

                <button type="submit" className="btn-royal" style={{ marginTop: '1rem' }}>
                  <Plus size={16} />
                  <span>Save Quote</span>
                </button>
              </form>
            )}

            <div style={{ overflowX: 'auto' }}>
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th>Quote</th>
                    <th>Author</th>
                    <th>Source Book</th>
                    <th>Curator</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {quotes.length === 0 ? (
                    <tr>
                      <td colSpan={5} style={{ textAlign: 'center', color: '#7D6B6E', padding: '2.5rem' }}>
                        वर्तमान में कोई सूक्ति उपलब्ध नहीं है।
                      </td>
                    </tr>
                  ) : (
                    quotes.map(q => (
                      <tr key={q.id}>
                        <td style={{ maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          "{q.quote}"
                        </td>
                        <td style={{ fontWeight: 700 }}>{q.author}</td>
                        <td>{q.sourceBook || '—'}</td>
                        <td>{q.curatedBy}</td>
                        <td>
                          <button
                            className="btn-table-del"
                            onClick={() => deleteQuote(q.id)}
                            title="Delete Quote"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ==========================================
            TAB 7: GALLERY MANAGEMENT
        ========================================== */}
        {activeTab === 'gallery' && (
          <div className="admin-panel-content">
            <div className="panel-top-bar">
              <h2 className="panel-heading">चित्र दीर्घा (Gallery Management)</h2>
              <button className="btn-royal" onClick={() => setShowAddGallery(!showAddGallery)}>
                <Plus size={16} />
                <span>{showAddGallery ? 'Close Form' : 'चित्र जोड़ें / Add Photo'}</span>
              </button>
            </div>

            {showAddGallery && (
              <form onSubmit={handleCreateGalleryItem} className="admin-form-modal">
                <h3 className="modal-title">नई फोटो / स्मृति जोड़ें (Add Gallery Photo)</h3>

                {/* Aspect Ratio Selector */}
                <div className="form-row-full" style={{ marginBottom: '1.2rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.6rem', fontWeight: 700 }}>
                    फोटो ओरिएंटेशन / Aspect Ratio चुनें *
                  </label>
                  <div className="aspect-ratio-selector">
                    <button
                      type="button"
                      className={`ratio-btn ${newGalleryItem.aspectRatio === '1:1' ? 'active' : ''}`}
                      onClick={() => setNewGalleryItem({ ...newGalleryItem, aspectRatio: '1:1' })}
                    >
                      <div className="ratio-box square" />
                      <div className="ratio-text">
                        <strong>1:1 Square</strong>
                        <span>वर्गाकार (पोर्ट्रेट / क्लोज-अप)</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      className={`ratio-btn ${newGalleryItem.aspectRatio === '16:9' ? 'active' : ''}`}
                      onClick={() => setNewGalleryItem({ ...newGalleryItem, aspectRatio: '16:9' })}
                    >
                      <div className="ratio-box wide" />
                      <div className="ratio-text">
                        <strong>16:9 Landscape</strong>
                        <span>क्षैतिज (स्टेज शो / ग्रुप फोटो)</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      className={`ratio-btn ${newGalleryItem.aspectRatio === '9:16' ? 'active' : ''}`}
                      onClick={() => setNewGalleryItem({ ...newGalleryItem, aspectRatio: '9:16' })}
                    >
                      <div className="ratio-box tall" />
                      <div className="ratio-text">
                        <strong>9:16 Portrait</strong>
                        <span>लंबवत (रील / फुल बॉडी)</span>
                      </div>
                    </button>
                  </div>
                </div>

                <div className="modal-grid">
                  <div className="form-row-full">
                    <label>शीर्षक / Event Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="उदा. साहित्य कुंभ — काव्य पाठ"
                      value={newGalleryItem.title}
                      onChange={(e) => setNewGalleryItem({ ...newGalleryItem, title: e.target.value })}
                    />
                  </div>

                  <div className="form-row-full">
                    <label>श्रेणी / Category *</label>
                    <select
                      value={newGalleryItem.category}
                      onChange={(e) => setNewGalleryItem({ ...newGalleryItem, category: e.target.value })}
                    >
                      <option value="stage">मंच प्रस्तुतियाँ (Stage Performance)</option>
                      <option value="launch">पुस्तक विमोचन (Book Launch)</option>
                      <option value="meet">साहित्यिक गोष्ठी (Literary Meet)</option>
                      <option value="awards">सम्मान (Awards & Honors)</option>
                      <option value="workshop">कार्यशाला (Workshop)</option>
                    </select>
                  </div>

                  <div className="form-row-full">
                    <label>माह / वर्ष (Date)</label>
                    <input
                      type="text"
                      placeholder="उदा. फरवरी 2026"
                      value={newGalleryItem.date}
                      onChange={(e) => setNewGalleryItem({ ...newGalleryItem, date: e.target.value })}
                    />
                  </div>

                  <div className="form-row-full">
                    <label>स्थान (Location)</label>
                    <input
                      type="text"
                      placeholder="उदा. नई दिल्ली / लखनऊ"
                      value={newGalleryItem.location}
                      onChange={(e) => setNewGalleryItem({ ...newGalleryItem, location: e.target.value })}
                    />
                  </div>
                </div>

                {/* Photo File Upload or URL */}
                <div className="modal-grid" style={{ marginTop: '0.8rem' }}>
                  <div className="form-row-full">
                    <label>फोटो फ़ाइल चुनें (Upload Image File)</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setGalleryImageFile(file);
                          setGalleryImagePreview(URL.createObjectURL(file));
                        }
                      }}
                    />
                  </div>

                  <div className="form-row-full">
                    <label>या इमेज URL दर्ज करें (Image URL)</label>
                    <input
                      type="text"
                      placeholder="https://... या /assets/..."
                      value={newGalleryItem.image}
                      onChange={(e) => {
                        setNewGalleryItem({ ...newGalleryItem, image: e.target.value });
                        setGalleryImagePreview(e.target.value);
                      }}
                    />
                  </div>
                </div>

                {/* Live Preview */}
                {(galleryImagePreview || newGalleryItem.image) && (
                  <div className="admin-img-preview-wrap" style={{ marginTop: '1rem' }}>
                    <span className="preview-label" style={{ fontWeight: 700, fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>
                      Live Preview ({newGalleryItem.aspectRatio}):
                    </span>
                    <div
                      className="preview-img-container"
                      style={{
                        width: '200px',
                        aspectRatio: newGalleryItem.aspectRatio === '16:9' ? '16/9' : newGalleryItem.aspectRatio === '9:16' ? '9/16' : '1/1',
                        overflow: 'hidden',
                        borderRadius: '10px',
                        border: '2px solid #C5A059',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                      }}
                    >
                      <img
                        src={galleryImagePreview || newGalleryItem.image}
                        alt="Preview"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  </div>
                )}

                <div className="form-row-full" style={{ marginTop: '0.8rem' }}>
                  <label>विवरण / संक्षिप्त कैप्शन (Caption)</label>
                  <textarea
                    rows={2}
                    placeholder="फोटो के संबंध में एक-दो पंक्तियों का संक्षिप्त विवरण..."
                    value={newGalleryItem.caption}
                    onChange={(e) => setNewGalleryItem({ ...newGalleryItem, caption: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-royal"
                  disabled={uploadingGalleryImg}
                  style={{ marginTop: '1.2rem' }}
                >
                  <Plus size={16} />
                  <span>{uploadingGalleryImg ? 'Uploading Photo...' : 'Save to Gallery'}</span>
                </button>
              </form>
            )}

            {/* Gallery Items Table */}
            <div style={{ overflowX: 'auto' }}>
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th>Preview</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Orientation</th>
                    <th>Date & Location</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {gallery.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{ textAlign: 'center', color: '#7D6B6E', padding: '2.5rem' }}>
                        चित्र दीर्घा में वर्तमान में कोई फोटो उपलब्ध नहीं है। ऊपर "चित्र जोड़ें" बटन दबाकर नई फोटो अपलोड करें।
                      </td>
                    </tr>
                  ) : (
                    gallery.map(item => (
                      <tr key={item.id}>
                        <td>
                          <div style={{ width: '48px', height: '48px', borderRadius: '6px', overflow: 'hidden', background: '#f0e6e6' }}>
                            <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                        </td>
                        <td style={{ fontWeight: 700 }}>{item.title}</td>
                        <td><span className="royal-tag">{item.category}</span></td>
                        <td>
                          <span className="royal-tag gold" style={{ fontSize: '0.7rem' }}>
                            {item.aspectRatio || '1:1'}
                          </span>
                        </td>
                        <td>{item.date} {item.location ? `• ${item.location}` : ''}</td>
                        <td>
                          <button
                            className="btn-table-del"
                            onClick={() => deleteGalleryItem(item.id)}
                            title="Delete Image"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ==========================================
            TAB 8: READER SUBMISSIONS
        ========================================== */}
        {activeTab === 'submissions' && (
          <div className="admin-panel-content">
            <div className="panel-top-bar">
              <h2 className="panel-heading">Reader Submissions & Moderation</h2>
              <span className="royal-tag">{submissions.length} Total</span>
            </div>

            {submissions.length === 0 ? (
              <p style={{ color: '#7D6B6E', textAlign: 'center', padding: '3rem' }}>
                No pending reader poetry submissions at this time.
              </p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table className="admin-data-table">
                  <thead>
                    <tr>
                      <th>Poet Name</th>
                      <th>City & Contact</th>
                      <th>Poem Title & Category</th>
                      <th>Excerpt</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.map(sub => (
                      <tr key={sub.id}>
                        <td style={{ fontWeight: 700 }}>{sub.poetName}</td>
                        <td>
                          <div>{sub.city || '—'}</div>
                          <div style={{ fontSize: '0.8rem', color: '#7D6B6E' }}>{sub.email}</div>
                        </td>
                        <td>
                          <div style={{ fontWeight: 600 }}>{sub.title}</div>
                          <span className="royal-tag" style={{ fontSize: '0.7rem' }}>{sub.category}</span>
                        </td>
                        <td style={{ maxWidth: '240px', fontSize: '0.85rem' }}>
                          {sub.poemText?.slice(0, 80)}...
                        </td>
                        <td>
                          <span className={`royal-tag ${sub.status === 'approved' ? 'gold' : ''}`}>
                            {sub.status}
                          </span>
                        </td>
                        <td>
                          <div className="table-actions-cell">
                            {sub.status !== 'approved' && (
                              <button
                                className="btn-table-edit"
                                onClick={() => approveSubmission(sub.id)}
                                title="Approve & Publish to Poetry Catalog"
                              >
                                <Check size={14} />
                              </button>
                            )}
                            <button
                              className="btn-table-del"
                              onClick={() => deleteSubmission(sub.id)}
                              title="Delete Submission"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ==========================================
            TAB 9: INQUIRIES & CORRESPONDENCE
        ========================================== */}
        {activeTab === 'inquiries' && (
          <div className="admin-panel-content">
            <div className="panel-top-bar">
              <h2 className="panel-heading">Inquiries & Correspondence Inbox</h2>
              <span className="royal-tag">{inquiries.length} Total Messages</span>
            </div>

            {inquiries.length === 0 ? (
              <p style={{ color: '#7D6B6E', textAlign: 'center', padding: '3rem' }}>
                No active invitations or reader letters at this time.
              </p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table className="admin-data-table">
                  <thead>
                    <tr>
                      <th>Sender Name</th>
                      <th>Contact (Email / Phone)</th>
                      <th>Event Type</th>
                      <th>City</th>
                      <th>Message</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inquiries.map(inq => (
                      <tr key={inq.id}>
                        <td style={{ fontWeight: 700 }}>{inq.name}</td>
                        <td>
                          <div>{inq.email}</div>
                          <div style={{ fontSize: '0.8rem', color: '#7D6B6E' }}>{inq.phone}</div>
                        </td>
                        <td><span className="royal-tag">{inq.eventType}</span></td>
                        <td>{inq.city || '—'}</td>
                        <td style={{ maxWidth: '250px', fontSize: '0.85rem' }}>{inq.message}</td>
                        <td>
                          <button
                            style={{
                              padding: '0.25rem 0.65rem',
                              borderRadius: '999px',
                              border: 'none',
                              fontSize: '0.78rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              background: inq.status === 'read' ? '#E8F5E9' : '#FFF3E0',
                              color: inq.status === 'read' ? '#2E7D32' : '#E65100'
                            }}
                            onClick={() => updateInquiryStatus(inq.id, inq.status === 'read' ? 'pending' : 'read')}
                          >
                            {inq.status === 'read' ? 'Reviewed' : 'Pending'}
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn-table-del"
                            onClick={() => deleteInquiry(inq.id)}
                            title="Delete Entry"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Change Admin Password Modal */}
        <AnimatePresence>
          {isPasswordModalOpen && (
            <div className="admin-modal-backdrop" onClick={() => setIsPasswordModalOpen(false)}>
              <motion.div
                className="admin-modal-card change-password-modal"
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="modal-header">
                  <div className="modal-title-wrap">
                    <div className="modal-icon-badge">
                      <Key size={20} />
                    </div>
                    <div>
                      <h3 className="modal-title">प्रशासक पासवर्ड बदलें</h3>
                      <p className="modal-subtitle">Change Admin Password</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="modal-close-btn"
                    onClick={() => setIsPasswordModalOpen(false)}
                  >
                    <X size={18} />
                  </button>
                </div>

                <form onSubmit={handleChangePasswordSubmit} className="change-password-form">
                  {passChangeSuccess && (
                    <div className="alert-box-success" style={{ marginBottom: '1rem' }}>
                      {passChangeSuccess}
                    </div>
                  )}
                  {passChangeError && (
                    <div className="alert-box-error" style={{ marginBottom: '1rem' }}>
                      {passChangeError}
                    </div>
                  )}

                  <div className="form-field">
                    <label>वर्तमान पासवर्ड (Current Password) *</label>
                    <div className="password-input-wrap">
                      <input
                        type={showCurrentPass ? 'text' : 'password'}
                        required
                        placeholder="वर्तमान पासवर्ड दर्ज करें"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        className="toggle-pass-visibility"
                        onClick={() => setShowCurrentPass(!showCurrentPass)}
                        tabIndex={-1}
                      >
                        {showCurrentPass ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div className="form-field">
                    <label>नया पासवर्ड (New Password) *</label>
                    <div className="password-input-wrap">
                      <input
                        type={showNewPass ? 'text' : 'password'}
                        required
                        placeholder="नया पासवर्ड (न्यूनतम 6 अक्षर)"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        className="toggle-pass-visibility"
                        onClick={() => setShowNewPass(!showNewPass)}
                        tabIndex={-1}
                      >
                        {showNewPass ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div className="form-field">
                    <label>नया पासवर्ड पुनः दर्ज करें (Confirm Password) *</label>
                    <div className="password-input-wrap">
                      <input
                        type={showConfirmPass ? 'text' : 'password'}
                        required
                        placeholder="नया पासवर्ड पुनः दर्ज करें"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        className="toggle-pass-visibility"
                        onClick={() => setShowConfirmPass(!showConfirmPass)}
                        tabIndex={-1}
                      >
                        {showConfirmPass ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div className="modal-actions-footer">
                    <button
                      type="button"
                      className="btn-royal-outline"
                      onClick={() => setIsPasswordModalOpen(false)}
                      disabled={passChangeLoading}
                    >
                      रद्द करें (Cancel)
                    </button>
                    <button
                      type="submit"
                      className="btn-royal"
                      disabled={passChangeLoading}
                    >
                      <Save size={16} />
                      <span>{passChangeLoading ? 'अपडेट हो रहा है...' : 'पासवर्ड अपडेट करें'}</span>
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Admin;
