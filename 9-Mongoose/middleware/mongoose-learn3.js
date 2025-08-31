// middleware example: we're using user model of tasks app for example:

import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

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


// middleware - its a way to customize mongoose model:
userSchema.pre('save', async function(next) {

    // 'this' will holding user reference

    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 8);
    }

    next(); // now go and run 'save' to save the User;
})


const User = mongoose.model('user', userSchema);

export default User;