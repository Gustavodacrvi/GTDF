const express = require('express')
const router = express.Router()
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

var User = require('../models/user')

// SIGN_UP
router.get('/signup', function(req, res){
    res.render('signup')
})

// LOGIN
router.get('/login', function(req, res){
    res.render('login')
})


// LOGOUT
router.get('/logout', function(req, res){
    req.logOut()
    req.flash('success_msg', 'loggedOut')
    res.redirect('login')
})

// LOGIN
router.post('/signup', function(req, res){
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    const password2 = req.body.password2

    req.checkBody('username', 'usernameRequired').notEmpty()
    req.checkBody('email', 'emailRequired').notEmpty()
    req.checkBody('email', 'emailNotValid').isEmail()
    req.checkBody('password', 'passwordRequired').notEmpty()
    req.checkBody('password2', 'confirmPassword').notEmpty()
    req.checkBody('password2', 'passwordDoesntMatch').equals(password)

    var errors = req.validationErrors()

    let usernameTaken = false
    let emailTaken = false
    User.countDocuments({username: username}, function(err, count){
        if (count > 0){
            usernameTaken = true
        }
        User.countDocuments({email: email}, function(err, count){
            if (count > 0){
                emailTaken = true
            }


            if (errors){
                res.render('signup', {
                    errors:errors
                })
            } else if (usernameTaken){
                res.render('signup', {
                    errors: [{msg: 'usernameTaken'}]
                })
            } else if (emailTaken){
                res.render('signup', {
                    errors: [{msg: 'emailTaken'}]
                })
            } else{
                var newUser = new User({
                    username: username,
                    password: password,
                    email: email
                })
        
                User.createUser(newUser, function(err, user){
                    if (err) throw err
                })
        
                req.flash('success_msg', 'youAreRegistered')
        
                res.redirect('/users/login')
            }
        })
    })
})

passport.use(new LocalStrategy(
    function(username, password, done){
        User.getUserByUsername(username, function(err, user){
            if(err) throw err
            if(!user){
                return done(null, false, {message: 'Unknown username.'})
            }
            User.comparePassword(password, user.password, function(err, isMatch){
                if (err) throw err
                if (isMatch){
                    return done(null, user)
                } else {
                    return done(null, false, {message: 'Wrong password.'})
                }
            })
        })
    }
))


passport.serializeUser(function(user, done){
    done(null, user.id)
})

passport.deserializeUser(function(id, done){
    User.getUserById(id, function(err, user){
        done(err, user)
    })
})

router.post('/login',
    passport.authenticate('local', {successRedirect:'/user', failureRedirect:'/users/login', failureFlash: true}),
    function(req, res){
        res.redirect('/user')
})


module.exports = router