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

      ],
      places: [

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

module.exports.changePassword = function(user, newPassword, callback){
  bcrypt.genSalt(10, function(err, salt){
    bcrypt.hash(newPassword, salt, function(err, hash){
      user.password = hash
      user.save(callback)
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
  
  try {
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
  catch(err) {
    console.log(err)
  }
}

module.exports.getIndexOfProjectThatHasTheGivenActionId = function(data, actionId){
  let pros = data.projects
  let length = pros.length
  for (let i = 0;i < length;i++){
    let actionsLength = pros[i].actions.length
    for (let j = 0;j < actionsLength;j++){
      if (pros[i].actions[j] == actionId)
        return i
    }
  }
}

module.exports.getIndexOfProjectActionThatHasTheGivenActionId = function(data, projectId, actionId){
  let pros = data.projects
  if (pros[projectId] == undefined)
    return -1
  let actionsLength = pros[projectId].actions.length
  for (let i = 0;i < actionsLength;i++)
    if (pros[projectId].actions[i] == actionId)
      return i
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

module.exports.fixChangedActionOrderInProject = function(data, oldId, newId){
  let pros = data.projects
  let acts = data.actions
  let projectId = acts[newId].projectId
  let pro = pros[projectId]
  let hasProject = (acts[newId].projectId || acts[newId].projectId == 0)

  if (hasProject){
    let length = pro.actions.length
    let changedActionId
    for (let i = 0;i < length;i++)
      if (pro.actions[i] == oldId){
        pro.actions[i] = newId
        changedActionId = i
        break
      } 

    for (let i = 0;i < length;i++){
      let id = pro.actions[i]
      if (id == newId && id < oldId && changedActionId != i){
        pro.actions[i] += 1
      } else if (id == newId && id > oldId && changedActionId != i){
        pro.actions[i] -= 1
      } else if (id > newId && id < oldId  && changedActionId != i){
        pro.actions[i] += 1
      } else if (id > oldId && id < newId  && changedActionId != i){
        pro.actions[i] -= 1
      }
    }
  }
  
  length = pros.length
  for (let i = 0;i < length;i++){
    if (hasProject && i == projectId) continue
    let actionsLength = pros[i].actions.length
    for (let j = 0;j < actionsLength;j++){
      if (pros[i].actions[j] > newId && pros[i].actions[j] < oldId){
        pros[i].actions[j] += 1
      } else if (pros[i].actions[j] > oldId && pros[i].actions[j] < newId){
        pros[i].actions[j] -= 1
      }
    }
  }
}

module.exports.deleteAction = function(data, id){
  let act = data.actions

  act.splice(id, 1)

  module.exports.decreaseProjectsActionsIdsByOneThatAreBiggerThan(data, id)
  module.exports.resetIds(act)
},

module.exports.decreaseProjectsActionsIdsByOneThatAreBiggerThan = function(data,id){
  let pros = data.projects

  let length = pros.length
  for (let i = 0;i < length;i++){
    let actionsLength = pros[i].actions.length
    for (let j = 0;j < actionsLength;j++){
      if (pros[i].actions[j] > id)
        pros[i].actions[j] -= 1
    }
  }
}

module.exports.deleteProjectAction = function(id, data){
  let act = data.actions
  let pro = data.projects
  let i = module.exports.getIndexOfProjectThatHasTheGivenActionId(data, id)
  let j = module.exports.getIndexOfProjectActionThatHasTheGivenActionId(data, i, id)
  pro[i].actions.splice(j, 1)
  act.splice(id, 1)

  module.exports.decreaseProjectsActionsIdsByOneThatAreBiggerThan(data, id)
  module.exports.resetIds(act)
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

  module.exports.removeActionsFromProject(data, id)
  pro.splice(id, 1)

  module.exports.resetIds(pro)
  module.exports.updateActionsIds(data)
}

module.exports.createAndAddActionToProject = function(user, id, projectId, title, description, place){
  user.actions.push({tag: 'basket',title: title, description: description, id: id, projectId: projectId, place: place})
  user.projects[projectId].actions.push(id)
}

module.exports.removeActionFromProject = function(data, actionId){
  let u = module.exports
  let pro = data.projects
  let act = data.actions

  let i = u.getIndexOfProjectThatHasTheGivenActionId(data, actionId)
  let j = u.getIndexOfProjectActionThatHasTheGivenActionId(data, i, actionId)

  pro[i].actions.splice(j, 1)
  delete act[actionId].projectId
}

module.exports.getIndexOfactionThatHasTheGivenProjectIdAll = function(data, projectId){
  let acts = data.actions
  let length = acts.length
  let actionIds = []
  for (let i = 0;i < length;i++)
    if (acts[i].projectId == projectId)
      actionIds.push(i)
  return actionIds
}

module.exports.updateActionsIds = function(data){
  let pro = data.projects
  let act = data.actions

  let length = pro.length
  for (let i = 0;i < length;i++){
    let actionsLength = pro[i].actions.length
    for (let j = 0;j < actionsLength;j++){
      act[pro[i].actions[j]].projectId = pro[i].id
    }
  }
}

module.exports.addTimedAction = function(act, title, description, date, time, place){
  act.push({id: act.length, place: place, tag: 'calendar', title: title, description: description, calendar: {time: time, date: date}})
}

module.exports.editTimedAction = function(act, title, description, date, time, id){
  act[id].title = title
  act[id].description = description
  act[id].calendar.date = date
  act[id].calendar.time = time
}

module.exports.fixStringIdsAndNulls = function(data){
  let pros = data.projects
  let acts = data.actions

  let length = acts.length
  for (let i = 0;i < length;i++){
    acts[i].id = parseInt(acts[i].id)
    acts[i].projectId = parseInt(acts[i].projectId)
    if (acts[i].place == "null" || acts[i].place == 'show all')
      acts[i].place = null
  }

  length = pros.length
  for (let i = 0;i < length;i++){
    pros[i].id = parseInt(pros[i].id)
    let actionsLength = pros[i].actions.length
    for (let j = 0;j < actionsLength;j++){
      pros[i].actions[j] = parseInt(pros[i].actions[j])
    }
  }
}

module.exports.removePlaceFromAllActionsThatHasThePlace = function(data, place){
  let length = data.actions.length
  let acts = data.actions
  let places = data.places

  for (let i = 0;i < length;i++)
    if (acts[i].place == place)
      acts[i].place = null

  length = places.length
  for (let i = 0;i < length;i++)
    if (places[i] == place){
      places.splice(i, 1)
      data.places
      break
    }

}

module.exports.changeProjectActionsPlace = function(data, id, place){
  let acts = data.actions
  let ids = data.projects[id].actions
  let length = ids.length
  for (let i = 0;i < length;i++)
    acts[ids[i]].place = place
}
