let vm = new Vue({
  el: '#app',
  data: {
    desktop: undefined,
    transitionsAndAnimations: {
      initialTransitions: false,
      sideBar: undefined,
      userForms: {
        showPassword: false
      },
    },
    tempUser: {
      action: {
        tag: undefined
      },
      project: {

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
    showIconGroups: false
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
    openUserForm(dt){
      this.tempUser.action.tag = dt.tag
      this.currentOpenedUserForm = dt.id
    },
    closeActionForm(){
      this.currentOpenedUserForm = undefined
    },
    request(method, route, callback){
      let xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          callback(this.responseText)
        }
      };
      xhttp.open(method, route, true);
      xhttp.send();
    },
    getUser(){
      this.request('GET', '/get-user', (data) =>{
        this.user = JSON.parse(data)
      })
    }
  }
})

vm.runInitialTransitionsAndAnimations()
vm.applyAnimationsToUnderlineLinksEventHandler()
vm.checkScreenVersion()
vm.iconGroupEventHandlers()

window.addEventListener('resize', vm.checkScreenVersion)
window.addEventListener('resize', vm.iconGroupEventHandlers)
