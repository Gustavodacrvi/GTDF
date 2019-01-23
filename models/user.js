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

module.exports.rearrange = function(arr, newArr){
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

module.exports.getIndexOfProjectThatHasTheGivenActionId = function(data, actionId){
  return data.projects.findIndex((el) => {
    return el.actions.some((ele) => {
      return ele == actionId
    })
  })
}

module.exports.getIndexOfProjectActionThatHasTheGivenActionId = function(data, projectId, actionId){
  return data.projects[projectId].actions.findIndex((el) => {
    return el == actionId
  })
}

module.exports.getIds = function(arr){
  let newArr = []
  let length = arr.length
  for (let i = 0;i < length;i++)
    newArr.push(arr[i].id)
  return newArr
}

module.exports.resetIds = function(arr){
  let length = arr.length
  for (let i = 0;i < length;i++)
    arr[i].id = i
}

module.exports.updateProjectActionIds = function(data, oldActionIds){
  let pro = data.projects
  let act = data.actions
  let old = oldActionIds

  let length = act.length
  let projectId
  let actionId
  for (let i = 0;i < length;i++){
    if (!act[i].projectId && act[i].projectId != 0)
      continue
    projectId = module.exports.getIndexOfProjectThatHasTheGivenActionId(data, old[i])
    actionId = module.exports.getIndexOfProjectActionThatHasTheGivenActionId(data, projectId, old[i])
    pro[projectId].actions[actionId] = act[i].id
  }
}

module.exports.deleteAction = function(data, id){
  let act = data.actions

  act.splice(id, 1)

  let oldActionIds = module.exports.getIds(act)
  module.exports.resetIds(act)
  module.exports.updateProjectActionIds(data, oldActionIds)
}

module.exports.deleteProjectAction = function(id, data){
  let act = data.actions
  let pro = data.projects
  let i = module.exports.getIndexOfProjectThatHasTheGivenActionId(data, id)
  let j = module.exports.getIndexOfProjectActionThatHasTheGivenActionId(data, i, id)
  pro[i].actions.splice(j, 1)
  act.splice(id, 1)

  let oldActionIds = module.exports.getIds(act)
  module.exports.resetIds(act)
  module.exports.updateProjectActionIds(data, oldActionIds)
}

module.exports.editAction = function(title, desc, id, arr){
  let a = arr[id]
  a.title = title
  a.description  = desc
}

module.exports.editTag = function(id, tag, arr){
  arr[id].tag = tag
}

module.exports.addProject = function(arr, title){
  arr.push({
    id: arr.length,
    title: title,
    actions: [

    ]
  })
}

module.exports.removeActionsFromProject = function(data, projectId){
  let pro = data.projects[projectId]
  let act = data.actions

  let length = pro.actions.length
  for (let i = 0;i < length;i++)
    delete act[pro.actions[i]].projectId
}

module.exports.deleteProject = function(data, id){
  let pro = data.projects

  module.exports.removeActionsFromProject(id)
  pro.splice(id, 1)
  module.exports.resetIds(pro)
}

module.exports.createAndAddActionToProject = function(user, id, projectId, title, description){
  user.actions.push({tag: 'basket',title: title, description: description, id: id, projectId: projectId})
  user.projects[projectId].actions.push(id)
}