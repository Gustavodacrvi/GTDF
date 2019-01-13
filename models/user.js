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
    actions: [
    ],
    projects: [

    ],
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