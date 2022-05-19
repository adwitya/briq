const mongoose = require('mongoose')

const groupsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
},
{ timestamps: true })

module.exports = mongoose.model('groups', groupsSchema)