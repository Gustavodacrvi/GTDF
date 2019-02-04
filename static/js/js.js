

let vm = new Vue({
  el: '#app',
  data: {
    desktop: undefined,
    guest: false,
    tempPlace: undefined,
    showPasswords: false,
    showSideBar: false,
    username: undefined,
    places: undefined,
    tempUser: {
      action: {
        tag: undefined,
        title: undefined,
        description: undefined,
        place: '',
        calendar: {
          time: '',
          date: '',
          validTime: undefined,
          validDate: undefined
        }
      },
      project: {
        delete: true,
        id: '',
        id2: '',
        title: '',
        selected: 'select an action'
      }
    },
    user: undefined,
    currentSectionComponent: 'basket',
    currentOpenedUserForm: undefined,
    openedComponents: [
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ],
    showIconGroups: false,
    openedActionContents: undefined,
    openedProjectDropdowns: undefined,
    transformActionProject: 'create-project',
    place: undefined
  },
  methods: {
      setLanguage(lang){
        if (lang == 'en'){
          this.l = {
            lackOfNonProjectActionsBasket: `Your non-project actions with the tag "basket" will show here.</br></br>Click on the <i class='fa fa-plus icon-bif'></i> icon to add an action.`,
            lackOfProjectActionsBasket: `Your project actions with the tag "basket" will show here.</br></br>Go to the project section to create projects.`,
            nonProjectActions: `Non-project actions`,
            projectActions: `Project actions`,
            addAction: `Add action`,
            showFirstAction: `Show only first action of each project`,
            deleteAction: `Delete action`,
            editAction: `Edit action`,
            editActionTag: `Edit action tag`,
            addCreateProject: `Create/add to the project`,
            transformActionToProject: `Create a project with the same title as this action.`,
            createProject: `Create a project`,
            addActionToProject: `Add action to the project`,
            addToProject: `Add to the project`,
            lackOfNonProjectActionsNextAction: `Your non-project actions with the tag "next action" will show here.</br></br>Click on the <i class='fa fa-plus icon-bif'></i> icon to add an action.`,
            lackOfNonProjectActionsMaybe: `Your non-project actions with the tag "someday/maybe" will show here.</br></br>Click on the <i class='fa fa-plus icon-bif'></i> icon to add an action.`,
            lackOfNonProjectActionsWaiting: `Your non-project actions with the tag "waiting" will show here.</br></br>Click on the <i class='fa fa-plus icon-bif'></i> icon to add an action.`,
            lackOfProjectActionsNextAction: `Your project actions with the tag "next action" will show here.</br></br>Go to the project section to create projects.`,
            lackOfProjectActionsWaiting: `Your project actions with the tag "waiting" will show here.</br></br>Go to the project section to create projects.`,
            lackOfProjectActionsMaybe: `Your project actions with the tag "someday/maybe" will show here.</br></br>Go to the project section to create projects.`,
            waiting: `Waiting`,
            somedaymaybe: `Someday/maybe`,
            nextAction: `Next action`,
            calendar: `Calendar`,
            lackOfProjects: `All of your projects will show here.</br></br>Click on the <i class='fa fa-plus'></i> icon to create a project.`,
            deleteProject: `Delete the project`,
            editProjectTitle: `Edit the project title`,
            removeFromProject: `Remove action from the project`,
            before: `Before`,
            after: `After`,
            mon: `Mon`,
            wed: `Wed`,
            fri: `fri`,
            jan: `Jan`,
            feb: `Feb`,
            mar: `Mar`,
            apr: `Apr`,
            may: `May`,
            jun: `Jun`,
            jul: `Jul`,
            aug: `Aug`,
            sep: `Sep`,
            oct: `Oct`,
            nov: `Nov`,
            dec: `Dec`,
            lessActions: `Less actions`,
            moreActions: `More actions`,
            actions: `actions`,
            lackOfNonProjectActionsCalendar: `Your non-project actions with the tag "calendar" will show here.</br></br>Click on the <i class='fa fa-plus icon-bif'></i> icon to add an action.`,
            nonProjectActionAfter: `Your non project actions with the "calendar" tag that comes after the current year will show here.`,
            nonProjectActionBefore: `Your non project actions with the "calendar" tag that comes before the current year will show here.`,
            projectActionsCalendar: `Your project actions with the the tag "calendar" will show here.</br></br>Go to the project section to create a project.`,
            projectActionsCalendarAfter: `Your project actions with the "calendar" tag that comes after the current year will show here.`,
            projectActionsCalendarBefore: `Your project actions with the "calendar" tag that comes before the current year will show here.`,
            loggedAs: `Logged as`,
            username: `guest`,
            selectAProject: `select a project:`,
            addChangePlace: `add/change place`,
            placeSpan: `Current place:`,
            selectAPlace: `select a place:`,
            selectAnAction: `select an action:`,
            createAPlace: `Create a place`,
            deleteCurrentPlace: `Delete current place`,
          }
        } else if (lang == 'pt-BR'){
          this.l = {
            deleteCurrentPlace: `Deletar local atual`,
            createAPlace: `Criar um local`,
            selectAnAction: `selecione uma ação:`,
            selectAPlace: `selecione um local:`,
            placeSpan: `Local atual:`,
            addChangePlace: `adicionar/mudar local`,
            selectAProject: `selecione um projeto:`,
            username: `convidado`,
            loggedAs: `Conectado como`,
            projectActionsCalendarBefore: `As ações que estiverem em algum projeto e que possuírem a tag "agenda" e que vierem antes do ano atual estarão aqui.`,
            projectActionsCalendarAfter: `As ações que estiverem em algum projeto e que possuírem a tag "agenda" e que vierem após o ano atual estarão aqui.`,
            projectActionsCalendar: `As ações que estiverem em algum projeto e que possuírem a tag "agenda" com o ano atual estarão aqui.</br></br>Vá para a seção projetos para criar um projeto.`,
            nonProjectActionBefore: `As ações que não estiverem em um projeto e que possuírem a tag "agenda" e que vierem antes o ano atual estarão aqui.</br></br>Clique no ícone de <i class='fa fa-plus'></i> para adicionar uma ação.`,
            nonProjectActionAfter: `As ações que não estiverem em um projeto e que possuírem a tag "agenda" e que vierem após o ano atual estarão aqui.</br></br>Clique no ícone de <i class='fa fa-plus'></i> para adicionar uma ação.`,
            lackOfNonProjectActionsCalendar: `As ações que não estiverem em algum projeto e que possuírem a tag "agenda" estarão aqui.</br></br>Clique no ícone de <i class='fa fa-plus icon-bif'></i> para adicionar uma ação.`,
            actions: `ações`,
            moreActions: `Mais ações`,
            lessActions: `Menos ações`,
            jan: `Jan`,
            feb: `Fev`,
            mar: `Mar`,
            apr: `Abr`,
            may: `Mai`,
            jun: `Jun`,
            jul: `Jul`,
            aug: `Ago`,
            sep: `Set`,
            oct: `Out`,
            nov: `Nov`,
            dec: `Dez`,
            mon: `Seg`,
            wed: `Qua`,
            fri: `Sex`,
            before: `Antes de`,
            after: `Depois de`,
            removeFromProject: `Retirar ação do projeto`,
            editProjectTitle: `Editar título do projeto`,
            deleteProject: `Deletar o projeto`,
            lackOfProjects: `Os seus projetos estarão aqui.</br></br>Clique no ícone de <i class='fa fa-plus'></i> para criar um projeto.`,
            lackOfProjectActionsWaiting: `As ações que estiverem em algum projeto e que possuírem a tag "esperando" estarão aqui.</br></br>Vá para a seção projeto para criar um projeto.`,
            lackOfNonProjectActionsWaiting: `As ações que não estiverem em algum projeto e que possuírem a tag "esperando" estarão aqui.</br></br>Clique no ícone de <i class='fa fa-plus icon-bif'></i> para adicionar uma ação.`,
            lackOfProjectActionsMaybe: `As ações que estiverem em algum projeto e que pussuírem a tag "algum dia/talvez" estarão aqui.</br></br>Vá para a seção projeto para criar um projeto.`,
            lackOfNonProjectActionsMaybe: `As ações que não estiverem em algum projeto e que pussuírem a tag "algum dia/talvez" estarão aqui.</br></br>Clique no ícone de <i class='fa fa-plus icon-bif'></i> para adicionar uma ação.`,
            addToProject: `Adicionar no projeto`,
            waiting: `Esperando`,
            somedaymaybe: `Algum dia/talvez`,
            nextAction: `Próximas ações`,
            calendar: `Agenda`,
            lackOfProjectActionsNextAction: `As ações que estiverem em algum projeto e que pussuírem a tag "próxima ação" estarão aqui.</br></br>Vá para a seção projeto para criar um projeto.`,
            lackOfNonProjectActionsNextAction: `As ações que não estiverem em algum projeto e que possuírem a tag "próxima ação" estarão aqui.</br></br>Clique no ícone de <i class='fa fa-plus icon-bif'></i> para adicionar uma ação.`,
            addActionToProject: `Adicionar ação no projeto`,
            createProject: `Criar um projeto`,
            transformActionToProject: `Criar um projeto com o mesmo título que esta ação.`,
            lackOfNonProjectActionsBasket: `As ações que não estiverem em algum projeto e que pussuírem a tag "entrada" estarão aqui.</br></br>Clique no ícone de <i class='fa fa-plus icon-bif'></i> para adicionar uma ação.`,
            lackOfProjectActionsBasket: `As ações que estiverem em algum projeto e que pussuírem a tag "entrada" estarão aqui.</br></br>Vá para a seção projeto para criar um projeto.`,
            nonProjectActions: `Ações sem projeto`,
            projectActions: `Ações de projeto`,
            addAction: `Adicionar uma ação`,
            showFirstAction: `Mostrar apenas a primeira ação de cada projeto`,
            deleteAction: `Deletar ação`,
            editAction: `Editar ação`,
            editActionTag: `Editar tag da ação`,
            addCreateProject: `Criar/adicionar no projeto`            
          }
        }
      },
    // PASSWORDS
      togglePasswordVisiblity(opened){
        (opened) ? this.displayPasswords() : this.hidePasswords()
        this.showPasswords = opened
      },
      displayPasswords(){
        let inputs = document.querySelectorAll('.passwordField')
        inputs.forEach(el => {
          el.setAttribute('type', 'text')
        })
      },
      hidePasswords(){
        let inputs = document.querySelectorAll('.passwordField')
        inputs.forEach(el => {
          el.setAttribute('type', 'password')
        })
      },
    // SIDE BAR AND DESKTOP CHECK
      checkScreenVersion(){
        let width = window.innerWidth
        if (width >= 796){
          this.desktop = true
          this.showSideBar = true
          this.applyAnimationsToUnderlineLinksEventHandler()
        }
        else{
          this.showSideBar = false
          this.desktop = false
        }
      },
      toggleSideNav(){
        this.showSideBar = !this.showSideBar
        this.applyAnimationsToUnderlineLinksEventHandler()
      },
      changeSectionComponent(dt){
        this.currentSectionComponent = dt.compo
        let length = this.openedComponents.length
        for (let i = 0;i < length;i++)
          this.openedComponents[i] = false
        this.openedComponents[dt.i] = true
        this.applyAnimationsToUnderlineLinksEventHandler()
        this.closeActionForm()
      },
      applyAnimationsToUnderlineLinksEventHandler(){
        setTimeout(function(){
          let links = document.querySelectorAll('.underline-link')
          let func = function(){
            this.classList.add('underline-link-animation')
            this.removeEventListener('mouseover', func)
          }
          links.forEach((el) => {
            el.addEventListener('mouseover', func)
          })
        }, 10)
      },
    // UTILITY
      getIndexOfProjectThatHasTheGivenActionId(actionId){
        return this.user.projects.findIndex((el) => {
          return el.actions.some((ele) => {
            return ele == actionId
          })
        })
      },
      getIndexOfProjectActionThatHasTheGivenActionId(projectId, actionId){
        return this.user.projects[projectId].actions.findIndex((el) => {
          return el == actionId
        })
      },
      removeActionsFromProject(projectId){
        let pro = this.user.projects[projectId]
        let act = this.user.actions

        let length = pro.actions.length
        for (let i = 0;i < length;i++){
          delete act[pro.actions[i]].projectId
        }
      },
      getIds(arr){
        let newArr = []
        let length = arr.length
        for (let i = 0;i < length;i++)
          newArr.push(arr[i].id)
        return newArr
      },
      resetIds(arr){
        let length = arr.length
        for (let i = 0;i < length;i++)
          arr[i].id = i
      },
      displayForm(id){
        return (this.currentOpenedUserForm == id)
      },
      decreaseProjectsActionsIdsByOneThatAreBiggerThan(id){
        let pros = this.user.projects

        let length = pros.length
        for (let i = 0;i < length;i++){
          let actionsLength = pros[i].actions.length
          for (let j = 0;j < actionsLength;j++){
            if (pros[i].actions[j] > id)
              pros[i].actions[j] -= 1
          }
        }
      },
      fixChangedActionOrderInProject(oldId, newId){
        let pros = this.user.projects
        let acts = this.user.actions
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
      },
      getOldAndNewPositionOfChangedAction(){
        let acts = this.user.actions
        let pros = this.user.projects
        let length = acts.length

        let oldId
        let newId
        for (let i = 0;i < length;i++){
          if (acts[i].id != i){
            if (acts[i].id - 1 == i){
              oldId = i
              break
            } else {
              newId = i
              oldId = acts[i].id
              return {old: oldId, new: newId}
            }
          }
        }

        for (let i = 0;i < length;i++){
          if (acts[i].id == oldId){
            newId = i
            return {old: oldId, new: newId}
          }
        }
        return false
      },
      getIndexOfactionThatHasTheGivenProjectIdAll(projectId){
        let acts = this.user.actions
        let length = acts.length
        let actionIds = []
        for (let i = 0;i < length;i++)
          if (acts[i].projectId == projectId)
            actionIds.push(i)
        return actionIds
      },
      updateActionsIds(){
        let pro = this.user.projects
        let act = this.user.actions

        let length = pro.length
        for (let i = 0;i < length;i++){
          let actionsLength = pro[i].actions.length
          for (let j = 0;j < actionsLength;j++){
            act[pro[i].actions[j]].projectId = pro[i].id
          }
        }
      },
      editProjectTitle(){
        let t = this.tempUser.project
        this.user.projects[t.id].title = t.title
        if (!this.guest)
          this.POSTrequest('/edit-project', 'title='+t.title+'&id='+t.id)
        this.closeActionForm()
      },
      getCurrentDate(){
        let date = DateM.getCurrentDay()
        this.tempUser.action.calendar.date = date.stringify()
      },
      getFirstActionOfProjectInArray(id, tag){
        let acts = this.user.actions
        let pros = this.user.projects
        let length = acts.length
        for (let i = 0;i < length;i++)
          if (acts[i].projectId == id && acts[i].tag == tag)
            return [acts[i]]
      },
      containsAction(projectId, actionId){
        let acts = this.user.projects[projectId].actions
        let length = acts.length
        for (let i = 0;i < length;i++)
          if (acts[i] == actionId)
            return true
        return false
      },
      hasTagAction(tag){
        let act = this.user.actions
        let length = act.length
        for (let i = 0;i < length;i++)
          if (act[i].tag == tag && !act[i].projectId && act[i].projectId != 0 && ((act[i].place == undefined && this.place == 'show all') || act[i].place == this.place))
            return true
        return false
      },
      thereIsAtLeastOneProjectAction(tag){
        let act = this.user.actions
        let length = act.length
        for (let i = 0;i < length;i++)
          if (act[i].projectId || act[i].projectId == 0)
            if (act[i].tag == tag && ((act[i].place == undefined && this.place == 'show all') || act[i].place == this.place))
              return true
        return false
      },
      calculateIds(){
        let ids = []
        let length = this.user.actions.length
        for (let i = 0;i < length;i++)
          ids.push(this.user.actions[i].id)
        return ids
      },
    // ACTION RELATED
      getUser(){
        this.GETrequest('/get-user', (data) =>{
          let dt = JSON.parse(data)
          this.user = dt.user
          this.username = dt.username
          let length = this.user.actions.length
          this.openedActionContents = []
          for (let i = 0;i < length;i++)
            this.openedActionContents.push(false)

          this.places = []
          for (let i = 0;i < length;i++){
            if (!this.places.includes(this.user.actions[i].place) && this.user.actions[i].place == 'show all' && this.user.actions[i].place == null)
              this.places.push(this.user.actions[i].place)
          }
          length = this.user.projects.length
          this.openedProjectDropdowns = []
          for (let i = 0;i < length;i++)
            this.openedProjectDropdowns.push(false)
        })
      },
      addAction(){
        let dt = this.tempUser.action
        let place = this.place
        if (place == 'show all') place == null
        this.user.actions.push({ tag: dt.tag, title: dt.title, description: dt.description, id: this.user.actions.length, place: place})
        if (!this.guest)
          this.POSTrequest('/add-action', 'title='+dt.title+'&description='+dt.description+'&id='+(this.user.actions.length-1)+'&tag='+dt.tag+'&place='+place)
        this.closeActionForm()
      },
      editAction(){
        let dt = this.tempUser.action
        let a = this.user.actions[dt.id]
        a.title = dt.title
        a.description = dt.description
        if (!this.guest)
          this.POSTrequest('/edit-action', 'title='+dt.title+'&description='+dt.description+'&id='+dt.id)
        this.closeActionForm()
      },
      editTag(){
        let dt = this.tempUser.action
        if (dt.tag != "calendar"){
          this.user.actions[dt.id].tag = dt.tag
          if (!this.guest)
            this.POSTrequest('/edit-tag', 'id='+dt.id+'&tag='+dt.tag)
          this.closeActionForm()
        } else if (dt.calendar.validDate && dt.calendar.validTime){
          this.user.actions[dt.id].tag = "calendar"
          this.user.actions[dt.id].calendar = {
            date: dt.calendar.date,
            time: dt.calendar.time
          }
          if (!this.guest)
            this.POSTrequest('/tag-to-calendar', 'id='+dt.id+'&time='+dt.calendar.time+'&date='+dt.calendar.date)
          this.closeActionForm()
        }
      },
      transformActionToProject(){
        let dt = this.tempUser
        let act = this.user.actions

        dt.project.title = act[dt.action.id].title
        let title = dt.project.title
        this.addProject()
        if (dt.project.delete){
          act.splice(dt.action.id, 1)

          rt.resetIds(act)
          rt.increaseProjectsActionsIdsByOneThatAreBiggerThan(this.id)
        }
        if (!this.guest)
          this.POSTrequest('/transform-action-to-project', 'title='+title+'&actionId='+dt.action.id+'&delete='+dt.project.delete)
        this.closeActionForm()
      },
      addProject(){
        let dt = this.tempUser.project
        this.user.projects.push({id: this.user.projects.length, title: dt.title, actions: []})
        if (!this.guest)
          this.POSTrequest('/add-project', 'title='+dt.title)
        this.closeActionForm()
      },
      projectCreateAndAddAction(){
        let dt = this.tempUser.action
        let length = this.user.actions.length
        let projectId = this.tempUser.project.id
        let place = this.place
        if (place == 'show all') place = null
        this.user.actions.push({tag:'basket',id: length, title: dt.title, description: dt.description, projectId: projectId, place: place})
        this.user.projects[projectId].actions.push(length)
        if (!this.guest)
          this.POSTrequest('/create-add-action-project', 'id='+length+'&title='+dt.title+'&description='+dt.description+'&projectId='+projectId+'&place='+place)
        this.closeActionForm()
      },
      parseArrayToHTTPparams(arr, arrName){
        let str = ''
        let length = arr.length
        for (let i = 0;i < length;i++){
          str += arrName+'=' + arr[i] + '&'
        }
        str = str.slice(0, -1)
        return str
      },
      saveNewProjectOrder(ids){
        this.resetIds(this.user.projects)
        this.updateActionsIds()

        if (!this.guest)
          this.POSTrequest('/save-new-project-order', this.parseArrayToHTTPparams(ids, 'a'))
      },
      saveNewActionOrder(ids){
        let obj = this.getOldAndNewPositionOfChangedAction()
        console.log(obj)
        if (obj != false){
          let act = this.user.actions[obj.new]
          this.resetIds(this.user.actions)
          this.fixChangedActionOrderInProject(obj.old, obj.new)

          if (!this.guest)
            this.POSTrequest('/save-new-action-order', this.parseArrayToHTTPparams(ids, 'a')+'&old='+obj.old+'&new='+obj.new)

          }
      },
      addAlreadyExistingAction(){
        if (this.id2 != ''){
          let rt = this
          let pro = rt.user.projects
          let act = rt.user.actions
          let dt = rt.tempUser.project

          pro[dt.id].actions.push(dt.id2)
          act[dt.id2].projectId = dt.id
          if (!rt.guest)
            this.POSTrequest('/add-existing-action-project', 'projectId='+dt.id+'&actionId='+dt.id2)
          rt.closeActionForm()
        }
      },
      removeActionFromProject(actionId){
        let i = this.getIndexOfProjectThatHasTheGivenActionId(actionId)
        let j = this.getIndexOfProjectActionThatHasTheGivenActionId(i, actionId)

        this.user.projects[i].actions.splice(j, 1)
        delete this.user.actions[actionId].projectId
        if (!this.guest)
          this.POSTrequest('/remove-action-from-project', 'actionId='+actionId)
      },
      editTimedAction(){
        let rt = this.$root
        let act = rt.user.actions
        let dt = rt.tempUser.action

        if (dt.calendar.validDate && dt.calendar.validTime){
          act[dt.id].title = dt.title
          act[dt.id].description = dt.description
          act[dt.id].calendar.date = dt.calendar.date
          act[dt.id].calendar.time = dt.calendar.time
          if (!rt.guest)
            rt.POSTrequest('/edit-timed-action', 'id='+dt.id+'&description='+dt.description+'&date='+dt.calendar.date+'&time='+dt.calendar.time+'&title='+dt.title)
          this.closeActionForm()
        }
      },
      editTimedTag(){
        let dt = this.tempUser.action
        let act = this.user.actions

        act[dt.id].tag = dt.tag
        delete act[dt.id].calendar

        if (!this.guest)
          this.POSTrequest('/edit-timed-tag', 'id='+dt.id+'&tag='+dt.tag)

        this.closeActionForm()
      },
    iconGroupEventHandlers(){
      let iconGroups = document.querySelectorAll('.icon-group')
      if (this.desktop){
        this.showIconGroups = true
      } else {
        this.showIconGroups = false
      }
    },
    cleanTempData() {
      let u = this.tempUser
      u.action.tag = ''
      u.action.title = ''
      u.action.description = ''
      u.action.calendar.time = ''
      u.action.calendar.validTime = undefined
      u.action.calendar.validDate = undefined
      u.project.title = ''
      u.project.id = ''
      u.project.id2 = ''
      u.project.selected = 'select an action'
      u.tempPlace = undefined
    },
    openUserForm(dt, cleanData = true){
      if (cleanData) this.cleanTempData()
      this.getCurrentDate()
      this.tempUser.action.tag = dt.tag
      this.currentOpenedUserForm = dt.id
    },
    closeActionForm(){
      this.currentOpenedUserForm = undefined
      this.cleanTempData()
    },
    openActionForm(id, actionId){
      let seconds = 0
      if (id == this.currentOpenedUserForm){
        this.closeActionForm()
        seconds = 400
      }
      setTimeout(()=> {
        this.openUserForm({id: '' + id})
        this.getDataFromAction(this.user.actions[actionId])
      }, seconds)
    },
    GETrequest(route, callback){
      let xhttp = new XMLHttpRequest()
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200)
          callback(this.responseText)
      }
      xhttp.open('GET', route, true)
      xhttp.send()
    },
    POSTrequest(route, params) {
      let xhttp = new XMLHttpRequest()
      xhttp.open('POST', route, true)
      xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
      xhttp.send(params)
    },
    POSTrequestData(route, params, callback){
      let xhttp = new XMLHttpRequest()
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200)
          callback(this.responseText)
      }
      xhttp.open('POST', route, true)
      xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
      xhttp.send(params)
    },
    getDataFromAction(action){
      let a = this.tempUser.action
      a.title = action.title
      a.description = action.description
      a.id = action.id
      a.tag = action.tag
      if (action.calendar){
        a.calendar.date = action.calendar.date
        a.calendar.time = action.calendar.time
      }
    },
    getDataFromProject(project){
      let t = this.tempUser.project
      t.title = project.title
      t.id = project.id
    },
    changeDropdownSate(dt){
      this.openedActionContents[dt.id] = dt.state
    },
    applyDragAndDrop(){
      let sortables = document.querySelectorAll('.sortable')
      sortables.forEach((el) => {
        new Sortable(el, {
          handle: '.draggable',
          ghostClass: 'ghost'
        })
      })
    },
    addNonProjectTimedAction(){
      let dt = this.tempUser.action
      let act = this.user.actions
      let validDate = dt.calendar.validDate
      let validTime = dt.calendar.validTime

      if (validDate && validTime){
        let length = act.length
        let place = this.place
        if (place == 'show all') place = null
        act.push({id: length, place: place, tag: 'calendar', title: dt.title, description: dt.description, calendar: {time: dt.calendar.time, date: dt.calendar.date}})

        if (!this.guest)
          this.POSTrequest('/add-timed-action', 'tag="calendar"&title='+dt.title+'&description='+dt.description+'&time='+dt.calendar.time+'&date='+dt.calendar.date+'&place='+place)
        this.closeActionForm()
      }
    },
    activateGuest(){
      this.guest = true
    },
    hideSideBarScroll(){
      if (!this.desktop){
        this.showSideBar = false
        console.log(this.showSideBar)
      }
    }
  },
  mounted(){
    this.getCurrentDate()
    this.place = 'show all'
  },
  watch: {
    currentSectionComponent(){
      if (!this.desktop){
        this.toggleSideNav()
      }
    }
  }
})

vm.applyAnimationsToUnderlineLinksEventHandler()
vm.checkScreenVersion()
vm.iconGroupEventHandlers()
vm.applyDragAndDrop()

window.addEventListener('resize', vm.checkScreenVersion)
window.addEventListener('resize', vm.iconGroupEventHandlers)
window.addEventListener('scroll', function() {vm.hideSideBarScroll()})
