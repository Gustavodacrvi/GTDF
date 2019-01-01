var express = require('express')
var ejs = require('ejs')
var path = require('path')
var i18n = require('i18n')
var bodyParser = require('body-parser')
var mongo = require('mongodb')
var mongoose = require('mongoose')
var flash = require('connect-flash')
var session = require('express-session')
var expressValidator = require('express-validator')
var passport = require('passport')
var cookieParser = require('cookie-parser')




// OBJECT ID
var Objectid = mongoose.Types.ObjectId

// MONGOOSE
mongoose.connect('mongodb://localhost/GTD', { useNewUrlParser: true})
var mongoose = mongoose.connection

// ROUTES
var users = require('./routes/users')

// I18N
i18n.configure({
    locales: ['en', 'pt-BR'],
    cookie: 'localeCookie',
    directory: path.join(__dirname, 'locales'),
    queryParameter: 'lang',
    defaultLocale: 'en',
});

var app = express()

// COOKIE PARSER
app.use(cookieParser())

// I18N
app.use(i18n.init)

// EXPRESS SESSION
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}))

// CONNECT FLASH
app.use(flash())

// GLOBAL VARS
app.use(function (req, res, next){
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    res.locals.user = req.user || null
    res.locals.activeLink = ''

    next()
})

// VIEW ENGINE
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// BODY PARSER
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

// STATIC
app.use(express.static(path.join(__dirname, 'static')))

// PASSPORT
app.use(passport.initialize())
app.use(passport.session())

// EXPRESS VALIDATOR
app.use(expressValidator({
    errorFormatter: function(param, msg, value){
        var namespace = param.split('.')
        , root = namespace.shift()
        , formParam = root
        while(namespace.length){
            formParam = '[' + namespace.shift() + ']'
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        }
    }
}))

app.use('/users', users)


// MODEL
var User = require('./models/user')





function check_and_change_locale(req, res){
    if (req.session.chosen_locale)
        i18n.setLocale(res, req.session.chosen_locale)
}
function check_authentication(req, res){
    res.locals.isLogged = req.isAuthenticated()
}



app.get('/', function(req, res){
    check_and_change_locale(req, res)
    check_authentication(req, res)
    res.render('index')
})
app.get('/user/initial', function(req, res){
    check_and_change_locale(req, res)
    check_authentication(req, res)
    res.render('user/initial')
})
app.get('/user/login', function(req, res){
    check_and_change_locale(req, res)
    check_authentication(req, res)
    res.render('user/login')
})
app.get('/user/signup', function(req, res){
    check_and_change_locale(req, res)
    check_authentication(req, res)
    res.render('user/signup')
})
app.get('/user/send-email', function(req, res){
    check_and_change_locale(req, res)
    check_authentication(req, res)
    res.render('user/send-email')
})

app.get('/user/gtd/basket', function(req, res){
    check_authentication(req, res)    
    if (req.isAuthenticated()){
        check_and_change_locale(req, res)
        res.locals.activeLink = 'basket'
        res.render('user/gtd/basket', {
            user: req.user,
            displayUserMenu: true
        })
    } else {
        res.redirect('/user/login')
    }
})
app.get('/user/gtd/calendar', function(req,res){
    check_authentication(req, res)
    if (req.isAuthenticated()){
        check_and_change_locale(req, res)
        res.locals.activeLink = 'calendar'
        res.render('user/gtd/calendar', {
            user: req.user,
            displayUserMenu: true
        })
    } else {
        res.redirect('/user/login')
    }
})
app.get('/user/gtd/next-actions', function(req,res){
    check_authentication(req, res)
    if (req.isAuthenticated()){
        check_and_change_locale(req, res)
        res.locals.activeLink = 'next actions'
        res.render('user/gtd/next-actions', {
            user: req.user,
            displayUserMenu: true
        })
    } else {
        res.redirect('/user/login')
    }
})
app.get('/user/gtd/projects', function(req,res){
    check_authentication(req, res)
    if (req.isAuthenticated()){
        check_and_change_locale(req, res)
        res.locals.activeLink = 'projects'
        res.render('user/gtd/projects', {
            user: req.user,
            displayUserMenu: true
        })
    } else {
        res.redirect('/user/login')
    }
})
app.get('/user/gtd/someday', function(req,res){
    check_authentication(req, res)
    if (req.isAuthenticated()){
        check_and_change_locale(req, res)
        res.locals.activeLink = 'someday'
        res.render('user/gtd/someday', {
            user: req.user,
            displayUserMenu: true
        })
    } else {
        res.redirect('/user/login')
    }
})
app.get('/user/gtd/waiting', function(req,res){
    check_authentication(req, res)
    if (req.isAuthenticated()){
        check_and_change_locale(req, res)
        res.locals.activeLink = 'waiting'
        res.render('user/gtd/waiting', {
            user: req.user,
            displayUserMenu: true
        })
    } else {
        res.redirect('/user/login')
    }
})

app.get('/en', function(req, res){
    req.session.chosen_locale = 'en'
    res.redirect('/')
})
app.get('/pt-BR', function(req, res){
    req.session.chosen_locale = 'pt-BR'
    res.redirect('/')
})

// ACTIONS

app.post('/user/add-action', function(req, res){
    let action = {
        id: new Objectid(),
        tag: req.body.tag,
        title: req.body.title,
        description: req.body.description
    }
    User.findById(req.user.id, function (err, user) {
        if (err) return handleError(err)
      
        user.actions.push(action)
        user.save(function (err, updatedUser) {
          if (err) return handleError(err)
          res.send(JSON.stringify(updatedUser))
        })
      })
})

app.get('/user/get-user', function(req, res){
    User.findById(req.user.id, function(err, user){
        if (err) return handleError(err)

        res.send(JSON.stringify(user))
    })
})

app.post('/user/delete-action', function(req, res){
    User.findById(req.user.id, function(err, user){
        if (err) return handleError(err)

        let i = user.actions.findIndex(function(el){
            return el.id == req.body.actionId
        })
        user.actions.splice(i, 1)
        user.save(function(err, updatedUser){
            if (err) return handleError(err)
            res.send(JSON.stringify(updatedUser))
        })
    })
})

app.post('/user/edit-action', function(req, res){
    User.findById(req.user.id, function(err, user){
        if (err) return handleError(err)

        let i = user.actions.findIndex(function(el){
            return el.id == req.body.actionId
        })
        user.actions[i].title = req.body.title
        user.actions[i].description = req.body.description
        user.markModified('actions')
        user.save(function(err, updatedUser){
            if (err) return handleError(err)

            res.send(JSON.stringify(updatedUser))
        })
    })
})

app.post('/user/edit-tag', function(req, res){
    User.findById(req.user.id, function(err, user){
        if (err) return handleError(err)

        let i = user.actions.findIndex(function(el){
            return el.id == req.body.actionId
        })
        user.actions[i].tag = req.body.tag
        user.markModified('actions')
        user.save(function(err, updatedUser){
            if (err) return handleError(err)
            
            res.send(JSON.stringify(updatedUser))
        })
    })
})

app.post('/user/create-project', function(req, res){
    let project = {
        id: new Objectid(),
        title: req.body.title,
        actions: [

        ]
    }
    User.findById(req.user.id, function(err, user){
        if (err) return handleError(err)

        user.projects.push(project)
        user.save(function (err, updatedUser) {
            if (err) return handleError(err)
            res.send(JSON.stringify(updatedUser))
          })
    })
})

app.post('/user/delete-project', function(req, res){
    User.findById(req.user.id, function(err, user){
        if (err) return handleError(err)

        let i = user.projects.findIndex(function(el){
            return el.id == req.body.projectId
        })
        user.projects.splice(i, 1)
        user.save(function(err, updatedUser){
            if (err) return handleError(err)
            res.send(JSON.stringify(updatedUser.projects))
        })
    })
})

app.post('/user/edit-project-title', function(req, res){
    User.findById(req.user.id, function(err, user){
        if (err) return handleError(err)

        let i = user.projects.findIndex(function(el){
            return el.id == req.body.projectId
        })
        user.projects[i].title = req.body.title
        user.markModified('projects')
        user.save(function(err, updatedUser){
            if (err) return handleError(err)
            res.send(JSON.stringify(updatedUser.projects))
        })
    })
})

app.listen(3000, '0.0.0.0', function(req, res){
    console.log('Server started at port 3000...')
})