
let vm = new Vue({
  el: '#app',
  data: {
    desktop: undefined,
    guest: false,
    showPasswords: false,
    showSideBar: false,
    tempUser: {
      action: {
        tag: undefined,
        title: undefined,
        description: undefined
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
      false
    ],
    showIconGroups: false,
    openedActionContents: undefined,
    openedProjectDropdowns: undefined
  },
  methods: {
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
        for (let i = 0;i < length;i++)
          delete act[pro.actions[i]].projectId
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
      updateProjectActionIds(oldActionIds){
        let pro = this.user.projects
        let act = this.user.actions
        let old = oldActionIds

        let length = act.length
        let projectId
        let actionId
        for (let i = 0;i < length;i++){
          if (!act[i].projectId && act[i].projectId != 0)
            continue
          projectId = this.getIndexOfProjectThatHasTheGivenActionId(old[i])
          actionId = this.getIndexOfProjectActionThatHasTheGivenActionId(projectId, old[i])
          pro[projectId].actions[actionId] = act[i].id
        }
      },
      editProjectTitle(){
        let t = this.tempUser.project
        this.user.projects[t.id].title = t.title
        if (!this.guest)
          this.POSTrequest('/edit-project', 'title='+t.title+'&id='+t.id)
        this.closeActionForm()
      },
    // ACTION RELATED
      getUser(){
        this.GETrequest('/get-user', (data) =>{
          this.user = JSON.parse(data)
          let length = this.user.actions.length
          this.openedActionContents = []
          for (let i = 0;i < length;i++)
            this.openedActionContents.push(false)
          
          length = this.user.projects.length
          this.openedProjectDropdowns = []
          for (let i = 0;i < length;i++)
            this.openedActionContents.push(false)
        })
      },
      addAction(){
        let dt = this.tempUser.action
        this.user.actions.push({ tag: dt.tag, title: dt.title, description: dt.description, id: this.user.actions.length})
        if (!this.guest)
          this.POSTrequest('/add-action', 'title='+dt.title+'&description='+dt.description+'&id='+(this.user.actions.length-1)+'&tag='+dt.tag)
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
        this.user.actions[dt.id].tag = dt.tag
        if (!this.guest)
          this.POSTrequest('/edit-tag', 'id='+dt.id+'&tag='+dt.tag)
        this.closeActionForm()
      },
      transformActionToProject(){

      },
      addProject(){
        let dt = this.tempUser.project
        this.user.projects.push({id: this.user.projects.length, title: dt.title, actions: []})
        if (!this.guest){
          this.POSTrequest('/add-project', 'title='+dt.title)
        }
        this.closeActionForm()
      },
      projectCreateAndAddAction(){
        let dt = this.tempUser.action
        let length = this.user.actions.length
        let projectId = this.tempUser.project.id
        this.user.actions.push({tag:'basket',id: length, title: dt.title, description: dt.description, projectId: projectId})
        this.user.projects[projectId].actions.push(length)
        if (!this.guest)
          this.POSTrequest('/create-add-action-project', 'id='+length+'&title='+dt.title+'&description='+dt.description+'&projectId='+projectId)
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
        if (ids.pop())
          this.POSTrequest('/save-new-project-order', this.parseArrayToHTTPparams(ids, 'a'))
      },
      saveNewActionOrder(ids){
        if (ids.pop())
          this.POSTrequest('/save-new-action-order', this.parseArrayToHTTPparams(ids, 'a'))
      },
      addAlreadyExistingAction(){
        let rt = this
        let pro = rt.user.projects
        let act = rt.user.actions
        let dt = rt.tempUser.project
        
        pro[dt.id].actions.push(dt.id2)
        act[dt.id2].projectId = dt.id
        if (!rt.guest)
          this.POSTrequest('/add-existing-action-project', 'projectId='+dt.id+'&actionId='+dt.id2)
        rt.closeActionForm()
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
      u.project.title = ''
      u.project.id = ''
      u.project.id2 = ''
      u.project.selected = 'select an action'
    },
    openUserForm(dt, cleanData = true){
      if (cleanData) this.cleanTempData()
      this.tempUser.action.tag = dt.tag
      this.currentOpenedUserForm = dt.id
    },
    closeActionForm(){
      this.currentOpenedUserForm = undefined
      this.cleanTempData()
    },
    GETrequest(route, callback){
      let xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          callback(this.responseText)
        }
      };
      xhttp.open('GET', route, true);
      xhttp.send();
    },
    POSTrequest(route, params) {
      let xhttp = new XMLHttpRequest();
      xhttp.open('POST', route, true);
      xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhttp.send(params);
    },
    getDataFromAction(action){
      let a = this.tempUser.action
      a.title = action.title
      a.description = action.description
      a.id = action.id
      a.tag = action.tag
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
          animation: 200,
          handle: '.draggable'
        })
      })
    },
  }
})

vm.applyAnimationsToUnderlineLinksEventHandler()
vm.checkScreenVersion()
vm.iconGroupEventHandlers()
vm.applyDragAndDrop()

window.addEventListener('resize', vm.checkScreenVersion)
window.addEventListener('resize', vm.iconGroupEventHandlers)
