const mongoose = require('mongoose');
const validator = require('validator');

const UsersSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, 'Users must have username'],
    },
    email: {
        type: String,
        required: [true, 'Users must have email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'please fill with valid email'],
    },
    password: {
        type: String,
        required: [true, 'Please fill the password !!'],
        minlength: [8, 'Required 8 character for your password'],
    },
});

const User = mongoose.model('User', UsersSchema);

module.exports = User;
