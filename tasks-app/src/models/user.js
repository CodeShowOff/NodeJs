import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Task from './task.js';

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
            unique: true,
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
        },
        tokens: [{
            token: {
                type: String,
                required: true
            }
        }]
    },
);


userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
});


userSchema.methods.toJSON = function() {
    const user = this;

    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
};


// this method is accessible on the instances, called instance methods:
userSchema.methods.generateAuthToken = async function(){
    const user = this;

    const token = jwt.sign({ _id: user._id.toString() }, 'tasks-app-user@CodeShowOff')
    user.tokens = user.tokens.concat({ token: token });
    await user.save();

    return token;
}


// statics methods are accessible on the models, called model methods:
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email: email });

    if(!user)
        throw new Error('Unable to login');

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch)
        throw new Error('Unable to login');

    return user;
}



// middleware - its a way to customize mongoose model:
// Hash the plain text password before saving: 
userSchema.pre('save', async function (next) {

    // 'this' will holding user reference

    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }

    next(); // now go and run 'save' to save the User;
});


// Deletes the task when user is removed:
userSchema.pre('findOneAndDelete', async function(next) {
  const { _id } = this.getFilter();
  if (_id) await Task.deleteMany({ owner: _id });
  next();
});



const User = mongoose.model('User', userSchema);

export default User;