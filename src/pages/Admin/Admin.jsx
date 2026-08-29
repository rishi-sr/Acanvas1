import React, { useState, useEffect } from 'react';
import {
  Lock,
  Unlock,
  LogOut,
  Plus,
  Trash2,
  Download,
  RefreshCw,
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
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useContent } from '../../context/ContentContext';
import './Admin.scss';

const Admin = () => {
  const {
    authors,
    poems,
    books,
    quotes,
    submissions,
    inquiries,
    systemStatus,
    isAdminLoggedIn,
    adminLogin,
    adminLogout,
    updateAuthorProfile,
    uploadAuthorAvatar,
    addPoem,
    deletePoem,
    addBook,
    deleteBook,
    addQuote,
    deleteQuote,
    approveSubmission,
    updateSubmissionStatus,
    deleteSubmission,
    updateInquiryStatus,
    deleteInquiry,
    exportDatabase,
    resetToDefaults
  } = useContent();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('authors');

  // Author Management State
  const [selectedAuthorId, setSelectedAuthorId] = useState('kanchan');
  const [authorForm, setAuthorForm] = useState(authors.kanchan || {});
  const [authorSaveMsg, setAuthorSaveMsg] = useState('');
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  // Sync author form when author tab or author state changes
  useEffect(() => {
    if (authors && authors[selectedAuthorId]) {
      setAuthorForm(authors[selectedAuthorId]);
    }
  }, [selectedAuthorId, authors]);

  // Form states for adding items
  const [showAddPoem, setShowAddPoem] = useState(false);
  const [newPoem, setNewPoem] = useState({
    title: '',
    titleHindi: '',
    poet: 'Kanchan Lata Jaiswal',
    book: 'Echoes of the Inner Mind',
    category: 'Life Philosophy',
    stanzas: '',
    featured: true
  });

  const [showAddBook, setShowAddBook] = useState(false);
  const [newBook, setNewBook] = useState({
    title: '',
    author: 'Kanchan Lata Jaiswal',
    status: 'published',
    year: '2026',
    publisher: 'Vani Prakashan',
    pages: 200,
    isbn: '978-93-XXXXX-XX-X',
    price: '$14.99 / ₹299',
    tagline: '',
    synopsis: '',
    sampleExcerpt: '',
    coverGradient: 'linear-gradient(145deg, #8B0000 0%, #3B050B 100%)'
  });

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
      setAuthorSaveMsg('✅ Author profile saved and updated live across the platform!');
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
      setAuthorSaveMsg('✅ Author photo uploaded successfully!');
      setTimeout(() => setAuthorSaveMsg(''), 4000);
    } else {
      setAuthorSaveMsg(`❌ ${res.message}`);
    }
  };

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

  const handleCreateBook = async (e) => {
    e.preventDefault();
    if (!newBook.title) return;
    await addBook(newBook);
    setShowAddBook(false);
  };

  const handleCreateQuote = async (e) => {
    e.preventDefault();
    if (!newQuote.quote || !newQuote.author) return;

    await addQuote({
      ...newQuote,
      tags: newQuote.tags.split(',').map(t => t.trim())
    });
    setShowAddQuote(false);
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
            <p className="login-sub">Secure Literary Content & Inquiries Management Portal</p>

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
              🛡️ <strong>Encrypted JWT Authorization</strong> & Rate Limiting Active
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
            <span className="dash-subtitle">Authors, Poetry Catalog, Reader Submissions & Correspondence</span>
          </div>

          <div className="dash-actions">
            <button className="btn-royal-outline" onClick={exportDatabase} title="Export JSON Database">
              <Download size={15} />
              <span>Export Backup</span>
            </button>
            <button className="btn-royal-outline" onClick={resetToDefaults} title="Reset to default seed dataset">
              <RefreshCw size={15} />
              <span>Reset</span>
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
            <span className="status-chip live">Rate Limiting (Active)</span>
            <span className="status-chip live">Bot Traps (Active)</span>
          </div>

          <div className="status-group">
            <span><Mail size={14} color="#C5A059" style={{ verticalAlign: 'middle', marginRight: '4px' }} /><strong>Email Dispatcher:</strong></span>
            <span className={`status-chip ${systemStatus?.emailService?.mode === 'live_smtp' ? 'live' : 'notice'}`}>
              {systemStatus?.emailService?.mode === 'live_smtp' ? 'Live SMTP Ready' : 'Simulated Logger Mode'}
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="admin-tabs-nav">
          <button
            className={`admin-tab-btn ${activeTab === 'authors' ? 'active' : ''}`}
            onClick={() => setActiveTab('authors')}
          >
            <Users size={16} />
            <span>Manage Authors ({Object.keys(authors || {}).filter(k => k !== 'synergy').length})</span>
          </button>
          <button
            className={`admin-tab-btn ${activeTab === 'submissions' ? 'active' : ''}`}
            onClick={() => setActiveTab('submissions')}
          >
            <Sparkles size={16} />
            <span>Reader Submissions ({submissions.length})</span>
          </button>
          <button
            className={`admin-tab-btn ${activeTab === 'poems' ? 'active' : ''}`}
            onClick={() => setActiveTab('poems')}
          >
            <Feather size={16} />
            <span>Poetry Catalog ({poems.length})</span>
          </button>
          <button
            className={`admin-tab-btn ${activeTab === 'books' ? 'active' : ''}`}
            onClick={() => setActiveTab('books')}
          >
            <BookOpen size={16} />
            <span>Books ({books.length})</span>
          </button>
          <button
            className={`admin-tab-btn ${activeTab === 'quotes' ? 'active' : ''}`}
            onClick={() => setActiveTab('quotes')}
          >
            <Quote size={16} />
            <span>Master Quotes ({quotes.length})</span>
          </button>
          <button
            className={`admin-tab-btn ${activeTab === 'inquiries' ? 'active' : ''}`}
            onClick={() => setActiveTab('inquiries')}
          >
            <Inbox size={16} />
            <span>Inquiries ({inquiries.length})</span>
          </button>
        </div>

        {/* TAB 0: AUTHORS MANAGEMENT */}
        {activeTab === 'authors' && (
          <div className="admin-panel-content">
            <div className="panel-top-bar">
              <h2 className="panel-heading">Authors & Literary Bios Profile Manager</h2>
            </div>

            {/* Author Switcher */}
            <div className="author-select-pills">
              <button
                type="button"
                className={`author-pill-btn ${selectedAuthorId === 'kanchan' ? 'active' : ''}`}
                onClick={() => setSelectedAuthorId('kanchan')}
              >
                Kanchan Lata Jaiswal (कंचन लता जायसवाल)
              </button>
              <button
                type="button"
                className={`author-pill-btn ${selectedAuthorId === 'garima' ? 'active' : ''}`}
                onClick={() => setSelectedAuthorId('garima')}
              >
                Garima Singh (गरिमा सिंह)
              </button>
            </div>

            {authorSaveMsg && (
              <div style={{ padding: '0.8rem 1.2rem', marginBottom: '1.5rem', borderRadius: '6px', background: '#E8F5E9', color: '#2E7D32', fontWeight: 600 }}>
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

                <div className="author-intro-inputs">
                  <div className="form-row-full">
                    <label>Author Name (English) *</label>
                    <input
                      type="text"
                      required
                      value={authorForm.name || ''}
                      onChange={(e) => setAuthorForm({ ...authorForm, name: e.target.value })}
                    />
                  </div>
                  <div className="form-row-full">
                    <label>Author Name (Hindi / देवनागरी) *</label>
                    <input
                      type="text"
                      required
                      value={authorForm.nameHindi || ''}
                      onChange={(e) => setAuthorForm({ ...authorForm, nameHindi: e.target.value })}
                    />
                  </div>
                  <div className="form-row-full">
                    <label>Designation / Title (English) *</label>
                    <input
                      type="text"
                      required
                      value={authorForm.title || ''}
                      onChange={(e) => setAuthorForm({ ...authorForm, title: e.target.value })}
                    />
                  </div>
                  <div className="form-row-full">
                    <label>Designation / Title (Hindi)</label>
                    <input
                      type="text"
                      value={authorForm.titleHindi || ''}
                      onChange={(e) => setAuthorForm({ ...authorForm, titleHindi: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="editor-section-divider">Signature Quote & Short Summary</div>

              <div className="form-row-full">
                <label>Signature Quote (English)</label>
                <textarea
                  rows={2}
                  value={authorForm.signatureQuote || ''}
                  onChange={(e) => setAuthorForm({ ...authorForm, signatureQuote: e.target.value })}
                />
              </div>

              <div className="form-row-full">
                <label>Signature Quote (Hindi / देवनागरी)</label>
                <textarea
                  rows={2}
                  value={authorForm.signatureQuoteHindi || ''}
                  onChange={(e) => setAuthorForm({ ...authorForm, signatureQuoteHindi: e.target.value })}
                />
              </div>

              <div className="editor-section-divider">Full Literary Biography & Background</div>

              <div className="form-row-full">
                <label>Full Biography Paragraphs (English - Separate paragraphs with a blank line)</label>
                <textarea
                  rows={5}
                  value={Array.isArray(authorForm.fullBio) ? authorForm.fullBio.join('\n\n') : (authorForm.fullBio || '')}
                  onChange={(e) => setAuthorForm({
                    ...authorForm,
                    fullBio: e.target.value.split('\n\n').filter(p => p.trim())
                  })}
                />
              </div>

              <div className="form-row-full">
                <label>Full Biography Paragraphs (Hindi / देवनागरी - Separate paragraphs with a blank line)</label>
                <textarea
                  rows={5}
                  value={Array.isArray(authorForm.fullBioHindi) ? authorForm.fullBioHindi.join('\n\n') : (authorForm.fullBioHindi || '')}
                  onChange={(e) => setAuthorForm({
                    ...authorForm,
                    fullBioHindi: e.target.value.split('\n\n').filter(p => p.trim())
                  })}
                />
              </div>

              <div className="editor-section-divider">Poetic Philosophy (काव्य दर्शन)</div>

              <div className="form-row-full">
                <label>Philosophy (English)</label>
                <textarea
                  rows={2}
                  value={authorForm.philosophy || ''}
                  onChange={(e) => setAuthorForm({ ...authorForm, philosophy: e.target.value })}
                />
              </div>

              <div className="form-row-full">
                <label>Philosophy (Hindi / देवनागरी)</label>
                <textarea
                  rows={2}
                  value={authorForm.philosophyHindi || ''}
                  onChange={(e) => setAuthorForm({ ...authorForm, philosophyHindi: e.target.value })}
                />
              </div>

              <div className="editor-section-divider">Statistics & Contact</div>

              <div className="modal-grid">
                <div className="form-row-full">
                  <label>Published Books Count</label>
                  <input
                    type="number"
                    value={authorForm.stats?.publishedBooks || 0}
                    onChange={(e) => setAuthorForm({
                      ...authorForm,
                      stats: { ...(authorForm.stats || {}), publishedBooks: parseInt(e.target.value, 10) || 0 }
                    })}
                  />
                </div>
                <div className="form-row-full">
                  <label>Poems / Ghazals Count</label>
                  <input
                    type="text"
                    value={authorForm.stats?.poemsCount || '350+'}
                    onChange={(e) => setAuthorForm({
                      ...authorForm,
                      stats: { ...(authorForm.stats || {}), poemsCount: e.target.value }
                    })}
                  />
                </div>
                <div className="form-row-full">
                  <label>Literary Dedication / Experience</label>
                  <input
                    type="text"
                    value={authorForm.stats?.experience || '25+ Years'}
                    onChange={(e) => setAuthorForm({
                      ...authorForm,
                      stats: { ...(authorForm.stats || {}), experience: e.target.value }
                    })}
                  />
                </div>
                <div className="form-row-full">
                  <label>Official Email</label>
                  <input
                    type="email"
                    value={authorForm.social?.email || ''}
                    onChange={(e) => setAuthorForm({
                      ...authorForm,
                      social: { ...(authorForm.social || {}), email: e.target.value }
                    })}
                  />
                </div>
              </div>

              <button type="submit" className="btn-royal" style={{ marginTop: '1.5rem', padding: '0.9rem 2rem' }}>
                <Save size={16} />
                <span>Save Author Profile Changes</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 1: READER SUBMISSIONS */}
        {activeTab === 'submissions' && (
          <div className="admin-panel-content">
            <div className="panel-top-bar">
              <h2 className="panel-heading">Reader Poetry Submissions Inbox</h2>
              <span className="royal-tag">{submissions.length} Submissions</span>
            </div>

            {submissions.length === 0 ? (
              <p style={{ color: '#7D6B6E', textAlign: 'center', padding: '3rem' }}>
                No reader poetry submissions currently waiting for review.
              </p>
            ) : (
              <div className="submissions-grid">
                {submissions.map(sub => (
                  <div key={sub.id} className="submission-item-card">
                    <div className="sub-top">
                      <h3 className="sub-title">"{sub.title}"</h3>
                      <span className={`royal-tag ${sub.status === 'approved' ? 'gold' : ''}`}>
                        {sub.status.toUpperCase()}
                      </span>
                    </div>

                    <div className="sub-meta-row">
                      <span><strong>Poet:</strong> {sub.poetName}</span>
                      <span><strong>City:</strong> {sub.city || 'N/A'}</span>
                      <span><strong>Email:</strong> {sub.email || 'N/A'}</span>
                      <span><strong>Category:</strong> {sub.category}</span>
                      <span><strong>Date:</strong> {new Date(sub.submittedAt).toLocaleDateString()}</span>
                    </div>

                    <div className="sub-verses-box">
                      {sub.poemText}
                    </div>

                    {sub.reflection && (
                      <p style={{ fontSize: '0.88rem', fontStyle: 'italic', color: '#666', marginBottom: '1.2rem' }}>
                        <strong>Poet's Note:</strong> {sub.reflection}
                      </p>
                    )}

                    <div className="sub-actions-row">
                      {sub.status !== 'approved' && (
                        <button
                          className="btn-royal"
                          style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                          onClick={() => approveSubmission(sub.id)}
                        >
                          <CheckCircle size={15} />
                          <span>Approve & Publish to Gallery</span>
                        </button>
                      )}
                      <button
                        className="btn-table-del"
                        onClick={() => deleteSubmission(sub.id)}
                        title="Delete Submission"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: POEMS */}
        {activeTab === 'poems' && (
          <div className="admin-panel-content">
            <div className="panel-top-bar">
              <h2 className="panel-heading">Poetry Directory</h2>
              <button className="btn-royal" onClick={() => setShowAddPoem(!showAddPoem)}>
                <Plus size={16} />
                <span>{showAddPoem ? 'Close Form' : 'Add New Poem'}</span>
              </button>
            </div>

            {showAddPoem && (
              <form onSubmit={handleCreatePoem} className="admin-form-modal">
                <h3 className="modal-title">Publish New Composition</h3>
                <div className="modal-grid">
                  <div className="form-row-full">
                    <label>Poem Title (English) *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Whispers of Horizon"
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
                      placeholder="e.g. Echoes of the Inner Mind"
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

                <div className="form-row-full">
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
                  {poems.map(p => (
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
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: BOOKS */}
        {activeTab === 'books' && (
          <div className="admin-panel-content">
            <div className="panel-top-bar">
              <h2 className="panel-heading">Books Management</h2>
              <button className="btn-royal" onClick={() => setShowAddBook(!showAddBook)}>
                <Plus size={16} />
                <span>{showAddBook ? 'Close Form' : 'Add New Book'}</span>
              </button>
            </div>

            {showAddBook && (
              <form onSubmit={handleCreateBook} className="admin-form-modal">
                <h3 className="modal-title">Enter Book Details</h3>
                <div className="modal-grid">
                  <div className="form-row-full">
                    <label>Book Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Echoes of the Inner Mind"
                      value={newBook.title}
                      onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                    />
                  </div>
                  <div className="form-row-full">
                    <label>Author(s) *</label>
                    <input
                      type="text"
                      required
                      value={newBook.author}
                      onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                    />
                  </div>
                  <div className="form-row-full">
                    <label>Status</label>
                    <select
                      value={newBook.status}
                      onChange={(e) => setNewBook({ ...newBook, status: e.target.value })}
                    >
                      <option value="published">Published</option>
                      <option value="upcoming">Upcoming</option>
                    </select>
                  </div>
                  <div className="form-row-full">
                    <label>Release Year / Expected Date</label>
                    <input
                      type="text"
                      value={newBook.year}
                      onChange={(e) => setNewBook({ ...newBook, year: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row-full">
                  <label>Book Synopsis</label>
                  <textarea
                    rows={3}
                    value={newBook.synopsis}
                    onChange={(e) => setNewBook({ ...newBook, synopsis: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn-royal" style={{ marginTop: '1rem' }}>
                  <Plus size={16} />
                  <span>Save Book</span>
                </button>
              </form>
            )}

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
                  {books.map(b => (
                    <tr key={b.id}>
                      <td style={{ fontWeight: 700 }}>{b.title}</td>
                      <td>{b.author}</td>
                      <td>
                        <span className={`royal-tag ${b.status === 'upcoming' ? 'gold' : ''}`}>
                          {b.status}
                        </span>
                      </td>
                      <td>{b.publisher}</td>
                      <td>{b.price || '—'}</td>
                      <td>
                        <button
                          className="btn-table-del"
                          onClick={() => deleteBook(b.id)}
                          title="Delete Book"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: QUOTES */}
        {activeTab === 'quotes' && (
          <div className="admin-panel-content">
            <div className="panel-top-bar">
              <h2 className="panel-heading">Curated Master Quotes</h2>
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
                  {quotes.map(q => (
                    <tr key={q.id}>
                      <td style={{ maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        "{q.quote}"
                      </td>
                      <td style={{ fontWeight: 700 }}>{q.author}</td>
                      <td>{q.sourceBook}</td>
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
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: INQUIRIES */}
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
      </div>
    </div>
  );
};

export default Admin;
