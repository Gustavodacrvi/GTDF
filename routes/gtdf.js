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

  if (!req.isAuthenticated()) {
    res.redirect('/login')
  } else {
    res.render('user', {
      user: req.user
    })
  }
})

router.get('/get-user', function(req, res){
  User.getUserById(req.user.id, function(err, user){
    if (err) handleError(err)
    res.send(user.data)
  })
})

router.post('/add-action', (req, res) => {
  User.getUserById(req.user.id, (err, user) => {
    if (err) handleError(err)
    let b = req.body

    user.data.actions.push({ title: b.title, id: b.id, description: b.description, tag: b.tag})
    
    user.save((err) => {
      if (err) handleError(err)
      res.send()
    })
  })
})

router.post('/test', (req, res) => {
  User.getUserById(req.user.id, (err, user) => {
    if (err) handleError(err)
    let u = user.data

    User.rearrangeActions(u.actions, req.body.a)
    
    user.markModified('data.actions')
    user.save((err) => {
      if (err) handleError(err)
      
      res.send()
    })
  })
})

router.post('/delete-action', (req, res) => {
  User.getUserById(req.user.id, (err, user) => {
    if (err) handleError(err)

    User.deleteAction(req.body.id, user.data.actions)

    user.save((err) => {
      if (err) handleError(err)

      res.send()
    })
  })
})

router.post('/edit-action', (req, res) => {
  User.getUserById(req.user.id, (err, user) => {
    if (err) handleError(err)
    let b = req.body

    User.editAction(b.title, b.description, b.id, user.data.actions)

    user.markModified('data.actions')
    user.save((err) => {
      if (err) handleError(err)

      res.send()
    })
  })
})

router.post('/edit-tag', (req, res) => {
  User.getUserById(req.user.id, (err, user) => {
    if (err) handleError(err)
    let b = req.body

    User.editTag(b.id, b.tag, user.data.actions)

    user.markModified('data.actions')
    user.save((err) => {
      if (err) handleError(err)

      res.send()
    })
  })
})

router.post('/add-project', (req, res) => {
  User.getUserById(req.user.id, (err, user) => {
    if (err) handleError(err)
    let b = req.body

    User.addProject(user.data.projects, b.title)

    user.save((err) => {
      if (err) handleError(err)

      res.send()
    })
  })
})

module.exports = router