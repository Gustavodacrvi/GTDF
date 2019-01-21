const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

var userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    data: {
      actions: [

      ],
      projects: [

      ]
    }
})

var User = module.exports = mongoose.model('User', userSchema)



module.exports.createUser = function(newUser, caLLback){
    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(newUser.password, salt, function(err, hash){
            newUser.password = hash
            newUser.save(caLLback)
        })
    })
}

module.exports.getUserByUsername = function(username, caLLback){
    var query = {username: username}
    User.findOne(query, caLLback)
}

module.exports.getUserById = function(id, caLLback){
    User.findById(id, caLLback)
}

module.exports.comparePassword = function(candidatePassword, hash, caLLback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch){
        if(err) throw err
        caLLback(null, isMatch)
    })
}

module.exports.rearrangeActions = function(arr, newArr){
  let length = arr.length
  
  for (let i = 0;i < length;i++){
    if (arr[i].id == newArr[i])
      continue
    else {
      for (let j = i + 1;j < length;j++){
        if (newArr[i] == arr[j].id){
          let temp = arr[j]
          arr[j] = arr[i]
          arr[i] = temp
          break
        }
      }
    }
  }
}

module.exports.deleteAction = function(id, arr){
  arr.splice(id, 1)
  let length = arr.length
  for (let i = 0;i < length;i++)
    arr[i].id = i
}