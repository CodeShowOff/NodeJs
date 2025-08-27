// Using validator npm package to validate:

import mongoose from 'mongoose';
import validator from 'validator';


async function connectDB() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api');
        console.log('✅ MongoDB connected');
    } catch (err) {
        console.error('❌ MongoDB connection error:', err);
        process.exit(1);
    }
}
connectDB();


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

            // Custom validation:
            validate(value) {
                if (value < 18 || value > 25) {
                    throw new Error('Age must be >= 18 and <= 25!')
                }
            }
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,

            // Using validator package to validate email:
            validate(value) {
                if (!validator.isEmail(value)) throw new Error('Email is invalid!');
            }
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 7,

            validate(value) {
                if (value.toLowerCase().includes('password')) throw new Error('Use a strong password!');
            }
        }
    },
);

const tempUser = mongoose.model('temp-user', userSchema);

async function createUser(name, age, email, password) {
    try {
        const me = new tempUser({
            name: name,
            age: age,
            email: email,
            password: password
        });

        await me.save();
        console.log('🎉 User saved:', me);
    } catch (err) {
        console.error('⚠️ Error saving user:', err.message);
    }
}

// await createUser('Shubham', 23, 'shubham@gmail.com', 'mypass@123');
// await createUser('Sarthak', 21, 'sarthak@gmail', 'bsjdb#65ag'); // Error: Email is invalid!
// await createUser('  Himanshu  ', undefined,'  HIMANSHU@gmail.com  ', ' sjbdsdnsdks   ');
// await createUser('  Binit  ', 20,'  binni@gmail.com  ', ' password   '); // Error:  Use a strong password!
await createUser('', 20, '  sjdsj@gmail.com  ', ' skhdjjj&uwu   '); // Error:  Path `name` is required.





// For now we dont need the connection to run always:
await mongoose.connection.close(); // 👈 closes DB connection
console.log('MongoDB connection closed 🔌');



/* More cleaner format: 
age: {
  type: Number,
  min: 0,
  validate: {
    validator: (value) => value >= 18 && value <= 25,
    message: 'Age must be between 18 and 25!'
  }
}
*/