
Vue.component('fixed', {
  template: `
    <div id='fixedElements' class='centralizeContent'>
      <slot></slot>
    </div>
  `
})
Vue.component('login-form', {
  props: {
    show: Boolean
  },
  template: `
    <transition name='fade'>
      <div class='card form' v-if='show'><slot></slot></div>
    </transition>
  `
})

let vm = new Vue({
  el: '#app',
  data: {
    transitionsAndAnimations: {
      userForms: {
        show: false
      }
    }
  },
  methods: {
    runInitialTransitionsAndAnimations(){
      setTimeout(this.userFormsAnimation, 1000)
    },
    userFormsAnimation(){
      this.transitionsAndAnimations.userForms.show = true
    }
  }
})

vm.runInitialTransitionsAndAnimations()