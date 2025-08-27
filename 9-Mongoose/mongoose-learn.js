import mongoose from 'mongoose';

// async function main() {
//     await mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api');
//     console.log('✅ Connected to MongoDB');
// }
// main().catch(err => console.error('❌ Connection error:', err));



// more proper way:
// --- Database Connection ---
async function connectDB() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api');
        // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/task-manager-api');` if your database has auth enabled
        console.log('✅ MongoDB connected');
    } catch (err) {
        console.error('❌ MongoDB connection error:', err);
        process.exit(1);
    }
}

connectDB();

// --- Schema & Model ---
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,   // ✅ enforce required
            trim: true,       // ✅ auto-trim strings <- sanitization
        },
        age: {
            type: Number,
            min: 0,           // ✅ validation

            // Custom validation:
            validate(value){
                if(value < 18 || value > 25){
                    throw new Error('Age must be >= 18 and <= 25!')
                }
            }
        },
    },
    { timestamps: true }  // ✅ createdAt & updatedAt
);

const User = mongoose.model('User', userSchema);



// --- Example Usage ---
async function createUser(name, age) {
    try {
        const me = new User({
            name: name,
            age: age,
        });

        await me.save();
        console.log('🎉 User saved:', me);
    } catch (err) {
        console.error('⚠️ Error saving user:', err.message);
    }
}
// await createUser('Shubham', 23);
// await createUser('Himanshu', 20);
// await createUser('Sarthak', 21);
// await createUser('Binit', 19);
await createUser('Kittu', 17); // Error






await mongoose.connection.close(); // 👈 closes DB connection
console.log('MongoDB connection closed 🔌');