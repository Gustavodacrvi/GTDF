let vm = new Vue({
  el: '#app',
  data: {
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
    currentSectionComponent: 'basket',
    currentOpenedUserForm: undefined,
    openedComponents: [
      true,
      false,
      false,
      false,
      false,
      false
    ]
  },
  methods: {
    runInitialTransitionsAndAnimations(){
      setTimeout(this.userFormsAnimation, 10)
    },
    userFormsAnimation(){
      this.transitionsAndAnimations.initialTransitions = true
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
        this.transitionsAndAnimations.sideBar = true
        this.applyAnimationsToUnderlineLinksEventHandler()
      }
      else
        this.transitionsAndAnimations.sideBar = false
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
    }
  }
})

vm.runInitialTransitionsAndAnimations()
vm.applyAnimationsToUnderlineLinksEventHandler()
vm.checkScreenVersion()

window.addEventListener('resize', vm.checkScreenVersion)
