const express = require('express')
const path = require('path')



var app = express()





app.get('/', function(req, res) {
    res.send('hello')
})



app.listen(3000, function(){
    console.log('Server started at port 3000...')
})