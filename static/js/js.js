let vm = new Vue({
  el: '#app',
  data: {
    transitionsAndAnimations: {
      initialTransitions: false,
      sideBar: undefined,
      userForms: {
        showPassword: false
      }
    }
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
    },

    checkScreenVersion(){
      let width = window.innerWidth
      if (width >= 796)
        this.transitionsAndAnimations.sideBar = true
      else
        this.transitionsAndAnimations.sideBar = false
    }
  }
})

vm.runInitialTransitionsAndAnimations()
vm.applyAnimationsToUnderlineLinksEventHandler()
vm.checkScreenVersion()

window.addEventListener('resize', vm.checkScreenVersion)