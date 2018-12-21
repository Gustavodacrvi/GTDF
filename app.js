var express = require('express')

var app = express()



app.get('/', function(req, res){
    res.send('Hello World')
})




app.listen(3000, '0.0.0.0', function(req, res){
    console.log('Server started at port 3000...')
})