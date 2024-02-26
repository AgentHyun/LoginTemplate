const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
});

userSchema.pre('save', async function (next) {
    try {
        if (this.isModified('password')) {
            const salt = await bcrypt.genSalt(saltRounds);
            const hash = await bcrypt.hash(this.password, salt);
            this.password = hash;
        }
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.comparePassword = async function (plainPassword) {
    try {
        const isMatch = await bcrypt.compare(plainPassword, this.password);
        return isMatch;
    } catch (error) {
        throw error;
    }
};

userSchema.methods.generateToken = async function () {
    try {
        const token = jwt.sign(this._id.toHexString(), 'secretToken');
        this.token = token;
        await this.save();
        return this;
    } catch (error) {
        throw error;
    }
};

userSchema.statics.findByToken = async function (token) {
    try {
        const decoded = jwt.verify(token, 'secretToken');
        const user = await this.findOne({ "_id": decoded, "token": token });
        return user;
    } catch (error) {
        throw error;
    }
};

const User = mongoose.model('User', userSchema);

module.exports = { User };
