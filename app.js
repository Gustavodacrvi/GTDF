var express = require('express')
var ejs = require('ejs')
var path = require('path')
var i18n = require('i18n')
var bodyParser = require('body-parser')
var mongo = require('mongodb')
var mongoose = require('mongoose')
var flash = require('connect-flash')
var session = require('express-session')
var expressValidator = require('express-validator')
var passport = require('passport')
var cookieParser = require('cookie-parser')




// OBJECT ID
var Objectid = mongoose.Types.ObjectId

// MONGOOSE
mongoose.connect('mongodb://localhost/GTD', { useNewUrlParser: true})
var mongoose = mongoose.connection

// ROUTES
var users = require('./routes/users')

// I18N
i18n.configure({
    locales: ['en', 'pt-BR'],
    cookie: 'localeCookie',
    directory: path.join(__dirname, 'locales'),
    queryParameter: 'lang',
    defaultLocale: 'en',
});

var app = express()

// COOKIE PARSER
app.use(cookieParser())

// I18N
app.use(i18n.init)

// EXPRESS SESSION
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}))

// CONNECT FLASH
app.use(flash())

// GLOBAL VARS
app.use(function (req, res, next){
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    res.locals.user = req.user || null
    res.locals.activeLink = ''

    next()
})

// VIEW ENGINE
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// BODY PARSER
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

// STATIC
app.use(express.static(path.join(__dirname, 'static')))

// PASSPORT
app.use(passport.initialize())
app.use(passport.session())

// EXPRESS VALIDATOR
app.use(expressValidator({
    errorFormatter: function(param, msg, value){
        var namespace = param.split('.')
        , root = namespace.shift()
        , formParam = root
        while(namespace.length){
            formParam = '[' + namespace.shift() + ']'
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        }
    }
}))

app.use('/users', users)


// MODEL
var User = require('./models/user')



class TimeM {
    constructor(time_str){
        let splited = time_str.split(':')
        this.hour = parseInt(splited[0])
        this.min = parseInt(splited[1])
    }
    static isValidTime(time_str){
        let splited = time_str.split(':')
        let hour = parseInt(splited[0])
        let min = parseInt(splited[1])

        if (isNaN(hour) || isNaN(min))
            return false
        if (splited.length - 1 != 1)
            return false
        
        if (hour > 23 || hour < 0 || min < 0 || min > 59)
            return false
        return true
    }
    static getCurrentTime(){
        let date = new Date()
        return new TimeM('' + date.getHours() + ':' + date.getMinutes())
    }

    isEqual(time_obj){
        if (this.hour != time_obj.hour)
            return false
        if (this.min != time_obj.min)
            return false
        return true
    }
    comesBefore(time_obj){
        if (this.hour > time_obj.hour)
            return false
        if (this.hour == time_obj.hour){
            if (this.min >= time_obj.min){
                return false
            }
            if (this.min < time_obj.min)
                return true
        }
        return true
    }
    comesAfter(time_obj){
        if (this.hour < time_obj.hour)
            return false
        if (this.hour == time_obj.hour){
            if (this.min <= time_obj.min){
                return false
            }
            if (this.min > time_obj.min)
                return true
        }
        return true
    }

    sync(){
        let date = new Date()
        let init = () => {this.syncId = setInterval(() => {this.addMin(1)}, 60000)}
        setTimeout(() => {
            this.hour = date.getHours()
            this.min = date.getMinutes()
            this.addMin(1)
            init()
        }, 60000 - date.getSeconds() * 1000)
    }
    async(){
        clearInterval(this.syncId)
    }

    getCopy(){
        let timem = new TimeM('' + this.hour + ':' + this.min)
        return timem
    }

    stringfy(){
        return '' + this.hour + ':' + this.min
    }

    addHour(int){
        for (let i = 0;i < int;i){
            if (this.hour + 1 == 24)
                this.hour = 0
            else
                this.hour += 1
        }
    }
    addMin(int){
        for (let i = 0;i < int;i++){
            if (this.min + 1 > 59){
                this.min = 0
                this.hour += 1
            } else {
                this.min += 1
            }
        }
    }
    subtractHour(int){
        for (let i = 0;i < int;i){
            if (this.hour - 1 < 0)
                this.hour = 23
            else
                this.hour -= 1
        }
    }
    subtractMin(int){
        for (let i = 0;i < int;i++){
            if (this.min -1 < 0){
                this.min = 59
                this.hour -= 1
            } else {
                this.min -= 1
            }
        }
    }

    diference(time_obj){
        return new TimeM('' + (this.hour - time_obj.hour) + ':' + (this.min - time_obj.min))
    }
}

function check_and_change_locale(req, res){
    if (req.session.chosen_locale)
        i18n.setLocale(res, req.session.chosen_locale)
}
function check_authentication(req, res){
    res.locals.isLogged = req.isAuthenticated()
}
function removeActionFromProject(user, actionId){
    let i = user.projects.findIndex(function(el){
        return el.actions.some(function(ele){
            return '' + ele.id === '' + actionId
        })
    })
    let j = user.projects[i].actions.findIndex(function(el){
        return '' + el.id === '' + actionId
    })
    user.projects[i].actions.splice(j, 1)
    let k = user.actions.findIndex(function(el){
        return '' + el.id === '' + actionId
    })
    delete user.actions[k].project
    user.markModified('projects')
    user.markModified('actions')
}
function deleteAction(user, actionId){
    let i = user.actions.findIndex(function(el){
        return '' + el.id === '' + actionId
    })
    user.actions.splice(i, 1)
    user.markModified('actions')
}
function getUserActionIndex(user, actionId){
    let i = user.actions.findIndex(function(el){
        return actionId == el.id
    })
    return i
}
function getProjectActionIndex(user, actionId){
    let i = user.projects.findIndex(function(el){
        return el.actions.some(function(ele){
            return ele.id == actionId
        })
    })
    let j = user.projects[i].actions.findIndex(function(el){
        return el.id == actionId
    })
    return {action: j, project: i}
}
function getProjectIndex(user, projectId){
    return user.projects.findIndex(function(el){
        return '' + el.id === '' + projectId
    })
}
function insertionSort(arr){
    for (let i = 1; i < arr.length;i++){
        let arri = parseInt(arr[i].order)
        if (arri < parseInt(arr[0].order))
            arr.unshift(arr.splice(i,1)[0])
        else if (arri > parseInt(arr[i-1].order))
            continue
        else 
            for (let j = 1;j < i;j++)
                if (arri > parseInt(arr[j-1].order) && arri < parseInt(arr[j].order))
                    arr.splice(j,0,arr.splice(i,1)[0])
    }
    return arr
}
function insertionSortCalendar(actions){
    let arr = []
    let indexes = []
    actions.forEach((el, i) =>{
        if (el.calendar && el.calendar.time != null){
            arr.push(el)
            indexes.push(i)
        }
    })

    // INSERTION SORT
    for (let i = 1; i < arr.length;i++){
        let arri = new TimeM(arr[i].calendar.time)
        if (arri.comesBefore(new TimeM(arr[0].calendar.time)))
            arr.unshift(arr.splice(i,1)[0])
        else if (arri.comesAfter(new TimeM(arr[i-1].calendar.time)))
            continue
        else
            for (let j = 1;j < i;j++)
                if (arri.comesAfter(new TimeM(arr[j-1].calendar.time)) && arri.comesBefore(new TimeM(arr[j].calendar.time)))
                    arr.splice(j,0,arr.splice(i,1)[0])
    }

    indexes.forEach((index, j) => {
        actions[index] = arr[j]
    })

    return actions
}
function addTimedAction(user, date, time, title, description){
    user.actions.push({
        id: new Objectid(),
        tag: 'calendar',
        title: title,
        description: description,
        calendar: {
            date: date,
            time: time
        }
    })
    user.actions = insertionSortCalendar(user.actions)
}
function editTimedAction(user, actionId, date, time, title, description){
    let i = user.actions.findIndex(function(el){
        return '' + el.id === '' + actionId
    })
    user.actions[i].calendar.date = date
    user.actions[i].calendar.time = time
    user.actions[i].title = title
    user.actions[i].description = description
    user.actions = insertionSortCalendar(user.actions)
    user.markModified('actions')
}
function addCalendarTagToAction(user, actionId, date, time){
    let i = user.actions.findIndex(function(el){
        return '' + actionId == '' + el.id
    })
    user.actions[i].tag = 'calendar'
    user.actions[i].calendar = {
        date: date,
        time: time
    }
    user.actions = insertionSortCalendar(user.actions)
    user.markModified('actions')
}
function removeCalendarTagFromAction(user, actionId, tag){
    let i = user.actions.findIndex(function(el){
        return '' + el.id === '' + actionId
    })
    user.actions[i].tag = tag
    delete user.actions[i].calendar
    user.actions = insertionSort(user.actions)
    user.markModified('actions')
}


app.get('/', function(req, res){
    check_and_change_locale(req, res)
    check_authentication(req, res)
    res.render('index')
})
app.get('/user/initial', function(req, res){
    check_and_change_locale(req, res)
    check_authentication(req, res)
    res.render('user/initial')
})
app.get('/user/login', function(req, res){
    check_and_change_locale(req, res)
    check_authentication(req, res)
    res.render('user/login')
})
app.get('/user/signup', function(req, res){
    check_and_change_locale(req, res)
    check_authentication(req, res)
    res.render('user/signup')
})
app.get('/user/send-email', function(req, res){
    check_and_change_locale(req, res)
    check_authentication(req, res)
    res.render('user/send-email')
})

app.get('/user/gtd/basket', function(req, res){
    check_authentication(req, res)    
    if (req.isAuthenticated()){
        check_and_change_locale(req, res)
        res.locals.activeLink = 'basket'
        res.render('user/gtd/basket', {
            user: req.user,
            displayUserMenu: true
        })
    } else {
        res.redirect('/user/login')
    }
})
app.get('/user/gtd/calendar', function(req,res){
    check_authentication(req, res)
    if (req.isAuthenticated()){
        check_and_change_locale(req, res)
        res.locals.activeLink = 'calendar'
        res.render('user/gtd/calendar', {
            user: req.user,
            displayUserMenu: true
        })
    } else {
        res.redirect('/user/login')
    }
})
app.get('/user/gtd/next-actions', function(req,res){
    check_authentication(req, res)
    if (req.isAuthenticated()){
        check_and_change_locale(req, res)
        res.locals.activeLink = 'next actions'
        res.render('user/gtd/next-actions', {
            user: req.user,
            displayUserMenu: true
        })
    } else {
        res.redirect('/user/login')
    }
})
app.get('/user/gtd/projects', function(req,res){
    check_authentication(req, res)
    if (req.isAuthenticated()){
        check_and_change_locale(req, res)
        res.locals.activeLink = 'projects'
        res.render('user/gtd/projects', {
            user: req.user,
            displayUserMenu: true
        })
    } else {
        res.redirect('/user/login')
    }
})
app.get('/user/gtd/someday', function(req,res){
    check_authentication(req, res)
    if (req.isAuthenticated()){
        check_and_change_locale(req, res)
        res.locals.activeLink = 'someday'
        res.render('user/gtd/someday', {
            user: req.user,
            displayUserMenu: true
        })
    } else {
        res.redirect('/user/login')
    }
})
app.get('/user/gtd/waiting', function(req,res){
    check_authentication(req, res)
    if (req.isAuthenticated()){
        check_and_change_locale(req, res)
        res.locals.activeLink = 'waiting'
        res.render('user/gtd/waiting', {
            user: req.user,
            displayUserMenu: true
        })
    } else {
        res.redirect('/user/login')
    }
})

app.get('/en', function(req, res){
    req.session.chosen_locale = 'en'
    res.redirect('/')
})
app.get('/pt-BR', function(req, res){
    req.session.chosen_locale = 'pt-BR'
    res.redirect('/')
})

// ACTIONS

app.post('/user/add-action', function(req, res){
    let action = {
        id: new Objectid(),
        tag: req.body.tag,
        title: req.body.title,
        description: req.body.description
    }
    User.findById(req.user.id, function (err, user) {
        if (err) return handleError(err)
      
        user.actions.push(action)
        user.save(function (err, updatedUser) {
          if (err) return handleError(err)
          res.send(JSON.stringify(updatedUser))
        })
      })
})

app.get('/user/get-user', function(req, res){
    User.findById(req.user.id, function(err, user){
        if (err) return handleError(err)

        res.send(JSON.stringify(user))
    })
})

app.post('/user/delete-action', function(req, res){
    User.findById(req.user.id, function(err, user){
        if (err) return handleError(err)

        deleteAction(user, req.body.actionId)
        user.save(function(err, updatedUser){
            if (err){
                console.log(err)
            }
            res.send(JSON.stringify(updatedUser))
        })
    })
})

app.post('/user/edit-action', function(req, res){
    User.findById(req.user.id, function(err, user){
        if (err) return handleError(err)

        let i = user.actions.findIndex(function(el){
            return el.id == req.body.actionId
        })
        user.actions[i].title = req.body.title
        user.actions[i].description = req.body.description
        user.markModified('actions')
        user.save(function(err, updatedUser){
            if (err) return handleError(err)

            res.send(JSON.stringify(updatedUser))
        })
    })
})

app.post('/user/edit-tag', function(req, res){
    User.findById(req.user.id, function(err, user){
        if (err) return handleError(err)

        let i = getUserActionIndex(user, req.body.actionId)

        user.actions[i].tag = req.body.tag
        user.markModified('actions')
        user.save(function(err, updatedUser){
            if (err) return handleError(err)
            
            res.send(JSON.stringify(updatedUser))
        })
    })
})

app.post('/user/create-project', function(req, res){
    let project = {
        id: new Objectid(),
        title: req.body.title,
        actions: [
        ]
    }
    User.findById(req.user.id, function(err, user){
        if (err) return handleError(err)

        user.projects.push(project)
        user.save(function (err, updatedUser) {
            if (err) return handleError(err)
            res.send(JSON.stringify(updatedUser))
          })
    })
})

app.post('/user/delete-project', function(req, res){
    User.findById(req.user.id, function(err, user){
        if (err) return handleError(err)

        let i = user.projects.findIndex(function(el){
            return el.id == req.body.projectId
        })
        user.projects[i].actions.forEach(function(el, j){
            let k = user.actions.findIndex(function(ele){
                return '' + ele.id === '' + el.id
            })
            delete user.actions[k].project
        })
        user.projects.splice(i, 1)
        user.markModified('projects')
        user.markModified('actions')
        user.save(function(err, updatedUser){
            if (err) return handleError(err)
            res.send(JSON.stringify(updatedUser))
        })
    })
})

app.post('/user/edit-project-title', function(req, res){
    User.findById(req.user.id, function(err, user){
        if (err) return handleError(err)

        let i = user.projects.findIndex(function(el){
            return el.id == req.body.projectId
        })
        user.projects[i].title = req.body.title
        user.markModified('projects')
        user.save(function(err, updatedUser){
            if (err) return handleError(err)
            res.send(JSON.stringify(updatedUser.projects))
        })
    })
})

app.post('/user/create-add-action-project', function(req, res){
    User.findById(req.user.id, function(err, user){
        if (err) return handleError(err)

        let i = user.projects.findIndex(function(el){
            return el.id == req.body.projectId
        })
        let action = {
            id: new Objectid(),
            tag: 'basket',
            title: req.body.title,
            description: req.body.description,
            project: {
                id: req.body.projectId,
                title: user.projects[i].title,
                order: req.body.order
            }
        }
        let projectAction = {
            id: action.id,
            order: req.body.order
        }
        user.projects[i].actions.push(projectAction)
        user.actions.push(action)
        user.projects[i].actions = insertionSort(user.projects[i].actions)
        user.markModified('actions')
        user.markModified('projects')
        user.save(function(err, updatedUser){
            if (err) return handleError(err)
            res.send(JSON.stringify(updatedUser))
        })
    })
})

app.post('/user/delete-project-action', function(req, res){
    User.findById(req.user.id, function(err, user){
        if (err) handleError(err)
        
        removeActionFromProject(user, req.body.actionId)
        deleteAction(user, req.body.actionId)
        user.save(function(err, updatedUser){
            if (err) return handleError(err)
            res.send(JSON.stringify(updatedUser))
        })
    })
})

app.post('/user/remove-from-project', function(req, res){
    User.findById(req.user.id, function(err, user){
        if (err) handleError(err)

        removeActionFromProject(user, req.body.actionId)

        user.save(function(err, updatedUser){
            if (err) return handleError(err)

            res.send(JSON.stringify(updatedUser))
        })
    })
})

app.post('/user/edit-action-project', function(req, res){
    User.findById(req.user.id, function(err, user){
        if (err) handleError(err)

        let actionI = getUserActionIndex(user, req.body.actionId)
        let projectI = getProjectActionIndex(user, req.body.actionId)

        user.actions[actionI].title = req.body.title
        user.actions[actionI].description = req.body.description
        user.actions[actionI].project.order = req.body.order
        user.projects[projectI.project].actions[projectI.action].order = req.body.order
        user.projects[projectI.project].actions = insertionSort(user.projects[projectI.project].actions)
        user.markModified('actions')
        user.markModified('projects')
        user.save(function(err, updatedUser){
            if (err) return handleError(err)

            res.send(JSON.stringify(updatedUser))
        })
    })
})
app.post('/user/add-already-existing-action', function(req, res){
    User.findById(req.user.id, function(err, user){
        if (err) handleError(err)

        let actionI = getUserActionIndex(user, req.body.actionId)
        let projectI = getProjectIndex(user, req.body.projectId)

        user.projects[projectI].actions.push({ id: req.body.actionId, order: req.body.order})
        user.projects[projectI].actions = insertionSort(user.projects[projectI].actions)

        user.actions[actionI].project = {
            id: req.body.projectId,
            order: req.body.order,
            title: user.projects[projectI].title
        }
        
        user.markModified('actions')
        user.markModified('projects')
        user.save(function(err, updatedUser){
            if (err) return handleError(err)

            res.send(JSON.stringify(updatedUser))
        })
    })
})

app.post('/user/transform-action-to-project', function(req, res){
    User.findById(req.user.id, function(err, user){
        if (err) handleError(err)

        let actionI = getUserActionIndex(user, req.body.actionId)

        let project = {}
        if ('' + req.body.delete == '' + true){
            project = {
                id: user.actions[actionI].id,
                title: user.actions[actionI].title,
                actions: [
                ]
            }
            user.actions.splice(actionI, 1)
        } else {
            project = {
                id: new Objectid(),
                title: user.actions[actionI].title,
                actions: [

                ]
            }
        }
        user.projects.push(project)        
        user.markModified('projects')
        user.markModified('actions')
        user.save(function(err, updatedUser){
            if (err) return handleError(err)

            res.send(JSON.stringify(updatedUser))
        })
    })
})

app.post('/user/add-timed-action', function(req, res){
    User.findById(req.user.id, function(err, user){
        if (err) handleError(err)

        addTimedAction(user, req.body.date, req.body.time, req.body.title, req.body.description)

        user.save(function(err, updatedUser){
            if (err) return handleError(err)

            res.send(JSON.stringify(updatedUser.actions))
        })
    })
})

app.post('/user/edit-timed-action', function(req, res){
    User.findById(req.user.id, function(err, user){
        if (err) handleError(err)

        editTimedAction(user, req.body.actionId, req.body.date, req.body.time, req.body.title, req.body.description)

        user.save(function(err, updatedUser){
            if (err) return handleError(err)

            res.send(JSON.stringify(updatedUser.actions))
        })
    })
})

app.post('/user/add-calendar-tag', function(req, res){
    User.findById(req.user.id, function(err, user){
        if (err) handleError(err)

        addCalendarTagToAction(user, req.body.actionId, req.body.date, req.body.time)

        user.save(function(err, updatedUser){
            if (err) return handleError(err)

            res.send(JSON.stringify(updatedUser.actions))
        })
    })
})

app.post('/user/remove-calendar-tag-action', function(req, res){
    User.findById(req.user.id, function(err, user){
        if (err) handleError(err)

        removeCalendarTagFromAction(user, req.body.actionId, req.body.tag)

        user.save(function(err, updatedUser){
            if (err) return handleError(err)

            res.send(JSON.stringify(updatedUser.actions))
        })
    })
})

app.post('/user/edit-timed-project-action', function(req, res){
    User.findById(req.user.id, function(err, user){
        if (err) handleError(err)

        let actionI = getUserActionIndex(user, req.body.actionId)
        let projectI = getProjectIndex(user, user.actions[actionI].project.id)
        let j = user.projects[projectI].actions.findIndex(function(el){
            return '' + el.id === req.body.actionId
        })

        user.actions[actionI].description = req.body.description
        user.actions[actionI].title = req.body.title
        user.actions[actionI].project.order = req.body.order
        user.actions[actionI].calendar.time = req.body.time
        user.actions[actionI].calendar.date = req.body.date

        user.projects[projectI].actions[j].order = req.body.order

        user.actions = insertionSortCalendar(user.actions)
        user.actions = insertionSort(user.actions)

        user.markModified('projects')
        user.markModified('actions')
        user.save(function(err, updatedUser){
            if (err) return handleError(err)

            res.send(JSON.stringify(updatedUser))
        })
    })
})

app.listen(3000, '0.0.0.0', function(req, res){
    console.log('Server started at port 3000...')
})
//
