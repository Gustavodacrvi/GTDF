var express = require('express')
var router = express.Router()
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
let i18n = require('i18n')


var User = require('../models/user')

function checkAndChangeLocale(req, res){
  if (req.session.chosen_locale)
      i18n.setLocale(res, req.session.chosen_locale)
}

// LOGIN
router.get('/login', function(req, res){
  checkAndChangeLocale(req, res)
  res.render('login', {
    user: req.user
  })
})

router.get('/get-user-data', function(req, res){
  User.findById(req.user.id, (err, user)=>{
    if (err) return handleError(err)
    res.send(JSON.stringify({email: user.email, username: user.username}))
  })
})

// SIGN UP
router.get('/sign-up', function(req, res){
  checkAndChangeLocale(req, res)
  res.render('signup', {
    user: req.user
  })
})

// LOGOUT
router.get('/logout', function(req, res){
  req.logOut()
  req.flash('success_msg', 'You logged out.')
  res.redirect('/login')
})

router.post('/login',
    passport.authenticate('local', {successRedirect:'/user', failureRedirect:'/login', failureFlash: true}),
    function(req, res){
        res.redirect('/user')
})

router.post('/sign-up', function(req, res){
  var username = req.body.username
  var email = req.body.email
  var password = req.body.password
  var confirm = req.body.cofirm

  req.checkBody('username', 'Username required').notEmpty()
  req.checkBody('email', 'Email required').notEmpty()
  req.checkBody('email', 'Invalid email').isEmail()
  req.checkBody('password', 'Password required').notEmpty()
  req.checkBody('confirm', 'Confirm password').notEmpty()
  req.checkBody('confirm', 'Password not matching').equals(password)

  var errors = req.validationErrors()

  let usernameTaken = false
  let emailTaken = false
  User.countDocuments({username: username}, function(err, count){
    if (count > 0) usernameTaken = true
  }).then(function(){
    User.countDocuments({email: email}, function(err, count){
      if (count > 0) emailTaken = true
    }).then(function(){
      if (errors) res.render('signup', {errors: errors})
      else if (usernameTaken) res.render('signup', {errors: [
        {msg: 'Someone already used that username.'}
      ]})
      else if (emailTaken) res.render('signup', {errors: [
        {msg: 'Someone already used that email.'}
      ]})
      else{
        let newUser = new User({
          username: username,
          password: password,
          email: email
        })

        User.createUser(newUser, function(err, user){
          if (err) throw err
        })

        req.flash('success_msg', 'You created an account and can now login.')

        res.redirect('/login')
      }
    })
  })
})

passport.use(new LocalStrategy(
  function(username, password, done){
      User.getUserByUsername(username, function(err, user){
          if(err) throw err
          if(!user){
              return done(null, false, {message: 'Unknown username'})
          }
          User.comparePassword(password, user.password, function(err, isMatch){
              if (err) throw err
              if (isMatch){
                  return done(null, user)
              } else {
                  return done(null, false, {message: 'Wrong password'})
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