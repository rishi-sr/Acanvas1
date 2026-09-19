import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { initialPoems } from '../data/initialPoems';
import { initialBooks } from '../data/initialBooks';
import { initialQuotes } from '../data/initialQuotes';
import { initialGallery } from '../data/initialGallery';
import { poetsData as initialPoetsData } from '../data/poetsData';

const ContentContext = createContext();

const getApiBase = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (!envUrl) return '/api';
  const cleanUrl = envUrl.trim().replace(/\/+$/, '');
  if (cleanUrl.endsWith('/api')) {
    return cleanUrl;
  }
  return `${cleanUrl}/api`;
};

const API_BASE = getApiBase();

const STORAGE_KEYS = {
  TOKEN: 'akshar_auth_token_v3',
  LIKED_ITEMS: 'akshar_liked_items_v3'
};

export const ContentProvider = ({ children }) => {
  // Authors State
  const [authors, setAuthors] = useState(initialPoetsData);

  // Poems State
  const [poems, setPoems] = useState(initialPoems);

  // Books State
  const [books, setBooks] = useState(initialBooks);

  // Workshops State
  const [workshops, setWorkshops] = useState([]);

  // Reports State
  const [reports, setReports] = useState([]);

  // Samkalieen (Contemporary Articles) State
  const [samkalieen, setSamkalieen] = useState([]);

  // Quotes State
  const [quotes, setQuotes] = useState(initialQuotes);

  // Gallery State
  const [gallery, setGallery] = useState(initialGallery);

  // Reader Submissions State (for moderation)
  const [submissions, setSubmissions] = useState([]);

  // Inquiries / Contact Messages State
  const [inquiries, setInquiries] = useState([]);

  // Liked items tracking (stored locally per browser session)
  const [likedItems, setLikedItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LIKED_ITEMS);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // JWT Admin Auth Token
  const [authToken, setAuthToken] = useState(() => {
    return sessionStorage.getItem(STORAGE_KEYS.TOKEN) || localStorage.getItem(STORAGE_KEYS.TOKEN) || null;
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(!!authToken);
  const [systemStatus, setSystemStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Helper for authenticated fetch headers
  const getAuthHeaders = useCallback(() => {
    const headers = { 'Content-Type': 'application/json' };
    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
    }
    return headers;
  }, [authToken]);

  // Sync liked items to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LIKED_ITEMS, JSON.stringify(likedItems));
  }, [likedItems]);

  // Safe JSON fetch helper
  const safeFetchJson = async (url, options = {}) => {
    try {
      const res = await fetch(url, options);
      const contentType = res.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        return { ok: false, data: null };
      }
      const data = await res.json();
      return { ok: res.ok, data };
    } catch {
      return { ok: false, data: null };
    }
  };

  // Initial Data Fetching from Backend
  const refreshAllData = useCallback(async () => {
    try {
      setIsLoading(true);

      // 1. Fetch Authors
      const authRes = await safeFetchJson(`${API_BASE}/authors`);
      if (authRes.ok && authRes.data?.data) {
        setAuthors(authRes.data.data);
      }

      // 2. Fetch Poems
      const poemRes = await safeFetchJson(`${API_BASE}/poems`);
      if (poemRes.ok && Array.isArray(poemRes.data?.data)) {
        setPoems(poemRes.data.data);
      }

      // 3. Fetch Quotes
      const quoteRes = await safeFetchJson(`${API_BASE}/quotes`);
      if (quoteRes.ok && Array.isArray(quoteRes.data?.data)) {
        setQuotes(quoteRes.data.data);
      }

      // 4. Fetch Books
      const bookRes = await safeFetchJson(`${API_BASE}/books`);
      if (bookRes.ok && Array.isArray(bookRes.data?.data)) {
        setBooks(bookRes.data.data);
      }

      // 5. Fetch Workshops
      const wsRes = await safeFetchJson(`${API_BASE}/workshops`);
      if (wsRes.ok && Array.isArray(wsRes.data?.data)) {
        setWorkshops(wsRes.data.data);
      }

      // 6. Fetch Reports
      const repRes = await safeFetchJson(`${API_BASE}/reports`);
      if (repRes.ok && Array.isArray(repRes.data?.data)) {
        setReports(repRes.data.data);
      }

      // 7. Fetch Samkalieen
      const samRes = await safeFetchJson(`${API_BASE}/samkalieen`);
      if (samRes.ok && Array.isArray(samRes.data?.data)) {
        setSamkalieen(samRes.data.data);
      }

      // 8. Fetch Gallery Items
      const galleryRes = await safeFetchJson(`${API_BASE}/gallery`);
      if (galleryRes.ok && Array.isArray(galleryRes.data?.data)) {
        setGallery(galleryRes.data.data);
      }

      // 9. Fetch System Status
      const statusRes = await safeFetchJson(`${API_BASE}/admin/status`);
      if (statusRes.ok && statusRes.data) {
        setSystemStatus(statusRes.data);
      }
    } catch (err) {
      console.warn('Backend API connection offline or pending; using initial datasets.', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch Protected Data when Admin Logs In
  const refreshAdminData = useCallback(async () => {
    if (!authToken) return;
    try {
      // Fetch Inquiries
      const inqRes = await fetch(`${API_BASE}/contact`, {
        headers: getAuthHeaders()
      });
      if (inqRes.ok) {
        const inqData = await inqRes.json();
        if (Array.isArray(inqData.data)) setInquiries(inqData.data);
      }

      // Fetch Submissions
      const subRes = await fetch(`${API_BASE}/submissions`, {
        headers: getAuthHeaders()
      });
      if (subRes.ok) {
        const subData = await subRes.json();
        if (Array.isArray(subData.data)) setSubmissions(subData.data);
      }
    } catch (err) {
      console.error('Failed to fetch admin dashboard datasets:', err);
    }
  }, [authToken, getAuthHeaders]);

  useEffect(() => {
    refreshAllData();
  }, [refreshAllData]);

  useEffect(() => {
    if (isAdminLoggedIn) {
      refreshAdminData();
    }
  }, [isAdminLoggedIn, refreshAdminData]);

  // ==========================================
  // AUTHENTICATION
  // ==========================================
  const adminLogin = async (username, password) => {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const contentType = res.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        return { success: false, message: 'Backend server is starting or unreachable. Please ensure the backend server is running via "npm run dev:all".' };
      }

      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, message: data.message || 'Invalid credentials' };
      }

      const token = data.token;
      setAuthToken(token);
      setIsAdminLoggedIn(true);
      sessionStorage.setItem(STORAGE_KEYS.TOKEN, token);
      localStorage.setItem(STORAGE_KEYS.TOKEN, token);

      return { success: true };
    } catch (err) {
      return { success: false, message: 'Server connection error during login.' };
    }
  };

  const adminLogout = () => {
    setAuthToken(null);
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
  };

  // ==========================================
  // AUTHOR MANAGEMENT
  // ==========================================
  const updateAuthorProfile = async (id, updates) => {
    try {
      const res = await fetch(`${API_BASE}/authors/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(updates)
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to update author profile');
      }

      setAuthors(prev => ({
        ...prev,
        [id]: data.data
      }));

      return { success: true, data: data.data };
    } catch (err) {
      console.error('Author update error:', err);
      // Fallback local state update
      setAuthors(prev => ({
        ...prev,
        [id]: { ...(prev[id] || {}), ...updates }
      }));
      return { success: false, message: err.message };
    }
  };

  const uploadAuthorAvatar = async (id, file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const res = await fetch(`${API_BASE}/authors/${id}/upload-image`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`
        },
        body: formData
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Image upload failed');
      }

      setAuthors(prev => ({
        ...prev,
        [id]: data.data
      }));

      return { success: true, avatarUrl: data.avatarUrl };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  // ==========================================
  // LIKE TOGGLE
  // ==========================================
  const toggleLike = async (type, id) => {
    const key = `${type}_${id}`;
    const isCurrentlyLiked = !!likedItems[key];

    setLikedItems(prev => ({
      ...prev,
      [key]: !isCurrentlyLiked
    }));

    if (type === 'poem') {
      setPoems(prev =>
        prev.map(p => (p.id === id ? { ...p, likes: (p.likes || 0) + (isCurrentlyLiked ? -1 : 1) } : p))
      );
      try {
        await fetch(`${API_BASE}/poems/${id}/like`, { method: 'POST' });
      } catch {}
    } else if (type === 'quote') {
      setQuotes(prev =>
        prev.map(q => (q.id === id ? { ...q, likes: (q.likes || 0) + (isCurrentlyLiked ? -1 : 1) } : q))
      );
      try {
        await fetch(`${API_BASE}/quotes/${id}/like`, { method: 'POST' });
      } catch {}
    }
  };

  // ==========================================
  // POEM CRUD
  // ==========================================
  const addPoem = async (poemData) => {
    try {
      const res = await fetch(`${API_BASE}/poems`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(poemData)
      });

      const data = await res.json();
      if (res.ok && data.data) {
        setPoems(prev => [data.data, ...prev]);
        return data.data;
      }
    } catch {}

    // Fallback local update
    const newPoem = {
      ...poemData,
      id: `poem-${Date.now()}`,
      likes: 0,
      date: new Date().toISOString().split('T')[0]
    };
    setPoems(prev => [newPoem, ...prev]);
    return newPoem;
  };

  const updatePoem = async (id, updatedFields) => {
    try {
      await fetch(`${API_BASE}/poems/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(updatedFields)
      });
    } catch {}

    setPoems(prev => prev.map(p => (p.id === id ? { ...p, ...updatedFields } : p)));
  };

  const deletePoem = async (id) => {
    try {
      await fetch(`${API_BASE}/poems/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
    } catch {}

    setPoems(prev => prev.filter(p => p.id !== id));
  };

  // ==========================================
  // BOOK CRUD
  // ==========================================
  const addBook = async (bookData) => {
    try {
      const res = await fetch(`${API_BASE}/books`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(bookData)
      });
      const data = await res.json();
      if (res.ok && data.data) {
        setBooks(prev => [data.data, ...prev]);
        return data.data;
      }
    } catch {}

    const newBook = { ...bookData, id: `book-${Date.now()}` };
    setBooks(prev => [newBook, ...prev]);
    return newBook;
  };

  const updateBook = async (id, updatedFields) => {
    try {
      await fetch(`${API_BASE}/books/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(updatedFields)
      });
    } catch {}

    setBooks(prev => prev.map(b => (b.id === id ? { ...b, ...updatedFields } : b)));
  };

  const deleteBook = async (id) => {
    try {
      await fetch(`${API_BASE}/books/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
    } catch {}

    setBooks(prev => prev.filter(b => b.id !== id));
  };

  // ==========================================
  // QUOTE CRUD
  // ==========================================
  const addQuote = async (quoteData) => {
    try {
      const res = await fetch(`${API_BASE}/quotes`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(quoteData)
      });
      const data = await res.json();
      if (res.ok && data.data) {
        setQuotes(prev => [data.data, ...prev]);
        return data.data;
      }
    } catch {}

    const newQuote = {
      ...quoteData,
      id: `quote-${Date.now()}`,
      likes: 0,
      dateAdded: new Date().toISOString().split('T')[0]
    };
    setQuotes(prev => [newQuote, ...prev]);
    return newQuote;
  };

  const updateQuote = async (id, updatedFields) => {
    try {
      await fetch(`${API_BASE}/quotes/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(updatedFields)
      });
    } catch {}

    setQuotes(prev => prev.map(q => (q.id === id ? { ...q, ...updatedFields } : q)));
  };

  const deleteQuote = async (id) => {
    try {
      await fetch(`${API_BASE}/quotes/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
    } catch {}

    setQuotes(prev => prev.filter(q => q.id !== id));
  };

  // ==========================================
  // GALLERY CRUD
  // ==========================================
  const addGalleryItem = async (itemData) => {
    try {
      const res = await fetch(`${API_BASE}/gallery`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(itemData)
      });
      const data = await res.json();
      if (res.ok && data.data) {
        setGallery(prev => [data.data, ...prev]);
        return data.data;
      }
    } catch {}

    const newItem = {
      ...itemData,
      id: `gallery-${Date.now()}`
    };
    setGallery(prev => [newItem, ...prev]);
    return newItem;
  };

  const updateGalleryItem = async (id, updatedFields) => {
    try {
      await fetch(`${API_BASE}/gallery/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(updatedFields)
      });
    } catch {}

    setGallery(prev => prev.map(g => (g.id === id ? { ...g, ...updatedFields } : g)));
  };

  const deleteGalleryItem = async (id) => {
    try {
      await fetch(`${API_BASE}/gallery/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
    } catch {}

    setGallery(prev => prev.filter(g => g.id !== id));
  };

  const uploadGalleryImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const res = await fetch(`${API_BASE}/gallery/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`
        },
        body: formData
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Image upload failed');
      }

      return { success: true, imageUrl: data.imageUrl };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  // ==========================================
  // WORKSHOP CRUD
  // ==========================================
  const addWorkshop = async (workshopData) => {
    try {
      const res = await fetch(`${API_BASE}/workshops`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(workshopData)
      });
      const data = await res.json();
      if (res.ok && data.data) {
        setWorkshops(prev => [data.data, ...prev]);
        return data.data;
      }
    } catch {}

    const newWs = { ...workshopData, id: `ws-${Date.now()}` };
    setWorkshops(prev => [newWs, ...prev]);
    return newWs;
  };

  const updateWorkshop = async (id, updatedFields) => {
    try {
      await fetch(`${API_BASE}/workshops/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(updatedFields)
      });
    } catch {}

    setWorkshops(prev => prev.map(w => (w.id === id ? { ...w, ...updatedFields } : w)));
  };

  const deleteWorkshop = async (id) => {
    try {
      await fetch(`${API_BASE}/workshops/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
    } catch {}

    setWorkshops(prev => prev.filter(w => w.id !== id));
  };

  // ==========================================
  // REPORT CRUD
  // ==========================================
  const addReport = async (reportData) => {
    try {
      const res = await fetch(`${API_BASE}/reports`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(reportData)
      });
      const data = await res.json();
      if (res.ok && data.data) {
        setReports(prev => [data.data, ...prev]);
        return data.data;
      }
    } catch {}

    const newRep = { ...reportData, id: `rep-${Date.now()}` };
    setReports(prev => [newRep, ...prev]);
    return newRep;
  };

  const updateReport = async (id, updatedFields) => {
    try {
      await fetch(`${API_BASE}/reports/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(updatedFields)
      });
    } catch {}

    setReports(prev => prev.map(r => (r.id === id ? { ...r, ...updatedFields } : r)));
  };

  const deleteReport = async (id) => {
    try {
      await fetch(`${API_BASE}/reports/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
    } catch {}

    setReports(prev => prev.filter(r => r.id !== id));
  };

  // ==========================================
  // SAMKALIEEN (ARTICLES) CRUD
  // ==========================================
  const addSamkalieen = async (samData) => {
    try {
      const res = await fetch(`${API_BASE}/samkalieen`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(samData)
      });
      const data = await res.json();
      if (res.ok && data.data) {
        setSamkalieen(prev => [data.data, ...prev]);
        return data.data;
      }
    } catch {}

    const newSam = { ...samData, id: `sam-${Date.now()}` };
    setSamkalieen(prev => [newSam, ...prev]);
    return newSam;
  };

  const updateSamkalieen = async (id, updatedFields) => {
    try {
      await fetch(`${API_BASE}/samkalieen/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(updatedFields)
      });
    } catch {}

    setSamkalieen(prev => prev.map(s => (s.id === id ? { ...s, ...updatedFields } : s)));
  };

  const deleteSamkalieen = async (id) => {
    try {
      await fetch(`${API_BASE}/samkalieen/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
    } catch {}

    setSamkalieen(prev => prev.filter(s => s.id !== id));
  };

  // ==========================================
  // SUBMISSIONS & CONTACT INQUIRIES
  // ==========================================
  const submitReaderPoem = async (poemData) => {
    try {
      const res = await fetch(`${API_BASE}/submissions/poem`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(poemData)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Submission failed');
      }

      return { success: true, data: data.data, message: data.message };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const approveSubmission = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/submissions/${id}/approve`, {
        method: 'POST',
        headers: getAuthHeaders()
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubmissions(prev =>
          prev.map(s => (s.id === id ? { ...s, status: 'approved' } : s))
        );
        refreshAllData();
        return { success: true };
      }
      throw new Error(data.message);
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const updateSubmissionStatus = async (id, status) => {
    try {
      await fetch(`${API_BASE}/submissions/${id}/status`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status })
      });
      setSubmissions(prev =>
        prev.map(s => (s.id === id ? { ...s, status } : s))
      );
    } catch {}
  };

  const deleteSubmission = async (id) => {
    try {
      await fetch(`${API_BASE}/submissions/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      setSubmissions(prev => prev.filter(s => s.id !== id));
    } catch {}
  };

  const submitInquiry = async (inquiryData) => {
    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiryData)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to submit inquiry');
      }

      return { success: true, data: data.data, message: data.message };
    } catch (err) {
      // Fallback local update
      const newInq = {
        ...inquiryData,
        id: `inq-${Date.now()}`,
        submittedAt: new Date().toISOString(),
        status: 'pending'
      };
      setInquiries(prev => [newInq, ...prev]);
      return { success: true, data: newInq };
    }
  };

  const updateInquiryStatus = async (id, status) => {
    try {
      await fetch(`${API_BASE}/contact/${id}/status`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status })
      });
    } catch {}

    setInquiries(prev => prev.map(inq => (inq.id === id ? { ...inq, status } : inq)));
  };

  const deleteInquiry = async (id) => {
    try {
      await fetch(`${API_BASE}/contact/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
    } catch {}

    setInquiries(prev => prev.filter(inq => inq.id !== id));
  };

  // ==========================================
  // BACKUP & RESTORE
  // ==========================================
  const exportDatabase = async () => {
    try {
      const res = await fetch(`${API_BASE}/admin/export`, {
        headers: getAuthHeaders()
      });
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `akshar_canvas_backup_${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        return { success: true };
      }
    } catch (e) {
      console.error('Export error:', e);
    }
  };

  const importDatabase = async (jsonData) => {
    try {
      const res = await fetch(`${API_BASE}/admin/import`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(jsonData)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        refreshAllData();
        refreshAdminData();
        return { success: true };
      }
      throw new Error(data.message);
    } catch (e) {
      return { success: false, message: e.message };
    }
  };

  const resetToDefaults = async () => {
    try {
      await fetch(`${API_BASE}/admin/reset`, {
        method: 'POST',
        headers: getAuthHeaders()
      });
      refreshAllData();
      refreshAdminData();
    } catch {}
  };

  return (
    <ContentContext.Provider
      value={{
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
        likedItems,
        isAdminLoggedIn,
        systemStatus,
        isLoading,
        adminLogin,
        adminLogout,
        updateAuthorProfile,
        uploadAuthorAvatar,
        toggleLike,
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
        submitReaderPoem,
        approveSubmission,
        updateSubmissionStatus,
        deleteSubmission,
        submitInquiry,
        updateInquiryStatus,
        deleteInquiry,
        exportDatabase,
        importDatabase,
        resetToDefaults,
        refreshAllData,
        refreshAdminData
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);
