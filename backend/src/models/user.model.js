import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    avatar: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin'],
    },
    orderHistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
        },
    ],
}, { timestamps: true });

//hash password
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 8);
    next();
});
//compare hashed pass
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}
userSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        id: this._id,
        role: this.role,
        email: this.email,
        username: this.username
    }, process.env.JWT_ACCESS_TOKEN,
        { expiresIn: process.env.JWT_ACCESS_EXPIRE });
}
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({ id: this._id },
        process.env.JWT_REFRESH_TOKEN,
        { expiresIn: process.env.JWT_REFRESH_EXPIRE });
}
const User = mongoose.model('User', userSchema);

export default User;
