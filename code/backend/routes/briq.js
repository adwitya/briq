const express = require('express')
const router = express.Router()

router.get('/addTxn', (req,res) => {
    res.send("Add New Txn")
})

router.get('/settleTxn', (req,res) => {
    res.send("Settle Current Txn")
})

module.exports = router