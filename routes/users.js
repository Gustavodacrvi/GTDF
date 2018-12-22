var express = require('express')
var router = express.Router()
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy

var User = require('../models/user')

// LOGIN
router.get('/login', function(req, res){
    res.render('user/login')
})

router.post('/login',
    passport.authenticate('local', {successRedirect:'/user', failureRedirect:'/users/login', failureFlash: true}),
    function(req, res){
        res.redirect('/user')
})


// LOGOUT
router.get('/logout', function(req, res){
    console.log('asdf')
    req.logOut()
    req.flash('success_msg', '_You_logged_out')
    res.redirect('/user/login')
})

// SIGN_UP
router.get('/signup', function(req, res){
    res.render('user/signup')
})


router.post('/signup', function(req, res){
    var username = req.body.username
    var email = req.body.email
    var password = req.body.password
    var password2 = req.body.password2

    console.log(username)
    req.checkBody('username', 'Username_required').notEmpty()
    req.checkBody('email', 'Email_required').notEmpty()
    req.checkBody('email', 'Invalid_email').isEmail()
    req.checkBody('password', 'Password_required').notEmpty()
    req.checkBody('password2', 'Confirm_password').notEmpty()
    req.checkBody('password2', '_Password_not_matching').equals(password)

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
                res.render('user/signup', {
                    errors:errors
                })
            } else if (usernameTaken){
                res.render('user/signup', {
                    errors: [{msg: 'Someone_already_used_that_username'}]
                })
            } else if (emailTaken){
                res.render('user/signup', {
                    errors: [{msg: 'Someone_already_used_that_email'}]
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
        
                req.flash('success_msg', 'You_created_an_account_and_can_now_login')
        
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
                return done(null, false, {message: 'Unknown_username'})
            }
            User.comparePassword(password, user.password, function(err, isMatch){
                if (err) throw err
                if (isMatch){
                    return done(null, user)
                } else {
                    return done(null, false, {message: 'Wrong_password'})
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

module.exports = router