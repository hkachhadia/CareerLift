import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB (Check your IP Whitelist in Atlas!): ${(error as Error).message}`);
    console.log('Server is continuing without Database...');
    // Removed process.exit(1) to prevent Render crash loops
  }
};
