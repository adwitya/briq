const express = require('express')
const router = express.Router()
const passport = require('passport')
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

const isLoggedIn = (req, res, next) => {
    req.user ? next() : res.sendStatus(401)
}

passport.use(new GoogleStrategy({
    clientID: '651890203021-krih6tnvqb44m78tefpctn3qs7uacklj.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:3001/auth/google/callback", 
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
  }
));

passport.serializeUser(function(user, done) {
    done(null, user)
}) 

passport.deserializeUser(function(user, done) {
    done(null, user)
})

router.get('/signin', (req,res) => {
    res.send("Sign In Request")
})

router.get('/google', 
    passport.authenticate('google', {scope:['email','profile']})
)

router.get('/google/callback', 
    passport.authenticate('google', {
        successRedirect: '/auth/verified',
        failureRedirect: '/auth/google/failure'
    })
)

router.get('/verified', isLoggedIn ,(req,res) => {
    res.send(`Login Successfull ${req.user.displayName}`)
})

router.get('/google/failure', (req,res) => {
    res.send("Login Failed")
})

router.get('/logout', (req,res) => {
    req.logout();
    req.session.destroy();
    res.send("Bye Bye!!")
})

module.exports = router