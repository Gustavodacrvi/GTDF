const express = require('express')
const path = require('path')



var app = express()




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



app.listen(3000, function(){
    console.log('Server started at port 3000...')
})