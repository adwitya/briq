const express = require('express')
const session = require('express-session')
const passport = require('passport')

const app = express()
app.use(session({secret:'cats'}))
app.use(passport.initialize())
app.use(passport.session())

const authRoutes = require('./routes/authentication');
const briqRoutes = require('./routes/briq');

app.use('/auth', authRoutes)
app.use('/briq', briqRoutes)

app.get('/', (req,res) => {
    res.send('<a href="/auth/google">Authenticate with Google</a>')
})

app.listen(3001)