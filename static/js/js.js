
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
    <transition name='double-slide-bounce'>
      <div class='card form' v-if='show'><slot></slot></div>
    </transition>
  `
})
Vue.component('form-element', {
  props: {
    animation: String
  },
  template: `
    <transition :name='animation'>
      <div class='formElement' v-if='this.$parent.show'>
        <slot></slot>
      </div>
    </transition>
  `
})
Vue.component('title-big', {
  props: {
    class: String
  },
  template: `
    <div class='class'>
      <h1 class='titleBig'><slot></slot></h1>
    </div>
  `
})
Vue.component('input-pass', {
  props: {
    placeholder: String,
    opened: false
  },
  template: `
    <div class='form-input centralizeContent'>
      <input name='password' class='passwordField' type='password' autocomplete='off' :placeholder='placeholder' />
      <span @click='opened = !opened;$emit("click", opened)'>
        <i class="fas fa-eye icon-tiny" v-show='opened'></i>
        <i class="fas fa-eye-slash icon-tiny" v-show='!opened'></i>
      <span>
    </div>
  `
})
Vue.component('input-form', {
  props: {
    placeholder: String,
    name: String
  },
  template: `
    <div class='form-input centralizeContent'>
      <input :name='name' type='text' :placeholder='placeholder'/>
    </div>
  `
})
Vue.component('form-button', {
  template: `
    <button type='submit' class='formButton'><slot></slot></button>
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
      setTimeout(this.userFormsAnimation, 10)
    },
    togglePasswordVisiblity(opened){
      (opened) ? this.showPasswords() : this.hidePasswords()
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
    userFormsAnimation(){
      this.transitionsAndAnimations.userForms.show = true
    }
  }
})

vm.runInitialTransitionsAndAnimations()