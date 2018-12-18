const express = require('express')
const cookieParser = require('cookie-parser')
const path = require('path')
const i18n = require('i18n')

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



// VIEW ENGINE
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')




// STATIC
app.use(express.static(path.join(__dirname, 'static')))





app.get('/', function(req, res) {
    res.render('index')
})
app.get('/login', function(req, res){
    res.render('login')
})
app.get('/signup', function(req, res){
    res.render('signup')
})




app.listen(3000, '0.0.0.0', function(){
    console.log('Server started at port 3000...')
})