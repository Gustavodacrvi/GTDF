let express = require('express')



let app = express()



app.get('/', function(req, res){
  res.send('GTDF')
})


app.listen(3000, '0.0.0.0', function(req, res){
  console.log('Server started at port 3000...')
})