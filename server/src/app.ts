import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import passport from 'passport';
import { connectDB } from './config/db';
import authRoutes from './routes/auth';
import analysisRoutes from './routes/analysis';

dotenv.config();

// Connect to MongoDB
// Only connect if URI exists to prevent crashes during initial setup without env vars
if (process.env.MONGO_URI) {
  connectDB();
} else {
  console.log('Skipping MongoDB connection: MONGO_URI not provided.');
}

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Initialize Passport
require('./config/passport');
app.use(passport.initialize());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/analysis', analysisRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'CareerLift API is running' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
