const express = require('express')
const cors = require('cors');
const session = require('express-session')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const Users = require('./model/users')

const mongo_url = "mongodb+srv://vivek07mishra:Adwitya123@cluster0.ib0xs.mongodb.net/briq"
const app = express()

//Mongoose Connect 
mongoose.connect(mongo_url, {useNewUrlParser:true});
const con = mongoose.connection; 

con.on('open', () => {
    console.log("Connected to Mongo DB")
})

//Added CORS check
app.use(cors({
    origin: 'http://localhost:3000',
    exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],
    credentials: true,
}));

const config = {secretOrKey:"secret"}

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(session({secret:'cats'}))
app.use(passport.initialize())
app.use(passport.session())

//Middleware Authorization
let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretOrKey

passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    Users.findOne({
        id : jwt_payload.id
    }, async (err, user) => {
        if(err) 
            return done(null, false)
        else if(!user)  {
            return done(null, false)
        }
        else  {
            return done(null, user)
        }
    })
}))

//Routes Configuration
const authRoutes = require('./routes/authentication');
const briqRoutes = require('./routes/briq');

app.use('/api/auth', authRoutes)
app.use('/api/briq',  passport.authenticate('jwt', { session: false }), briqRoutes)

app.get('/', (req,res) => {
    res.send('Briq by briq add server')
})

app.listen(5000)