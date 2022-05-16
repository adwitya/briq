const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profile_image: {
        type: String,
        required: false
    },
},
{ timestamps: true })

module.exports = mongoose.model('users', usersSchema)