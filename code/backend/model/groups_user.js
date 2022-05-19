const mongoose = require('mongoose')

const groupsUserSchema = new mongoose.Schema({
    group_id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
},
{ timestamps: true })

module.exports = mongoose.model('groups_user', groupsUserSchema)