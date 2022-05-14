const express = require('express')
const router = express.Router()

router.get('/signin', (req,res) => {
    res.send("Sign In Request")
})

router.get('/google', (req,res) => {
    res.send("Google Sign In Request")
})

router.get('/logout', (req,res) => {
    res.send("Logout Request")
})

module.exports = router