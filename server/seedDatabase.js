import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  console.error('❌ MONGODB_URI not found in .env');
  process.exit(1);
}

const UserSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' },
  name: { type: String, default: 'Administrator' },
  email: { type: String, default: 'admin@aksharcanvas.com' },
  createdAt: { type: String, default: () => new Date().toISOString() }
}, { strict: false });

const User = mongoose.models.User || mongoose.model('User', UserSchema);
const Workshop = mongoose.models.Workshop || mongoose.model('Workshop', new mongoose.Schema({ id: String }, { strict: false }));
const Report = mongoose.models.Report || mongoose.model('Report', new mongoose.Schema({ id: String }, { strict: false }));
const Samkalieen = mongoose.models.Samkalieen || mongoose.model('Samkalieen', new mongoose.Schema({ id: String }, { strict: false }));
const Gallery = mongoose.models.Gallery || mongoose.model('Gallery', new mongoose.Schema({ id: String }, { strict: false }));

async function runSeed() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB Atlas!');

    console.log('Seeding admin user into "users" collection...');
    const adminUser = await User.findOneAndUpdate(
      { username: 'admin' },
      {
        id: 'admin',
        username: 'admin',
        password: 'Canvas@0022',
        role: 'admin',
        name: 'Akshar Canvas Administrator',
        email: 'admin@aksharcanvas.com',
        updatedAt: new Date().toISOString()
      },
      { upsert: true, new: true }
    );

    console.log('✅ Admin user created/updated successfully in MongoDB:');
    console.log(JSON.stringify(adminUser, null, 2));

    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('\n📁 Current collections in MongoDB:');
    collections.forEach(c => console.log(`  - ${c.name}`));

    await mongoose.disconnect();
    console.log('\n🎉 Done!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error during seeding:', err);
    process.exit(1);
  }
}

runSeed();
