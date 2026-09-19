import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '..', 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial Default Dataset
const defaultDatabase = {
  authors: {
    kanchan: {
      id: "kanchan",
      name: "Dr. Kanchan Jaiswal",
      nameHindi: "डॉ. कंचन जायसवाल",
      title: "Young Writer, Storyteller & Cultural Worker",
      titleHindi: "युवा लेखिका, स्टोरी टेलर एवं संस्कृति कर्मी",
      signatureQuote: "When words arise from the sanctum of silence, they transcend mere poetry to become the music of the heart.",
      signatureQuoteHindi: "जब शब्द मौन के गर्भ से उठते हैं, तो वे केवल कविता नहीं रहते — हृदय का संगीत बन जाते हैं।",
      shortBio: "डॉ. कंचन जायसवाल समकालीन भारतीय साहित्य की सशक्त, संवेदनशील और सर्वस्पर्शी आवाज़ों में से एक हैं। उनकी रचनाओं में भारतीय परंपरागत मूल्यों की कालातीत सुगंध और आधुनिक जीवन के अस्तित्ववादी चिंतन का अद्भुत समन्वय प्रस्तुत होता है। उनका रचनात्मक संसार मानवीय भावनाओं, सामाजिक चेतना और आत्मसजगता के विस्तृत क्षितिज को समेटे हुए है।",
      shortBioHindi: "डॉ. कंचन जायसवाल समकालीन भारतीय साहित्य की सशक्त, संवेदनशील और सर्वस्पर्शी आवाज़ों में से एक हैं। उनकी रचनाओं में भारतीय परंपरागत मूल्यों की कालातीत सुगंध और आधुनिक जीवन के अस्तित्ववादी चिंतन का अद्भुत समन्वय प्रस्तुत होता है। उनका रचनात्मक संसार मानवीय भावनाओं, सामाजिक चेतना और आत्मसजगता के विस्तृत क्षितिज को समेटे हुए है।",
      fullBio: [
        "डॉ. कंचन जायसवाल समकालीन भारतीय साहित्य की सशक्त, संवेदनशील और सर्वस्पर्शी आवाज़ों में से एक हैं। उनकी रचनाओं में भारतीय परंपरागत मूल्यों की कालातीत सुगंध और आधुनिक जीवन के अस्तित्ववादी चिंतन का अद्भुत समन्वय प्रस्तुत होता है।",
        "उनका रचनात्मक संसार मानवीय भावनाओं, सामाजिक चेतना और आत्मसजगता के विस्तृत क्षितिज को समेटे हुए है।"
      ],
      fullBioHindi: [
        "डॉ. कंचन जायसवाल समकालीन भारतीय साहित्य की सशक्त, संवेदनशील और सर्वस्पर्शी आवाज़ों में से एक हैं। उनकी रचनाओं में भारतीय परंपरागत मूल्यों की कालातीत सुगंध और आधुनिक जीवन के अस्तित्ववादी चिंतन का अद्भुत समन्वय प्रस्तुत होता है।",
        "उनका रचनात्मक संसार मानवीय भावनाओं, सामाजिक चेतना और आत्मसजगता के विस्तृत क्षितिज को समेटे हुए है।"
      ],
      publishedBooks: [
        { title: "काव्य संकलन एवं शोध प्रबंध", type: "शोध व काव्य" },
        { title: "साहित्यिक आलेख संग्रह", type: "समीक्षा" }
      ],
      philosophy: "",
      philosophyHindi: "",
      avatarUrl: "",
      awards: [],
      stats: {
        publishedBooks: 1
      },
      social: {
        instagram: "https://instagram.com",
        facebook: "https://facebook.com",
        youtube: "https://youtube.com",
        email: "kanchan@aksharcanvas.com"
      }
    },
    garima: {
      id: "garima",
      name: "Garima Singh",
      nameHindi: "गरिमा सिंह",
      title: "Young Writer, Storyteller & Cultural Worker",
      titleHindi: "युवा लेखिका, स्टोरी टेलर एवं संस्कृति कर्मी",
      signatureQuote: "Whatever remained unspoken in the heartbeat, descended upon paper and blossomed into a Ghazal.",
      signatureQuoteHindi: "जो धड़कन में अनकहा रह गया, वही कागज़ पर उतरकर ग़ज़ल बन गया।",
      shortBio: "उत्तर प्रदेश के जौनपुर जिले में जन्मी गरिमा सिंह आज की संभावनाशील रचनाकार हैं। देश की प्रतिष्ठित पत्रिकाओं में आपकी रचनाएं निरंतर प्रकाशित हो रही हैं। कविता संग्रह \"चाक पे माटी सा मन\" और साँझा काव्य संग्रह \"त्रिपथ\" व अन्य साँझा संग्रह प्रकाशित, एक कविता संग्रह अभी प्रकाशाधीन है।",
      shortBioHindi: "उत्तर प्रदेश के जौनपुर जिले में जन्मी गरिमा सिंह आज की संभावनाशील रचनाकार हैं। देश की प्रतिष्ठित पत्रिकाओं में आपकी रचनाएं निरंतर प्रकाशित हो रही हैं। कविता संग्रह \"चाक पे माटी सा मन\" और साँझा काव्य संग्रह \"त्रिपथ\" व अन्य साँझा संग्रह प्रकाशित, एक कविता संग्रह अभी प्रकाशाधीन है।",
      fullBio: [
        "उत्तर प्रदेश के जौनपुर जिले में जन्मी गरिमा सिंह आज की संभावनाशील रचनाकार हैं। देश की प्रतिष्ठित पत्रिकाओं में आपकी रचनाएं निरंतर प्रकाशित हो रही हैं।",
        "कविता संग्रह \"चाक पे माटी सा मन\" और साँझा काव्य संग्रह \"त्रिपथ\" व अन्य साँझा संग्रह प्रकाशित, एक कविता संग्रह अभी प्रकाशाधीन है।"
      ],
      fullBioHindi: [
        "उत्तर प्रदेश के जौनपुर जिले में जन्मी गरिमा सिंह आज की संभावनाशील रचनाकार हैं। देश की प्रतिष्ठित पत्रिकाओं में आपकी रचनाएं निरंतर प्रकाशित हो रही हैं।",
        "कविता संग्रह \"चाक पे माटी सा मन\" और साँझा काव्य संग्रह \"त्रिपथ\" व अन्य साँझा संग्रह प्रकाशित, एक कविता संग्रह अभी प्रकाशाधीन है।"
      ],
      publishedBooks: [
        { title: "चाक पे माटी सा मन", type: "कविता संग्रह" },
        { title: "त्रिपथ", type: "साँझा काव्य संग्रह" },
        { title: "नवीन काव्य संग्रह", type: "प्रकाशाधीन" }
      ],
      philosophy: "",
      philosophyHindi: "",
      avatarUrl: "",
      awards: [],
      stats: {
        publishedBooks: 2
      },
      social: {
        instagram: "https://instagram.com",
        facebook: "https://facebook.com",
        youtube: "https://youtube.com",
        email: "garima@aksharcanvas.com"
      }
    },
    synergy: {
      title: "Akshar Canvas",
      titleHindi: "अक्षर कैनवास",
      desc: "हिंदी साहित्य को समर्पित एक डिजिटल उपक्रम है। पूर्णत: साहित्य से सम्बद्ध इस मंच का उद्देश्य हिंदी कविता और साहित्य तथा विचार को ऐसे लोगों तक ऑनलाइन उपलब्ध कराना है जो साहित्य से गहरा लगाव रखते हैं और इससे समृद्ध होना चाहते हैं कोशिश है कि यह साहित्य प्रेमियों का सम्मिलन बन सके। इस डिजिटल मंच का उद्देश्य यह भी है कि पुरानी और दुर्लभ कविताओं को भी सामने लाकर आने वाली पीढ़ियां में साहित्यिक मूल्यों के प्रति सकारात्मक दृष्टिकोण बनाया जाय। इस परियोजना के तहत पाठकों, शोधकर्ताओं और साहित्य प्रेमियों को एक सुव्यवस्थित मंच प्रदान करना भी है जिससे हिंदी भाषा का विस्तार एवं लोगों का जुड़ाव भी हो सके। साहित्य को जागरूकता, जुड़ाव और ज्ञान प्राप्त करने का एक साधन भी बनाया जा सके।",
      descHindi: "हिंदी साहित्य को समर्पित एक डिजिटल उपक्रम है। पूर्णत: साहित्य से सम्बद्ध इस मंच का उद्देश्य हिंदी कविता और साहित्य तथा विचार को ऐसे लोगों तक ऑनलाइन उपलब्ध कराना है जो साहित्य से गहरा लगाव रखते हैं और इससे समृद्ध होना चाहते हैं कोशिश है कि यह साहित्य प्रेमियों का सम्मिलन बन सके। इस डिजिटल मंच का उद्देश्य यह भी है कि पुरानी और दुर्लभ कविताओं को भी सामने लाकर आने वाली पीढ़ियां में साहित्यिक मूल्यों के प्रति सकारात्मक दृष्टिकोण बनाया जाय। इस परियोजना के तहत पाठकों, शोधकर्ताओं और साहित्य प्रेमियों को एक सुव्यवस्थित मंच प्रदान करना भी है जिससे हिंदी भाषा का विस्तार एवं लोगों का जुड़ाव भी हो सके। साहित्य को जागरूकता, जुड़ाव और ज्ञान प्राप्त करने का एक साधन भी बनाया जा सके।"
    }
  },
  poems: [],
  quotes: [],
  books: [],
  workshops: [],
  reports: [],
  samkalieen: [],
  gallery: [],
  submissions: [],
  inquiries: [],
  users: [
    {
      id: "admin",
      username: "admin",
      password: "Canvas@0022",
      role: "admin",
      name: "Akshar Canvas Administrator",
      email: "aksharcanvas@gmail.com"
    }
  ]
};

// ==========================================
// MONGODB SCHEMAS & MODELS
// ==========================================
let isMongoConnected = false;

const AuthorSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: String,
  nameHindi: String,
  title: String,
  titleHindi: String,
  signatureQuote: String,
  signatureQuoteHindi: String,
  shortBio: String,
  shortBioHindi: String,
  fullBio: [String],
  fullBioHindi: [String],
  philosophy: String,
  philosophyHindi: String,
  avatarUrl: String,
  awards: [{ year: String, title: String, organization: String }],
  stats: { publishedBooks: Number, poemsCount: String, stageEvents: String, experience: String },
  social: { instagram: String, facebook: String, youtube: String, email: String }
}, { strict: false });

const PoemSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: String,
  titleHindi: String,
  poet: String,
  poetHindi: String,
  book: String,
  category: String,
  featured: Boolean,
  excerpt: String,
  stanzas: [String],
  originalHindiStanzas: [String],
  likes: { type: Number, default: 0 },
  date: String,
  readTime: String,
  isReaderSubmission: Boolean,
  authorCity: String,
  authorEmail: String
}, { strict: false });

const QuoteSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  quote: String,
  originalVerse: String,
  author: String,
  authorHindi: String,
  sourceBook: String,
  sourceType: String,
  curatedBy: String,
  poetReflection: String,
  aksharCanvasReview: String,
  tags: [String],
  likes: { type: Number, default: 0 },
  dateAdded: String
}, { strict: false });

const BookSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: String,
  titleHindi: String,
  author: String,
  authorHindi: String,
  authorId: String,
  status: String,
  year: String,
  expectedDate: String,
  publisher: String,
  pages: Number,
  isbn: String,
  price: String,
  tagline: String,
  synopsis: String,
  sampleExcerpt: String,
  coverGradient: String,
  accentColor: String,
  coverImageUrl: String,
  buyLinks: mongoose.Schema.Types.Mixed
}, { strict: false });

const WorkshopSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: String,
  mentor: String,
  date: String,
  time: String,
  mode: String,
  type: String,
  desc: String,
  highlights: [String]
}, { strict: false });

const ReportSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: String,
  media: String,
  date: String,
  location: String,
  category: String,
  badge: String,
  excerpt: String,
  tags: [String]
}, { strict: false });

const SamkalieenSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: String,
  author: String,
  category: String,
  date: String,
  readTime: String,
  lead: String,
  paragraphs: [String],
  quote: String
}, { strict: false });

const SubmissionSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  poetName: String,
  city: String,
  email: String,
  title: String,
  category: String,
  poemText: String,
  reflection: String,
  submittedAt: String,
  status: { type: String, default: 'pending' },
  approvedPoemId: String
}, { strict: false });

const InquirySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: String,
  email: String,
  phone: String,
  city: String,
  eventType: String,
  date: String,
  message: String,
  submittedAt: String,
  status: { type: String, default: 'pending' }
}, { strict: false });

const GallerySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: String,
  category: String,
  date: String,
  location: String,
  image: String,
  aspectRatio: { type: String, default: '1:1' },
  caption: String
}, { strict: false });

const UserSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' },
  name: { type: String, default: 'Administrator' },
  email: { type: String, default: 'aksharcanvas@gmail.com' },
  createdAt: { type: String, default: () => new Date().toISOString() }
}, { strict: false });

const Models = {
  authors: mongoose.models.Author || mongoose.model('Author', AuthorSchema),
  poems: mongoose.models.Poem || mongoose.model('Poem', PoemSchema),
  quotes: mongoose.models.Quote || mongoose.model('Quote', QuoteSchema),
  books: mongoose.models.Book || mongoose.model('Book', BookSchema),
  workshops: mongoose.models.Workshop || mongoose.model('Workshop', WorkshopSchema),
  reports: mongoose.models.Report || mongoose.model('Report', ReportSchema),
  samkalieen: mongoose.models.Samkalieen || mongoose.model('Samkalieen', SamkalieenSchema),
  submissions: mongoose.models.Submission || mongoose.model('Submission', SubmissionSchema),
  inquiries: mongoose.models.Inquiry || mongoose.model('Inquiry', InquirySchema),
  gallery: mongoose.models.Gallery || mongoose.model('Gallery', GallerySchema),
  users: mongoose.models.User || mongoose.model('User', UserSchema)
};

// Connect to MongoDB if URI is configured
export const connectMongoIfConfigured = async () => {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) return false;

  try {
    await mongoose.connect(mongoUri);
    isMongoConnected = true;
    console.log('🍃 MongoDB connected successfully.');

    // Always ensure admin user is seeded in MongoDB
    try {
      await Models.users.findOneAndUpdate(
        { username: 'admin' },
        {
          id: 'admin',
          username: 'admin',
          password: process.env.ADMIN_PASSWORD || 'Canvas@0022',
          role: 'admin',
          name: 'Akshar Canvas Administrator',
          email: 'aksharcanvas@gmail.com'
        },
        { upsert: true, new: true }
      );
      console.log('🛡️  Admin user credentials seeded in database.');
    } catch (e) {
      console.warn('Could not seed admin user to MongoDB:', e.message);
    }

    // Seed default records if collections are empty
    const poemCount = await Models.poems.countDocuments();
    if (poemCount === 0) {
      console.log('🍃 Seeding initial records into MongoDB...');
      for (const [key, authorData] of Object.entries(defaultDatabase.authors)) {
        await Models.authors.findOneAndUpdate({ id: key }, authorData, { upsert: true });
      }
      if (defaultDatabase.poems.length) await Models.poems.insertMany(defaultDatabase.poems);
      if (defaultDatabase.quotes.length) await Models.quotes.insertMany(defaultDatabase.quotes);
      if (defaultDatabase.books.length) await Models.books.insertMany(defaultDatabase.books);
      if (defaultDatabase.workshops.length) await Models.workshops.insertMany(defaultDatabase.workshops);
      if (defaultDatabase.reports.length) await Models.reports.insertMany(defaultDatabase.reports);
      if (defaultDatabase.samkalieen.length) await Models.samkalieen.insertMany(defaultDatabase.samkalieen);
      if (defaultDatabase.gallery.length) await Models.gallery.insertMany(defaultDatabase.gallery);
      if (defaultDatabase.submissions.length) await Models.submissions.insertMany(defaultDatabase.submissions);
      if (defaultDatabase.inquiries.length) await Models.inquiries.insertMany(defaultDatabase.inquiries);
      console.log('🍃 MongoDB initial seeding complete.');
    }
    return true;
  } catch (err) {
    console.error('MongoDB connection error, falling back to local JSON DB:', err.message);
    isMongoConnected = false;
    return false;
  }
};

// Try connecting immediately
connectMongoIfConfigured();

// ==========================================
// LOCAL FILE DATABASE ENGINE (FALLBACK)
// ==========================================
function writeDbAtomically(data) {
  const tmpFile = `${DB_FILE}.${Date.now()}.tmp`;
  try {
    fs.writeFileSync(tmpFile, JSON.stringify(data, null, 2), 'utf8');
    fs.renameSync(tmpFile, DB_FILE);
  } catch (err) {
    if (fs.existsSync(tmpFile)) {
      try { fs.unlinkSync(tmpFile); } catch {}
    }
    throw err;
  }
}

function readDb() {
  if (!fs.existsSync(DB_FILE)) {
    writeDbAtomically(defaultDatabase);
    return JSON.parse(JSON.stringify(defaultDatabase));
  }
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    return JSON.parse(JSON.stringify(defaultDatabase));
  }
}

// ==========================================
// UNIFIED DATABASE INTERFACE
// ==========================================
export const db = {
  isMongoActive: () => isMongoConnected,

  // Users
  getUserByUsername: async (username) => {
    const cleanUser = String(username || '').trim().toLowerCase();
    if (isMongoConnected && Models.users) {
      const user = await Models.users.findOne({ username: cleanUser }).lean();
      if (user) return user;
    }
    const data = readDb();
    const users = Array.isArray(data.users) ? data.users : (defaultDatabase.users || []);
    return users.find(u => String(u.username || '').toLowerCase() === cleanUser) || null;
  },

  getUsers: async () => {
    if (isMongoConnected && Models.users) {
      return await Models.users.find({}).lean();
    }
    const data = readDb();
    return Array.isArray(data.users) ? data.users : (defaultDatabase.users || []);
  },

  updateUserPassword: async (username, newPassword) => {
    const cleanUser = String(username || '').trim().toLowerCase();
    if (isMongoConnected && Models.users) {
      const updated = await Models.users.findOneAndUpdate(
        { username: cleanUser },
        { $set: { password: newPassword, updatedAt: new Date().toISOString() } },
        { new: true, upsert: true }
      ).lean();
      return updated;
    }
    const data = readDb();
    if (!Array.isArray(data.users)) data.users = [...(defaultDatabase.users || [])];
    const index = data.users.findIndex(u => String(u.username || '').toLowerCase() === cleanUser);
    if (index !== -1) {
      data.users[index].password = newPassword;
      data.users[index].updatedAt = new Date().toISOString();
    } else {
      data.users.push({
        id: cleanUser,
        username: cleanUser,
        password: newPassword,
        role: 'admin',
        name: 'Akshar Canvas Administrator',
        email: 'aksharcanvas@gmail.com',
        updatedAt: new Date().toISOString()
      });
    }
    writeDbAtomically(data);
    return data.users.find(u => String(u.username || '').toLowerCase() === cleanUser);
  },

  // Authors
  getAuthors: async () => {
    if (isMongoConnected) {
      const authorsList = await Models.authors.find({}).lean();
      if (authorsList && authorsList.length > 0) {
        const obj = {};
        authorsList.forEach(a => { obj[a.id] = a; });
        return obj;
      }
    }
    const data = readDb();
    return data.authors || defaultDatabase.authors;
  },

  getAuthorById: async (id) => {
    if (isMongoConnected) {
      const author = await Models.authors.findOne({ id }).lean();
      if (author) return author;
    }
    const data = readDb();
    return data.authors?.[id] || null;
  },

  updateAuthor: async (id, updates) => {
    if (isMongoConnected) {
      const updated = await Models.authors.findOneAndUpdate(
        { id },
        { $set: { ...updates, id } },
        { new: true, upsert: true }
      ).lean();
      return updated;
    }
    const data = readDb();
    if (!data.authors) data.authors = { ...defaultDatabase.authors };
    const current = data.authors[id] || { id };
    data.authors[id] = { ...current, ...updates, id };
    writeDbAtomically(data);
    return data.authors[id];
  },

  // Collections (poems, quotes, books, submissions, inquiries)
  getCollection: async (name) => {
    if (isMongoConnected && Models[name]) {
      return await Models[name].find({}).sort({ _id: -1 }).lean();
    }
    const data = readDb();
    return Array.isArray(data[name]) ? data[name] : [];
  },

  getItemById: async (collection, id) => {
    if (isMongoConnected && Models[collection]) {
      return await Models[collection].findOne({ id }).lean();
    }
    const items = await db.getCollection(collection);
    return items.find(item => String(item.id) === String(id)) || null;
  },

  addItem: async (collection, item) => {
    if (isMongoConnected && Models[collection]) {
      const doc = new Models[collection](item);
      await doc.save();
      return doc.toObject();
    }
    const data = readDb();
    if (!Array.isArray(data[collection])) data[collection] = [];
    data[collection].unshift(item);
    writeDbAtomically(data);
    return item;
  },

  updateItem: async (collection, id, updates) => {
    if (isMongoConnected && Models[collection]) {
      return await Models[collection].findOneAndUpdate(
        { id },
        { $set: updates },
        { new: true }
      ).lean();
    }
    const data = readDb();
    if (!Array.isArray(data[collection])) return null;
    const index = data[collection].findIndex(item => String(item.id) === String(id));
    if (index === -1) return null;
    data[collection][index] = { ...data[collection][index], ...updates, id: data[collection][index].id };
    writeDbAtomically(data);
    return data[collection][index];
  },

  deleteItem: async (collection, id) => {
    if (isMongoConnected && Models[collection]) {
      const res = await Models[collection].deleteOne({ id });
      return res.deletedCount > 0;
    }
    const data = readDb();
    if (!Array.isArray(data[collection])) return false;
    const initialLen = data[collection].length;
    data[collection] = data[collection].filter(item => String(item.id) !== String(id));
    if (data[collection].length !== initialLen) {
      writeDbAtomically(data);
      return true;
    }
    return false;
  },

  // Export / Import
  exportFullDb: async () => {
    if (isMongoConnected) {
      const authors = await db.getAuthors();
      const poems = await Models.poems.find({}).lean();
      const quotes = await Models.quotes.find({}).lean();
      const books = await Models.books.find({}).lean();
      const workshops = await Models.workshops.find({}).lean();
      const reports = await Models.reports.find({}).lean();
      const samkalieen = await Models.samkalieen.find({}).lean();
      const gallery = await Models.gallery.find({}).lean();
      const submissions = await Models.submissions.find({}).lean();
      const inquiries = await Models.inquiries.find({}).lean();
      return { authors, poems, quotes, books, workshops, reports, samkalieen, gallery, submissions, inquiries };
    }
    return readDb();
  },

  importFullDb: async (importedData) => {
    if (!importedData || typeof importedData !== 'object') {
      throw new Error('Invalid backup data format');
    }
    if (isMongoConnected) {
      if (importedData.poems) { await Models.poems.deleteMany({}); if (importedData.poems.length) await Models.poems.insertMany(importedData.poems); }
      if (importedData.quotes) { await Models.quotes.deleteMany({}); if (importedData.quotes.length) await Models.quotes.insertMany(importedData.quotes); }
      if (importedData.books) { await Models.books.deleteMany({}); if (importedData.books.length) await Models.books.insertMany(importedData.books); }
      if (importedData.workshops) { await Models.workshops.deleteMany({}); if (importedData.workshops.length) await Models.workshops.insertMany(importedData.workshops); }
      if (importedData.reports) { await Models.reports.deleteMany({}); if (importedData.reports.length) await Models.reports.insertMany(importedData.reports); }
      if (importedData.samkalieen) { await Models.samkalieen.deleteMany({}); if (importedData.samkalieen.length) await Models.samkalieen.insertMany(importedData.samkalieen); }
      if (importedData.gallery) { await Models.gallery.deleteMany({}); if (importedData.gallery.length) await Models.gallery.insertMany(importedData.gallery); }
      if (importedData.submissions) { await Models.submissions.deleteMany({}); if (importedData.submissions.length) await Models.submissions.insertMany(importedData.submissions); }
      if (importedData.inquiries) { await Models.inquiries.deleteMany({}); if (importedData.inquiries.length) await Models.inquiries.insertMany(importedData.inquiries); }
      return importedData;
    }
    writeDbAtomically(importedData);
    return importedData;
  },

  resetDb: async () => {
    if (isMongoConnected) {
      await Models.authors.deleteMany({});
      for (const [key, authorData] of Object.entries(defaultDatabase.authors)) {
        await Models.authors.create({ ...authorData, id: key });
      }
      await Models.poems.deleteMany({});
      if (defaultDatabase.poems.length) await Models.poems.insertMany(defaultDatabase.poems);
      await Models.quotes.deleteMany({});
      if (defaultDatabase.quotes.length) await Models.quotes.insertMany(defaultDatabase.quotes);
      await Models.books.deleteMany({});
      if (defaultDatabase.books.length) await Models.books.insertMany(defaultDatabase.books);
      await Models.workshops.deleteMany({});
      if (defaultDatabase.workshops.length) await Models.workshops.insertMany(defaultDatabase.workshops);
      await Models.reports.deleteMany({});
      if (defaultDatabase.reports.length) await Models.reports.insertMany(defaultDatabase.reports);
      await Models.samkalieen.deleteMany({});
      if (defaultDatabase.samkalieen.length) await Models.samkalieen.insertMany(defaultDatabase.samkalieen);
      await Models.gallery.deleteMany({});
      if (defaultDatabase.gallery.length) await Models.gallery.insertMany(defaultDatabase.gallery);
      await Models.submissions.deleteMany({});
      if (defaultDatabase.submissions.length) await Models.submissions.insertMany(defaultDatabase.submissions);
      await Models.inquiries.deleteMany({});
      if (defaultDatabase.inquiries.length) await Models.inquiries.insertMany(defaultDatabase.inquiries);
      return defaultDatabase;
    }
    writeDbAtomically(defaultDatabase);
    return defaultDatabase;
  }
};

