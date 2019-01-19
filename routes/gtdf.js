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

router.get('/user', function(req, res){
  checkAndChangeLocale(req, res)

  if (!req.isAuthenticated()) res.redirect('/login')
  res.render('user', {
    user: req.user
  })
})


module.exports = router