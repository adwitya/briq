const express = require('express')
const app = express()

app.get('/', (req,res) => {
    res.status(500).json({message:"Hello, Success"})
})

const authRoutes = require('./routes/authentication');
const briqRoutes = require('./routes/briq');

app.use('/auth', authRoutes)
app.use('/briq', briqRoutes)

app.listen(3001)