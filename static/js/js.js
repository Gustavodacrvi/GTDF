let vm = new Vue({
  el: '#app',
  data: {
    transitionsAndAnimations: {
      initialTransitions: false,
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
      let links = document.querySelectorAll('.underline-link')
      let func = function(){
        this.classList.add('underline-link-animation')
        this.removeEventListener('mouseover', func)   
      }
      links.forEach((el) => {
        el.addEventListener('mouseover', func)
      })
    }
  }
})

vm.runInitialTransitionsAndAnimations()
vm.applyAnimationsToUnderlineLinksEventHandler()