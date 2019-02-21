let express = require('express')
let path = require('path')
let ejs = require('ejs')
let i18n = require('i18n')
let mongo = require('mongodb')
let bodyParser = require('body-parser')
let passport = require('passport')
var mongoose = require('mongoose')
let cookieParser = require('cookie-parser')
let expressValidator = require('express-validator')
let session = require('express-session')
let flash = require('connect-flash')

// ROUTES
var users = require('./routes/users')
var gtdf = require('./routes/gtdf')





// I18N
i18n.configure({
  locales: ['en', 'pt-BR'],
  cookie: 'localeCookie',
  directory: path.join(__dirname, 'locales'),
  queryParameter: 'lang',
  defaultLocale: 'en',
});
// MONGOOSE process.env.DATABASE 'mongodb://localhost/GTDF'
mongoose.connect('mongodb://localhost/GTDF', { useNewUrlParser: true})
var mongoose = mongoose.connection
// APP
let app = express()
// COOKIE PARSER
app.use(cookieParser())
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
  res.locals.deletedProject = true
  next()
})
// VIEW ENGINE
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
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
// I18N
app.use(i18n.init)
// BODY PARSER
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/', users)
app.use('/', gtdf)

function checkAndChangeLocale(req, res){
  if (req.session.chosen_locale)
      i18n.setLocale(res, req.session.chosen_locale)
}

app.get('/', function(req, res){
  checkAndChangeLocale(req, res)
  res.render('index', {
    user: req.user
  })
})

app.get('/begin', function(req, res){
  checkAndChangeLocale(req, res)
  res.render('begin')
})

app.get('/en', function(req, res){
  req.session.chosen_locale = 'en'
  res.redirect('/')
})
app.get('/pt-BR', function(req, res){
  req.session.chosen_locale = 'pt-BR'
  res.redirect('/')
})

//  Handle 404
app.use(function(req, res) {
  checkAndChangeLocale(req, res)
  res.status(404)
  res.render('404', {
    user: req.user
  })
});
//  Handle 500
app.use(function(error, req, res, next){
  checkAndChangeLocale(req, res)
  res.status(500)
  res.render('500')
});

app.listen(process.env.PORT || 3000, function(req, res){
  console.log('Server started at port 3000...')
})
