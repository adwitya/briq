const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const passport = require('passport')
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const bcrypt = require('bcrypt');
const Users = require('../model/users')
const BRIQ_UI_HOST_IP = "http://localhost:3000/"


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
            res.redirect(BRIQ_UI_HOST_IP+'/verify?token='+token);
        }
    })
    
})


//Sign in the user
router.post('/signin', (req,res) => {
    Users.findOne({
        'email' : req.body.briqEmail
    }, async (err, user) => {
        if(err) 
            res.status(404)
        else if(!user)  {
            res.status(401).send({error:'Sign Up User'});
        }
        else {
            bcrypt.compare(req.body.briqPassword, user.password, (err, result) => {
                if (result == true) {
                    let token = jwt.sign({
                        email: user.email, 
                        id: user._id
                    }, 'secret', { expiresIn: '1d' });
                    //res.cookie('jwt', token)
                    res.status(200).send({
                        success:true,
                        name: user.name,
                        email: user.email,
                        profile_image: user.profile_image,
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
        'email' : req.body.briqEmail
    }, async (err, user) => {
        if(err) 
            res.status(404)
        else if(!user)  {
            const add_user = new Users();
            add_user.name = req.body.briqName;
            add_user.email = req.body.briqEmail;
            add_user.profile_image = 'null';
            const salt = await bcrypt.genSalt(10);
            add_user.password = await bcrypt.hash(req.body.briqPassword, salt);

            try {
                const userAdd = await add_user.save()
                let token = jwt.sign({
                    email: userAdd.email, 
                    id: userAdd._id
                }, 'secret', { expiresIn: '1d' });
                //res.cookie('jwt', token)
                res.status(200).send({
                    success:true,
                    name: userAdd.name,
                    email: userAdd.email,
                    profile_image: userAdd.profile_image,
                    token: "Bearer "+ token
                })
            } catch(err) {
                console.log(err);
            }
        }
        else 
            res.status(401).json({message:'User Already Registered'})
    })

    
})

//Logout User
router.post('/logout', (req,res) => {
    req.logout();
    req.session.destroy();
    res.sendStatus(200).send("Logged out of session")
})

module.exports = router