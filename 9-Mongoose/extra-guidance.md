import mongoose from 'mongoose';
import validator from 'validator';

// --- Database Connection ---
async function connectDB() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api');
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
}
await connectDB();

// --- Schema & Model ---
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      min: 0,
      default: 18,
      validate: {
        validator: (value) => value >= 18 && value <= 25,
        message: 'Age must be between 18 and 25!',
      },
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: validator.isEmail,
        message: 'Email is invalid!',
      },
    },
  },
  { timestamps: true }
);

// --- Static Method ---
userSchema.statics.findByEmail = async function (email) {
  return await this.findOne({ email });
};

// --- Instance Method ---
userSchema.methods.getPublicProfile = function () {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
  };
};

const User = mongoose.model('User', userSchema);

// --- Example Usage ---
async function run() {
  try {
    // Create user
    const himanshu = new User({
      name: '  Himanshu  ',
      age: 21,
      email: 'HiMANSHU@gmail.com',
    });
    await himanshu.save();

    console.log('🎉 User saved:', himanshu);

    // Use static method
    const foundUser = await User.findByEmail('himanshu@gmail.com');
    console.log('🔎 Found user by email:', foundUser);

    // Use instance method
    console.log('👤 Public profile:', foundUser.getPublicProfile());

  } catch (err) {
    console.error('⚠️ Error:', err.message);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 MongoDB connection closed');
  }
}

await run();
