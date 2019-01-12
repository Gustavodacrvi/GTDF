let express = require('express')
let path = require('path')
let ejs = require('ejs')



let app = express()

// VIEW ENGINE
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))



app.get('/', function(req, res){
  res.render('index.ejs')
})


app.listen(3000, '0.0.0.0', function(req, res){
  console.log('Server started at port 3000...')
})