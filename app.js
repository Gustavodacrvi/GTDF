const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const mongo = require('mongodb')
const mongoose = require('mongoose')
const path = require('path')
const i18n = require('i18n')





// MONGOOSE
mongoose.connect('mongodb://localhost/GTD', { useNewUrlParser: true })
const db = mongoose.connection

// ROUTES
const routes = require('./routes/index')
const users = require('./routes/users')

// I18N
i18n.configure({
    locales: ['en', 'pt-BR'],
    defaultLocale: 'en',
    queryParameter: 'lang',
    cookie: 'langCookie',
    directory: path.join(__dirname, 'i18n'),
})

var app = express()
// I18N
app.use(cookieParser())
app.use(i18n.init)

// EXPRESS SECTION
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
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//BODY PARSER
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

// STATIC
app.use(express.static(path.join(__dirname, 'static')))

// PASSPORT INIT
app.use(passport.initialize())
app.use(passport.session())

// EXPRESS VALIDATOR
app.use(expressValidator({
    errorFormatter: function(param, msg, value){
        var namespace = param.split('.')
        , root = namespace.shift()
        , formParam = root
        while(namespace.length){
            formParam += '[' + namespace.shift() + ']'
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        }
    }
}))


app.use('/', routes)
app.use('/users', users)






app.get('/', function(req, res) {
    res.render('index')
})
app.get('/login', function(req, res){
    res.render('login')
})
app.get('/signup', function(req, res){
    res.render('signup', {
        errors: [{msg: ''}]
    })
})
app.get('/user', function(req, res){
    res.render('user')
})



app.listen(3000, '0.0.0.0', function(){
    console.log('Server started at port 3000...')
})