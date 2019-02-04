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

    User.fixStringIdsAndNulls(user.data)
    user.markModified('data')
    user.save((err, updatedUser) => {

      res.send({ user: updatedUser.data, username: updatedUser.username, email: updatedUser.email })
    })
  })
})

router.post('/add-action', (req, res) => {
  User.getUserById(req.user.id, (err, user) => {
    if (err) return handleError(err)
    let b = req.body

    if (b.place == 'undefined')
      b.place = undefined
    user.data.actions.push({ title: b.title, id: b.id, description: b.description, tag: b.tag, place: b.place})
    
    User.fixStringIdsAndNulls(user.data)
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
    User.resetIds(u.actions)
    User.fixChangedActionOrderInProject(user.data, req.body.old, req.body.new)
    
    User.fixStringIdsAndNulls(user.data)
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
    
    User.fixStringIdsAndNulls(user.data)
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

    User.fixStringIdsAndNulls(user.data)
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

    User.fixStringIdsAndNulls(user.data)
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

    User.fixStringIdsAndNulls(user.data)
    user.markModified('data')
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

    User.fixStringIdsAndNulls(user.data)
    user.markModified('data')
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

    User.fixStringIdsAndNulls(user.data)
    user.markModified('data')
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

    User.fixStringIdsAndNulls(user.data)
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

    User.createAndAddActionToProject(user.data, dt.id, dt.projectId, dt.title, dt.description, dt.place)

    User.fixStringIdsAndNulls(user.data)
    user.markModified('data')
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

    User.fixStringIdsAndNulls(user.data)
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

    User.fixStringIdsAndNulls(user.data)
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
    if (dt.delete == 'true'){
      User.deleteAction(user.data, dt.actionId)
    }

    User.fixStringIdsAndNulls(user.data)
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

    User.fixStringIdsAndNulls(user.data)
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
    
    User.addTimedAction(user.data.actions, dt.title, dt.description, dt.date, dt.time, dt.place)

    User.fixStringIdsAndNulls(user.data)
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

    User.fixStringIdsAndNulls(user.data)
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

    User.fixStringIdsAndNulls(user.data)
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

    User.fixStringIdsAndNulls(user.data)
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
    
    user.username = dt.username

    user.markModified('username')
    user.save((err) => {
      if (err) return handleError(err)

      res.send()
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

router.post('/create-place', (req, res) => {
  User.getUserById(req.user.id, (err, user) => {
    if (err) return handleError(err)
    let dt = req.body

    user.data.places.push(dt.place)

    User.fixStringIdsAndNulls(user.data)
    user.markModified('data.actions')
    user.save((err) => {
      if (err) return handleError(err)

      res.send()
    })
  })
})

router.post('/delete-place', (req, res) => {
  User.getUserById(req.user.id, (err, user) => {
    if (err) return handleError(err)
    let dt = req.body

    User.removePlaceFromAllActionsThatHasThePlace(user.data, dt.place)

    User.fixStringIdsAndNulls(user.data)
    user.markModified('data')
    user.save((err) => {
      if (err) return handleError(err)

      res.send()
    })
  })
})

router.post('/delete-data', (req, res) => {
  User.getUserById(req.user.id, (err, user) => {
    if (err) return handleError(err)
    let dt = req.body
    let u = user.data

    u.actions = []
    u.projects = []
    u.places = []

    User.fixStringIdsAndNulls(user.data)
    user.markModified('data')
    user.save((err) => {
      if (err) return handleError(err)

      res.send()
    })
  })
})

router.post('/check-availability', (req, res) => {
  User.getUserById(req.user.id, (err, user) => {
    if (err) return handleError(err)
    let dt = req.body

    let taken = false
    User.countDocuments({ username: dt.username }, (count) => {
      if (count > 0) taken = true 
    })

    user.save((err) => {
      if (err) return handleError(err)

      res.send(JSON.stringify({ valid: !taken }))
    })
  })
})

router.post('/change-action-place', (req, res) => {
  User.getUserById(req.user.id, (err, user) => {
    if (err) return handleError(err)
    let dt = req.body

    user.data.actions[dt.id].place = dt.place

    User.fixStringIdsAndNulls(user.data)
    user.markModified('data')
    user.save((err) => {
      if (err) return handleError(err)

      res.send()
    })
  })
})

module.exports = router
