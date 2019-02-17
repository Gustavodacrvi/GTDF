var express = require('express')
var router = express.Router()
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
let i18n = require('i18n')
let crypto = require('crypto')
let nodemailer = require('nodemailer')
let async = require('async')


var User = require('../models/user')

function checkAndChangeLocale(req, res){
  if (req.session.chosen_locale)
      i18n.setLocale(res, req.session.chosen_locale)
}

router.get('/password-or-username', function(req, res){
  checkAndChangeLocale(req, res)
  res.render('passuser', {
    user: req.user
  })
})

// RESET PASSWORD

router.get('/send-email-password', (req, res) => {
  checkAndChangeLocale(req, res)
  res.render('sendemail', {
    user: req.user
  })
})

router.post('/send-email-password', (req, res, next) => {
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      User.findOne({ email: req.body.email }, function(err, user) {
        if (!user) {
          req.flash('error', 'No account with that email address exists.');
          return res.redirect('/send-email-password');
        }

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: 'gettingthingsdoneforfree@gmail.com',
          clientId: '419231519910-ud5h7i6vlppum2htb8dphsapjnqe1t87.apps.googleusercontent.com',
          clientSecret: process.env.CSECRET,
          refreshToken: '1/LLDNO2am9KrK1KACOHlnjq5SsSx1XI47E5JYsRRQIT8',
          accessToken: 'ya29.GluyBq6s7HtZagS2FknhmE1TxsiFWbqxF8_cx_W-GonYDsxUxPFUxh0ofm-oz4AXoh99W8c3EWkHQ3cSZBUAM0dcj0g5_S6IxGyJ0N1oJDZhcnIf35jWgyJHmcIi'
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'gettingthingsdoneforfree@gmail.com',
        subject: 'Getting Things Done for Free(GTDF) password reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/resetpassword/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        req.flash('success_msg', 'An e-mail has been sent to the given email with further instructions.');
        done(err, 'done');
      });
    }
  ], function(err) {
    if (err) return next(err);
    res.redirect('/send-email-password');
  });
})

router.get('/resetpassword/:token', function(req, res) {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    if (!user) {
      req.flash('error', 'Password reset token is invalid or has expired.');
      return res.redirect('/login');
    }
    res.render('resetpass', {
      user: req.user
    });
  });
});

router.post('/resetpassword/:token', function(req, res) {
  async.waterfall([
    function(done) {
      User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
          req.flash('error', 'Password reset token is invalid or has expired.');
          return res.redirect('back');
        }

        User.changePassword(user, req.body.password, (err) => {
          if (err) return handleError(err)
          done(err, user)
        }, true)
      });
    },
    function(user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: 'gettingthingsdoneforfree@gmail.com',
          clientId: '419231519910-ud5h7i6vlppum2htb8dphsapjnqe1t87.apps.googleusercontent.com',
          clientSecret: process.env.CSECRET,
          refreshToken: '1/LLDNO2am9KrK1KACOHlnjq5SsSx1XI47E5JYsRRQIT8',
          accessToken: 'ya29.GluyBq6s7HtZagS2FknhmE1TxsiFWbqxF8_cx_W-GonYDsxUxPFUxh0ofm-oz4AXoh99W8c3EWkHQ3cSZBUAM0dcj0g5_S6IxGyJ0N1oJDZhcnIf35jWgyJHmcIi'
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'gettingthingsdoneforfree@gmail.com',
        subject: 'Getting Things Done for Free(GTDF) password changed',
        text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        req.flash('success_msg', 'Your password has been changed.');
        done(err);
      });
    }
  ], function(err) {
    res.redirect('/login');
  });
});

// RESET USERNAME

router.get('/send-email-username', (req, res) => {
  checkAndChangeLocale(req, res)
  res.render('sendemailusername', {
    user: req.user
  })
})

router.post('/send-email-username', (req, res, next)=>{
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      User.findOne({ email: req.body.email }, function(err, user) {
        if (!user) {
          req.flash('error', 'No account with that email address exists.');
          return res.redirect('/send-email-username');
        }

        user.resetUsernameToken = token;
        user.resetUsernameExpires = Date.now() + 3600000; // 1 hour

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: 'gettingthingsdoneforfree@gmail.com',
          clientId: '419231519910-ud5h7i6vlppum2htb8dphsapjnqe1t87.apps.googleusercontent.com',
          clientSecret: process.env.CSECRET,
          refreshToken: '1/LLDNO2am9KrK1KACOHlnjq5SsSx1XI47E5JYsRRQIT8',
          accessToken: 'ya29.GluyBq6s7HtZagS2FknhmE1TxsiFWbqxF8_cx_W-GonYDsxUxPFUxh0ofm-oz4AXoh99W8c3EWkHQ3cSZBUAM0dcj0g5_S6IxGyJ0N1oJDZhcnIf35jWgyJHmcIi'
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'gettingthingsdoneforfree@gmail.com',
        subject: 'Getting Things Done for Free(GTDF) username reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the username for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/resetusername/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your username will remain unchanged.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        req.flash('success_msg', 'An e-mail has been sent to the given email with further instructions.');
        done(err, 'done');
      });
    }
  ], function(err) {
    if (err) return next(err);
    res.redirect('/send-email-username');
  });
})

router.get('/resetusername/:token', (req, res) => {
  User.findOne({ resetUsernameToken: req.params.token, resetUsernameExpires: { $gt: Date.now() } }, function(err, user) {
    if (!user) {
      req.flash('error', 'Username reset token is invalid or has expired.');
      return res.redirect('/login');
    }
    res.render('resetuser', {
      user: req.user
    });
  });
})

router.post('/resetusername/:token', function(req, res) {
  async.waterfall([
    function(done) {
      User.findOne({ resetUsernameToken: req.params.token, resetUsernameExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
          req.flash('error', 'Username reset token is invalid or has expired.');
          return res.redirect('back');
        }

        user.username = req.body.username.trim()

        user.markModified('username')
        user.save((err, updatedUser)=>{
          if (err) return handleError(err)
          done(err, user)
        })
      });
    },
    function(user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: 'gettingthingsdoneforfree@gmail.com',
          clientId: '419231519910-ud5h7i6vlppum2htb8dphsapjnqe1t87.apps.googleusercontent.com',
          clientSecret: process.env.CSECRET,
          refreshToken: '1/LLDNO2am9KrK1KACOHlnjq5SsSx1XI47E5JYsRRQIT8',
          accessToken: 'ya29.GluyBq6s7HtZagS2FknhmE1TxsiFWbqxF8_cx_W-GonYDsxUxPFUxh0ofm-oz4AXoh99W8c3EWkHQ3cSZBUAM0dcj0g5_S6IxGyJ0N1oJDZhcnIf35jWgyJHmcIi'
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'gettingthingsdoneforfree@gmail.com',
        subject: 'Getting Things Done for Free(GTDF) username changed',
        text: 'Hello,\n\n' +
          'This is a confirmation that the username for your account ' + user.email + ' has just been changed.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        req.flash('success_msg', 'Your username has been changed.');
        done(err);
      });
    }
  ], function(err) {
    res.redirect('/login');
  });
});

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
    res.send(JSON.stringify({email: user.email, username: user.username.trim()}))
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

router.get('/logout-create', function(req, res){
  req.logOut()
  req.flash('success_msg', 'You logged out.')
  res.redirect('/sign-up')
})

router.post('/login',
  passport.authenticate('local', {successRedirect:'/user', failureRedirect:'/login', failureFlash: true}),
  function(req, res){
      res.redirect('/user')
})

router.post('/sign-up', function(req, res){
  var username = req.body.username.trim()
  var email = req.body.email
  var password = req.body.password
  var confirm = req.body.cofirm

  req.checkBody('username', 'Username required').notEmpty()
  req.checkBody('email', 'Email required').notEmpty()
  req.checkBody('email', 'Invalid email').isEmail()
  req.checkBody('password', 'Password required').notEmpty()
  req.checkBody('confirm', 'Confirm password').notEmpty()
  req.checkBody('confirm', 'Passwords not matching').equals(password)

  var errors = req.validationErrors()

  let usernameTaken = false
  let emailTaken = false
  User.countDocuments({username: username.trim()}, function(err, count){
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
          username: username.trim(),
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
      User.getUserByUsername(username.trim(), function(err, user){
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
