const mongoose = require('mongoose')


const MovieSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    released_on: {
        type: Date,
        trim: true,
        required: true
    }
})

module.exports = mongoose.model('Movie', MovieSchema)