const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    }
})

//hash user password before saving
UserSchema.pre("save", async function(next) {
    
    const user = this
    console.log(user)
    console.log('Pre save event')
    user.password = await bcrypt.hash(user.password, 8)
    
    next()
})

var User = mongoose.model('User', UserSchema)
module.exports = User