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
// MONGOOSE
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



app.use('/', gtdf)
app.use('/', users)



app.get('/', function(req, res){
  res.render('index')
})

app.listen(3000, '0.0.0.0', function(req, res){
  console.log('Server started at port 3000...')
})
