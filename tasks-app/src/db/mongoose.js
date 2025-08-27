import mongoose from 'mongoose';

async function connectDB() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/tasks-app');
        console.log('✅ MongoDB connected');
    } catch (err) {
        console.error('❌ MongoDB connection error:', err);
        process.exit(1);
    }
}
connectDB();