import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, ' Please provide a name'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, ' Please provide an email address'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [

            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please provide a valid email address',
        ],
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: [6, 'Password must be at least 6 characters long'],
        select: false,
    },
    role: {
        type: String,
        enum: {
            values: ['Admin', 'Editor'],
            message: '{VALUE} is not a valid administrative role',
        },
        default: 'Editor',
    },
},
    {
        timestamps: true,

    })


// --- PRE-SAVE PASSWORD HASHING HOOK ---
// Clean async approach without using the next parameter callback completely solves the scope break!
userSchema.pre('save', async function () {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) return;

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (err) {
        throw new Error(err.message);
    }
});

// --- CUSTOM INSTANCE METHOD ---
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;