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

router.get('/user', (req, res)=>{
  checkAndChangeLocale(req, res)

  if (!req.isAuthenticated()) {
    res.redirect('/login')
  } else if (req.user.username != 'guest'){
    res.render('user', {
      guest: false
    })
  } else if (req.user.username == 'guest'){
    res.render('user', {
      guest: true
    })
  }
})

router.get('/user-guest', (req, res)=>{
  checkAndChangeLocale(req, res)

  User.getUserByUsername('guest', (err, user) => {
    if (err) return handleError(err)

    req.logIn(user, function(err) {
      if (err) { return next(err); }

      return res.redirect('/user');
    })
  })
})

router.get('/get-user', (req, res)=>{
  User.getUserById(req.user.id, function(err, user){
    if (err) return handleError(err)
    res.send({ user: user.data, username: user.username})
  })
})

router.post('/add-action', (req, res) => {
  User.getUserById(req.user.id, (err, user) => {
    if (err) return handleError(err)
    let b = req.body

    user.data.actions.push({ title: b.title, id: b.id, description: b.description, tag: b.tag})
    
    user.save((err) => {
      if (err) return handleError(err)
      res.send()
    })
  })
})

router.post('/save-new-action-order', (req, res) => {
  User.getUserById(req.user.id, (err, user) => {
    if (err) return handleError(err)
    let u = user.data

    User.rearrange(u.actions, req.body.a)
    let oldIds = User.getIds(u.actions)
    User.resetIds(u.actions)
    User.updateProjectActionIds(user.data, oldIds)
    
    user.markModified('data')
    user.save((err) => {
      if (err) return handleError(err)
      
      res.send()
    })
  })
})

router.post('/save-new-project-order', (req, res) => {
  User.getUserById(req.user.id, (err, user) => {
    if (err) return handleError(err)
    let u = user.data

    User.rearrange(u.projects, req.body.a)
    let oldIds = User.getIds(u.projects)
    User.resetIds(u.projects)
    User.updateActionsIds(user.data, oldIds)
    
    user.markModified('data')
    user.save((err) => {
      if (err) return handleError(err)
      
      res.send()
    })
  })
})

router.post('/delete-action', (req, res) => {
  User.getUserById(req.user.id, (err, user) => {
    if (err) return handleError(err)

    User.deleteAction(user.data, req.body.id)

    user.markModified('data')
    user.save((err) => {
      if (err) return handleError(err)

      res.send()
    })
  })
})

router.post('/delete-project-action', (req, res) => {
  User.getUserById(req.user.id, (err, user) => {
    if (err) return handleError(err)

    User.deleteProjectAction(req.body.id, user.data)

    user.markModified('data')
    user.save((err) => {
      if (err) return handleError(err)

      res.send()
    })
  })
})

router.post('/edit-action', (req, res) => {
  User.getUserById(req.user.id, (err, user) => {
    if (err) return handleError(err)
    let b = req.body

    User.editAction(b.title, b.description, b.id, user.data.actions)

    user.markModified('data.actions')
    user.save((err) => {
      if (err) return handleError(err)

      res.send()
    })
  })
})

router.post('/edit-tag', (req, res) => {
  User.getUserById(req.user.id, (err, user) => {
    if (err) return handleError(err)
    let b = req.body

    User.editTag(b.id, b.tag, user.data.actions)

    user.markModified('data.actions')
    user.save((err) => {
      if (err) return handleError(err)

      res.send()
    })
  })
})

router.post('/add-project', (req, res) => {
  User.getUserById(req.user.id, (err, user) => {
    if (err) return handleError(err)
    let b = req.body

    User.addProject(user.data.projects, b.title)

    user.save((err) => {
      if (err) return handleError(err)

      res.send()
    })
  })
})

router.post('/delete-project', (req, res) => {
  User.getUserById(req.user.id, (err, user) => {
    if (err) return handleError(err)
    let b = req.body

    User.deleteProject(user.data, b.id)

    user.markModified('data')
    user.save((err) => {
      if (err) return handleError(err)

      res.send()
    })
  })
})

router.post('/create-add-action-project', (req, res) => {
  User.getUserById(req.user.id, (err, user) => {
    if (err) return handleError(err)
    let dt = req.body

    User.createAndAddActionToProject(user.data, dt.id, dt.projectId, dt.title, dt.description)

    user.markModified('data.projects')
    user.save((err) => {
      if (err) return handleError(err)

      res.send()
    })
  })
})

router.post('/edit-project', (req, res) => {
  User.getUserById(req.user.id, (err, user) => {
    if (err) return handleError(err)
    let dt = req.body

    user.data.projects[dt.id].title = dt.title

    user.markModified('data.projects')
    user.save((err) => {
      if (err) return handleError(err)

      res.send()
    })
  })
})

router.post('/add-existing-action-project', (req, res) => {
  User.getUserById(req.user.id, (err, user) => {
    if (err) return handleError(err)
    let dt = req.body
    let act = user.data.actions
    let pro = user.data.projects
    
    act[dt.actionId].projectId = dt.projectId
    pro[dt.projectId].actions.push(dt.actionId)

    user.markModified('data')
    user.save((err) => {
      if (err) return handleError(err)

      res.send()
    })
  })
})

router.post('/remove-action-from-project', (req, res) => {
  User.getUserById(req.user.id, (err, user) => {
    if (err) return handleError(err)
    let dt = req.body
    
    User.removeActionFromProject(user.data, dt.actionId)

    user.markModified('data')
    user.save((err) => {
      if (err) return handleError(err)

      res.send()
    })
  })
})

router.post('/transform-action-to-project', (req, res) => {
  User.getUserById(req.user.id, (err, user) => {
    if (err) return handleError(err)
    let dt = req.body
    
    User.addProject(user.data.projects, dt.title)
    if (dt.delete){
      User.deleteAction(user.data, dt.actionId)
    }

    user.markModified('data')
    user.save((err) => {
      if (err) return handleError(err)

      res.send()
    })
  })
})

router.post('/add-existing-action-project-from-action', (req, res) => {
  User.getUserById(req.user.id, (err, user) => {
    if (err) return handleError(err)
    let dt = req.body
    
    user.data.actions[dt.actionId].projectId = dt.projectId
    user.data.projects[dt.projectId].actions.push(dt.actionId)

    user.markModified('data')
    user.save((err) => {
      if (err) return handleError(err)

      res.send()
    })
  })
})

router.post('/add-timed-action', (req, res) => {
  User.getUserById(req.user.id, (err, user) => {
    if (err) return handleError(err)
    let dt = req.body
    
    User.addTimedAction(user.data.actions, dt.title, dt.description, dt.date, dt.time)

    user.markModified('data.actions')
    user.save((err) => {
      if (err) return handleError(err)

      res.send()
    })
  })
})

router.post('/edit-timed-action', (req, res) => {
  User.getUserById(req.user.id, (err, user) => {
    if (err) return handleError(err)
    let dt = req.body
    
    User.editTimedAction(user.data.actions, dt.title, dt.description, dt.date, dt.time, dt.id)

    user.markModified('data.actions')
    user.save((err) => {
      if (err) return handleError(err)

      res.send()
    })
  })
})

router.post('/edit-timed-tag', (req, res) => {
  User.getUserById(req.user.id, (err, user) => {
    if (err) return handleError(err)
    let dt = req.body
    
    delete user.data.actions[dt.id].calendar
    user.data.actions[dt.id].tag = dt.tag

    user.markModified('data.actions')
    user.save((err) => {
      if (err) return handleError(err)

      res.send()
    })
  })
})

router.post('/tag-to-calendar', (req, res) => {
  User.getUserById(req.user.id, (err, user) => {
    if (err) return handleError(err)
    let dt = req.body
    let act = user.data.actions[dt.id]

    act.tag = "calendar"
    act.calendar = {
      date: dt.date,
      time: dt.time
    }

    user.markModified('data.actions')
    user.save((err) => {
      if (err) return handleError(err)

      res.send()
    })
  })
})

router.post('/change-username', (req, res) => {
  User.getUserById(req.user.id, (err, user) => {
    if (err) return handleError(err)
    let dt = req.body
    
    let usernameTaken = false
    User.countDocuments({username: dt.username}, function(err, count){
      if (count > 0) usernameTaken = true
    }).then(()=>{
      if (usernameTaken)
        res.send(JSON.stringify({isValid: false}))
      else {
        user.username = dt.username
        user.save((err, updatedUser) => {
          if (err) return handleError(err)

          res.send(JSON.stringify({ isValid: true}))
        })
      }
    })
  })
})

router.post('/delete-account', (req, res) => {
  User.getUserById(req.user.id, (err, user) => {
    if (err) return handleError(err)

    User.deleteOne({ username: req.body.username }, function (err) {
      if (err) return handleError(err)
    })
  })
})

module.exports = router