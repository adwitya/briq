const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const passport = require('passport')
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const bcrypt = require('bcrypt');
const Users = require('../model/users')


const isLoggedIn = (req, res, next) => {
    req.user ? next() : res.sendStatus(401)
}

passport.use(new GoogleStrategy({
    clientID: '651890203021-krih6tnvqb44m78tefpctn3qs7uacklj.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:5000/api/auth/google/callback", 
    passReqToCallback: true
  },
  (request, accessToken, refreshToken, profile, done) => {
    return done(null, profile)
  }
));

passport.serializeUser(function(user, done) {
    done(null, user)
}) 

passport.deserializeUser(function(user, done) {
    done(null, user)
})

router.get('/google', 
    passport.authenticate('google', {scope:['email','profile']})
)

router.get('/google/callback', 
    passport.authenticate('google', {
        successRedirect: '/api/auth/verified',
        failureRedirect: '/api/auth/google/failure'
    })
)

router.get('/google/failure', (req,res) => {
    res.status(403).send("Login Failed")
})

router.get('/verified', isLoggedIn, async(req,res) => {
    Users.findOne({
        'email' : req.user.email
    }, async(err, user) => {
        if(err) 
            res.status(404)
        else if(!user)  {
            const add_user = new Users();
            add_user.name = req.user.displayName;
            add_user.email = req.user.email;
            add_user.profile_image = req.user.picture;
            const salt = await bcrypt.genSalt(10);
            add_user.password = await bcrypt.hash('thirdparty', salt);

            try {
                const userAdd = await add_user.save(function(err) {
                    if (err) console.log(err);
                })   
                res.redirect('/api/auth/verified')
            } catch (err) {
                res.send("Error"+err)
            }
        }
        else {
            let token = jwt.sign({
                email: user.email, 
                id: user._id
            }, 'secret', { expiresIn: '1h' });

            res.status(200).json({
                success:true,
                message:`Login SuccessFull ${user.email}`,
                token: "Bearer "+ token
            })
        }
    })
    
})


//Sign in the user
router.post('/signin', (req,res) => {
    Users.findOne({
        'email' : req.body.email
    }, async (err, user) => {
        if(err) 
            res.status(404)
        else if(!user)  {
            res.status(401).send({error:'Sign Up User'});
        }
        else {
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (result == true) {
                    let token = jwt.sign({
                        email: user.email, 
                        id: user._id
                    }, 'secret', { expiresIn: '1d' });
                    //res.cookie('jwt', token)
                    res.status(200).send({
                        success:true,
                        message:`Login SuccessFull ${req.body.email}`,
                        token: "Bearer "+ token
                    })
                } else {
                 res.status(401).send({error:'Incorrect password'});
                }
            })
        }
    })
})
//Sign up the user
router.post('/signup', async(req,res) => {
    Users.findOne({ 
        'email' : req.body.email
    }, async (err, user) => {
        if(err) 
            res.status(404)
        else if(!user)  {
            const add_user = new Users();
            add_user.name = req.body.name;
            add_user.email = req.body.email;
            add_user.profile_image = req.body.profile_image;
            const salt = await bcrypt.genSalt(10);
            add_user.password = await bcrypt.hash(req.body.password, salt);

            try {
                const userAdd = await add_user.save()
                res.status(200).json(userAdd)
            } catch(err) {
                console.log(err);
            }
        }
        else 
            res.status(401).json({message:'User Already Registered'})
    })

    
})

//Logout User
router.get('/logout', (req,res) => {
    req.logout();
    req.session.destroy();
    res.send("Logged out of session")
})

module.exports = router