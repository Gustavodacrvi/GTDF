const express = require('express')
const router = express.Router()

var User = require('../models/user')

// SIGN_UP
router.get('/signup', function(req, res){
    res.render('signup')
})

// LOGIN
router.get('/login', function(req, res){
    res.render('login')
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

    const errors = req.validationErrors()

    if (errors){
        res.render('signup', {
            errors:errors
        })
    } else{
        var newUser = new User({
            username: username,
            password: password,
            email: email
        })

        User.createUser(newUser, function(err, user){
            if (err) throw err
            console.log(user)
        })

        req.flash('success_msg', 'youAreRegistered')

        res.redirect('/users/login')
    }
})

module.exports = router