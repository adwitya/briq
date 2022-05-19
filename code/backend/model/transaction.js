const mongoose = require('mongoose')

const txnSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    txn_type: {
        type: String,
        required: true
    },
    txn_with: {
        type: String,
        required: true
    },
    txn_reason: {
        type: String,
        required: false
    },
    txn_amount: {
        type: Number,
        required: true
    },
    txn_status: {
        type: String,
        required: true
    },
    txn_date: {
        type: Date,
        required: true
    }
},
{ timestamps: true })

module.exports = mongoose.model('transaction', txnSchema)