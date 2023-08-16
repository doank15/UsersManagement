const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
    lastName: {
        type: String, 
        required: true,
        trim: [true, 'Vui lòng nhập họ'],
    },
    firstName: {
        type: String, 
        required: [true, 'Vui lòng nhập tên'],
        trim: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Vui lòng nhập địa chỉ email hợp lệ!!!"]
    },
    password: {
        type: String,
        minLength: [8, 'Vui Lòng Nhập Mật Khẩu Từ 8 Kí Tự (Bao gồm số, kí tự đặc biệt, kí tự viết hoa)'],
        select: false
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        default: 'male'
    },
    phone: {
        type: String, 
        required: true, 
    },
    comments:{
        type: String
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})
userSchema.methods.matchPassword = async function(enterPassword) {
    return await bcrypt.compare(enterPassword, this.password);
}

module.exports = mongoose.model('User', userSchema);