let vm = new Vue({
  el: '#app',
  data: {
    transitionsAndAnimations: {
      initialTransitions: false,
      sideBar: undefined,
      userForms: {
        showPassword: false
      }
    },
    currentSectionComponent: undefined
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
    applyContentAnimation(){
      this.currentSectionComponent = 'basket'
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
    changeComponent(compo){
      this.currentSectionComponent = compo
    },
  }
})

vm.runInitialTransitionsAndAnimations()
vm.applyAnimationsToUnderlineLinksEventHandler()
vm.checkScreenVersion()
vm.applyContentAnimation()

window.addEventListener('resize', vm.checkScreenVersion)