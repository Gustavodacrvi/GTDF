let express = require('express')
let path = require('path')
let ejs = require('ejs')
let i18n = require('i18n')



// I18N
i18n.configure({
  locales: ['en', 'pt-BR'],
  cookie: 'localeCookie',
  directory: path.join(__dirname, 'locales'),
  queryParameter: 'lang',
  defaultLocale: 'en',
});



let app = express()

// VIEW ENGINE
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// STATIC
app.use(express.static(path.join(__dirname, 'static')))

// I18N
app.use(i18n.init)




app.get('/', function(req, res){
  res.render('index.ejs')
})


app.listen(3000, '0.0.0.0', function(req, res){
  console.log('Server started at port 3000...')
})
