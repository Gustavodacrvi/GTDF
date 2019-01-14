
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
      <div class='card form' v-show='show'><slot></slot></div>
    </transition>
  `
})
Vue.component('form-element', {
  props: {
    animation: String
  },
  template: `
    <transition :name='animation'>
      <div class='formElement' v-show='this.$parent.show'>
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
    name: String,
    opened: Boolean
  },
  template: `
    <div class='form-input centralizeContent'>
      <input :name='name' class='passwordField' type='password' autocomplete='off' :placeholder='placeholder' />
      <span @click='$emit("click", !opened)'>
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
Vue.component('alert',{
  template: `
    <span class='alert-alert'><slot></slot></span>
  `
})
Vue.component('success', {
  template: `
    <span class='alert-success'><slot></slot></span>
  `
})
Vue.component('navigation-bar', {
  props: {
    show: Boolean
  },
  template: `
    <transition name='slide-from-top-bounce'>
      <nav id='navBar' v-if='show' class='alignContent'>
        <div id='desktop' class='alignContent'>
          <div id='left' class='flex'>
            <slot name='desktop-left'></slot>
          </div>
          <div id='right' class='rowReversed'>
            <slot name='desktop-right'></slot>
          </div>
        </div>
        <div id='mobile' class='alignContent'>
          <div id='left' class='flex'>
            <slot name='mobile-left'></slot>
          </div>
          <div id='right' class='rowReversed'>
            <slot name='mobile-right'></slot>
          </div>
        </div>
      </nav>
    </transition>
  `
})
Vue.component('nav-element', {
  props: {
    animation: String
  },
  template: `
    <transition :name='animation'>
      <div class='nav-element'>
        <slot></slot>
      </div>
    </transition>
  `
})
Vue.component('link-red', {
  props: {
    href: String
  },
  template: `
    <a class='link-red' :href='href'><slot></slot></a>
  `
})
Vue.component('link-blue', {
  props: {
    href: String
  },
  template: `
    <a class='link-blue' :href='href'><slot></slot></a>
  `
})
Vue.component('dropdown', {
  props: {
    placeholder: String,
    type: String
  },
  data: () => {
    return {
      opened: false
    }
  },
  template: `
    <div class='dropdown' @mouseleave='opened = false' @mouseover='opened = true'>
      <a :class='type'>{{ placeholder }}</a>
      <div class='centered'>
      <transition name='pop-long'>
        <div v-show='opened' class='card angle-up'>
          <slot></slot>
        </div>
      </transition>
      </div>
    </div>
  `
})
Vue.component('nav-dropdown',{
  props: {
    opened: false
  },
  template: `
    <div class='dropdown' @mouseleave='opened = false' @mouseover='opened = true'>
      <button class='reset-button'>
        <div class="hamburger-icon">
          <div class="bar top"></div>
          <div class="bar middle"></div>
          <div class="bar bottom"></div>
        </div>
      </button>
      <transition name='pop-long'>
        <div v-show='opened' class='card angle-up angle-up-nav' style='width: 150px;right: -12px'>
          <slot></slot>
        </div>
      </transition>
    </div>
  `
})
Vue.component('sub-dropdown',{
  props: {
    placeholder: String,
    show: false
  },
  template: `
    <article class='sub-dropdown'  @mouseleave='show = false' @mouseover='show = true'>
      <a class='dropdown-link'>{{placeholder}}</a>
      <transition name='right-to-left-bounce-nav-drop'>
      <div class='card angle-right-nav' v-if='show'>
        <drop-link href='/en'>English</drop-link>
        <drop-link href='/pt-BR'>Português(Brasil)</drop-link>
      </div>
      </transition>
    </article>
  `
})

Vue.component('drop-link',{
  props: {
    href: String
  },
  template: `
    <a :href='href' class='dropdown-link'><slot></slot></a>
  `
})


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
  }
})

vm.runInitialTransitionsAndAnimations()