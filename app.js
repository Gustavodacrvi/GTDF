var express = require('express')
var ejs = require('ejs')
var path = require('path')
var i18n = require('i18n')
var cookieParser = require('cookie-parser')


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

// VIEW ENGINE
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// STATIC
app.use(express.static(path.join(__dirname, 'static')))





app.get('/', function(req, res){
    res.render('index')
})




app.listen(3000, '0.0.0.0', function(req, res){
    console.log('Server started at port 3000...')
})