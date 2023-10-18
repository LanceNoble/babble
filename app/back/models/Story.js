const mongoose = require('mongoose')

const StorySchema = new mongoose.Schema({
    existence: {
        type: Boolean,
        unique: true,
        default: true
    },
    text: {
        type: String,
        default: ""
    },
})

module.exports = { Story: mongoose.model('Story', StorySchema) }