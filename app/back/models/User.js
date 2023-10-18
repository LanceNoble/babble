const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    ip: {
        type: String,
        required: true,
        unique: true
    },
    availability: {
        type: Date,
        default: Date.now
    }
})

module.exports = { User: mongoose.model('User', UserSchema) }