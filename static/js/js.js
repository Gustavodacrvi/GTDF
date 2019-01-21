
let vm = new Vue({
  el: '#app',
  data: {
    desktop: undefined,
    guest: false,
    transitionsAndAnimations: {
      initialTransitions: false,
      sideBar: undefined,
      userForms: {
        showPassword: false
      },
    },
    tempUser: {
      action: {
        tag: undefined,
        title: undefined,
        description: undefined
      },
      project: {

      }
    },
    d: 3,
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
    openedActionContents: undefined
  },
  methods: {
    runInitialTransitionsAndAnimations(){
      setTimeout(this.userFormsAnimation, 10)
    },
    userFormsAnimation(){
      this.transitionsAndAnimations.initialTransitions = true
    },
    iconGroupEventHandlers(){
      let iconGroups = document.querySelectorAll('.icon-group')
      if (this.desktop){
        this.showIconGroups = true
      } else {
        this.showIconGroups = false
      }
    },
    togglePasswordVisiblity(opened){
      (opened) ? this.showPasswords() : this.hidePasswords()
      this.transitionsAndAnimations.userForms.showPassword = opened
    },
    showPasswords(){
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
    toggleSideNav(){
      this.transitionsAndAnimations.sideBar = !this.transitionsAndAnimations.sideBar
      this.applyAnimationsToUnderlineLinksEventHandler()
    },
    checkScreenVersion(){
      let width = window.innerWidth
      if (width >= 796){
        this.desktop = true
        this.transitionsAndAnimations.sideBar = true
        this.applyAnimationsToUnderlineLinksEventHandler()
      }
      else{
        this.transitionsAndAnimations.sideBar = false
        this.desktop = false
      }
    },
    changeComponent(dt){
      this.currentSectionComponent = dt.compo
      this.closeAllComponentLinks()
      this.openComponentLink(dt.i)
      this.applyAnimationsToUnderlineLinksEventHandler()
      this.closeActionForm()
    },
    openComponentLink(i){
      this.openedComponents[i] = true
    },
    closeAllComponentLinks(){
      let length = this.openedComponents.length
      for (let i = 0;i < length;i++)
        this.openedComponents[i] = false
    },
    cleanTempData() {
      this.tempUser.action.tag = undefined
      this.tempUser.action.title = undefined
      this.tempUser.action.description = undefined
    },
    openUserForm(dt){
      this.cleanTempData()
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
    getUser(){
      this.GETrequest('/get-user', (data) =>{
        this.user = JSON.parse(data)
      })
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
    test(ids){
      this.POSTrequest('/test', 'message='+ids)
    },
    addAction(){
      let dt = this.tempUser.action
      this.user.actions.push({ tag: dt.tag, title: dt.title, description: dt.description, id: this.user.actions.length})
      if (!this.guest)
        this.POSTrequest('/add-action', 'title='+dt.title+'&description='+dt.description+'&id='+(this.user.actions.length-1)+'&tag='+dt.tag)
      this.closeActionForm()      
    }
  }
})

vm.runInitialTransitionsAndAnimations()
vm.applyAnimationsToUnderlineLinksEventHandler()
vm.checkScreenVersion()
vm.iconGroupEventHandlers()
vm.applyDragAndDrop()

window.addEventListener('resize', vm.checkScreenVersion)
window.addEventListener('resize', vm.iconGroupEventHandlers)
