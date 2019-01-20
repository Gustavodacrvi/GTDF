
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
      <input :name='name' autocomplete='off' class='passwordField' type='password' autocomplete='off' :placeholder='placeholder' />
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
      <input :name='name' autocomplete='off' type='text' :placeholder='placeholder'/>
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
        <div v-show='opened' class='card-shadow angle-up'>
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
        <div v-show='opened' class='card-shadow angle-up angle-up-nav' style='width: 150px;right: -12px'>
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
      <div class='card-shadow angle-right-nav' v-if='show'>
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
Vue.component('side-nav', {
  props: {
    show: Boolean,
  },
  template: `
    <transition name='left-to-right-bounce-side-nav'>
      <div id='side-nav' v-show='show'>
        <div></div>
        <slot></slot>
      </div>
    </transition>
  `
})
Vue.component('side-title', {
  template: `
    <transition name='pop1'>
      <div class='side-title' v-if='$parent.show'>
        Logged as <span class='red'><slot></slot></span>
      </div>
    </transition>
  `
})
Vue.component('side-link', {
  props: {
    href: String,
    animation: String,
    compo: String,
    active: false,
    i: Number
  },
  template: `
    <transition :name='animation'>
      <div class='side-link' v-if='$parent.show'>
        <a :class='{"underline-link": !active, "active-underline-link": active}' :href='href' @click='$emit("click", {compo, i})'><slot></slot></a>
      </div>
    </transition>
  `
})
Vue.component('toggle-icon', {
  props: {
    elid: String,
    icon: String,
    show: Boolean
  },
  template: `
    <div class='toggle-icon' @click='$emit("toggle");show = !show'>
      <i id='mobile-side-bar-icon' :class='icon + " icon-big"'></i>
    </div>
  `
})
Vue.component('user-content', {
  template: `
    <div id='content'>
      <div>
        <slot name='content'>
        </slot>
      </div>
      <div>
        <slot name='adds'></slot>
      </div>
    </div>
  `
})
Vue.component('adds', {
  template: `
    <div id='adds'>
      <slot></slot>
    </div>
  `
})
Vue.component('action-bar',{
  template: `
    <div class='action-bar card'>
      <slot></slot>
    </div>
  `
})
Vue.component('action-bar-icon',{
  props: {
    icon: String,
    id: String,
    tag: String
  },
  template: `
    <i :class='icon + " icon-big user-icon"' @click="$emit('click', {id, tag})"></i>
  `
})
Vue.component('basket', {
  props: {
    icongroups: Boolean
  },
  template: `
  <div>
    <div>
      <action-bar>
        <action-bar-icon icon='fa fa-plus' id='addAction' tag='basket' @click='openUserForm'></action-bar-icon>
      </action-bar>
      <action title='test' description='desc' id='id' :icongroup='icongroups'>
      </action>
      <action title='two' description='trhe' id='i' :icongroup='icongroups'>
      </action>
    </div>
  </div>
  `,
  methods: {
    openUserForm(id){
      this.$emit('openform', id)
    }
  }
})
Vue.component('action',{
  props: {
    title: String,
    description: String,
    id: String,
    icongroup: Boolean
  },
  template: `
    <div class='action'>
      <div class='card'>
        <div>
          <span> {{ title }}</span>
        </div>
        <div>
          <icon-group :show='icongroup'>
            <action-icon icon='fa fa-times'></action-icon>
            <action-icon icon='fa fa-edit'></action-icon>
            <action-icon icon='fa fa-tag'></action-icon>
            <action-icon icon='fa fa-project-diagram'></action-icon>
          </icon-group>
        </div>
      </div>
      <div class='card'>
        <span>{{ description }}</span>
      </div>
    </div>
  `
})
Vue.component('icon-group', {
  props: {
    show: Boolean,
    dropdown: false
  },
  template: `
    <div class='icon-group' @mouseover='dropdown = true' @mouseleave='dropdown = false'>
      <action-icon icon='fa fa-ellipsis-h' v-show='!show' ></action-icon>
      <transition name='pop-long'>
        <div :class='{"card-shadow": !show}' v-show='dropdownShow()'>
          <slot></slot>
        </div>
      </transition>
    </div>
  `,
  methods: {
    dropdownShow(){
      if (this.dropdown){
        return true
      }
      else if (this.show == true){
        this.dropdown = true
        return true
      }
    }
  }
})
Vue.component('action-icon', {
  props: {
    icon: String,
  },
  template: `
    <i :class='icon + " icon-big user-icon action-icon"'></i>
  `
})
Vue.component('action-form', {
  props: {
    currentform: String,
    id: String,
    show: false
  },
  methods: {
    display(){
      (this.currentform == this.id) ? this.show = true : this.show = false
      return this.show
    }
  },
  template: `
    <transition name='double-slide-bounce-unpop'>
      <div class='card form action-form' v-show='display()'>
        <transition name='pop1'>
        <i class='fa fa-times icon-big user-icon close-icon' v-show='show' @click='$emit("close")'></i>
        </transition>
        <slot></slot>
      </div>
    </transition>
  `
})
Vue.component('calendar', {
  template: `
  <div>
    <div>
      <h1>calendar</h1>
      <h1>calendar</h1>
      <h1>calendar</h1>
      <h1>calendar</h1>
      <h1>calendar</h1>
    </div>
  </div>
  `
})
Vue.component('next-actions', {
  template: `
  <div>
    <div>
      <h1>next actions</h1>
      <h1>asdffffffffffffffasdf</h1>
    </div>
  </div>
  `
})
Vue.component('projects', {
  template: `
  <div>
    <div>
      <action-bar>
        <action-bar-icon icon='fa fa-plus' id='addProject' tag='projects' @click='openUserForm'></action-bar-icon>
      </action-bar>
    </div>
  </div>
  `,
  methods: {
    openUserForm(id){
      this.$emit('openform', id)
    }
  }
})
Vue.component('maybe', {
  template: `
  <div>
    <div>
      <h1>maybe</h1>
      <h1>asdffffffffffffffasdf</h1>
    </div>
  </div>
  `
})
Vue.component('waiting', {
  template: `
  <div>
    <div>
      <h1>waiting</h1>
      <h1>asdffffffffffffffasdf</h1>
    </div>
  </div>
  `
})
Vue.component('text-box',{
  props: {
    placeholder: String,
    rows: Number
  },
  template: `
    <div class='text-box'>
      <span>{{placeholder}}</span>
      <textarea :rows='rows'>
      </textarea>
    </div>
  `
})