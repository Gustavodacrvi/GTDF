
Vue.component('fixed', {
  template: `
    <div id='fixedElements' class='centralizeContent'>
      <slot></slot>
    </div>
  `
})
Vue.component('login-form', {
  props: {
    show: false
  },
  template: `
    {{repairTransition}}
    <transition name='double-slide-bounce' appear>
      <div class='card form'><slot></slot></div>
    </transition>
  `,
  mounted(){
    setTimeout(() => this.show = true, 1)
  }
})
Vue.component('form-element', {
  props: {
    animation: String,
    tabindex: String
  },
  template: `
    <transition :name='animation' appear>
      <div class='formElement' :tabindex='tabindex'>
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
    opened: Boolean,
    tabindex: String,
    value: String
  },
  data(){
    return {
      model: undefined
    }
  },
  mounted(){
    this.model = this.value
  },
  template: `
    <div class='form-input centralizeContent'>
      <input :name='name' autocomplete='off' class='passwordField' type='password' autocomplete='off' :placeholder='placeholder' :tabindex='tabindex' v-model='model' />
      <span @click='$emit("click", !opened)'>
        <i class="fas fa-eye icon-tiny" v-show='opened'></i>
        <i class="fas fa-eye-slash icon-tiny" v-show='!opened'></i>
      <span>
    </div>
  `,
  watch: {
    model(){
      this.$emit('change', this.model)
    }
  }
})
Vue.component('input-form', {
  props: {
    placeholder: String,
    name: String,
    tabindex: String
  },
  template: `
    <div class='form-input centralizeContent'>
      <input :name='name' autocomplete='off' type='text' :placeholder='placeholder' :tabindex='tabindex'/>
    </div>
  `
})
Vue.component('form-button', {
  props: {
    tabindex: String
  },
  template: `
    <button :tabindex='tabindex' type='submit' class='formButton' @click='$emit("click")'><slot></slot></button>
  `
})
Vue.component('link-button', {
  props: {
    tabindex: String,
    href: String
  },
  template: `
    <a :tabindex='tabindex' class='link-button' :href='href'><slot></slot></a>
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
  template: `
    <transition name='slide-from-top-bounce' appear>
      <nav id='navBar' class='alignContent'>
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
    <a class='link-red' :href='href' @click='$emit("click")'><slot></slot></a>
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
Vue.component('select-option', {
  props: {
    selected: String,
    placeholder: String,
    id: String,
    nonlive: Boolean,
    animation: String
  },
  data(){
    return {
      isDropdownOpened: false,
      temp: undefined,
      show: false,
    }
  },
  mounted(){
    this.show = true
  },
  template: `
    <transition :name='animation'>
    <div class='select-option' @mouseover='isDropdownOpened = true' @mouseleave='isDropdownOpened = false' v-if='show'>
      <div>
        <span class='faded'>{{ placeholder }}</span>
        <a v-if='!isDropdownOpened || temp == undefined'>{{ selected }}</a>
        <a v-else>{{ temp }}</a>
      </div>
      <transition name='pop-long'>
        <div v-show='isDropdownOpened' class='card-shadow'>
          <slot></slot>
        </div>
      </transition>
    </div>
    </transition>
  `,
  watch: {
    selected(){
      if (this.selected != undefined){
        if (this.id == undefined){
          this.$emit('update', this.selected)
        }
        else {
          this.$emit('update', {value: this.selected, id: this.id})
          this.id = undefined
        }
      }
    },
    isDropdownOpened(){
      if (!this.isDropdownOpened) this.temp = undefined
    }
  }
})
Vue.component('drop-link',{
  props: {
    href: String,
    value: String,
    id: String
  },
  template: `
    <a v-if='!$parent.nonlive' :href='href' class='dropdown-link' @click='send' @mouseover='$parent.temp = value'>{{value}}<slot></slot></a>
    <a :href='href' class='dropdown-link' @click='send' v-else>{{value}}<slot></slot></a>
  `,
  methods: {
    send(){
      if (this.id != undefined){
        this.$parent.id = this.id
        this.$parent.selected = this.value
      }else {
        this.$parent.selected = this.value
      }
    }
  }
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
  props: {
    username: String
  },
  template: `
    <transition name='pop1'>
      <div class='side-title' v-if='$parent.show'>
        <span class='faded' style='margin-left: -4px;top:margin-top: -4px'>{{ this.$root.l.loggedAs }}</span><span class='red'>{{ translate() }}</span>
      </div>
    </transition>
  `,
  methods: {
    translate(){
      if (this.username == 'guest')
        return this.$root.l.username
      return this.username
    }
  }
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
Vue.component('blocked-side-link', {
  props: {
    animation: String
  },
  template: `
    <transition :name='animation'>
      <div class='side-link-blocked faded' v-if='$parent.show'>
        <a><slot></slot></a>
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
    tag: String,
    title: String
  },
  template: `
    <i :class='icon + " icon-big user-icon"' @click="$emit('click', {id, tag})" :data-title='title'></i>
  `
})
Vue.component('icon-group', {
  props: {
    show: Boolean,
    dropdown: false
  },
  template: `
    <div @mouseover='dropdown = true' @mouseleave='dropdown = false'>
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
    event: String,
    title: String
  },
  template: `
    <i :class='icon + " icon-big user-icon action-icon"' @click='$parent.$emit(event)' :data-title='title'></i>
  `
})
Vue.component('action-form', {
  props: {
    show: false
  },
  template: `
    <div class='card-shadow form action-form'>
      <transition name='pop1'>
      <i class='fa fa-times icon-big user-icon close-icon' @click='$emit("close")'></i>
      </transition>
      <slot></slot>
    </div>
  `
})
Vue.component('datetime-form', {
  props: {
    date: String,
    time: String,
    openedform: Boolean
  },
  data(){
    return {
      validDate: true,
      validTime: true
    }
  },
  template: `
    <div class='datetime-form'>
      <div>
        <div>
          <input class='calendar-input' v-model='date'></input>
          <input class='calendar-input' v-model='time' placeholder='Time(Optional)'></input>
        </div>
        <div class='centralizeContent' v-if='!validDate'>
          <alert>Invalid date.</alert>
        </div>
        <div class='centralizeContent' v-if='!validTime'>
          <alert>Invalid time.</alert>
        </div>
      </div>
    </div>
  `,
  mounted(){
    this.analise()
    this.change()
  },
  methods: {
    analise(){
      this.validDate = DateM.isValidDate(this.date)
      this.validTime = TimeM.isValidTime(this.time)
      if (this.time == '') this.validTime = true
      this.$emit('update', {date: this.validDate, time: this.validTime})
    },
    change(){
      this.$emit('change', {date: this.date, time: this.time})
    }
  },
  watch: {
    date(){
      this.analise()
      this.change()
    },
    time(){
      this.analise()
      this.change()
    },
    openedform(){
      this.analise()
      this.change()
    }
  }
})
Vue.component('date', {
})
Vue.component('link-yellow', {
  props: {
    active: false,
    argument: String
  },
  template: `
    <span :class='{"link-yellow": true,"link-yellow-active": isActive()}' @click='$emit("click", argument)'><slot></slot></span>
  `,
  methods: {
    isActive(){
      return (this.active == this.argument)
    }
  }
})
Vue.component('basket', {
  props: {
    icongroups: Boolean,
    user: Object,
    dropdowns: Object,
    l: Object,
    place: String
  },
  data(){
    return {
      showOnlyFirstProjectAction: false
    }
  },
  template: `
  <div>
    <div>
      <action-bar>
        <action-bar-icon icon='fa fa-plus' id='addAction' tag='basket' @click='openUserForm' :title='l.addAction'></action-bar-icon>
        <action-bar-option :active='showOnlyFirstProjectAction' :title='l.showFirstAction' icon='fa fa-list' @on='() => showOnlyFirstProjectAction = true' @off='() => showOnlyFirstProjectAction = false'></action-bar-option>
      </action-bar>
      <h2 v-if='l' v-html='l.nonProjectActions'></h2>
      <template v-if='!$root.hasTagAction("basket")'>
        <span class='faded' v-if='l' v-html='l.lackOfNonProjectActionsBasket'></span> 
      </template>
      <template v-if='user'>
        <draggable v-model='user.actions' :options="{handle:'.draggable', animation: 300}">
          <transition-group name='flip-list' tag='div'>
            <action v-for='action in user.actions' v-if='!action.projectId && action.projectId != 0 && action.tag == "basket" && ((place == "show all") || action.place == place)' :title='action.title' :description='action.description' :key='action' :id='action.id' :dropdown='dropdowns[action.id]' :icongroup='icongroups' @changed-dropdown='changeDropdownState' :l='l'>
            </action>
          </transition-group>
        </draggable>
        <h2 v-if='l' v-html='l.projectActions'></h2>
        <template v-if='!$root.thereIsAtLeastOneProjectAction("basket")'>
          <span class='faded' v-html='l.lackOfProjectActionsBasket'></span>
        </template>
        <template v-if='showOnlyFirstProjectAction'>
        <transition-group name='flip-list' tag='div'> 
          <template v-for='project in user.projects'>
            <template v-for='action in $root.getFirstActionOfProjectInArray(project.id, "basket")' v-if='((place == "show all") || action.place == place)'>
              <project-action :title='action.title' :description='action.description' :key='action' :id='action.id' :dropdown='dropdowns[action.id]' :icongroup='icongroups' :projectId='action.projectId' :showprojectname='true' @changed-dropdown='changeDropdownState' :l='l'>
              </project-action>
            </template>
          </template>
        </transition-group>
        </template>
        <template v-else>
          <template v-for='project in user.projects'>
            <div style='height:4px'></div>
            <draggable v-model='user.actions' :options="{handle:'.draggable', animation: 300}">
            <transition-group name='flip-list' tag='div'> 
              <template v-for='action in user.actions' v-if='(action.projectId || action.projectId == 0) && $root.containsAction(project.id, action.id) && action.tag == "basket" && ((place == "show all") || action.place == place)'>           
                <project-action :title='action.title' :description='action.description' :key='action' :id='action.id' :dropdown='dropdowns[action.id]' :icongroup='icongroups' :projectId='action.projectId' :showprojectname='true' @changed-dropdown='changeDropdownState' :l='l'>
                </project-action>
              </template>
            </transition-group>                      
            </draggable>
          </template>
        </template>
      </template>
      <div class='space'></div>
    </div>
  </div>
  `,
  methods: {
    openUserForm(id){
      this.$emit('openform', id)
    },
    changeDropdownState(data){
      this.$emit('dropdown-state', {state: data.state, id: data.id})
    }
  },
  watch: {
    'user.actions': function(){
      let ids = this.$root.calculateIds()
      this.$emit('rearrange', ids)
    }
  }
})
Vue.component('maybe', {
  props: {
    icongroups: Boolean,
    user: Object,
    dropdowns: Object,
    l: Object,
    place: String
  },
  data(){
    return {
      showOnlyFirstProjectAction: false
    }
  },
  template: `
  <div>
    <div>
      <action-bar>
        <action-bar-icon icon='fa fa-plus' id='addAction' tag='maybe' @click='openUserForm' :title='l.addAction'></action-bar-icon>
        <action-bar-option :active='showOnlyFirstProjectAction' :title='l.showFirstAction' icon='fa fa-list' @on='() => showOnlyFirstProjectAction = true' @off='() => showOnlyFirstProjectAction = false'></action-bar-option>
      </action-bar>
      <h2>{{ l.nonProjectActions }}</h2>
      <template v-if='!$root.hasTagAction("maybe")'>
        <span class='faded' v-html='l.lackOfNonProjectActionsMaybe'></span> 
      </template>
      <template v-if='user'>
        <draggable v-model='user.actions' :options="{handle:'.draggable', animation: 300}">
          <transition-group name='flip-list' tag='div'>
            <action v-for='action in user.actions' v-if='!action.projectId && action.projectId != 0 && action.tag == "maybe" && ((place == "show all") || action.place == place)' :title='action.title' :description='action.description' :key='action' :id='action.id' :dropdown='dropdowns[action.id]' :icongroup='icongroups' @changed-dropdown='changeDropdownState' :l='l'>
            </action>
          </transition-group>
        </draggable>
        <h2>{{ l.projectActions }}</h2>
        <template v-if='!$root.thereIsAtLeastOneProjectAction("maybe")'>
          <span class='faded' v-html='l.lackOfProjectActionsMaybe'></span>
        </template>
        <template v-if='showOnlyFirstProjectAction'>
        <transition-group name='flip-list' tag='div'> 
          <template v-for='project in user.projects'>
            <template v-for='action in $root.getFirstActionOfProjectInArray(project.id, "maybe")' v-if='((place == "show all") || action.place == place)'>
              <project-action :title='action.title' :description='action.description' :key='action' :id='action.id' :dropdown='dropdowns[action.id]' :icongroup='icongroups' :projectId='action.projectId' :showprojectname='true' @changed-dropdown='changeDropdownState' :l='l'>
              </project-action>
            </template>
          </template>
        </transition-group>
        </template>
        <template v-else>
          <template v-for='project in user.projects'>
            <div style='height:4px'></div>
            <draggable v-model='user.actions' :options="{handle:'.draggable', animation: 300}">
            <transition-group name='flip-list' tag='div'> 
              <template v-for='action in user.actions' v-if='(action.projectId || action.projectId == 0) && $root.containsAction(project.id, action.id) && action.tag == "maybe" && ((place == "show all") || action.place == place)'>
                <project-action :title='action.title' :description='action.description' :key='action' :id='action.id' :dropdown='dropdowns[action.id]' :icongroup='icongroups' :projectId='action.projectId' :showprojectname='true' @changed-dropdown='changeDropdownState' :l='l'>
                </project-action>
              </template>
            </transition-group>                      
            </draggable>
          </template>
        </template>
      </template>
      <div class='space'></div>
    </div>
  </div>
  `,
  methods: {
    openUserForm(id){
      this.$emit('openform', id)
    },
    changeDropdownState(data){
      this.$emit('dropdown-state', {state: data.state, id: data.id})
    }
  },
  watch: {
    'user.actions': function(){
      let ids = this.$root.calculateIds()
      this.$emit('rearrange', ids)
    }
  }
})
Vue.component('waiting', {
  props: {
    icongroups: Boolean,
    user: Object,
    dropdowns: Object,
    l: Object,
    place: String
  },
  data(){
    return {
      showOnlyFirstProjectAction: false
    }
  },
  template: `
  <div>
    <div>
      <action-bar>
        <action-bar-icon icon='fa fa-plus' id='addAction' tag='waiting' @click='openUserForm' :title='l.addAction'></action-bar-icon>
        <action-bar-option :active='showOnlyFirstProjectAction' :title='l.showFirstAction' icon='fa fa-list' @on='() => showOnlyFirstProjectAction = true' @off='() => showOnlyFirstProjectAction = false'></action-bar-option>
      </action-bar>
      <h2>{{ l.nonProjectActions }}</h2>
      <template v-if='!$root.hasTagAction("waiting")'>
        <span class='faded' v-html='l.lackOfNonProjectActionsWaiting'></span> 
      </template>
      <template v-if='user'>
        <draggable v-model='user.actions' :options="{handle:'.draggable', animation: 300}">
          <transition-group name='flip-list' tag='div'>
            <action v-for='action in user.actions' v-if='!action.projectId && action.projectId != 0 && action.tag == "waiting" && ((place == "show all") || action.place == place)' :title='action.title' :description='action.description' :key='action' :id='action.id' :dropdown='dropdowns[action.id]' :icongroup='icongroups' @changed-dropdown='changeDropdownState' :l='l'>
            </action>
          </transition-group>
        </draggable>
        <h2>{{ l.projectActions }}</h2>
        <template v-if='!$root.thereIsAtLeastOneProjectAction("waiting")'>
          <span class='faded' v-html='l.lackOfProjectActionsWaiting'></span>
        </template>
        <template v-if='showOnlyFirstProjectAction'>
        <transition-group name='flip-list' tag='div'> 
          <template v-for='project in user.projects'>
            <template v-for='action in $root.getFirstActionOfProjectInArray(project.id, "waiting")' v-if='((place == "show all") || action.place == place)'>
              <project-action :title='action.title' :description='action.description' :key='action' :id='action.id' :dropdown='dropdowns[action.id]' :icongroup='icongroups' :projectId='action.projectId' :showprojectname='true' @changed-dropdown='changeDropdownState' :l='l'>
              </project-action>
            </template>
          </template>
        </transition-group>
        </template>
        <template v-else>
          <template v-for='project in user.projects'>
            <div style='height:4px'></div>
            <draggable v-model='user.actions' :options="{handle:'.draggable', animation: 300}">
            <transition-group name='flip-list' tag='div'> 
              <template v-for='action in user.actions' v-if='(action.projectId || action.projectId == 0) && $root.containsAction(project.id, action.id) && action.tag == "waiting" && ((place == "show all") || action.place == place)'>           
                <project-action :title='action.title' :description='action.description' :key='action' :id='action.id' :dropdown='dropdowns[action.id]' :icongroup='icongroups' :projectId='action.projectId' :showprojectname='true' @changed-dropdown='changeDropdownState' :l='l'>
                </project-action>
              </template>
            </transition-group>                      
            </draggable>
          </template>
        </template>
      </template>
      <div class='space'></div>
    </div>
  </div>
  `,
  methods: {
    openUserForm(id){
      this.$emit('openform', id)
    },
    changeDropdownState(data){
      this.$emit('dropdown-state', {state: data.state, id: data.id})
    }
  },
  watch: {
    'user.actions': function(){
      let ids = this.$root.calculateIds()
      this.$emit('rearrange', ids)
    }
  }
})
Vue.component('next-actions', {
  props: {
    icongroups: Boolean,
    user: Object,
    dropdowns: Object,
    l: Object,
    place: String
  },
  data(){
    return {
      showOnlyFirstProjectAction: false
    }
  },
  template: `
  <div>
    <div>
      <action-bar>
        <action-bar-icon icon='fa fa-plus' id='addAction' tag='nextAction' @click='openUserForm' :title='l.addAction'></action-bar-icon>
        <action-bar-option :active='showOnlyFirstProjectAction' :title='l.showFirstAction' icon='fa fa-list' @on='() => showOnlyFirstProjectAction = true' @off='() => showOnlyFirstProjectAction = false' :l='l'></action-bar-option>
      </action-bar>
      <h2>{{ l.nonProjectActions }}</h2>
      <template v-if='!$root.hasTagAction("nextAction")'>
        <span class='faded' v-if='l' v-html='l.lackOfNonProjectActionsNextAction'></span> 
      </template>
      <template v-if='user'>
        <draggable v-model='user.actions' :options="{handle:'.draggable', animation: 300}">
          <transition-group name='flip-list' tag='div'>
            <action v-for='action in user.actions' v-if='!action.projectId && action.projectId != 0 && action.tag == "nextAction" && ((place == "show all") || action.place == place)' :title='action.title' :description='action.description' :key='action' :id='action.id' :dropdown='dropdowns[action.id]' :icongroup='icongroups' @changed-dropdown='changeDropdownState' :l='l'>
            </action>
          </transition-group>
        </draggable>
        <h2>{{ l.projectActions }}</h2>
        <template v-if='!$root.thereIsAtLeastOneProjectAction("nextAction")'>
          <span class='faded' v-if='l' v-html='l.lackOfProjectActionsNextAction'></span>
        </template>
        <template v-if='showOnlyFirstProjectAction'>
        <transition-group name='flip-list' tag='div'> 
          <template v-for='project in user.projects'>
            <template v-for='action in $root.getFirstActionOfProjectInArray(project.id, "nextAction")' v-if='((place == "show all") || action.place == place)'>
              <project-action :title='action.title' :description='action.description' :key='action' :id='action.id' :dropdown='dropdowns[action.id]' :icongroup='icongroups' :projectId='action.projectId' :showprojectname='true' @changed-dropdown='changeDropdownState' :l='l'>
              </project-action>
            </template>
          </template>
        </transition-group>
        </template>
        <template v-else>
          <template v-for='project in user.projects'>
            <div style='height:4px'></div>
            <draggable v-model='user.actions' :options="{handle:'.draggable', animation: 300}">
            <transition-group name='flip-list' tag='div'> 
              <template v-for='action in user.actions' v-if='(action.projectId || action.projectId == 0) && $root.containsAction(project.id, action.id) && action.tag == "nextAction" && ((place == "show all") || action.place == place)'>           
                <project-action :title='action.title' :description='action.description' :key='action' :id='action.id' :dropdown='dropdowns[action.id]' :icongroup='icongroups' :projectId='action.projectId' :showprojectname='true' @changed-dropdown='changeDropdownState' :l='l'>
                </project-action>
              </template>
            </transition-group>                      
            </draggable>
          </template>
        </template>
      </template>
      <div class='space'></div>
    </div>
  </div>
  `,
  methods: {
    openUserForm(id){
      this.$emit('openform', id)
    },
    changeDropdownState(data){
      this.$emit('dropdown-state', {state: data.state, id: data.id})
    }
  },
  watch: {
    'user.actions': function(){
      let ids = this.$root.calculateIds()
      this.$emit('rearrange', ids)
    }
  }
})
Vue.component('calendar', {
  props: {
    user: Object,
    icongroups: Boolean,
    dropdowns: Boolean,
    l: Object,
    place: String
  },
  data() {
    return {
      date: '',
      year: '',
      beforeafter: undefined,
      showOnlyFirstProjectAction: false
    }
  },
  template: `
  <div>
    <div>
      <graph @dateselected='selectDate' :l='l'>
      </graph>
      <calendar-action-bar>
        <div>
          <div id='left-buttons-calendar-action-bar'>
            <action-bar-icon icon='fa fa-plus' id='addTimedAction' tag='calendar' @click='openUserForm' :title='l.addAction'></action-bar-icon>
            <action-bar-option :active='showOnlyFirstProjectAction' :title='l.showFirstAction' icon='fa fa-list' @on='() => showOnlyFirstProjectAction = true' @off='() => showOnlyFirstProjectAction = false'></action-bar-option>
          </div>
        </div>
        <div>
          <div>
            <link-yellow :active='beforeafter' argument='before' @click='selectButton'>{{ l.before }} {{year}}</link-yellow>
            <link-yellow :active='beforeafter' argument='after' @click='selectButton'>{{ l.after }} {{year}}</link-yellow>
          </div>
          <div style='width:20px;display: inline-block'></div>
          <input class='calendar-input' v-model='date'></input>
        </div>
      </calendar-action-bar>
      <h2>{{ l.nonProjectActions }}</h2>
      <template v-if='!thereIsAtLeastOneNonProjectTimedActionWithTheSelectedDate() && beforeafter == undefined'>
        <span class='faded' v-html='l.lackOfNonProjectActionsCalendar'></span>
      </template>
      <template v-else-if='beforeafter == "after" && !thereIsAtLeastOneNonProjectTimedActionAfterThisYear()'>
        <span class='faded' v-html='l.nonProjectActionAfter'></span>
      </template>
      <template v-else-if='beforeafter == "before" && !thereIsAtLeastOneNonProjectTimedActionBeforeThisYear()'>
        <span class='faded' v-html='l.nonProjectActionBefore'></span>
      </template>
      <template v-if='beforeafter == undefined'>
        <draggable v-model='user.actions' :options="{handle:'.draggable', animation: 300}">
        <transition-group name='flip-list' tag='div'>       
          <timed-action v-for='action in user.actions' v-if='action.calendar && action.calendar.date == date && !action.projectId && action.projectId != 0 && ((place == "show all") || action.place == place)' :title='action.title' :description='action.description' :key='action' :id='action.id' :icongroup='icongroups' :dropdown='dropdowns[action.id]' :time='action.calendar.time' :date='action.calendar.date' @changed-dropdown='changeDropdownState' :l='l'></timed-action>
        </transition-group>
        </draggable>
      </template>
      <template v-else-if='beforeafter == "before"'>
        <draggable v-model='user.actions' :options="{handle:'.draggable', animation: 300}">
          <transition-group name='flip-list' tag='div'>          
            <timed-action v-for='action in user.actions' v-if='action.calendar && action.calendar.date.split("/")[2] < year && !action.projectId && action.projectId != 0 && ((place == "show all") || action.place == place)' :title='action.title' :description='action.description' :key='action' :id='action.id' :icongroup='icongroups' :dropdown='dropdowns[action.id]' :time='action.calendar.time' :date='action.calendar.date' @changed-dropdown='changeDropdownState' :l='l'></timed-action>
          </transition-group>          
        </draggable>
      </template>
      <template v-else-if='beforeafter == "after"'>
        <draggable v-model='user.actions' :options="{handle:'.draggable', animation: 300}">
          <transition-group name='flip-list' tag='div'>      
            <timed-action v-for='action in user.actions' v-if='action.calendar && action.calendar.date.split("/")[2] > year && !action.projectId && action.projectId != 0 && ((place == "show all") || action.place == place)' :title='action.title' :description='action.description' :key='action' :id='action.id' :icongroup='icongroups' :dropdown='dropdowns[action.id]' :time='action.calendar.time' :date='action.calendar.date' @changed-dropdown='changeDropdownState' :l='l'></timed-action>
          </transition-group>     
        </draggable>
      </template>
      <h2>{{ l.projectActions }}</h2>
      <template v-if='!thereIsAtLeastOneProjectTimedActionWithTheSelectedDate() && beforeafter == undefined'>
        <span class='faded' v-html='l.projectActionsCalendar'></span>
      </template>
      <template v-else-if='beforeafter == "after" && !thereIsAtLeastOneProjectTimedActionAfterThisYear()'>
        <span class='faded' v-html='l.projectActionsCalendarAfter'></span>
      </template>
      <template v-else-if='beforeafter == "before" && !thereIsAtLeastOneProjectTimedActionBeforeThisYear()'>
        <span class='faded' v-html='l.projectActionsCalendarBefore'></span>
      </template>
      <template v-if='beforeafter == "before"'>
        <template v-if='showOnlyFirstProjectAction'>
        <transition-group name='flip-list' tag='div'> 
          <template v-for='project in user.projects'>
            <template v-for='action in $root.getFirstActionOfProjectInArray(project.id, "calendar")' v-if='action.calendar.date.split("/")[2] < year && ((place == "show all") || action.place == place)'>
              <project-timed-action :description='action.description' :key='action' :id='action.id' :icongroup='icongroups' :dropdown='dropdowns[action.id]' :time='action.calendar.time' :projectid='action.projectId' @changed-dropdown='changeDropdownState' :l='l'></project-timed-action>
            </template>
          </template>
        </transition-group>
        </template>
        <template v-else>
          <template v-for='project in user.projects'>
            <div style='height:4px'></div>
            <draggable v-model='user.actions' :options="{handle:'.draggable', animation: 300}">
            <transition-group name='flip-list' tag='div'> 
              <template v-for='action in user.actions' v-if='(action.projectId || action.projectId == 0) && $root.containsAction(project.id, action.id) && action.tag == "calendar" && action.calendar.date.split("/")[2] < year && ((place == "show all") || action.place == place)'>
                <project-timed-action :title='action.title' :description='action.description' :key='action' :id='action.id' :icongroup='icongroups' :dropdown='dropdowns[action.id]' :time='action.calendar.time' :projectid='action.projectId' @changed-dropdown='changeDropdownState' :l='l'></project-timed-action>
              </template>
            </transition-group>                      
            </draggable>
          </template>
        </template>
      </template>
      <template v-if='beforeafter == "after"'>
        <template v-if='showOnlyFirstProjectAction'>
        <transition-group name='flip-list' tag='div'> 
          <template v-for='project in user.projects'>
            <template v-for='action in $root.getFirstActionOfProjectInArray(project.id, "calendar")' v-if='action.calendar.date.split("/")[2] > year && ((place == "show all") || action.place == place)'>
              <project-timed-action :description='action.description' :key='action' :id='action.id' :icongroup='icongroups' :dropdown='dropdowns[action.id]' :time='action.calendar.time' :projectid='action.projectId' @changed-dropdown='changeDropdownState' :l='l'></project-timed-action>
            </template>
          </template>
        </transition-group>
        </template>
        <template v-else>
          <template v-for='project in user.projects'>
            <div style='height:4px'></div>
            <draggable v-model='user.actions' :options="{handle:'.draggable', animation: 300}">
            <transition-group name='flip-list' tag='div'> 
              <template v-for='action in user.actions' v-if='(action.projectId || action.projectId == 0) && $root.containsAction(project.id, action.id) && action.tag == "calendar" && action.calendar.date.split("/")[2] > year && ((place == "show all") || action.place == place)'>
                <project-timed-action :title='action.title' :description='action.description' :key='action' :id='action.id' :icongroup='icongroups' :dropdown='dropdowns[action.id]' :time='action.calendar.time' :projectid='action.projectId' @changed-dropdown='changeDropdownState' :l='l'></project-timed-action>
              </template>
            </transition-group>                      
            </draggable>
          </template>
        </template>
      </template>
      <template v-if='beforeafter == undefined'>
        <template v-if='showOnlyFirstProjectAction'>
        <transition-group name='flip-list' tag='div'> 
          <template v-for='project in user.projects'>
            <template v-for='action in $root.getFirstActionOfProjectInArray(project.id, "calendar")' v-if='action.calendar.date == date && ((place == "show all") || action.place == place)'>
              <project-timed-action :description='action.description' :key='action' :id='action.id' :icongroup='icongroups' :dropdown='dropdowns[action.id]' :time='action.calendar.time' :projectid='action.projectId' @changed-dropdown='changeDropdownState' :l='l'></project-timed-action>
            </template>
          </template>
        </transition-group>
        </template>
        <template v-else>
          <template v-for='project in user.projects'>
            <div style='height:4px'></div>
            <draggable v-model='user.actions' :options="{handle:'.draggable', animation: 300}">
            <transition-group name='flip-list' tag='div'> 
              <template v-for='action in user.actions' v-if='(action.projectId || action.projectId == 0) && $root.containsAction(project.id, action.id) && action.tag == "calendar" && action.calendar.date == date && ((place == "show all") || action.place == place)'>           
                <project-timed-action :title='action.title' :description='action.description' :key='action' :id='action.id' :icongroup='icongroups' :dropdown='dropdowns[action.id]' :time='action.calendar.time' :projectid='action.projectId' @changed-dropdown='changeDropdownState' :l='l'></project-timed-action>
              </template>
            </transition-group>                      
            </draggable>
          </template>
        </template>
      </template>
      <div class='space'></div>
    </div>
  </div>
  `,
  mounted(){
    let splited = this.date.split('/')
    this.year = splited[2]
  },
  afterUpdate(){
    let splited = this.date.split('/')
    this.year = splited[2]
  },
  methods: {
    activateFirstOneVar(){
      this.firstOne = true
    },
    disableFirstOneVar(){
      this.firstOne = false
    },
    selectButton(arg){
      this.date = ''
      setTimeout(() => this.beforeafter = arg, 10)
    },
    changeDropdownState(data){
      this.$emit('dropdown-state', {state: data.state, id: data.id})
    },
    selectDate(date){
      this.date = date
    },
    openUserForm(id){
      this.$emit('openform', id)
      this.$root.tempUser.action.calendar.date = this.date
    },
    thereIsAtLeastOneNonProjectTimedActionWithTheSelectedDate(){
      let act = this.user.actions
      let selectedDate = this.date
      let length = act.length
      for (let i = 0;i < length;i++)
        if (!act[i].projectId && act[i].projectId != 0)
          if (act[i].calendar && act[i].calendar.date == selectedDate && ((act[i].place == undefined && this.place == 'show all') || act[i].place == this.place))
            return true
      return false
    },
    thereIsAtLeastOneProjectTimedActionWithTheSelectedDate(){
      let act = this.user.actions
      let selectedDate = this.date
      let length = act.length
      for (let i = 0;i < length;i++)
        if (act[i].projectId || act[i].projectId == 0)
          if (act[i].calendar && act[i].calendar.date == selectedDate && ((act[i].place == undefined && this.place == 'show all') || act[i].place == this.place))
            return true
      return false
    },
    thereIsAtLeastOneNonProjectTimedActionAfterThisYear(){
      let act = this.user.actions
      let year = parseInt(this.year)
      let length = act.length
      for (let i = 0;i < length;i++)
        if (!act[i].projectId && act[i].projectId != 0 && act[i].calendar && ((act[i].place == undefined && this.place == 'show all') || act[i].place == this.place)){
          let splited = act[i].calendar.date.split('/')
          if (parseInt(splited[2]) > year)
            return true
        }
      return false
    },
    thereIsAtLeastOneProjectTimedActionAfterThisYear(){
      let act = this.user.actions
      let year = parseInt(this.year)
      let length = act.length
      for (let i = 0;i < length;i++)
        if ((act[i].projectId || act[i].projectId == 0) && act[i].calendar && ((act[i].place == undefined && this.place == 'show all') || act[i].place == this.place)){
          let splited = act[i].calendar.date.split('/')
          if (parseInt(splited[2]) > year)
            return true
        }
      return false
    },
    thereIsAtLeastOneNonProjectTimedActionBeforeThisYear(){
      let act = this.user.actions
      let year = parseInt(this.year)
      let length = act.length
      for (let i = 0;i < length;i++)
        if (!act[i].projectId && act[i].projectId != 0 && act[i].calendar && ((act[i].place == undefined && this.place == 'show all') || act[i].place == this.place)){
          let splited = act[i].calendar.date.split('/')
          if (parseInt(splited[2]) < year)
            return true
        }
      return false
    },
    thereIsAtLeastOneProjectTimedActionBeforeThisYear(){
      let act = this.user.actions
      let year = parseInt(this.year)
      let length = act.length
      for (let i = 0;i < length;i++)
        if ((act[i].projectId || act[i].projectId == 0) && act[i].calendar && ((act[i].place == undefined && this.place == 'show all') || act[i].place == this.place)){
          let splited = act[i].calendar.date.split('/')
          if (parseInt(splited[2]) < year)
            return true
        }
      return false
    }
  },
  watch: {
    date(){
      this.$root.tempUser.action.calendar.date = this.date
      this.beforeafter = undefined
    },
    user:{
      handler(){
        this.$forceUpdate()
      },
      deep: true
    }
  }
})
Vue.component('projects', {
  props: {
    dropdowns: Object,
    icongroups: Boolean,
    user: Object,
    projectdropdowns: Object,
    l: Object,
    place: String
  },
  data(){
    return {
      showAllProjectsDespiteOfLocation: false
    }
  },
  template: `
  <div>
    <div>
      <action-bar>
        <action-bar-icon icon='fa fa-plus' id='addProject' tag='projects' @click='openUserForm' :title='l.createProject'></action-bar-icon>
        <action-bar-option v-if='place != "show all"' :active='showAllProjectsDespiteOfLocation' :title='l.showAllProjectsDespiteOfLocation' icon='fa fa-list' @on='() => showAllProjectsDespiteOfLocation = true' @off='() => showAllProjectsDespiteOfLocation = false'></action-bar-option>
      </action-bar>
      <template v-if='user'>
      <draggable v-model='user.projects' :options="{handle:'.draggable', animation: 300}">
        <template v-if='showAllProjectsDespiteOfLocation || place == "show all"'>
          <transition-group name='flip-list' tag='div'>
            <project v-for='prj in user.projects' :title='prj.title' :icongroup='icongroups' :dropdowns='dropdowns' :dropdown='projectdropdowns[prj.id]' :id='prj.id' :key='prj' :user='user' :l='l' @projectopened='changeProjectDropdownState' :place='place'></project>
          </transition-group>
        </template>
        <template v-else>
          <transition-group name='flip-list' tag='div'>
            <project v-for='prj in user.projects' v-if='$root.thereIsAtLeastOneActionInThisLocation(prj.id)' :title='prj.title' :icongroup='icongroups' :dropdowns='dropdowns' :dropdown='projectdropdowns[prj.id]' :id='prj.id' :key='prj' :user='user' :l='l' @projectopened='changeProjectDropdownState' :place='place'></project>
          </transition>
        </template>
      </draggable>
      <template v-if='!thereIsAtLeastOneProject()'>
        <span class='faded' v-html='l.lackOfProjects'></span>
      </template>
      </template>
      <div class='space'></div>
    </div>
  </div>
  `,
  methods: {
    changeProjectDropdownState(obj){
      this.projectdropdowns[obj.id] = obj.state
    },
    openUserForm(id){
      this.$emit('openform', id)
    },
    calculateProjectIds(){
      let ids = []
      let length = this.user.projects.length
      for (let i = 0;i < length;i++)
        ids.push(this.user.projects[i].id)
      return ids
    },
    thereIsAtLeastOneProject(){
      return (this.user.projects.length > 0)
    }
  },
  watch: {
    'user.projects'(){
      let ids = this.calculateProjectIds()
      this.$emit('rearrangeproject', ids)
    },
    'user.actions'(){
      let ids = this.$root.calculateIds()
      this.$emit('rearrange', ids)
    }
  }
})
Vue.component('project', {
  props: {
    id: Number,
    dropdown: false,
    dropdowns: Object,
    title: String,
    icongroup: Boolean,
    user: Object,
    l: Object,
    place: String
  },
  template: `
    <div class='project'>
      <div class='card'>
        <div @click='dropdown = !dropdown'>
          <i class='fa fa-sort icon-tiny draggable'></i>
          <span v-if='!$root.allOfTheActionsInThisProjectHasOnlyOnePlace(id)'>{{ title }}</span>
          <span v-else>{{ title }}<span class='faded'>| {{user.actions[user.projects[id].actions[0]].place}}</span></span>
        </div>
        <div>
          <icon-group :show='icongroup' @delete='deleteProject' @edit='editProject' @project='addActionToProject' @place='changePlaces'>
            <action-icon icon='fa fa-times' event='delete' :title='l.deleteProject'></action-icon>
            <action-icon icon='fa fa-edit' event='edit' :title='l.editProjectTitle'></action-icon>
            <action-icon icon='fa fa-map-marked-alt' event='place' :title='l.changePlaceOfAllActions'></action-icon>
            <action-icon icon='fa fa-plus' event='project' :title='l.addToProject'></action-icon>
          </icon-group>
        </div>
      </div>
      <transition name='pop-long'>
        <div v-show='dropdown'>
          <div>
            <draggable v-model='user.actions' :options="{handle:'.draggable', animation: 300}">
              <transition-group name='flip-list' tag='div'>              
                <project-action v-for='action in user.actions' v-if='isOnProject(action.id) && ((place == "show all") || action.place == place)' :title='action.title' :description='action.description' :key='action' :id='action.id' :dropdown='dropdowns[action.id]' :icongroup='icongroup' :projectId='action.projectId' @changed-dropdown='changeDropdownState' :showtagicon='true' :showprojectname='false' :tag='action.tag' :calendar='action.calendar' :l='l'>
                </project-action>
              </transition-group>
            </draggable>
          </div>
        </div>
      </transition>
    </div>
  `,
  methods: {
    changeDropdownState(obj){
      this.dropdowns[obj.id] = obj.state
    },
    changePlaces(){
      this.openActionForm('changeAcitionsPlaceFromProject')
    },
    deleteProject(){
      let rt = this.$root
      let pro = rt.user.projects

      rt.removeActionsFromProject(this.id)
      pro.splice(this.id, 1)
      let oldProjectIds = rt.getIds(pro)
      rt.resetIds(pro)
      rt.updateActionsIds(oldProjectIds)

      if (!this.$root.guest)
        this.$root.POSTrequest('/delete-project', 'id='+this.id)
    },
    isOnProject(actionId){
      let pro = this.user.projects[this.id]
      let length = pro.actions.length
      for (let i = 0;i < length;i++)
        if (pro.actions[i] == actionId)
          return true
      return false
    },
    openActionForm(id){
      this.$root.openUserForm({id: '' + id})
      this.$root.getDataFromProject(this.$root.user.projects[this.id])
    },
    editProject(){
      this.openActionForm('editProject')
    },
    addActionToProject(){
      this.openActionForm('addActionToProject')
    }
  },
  watch: {
    dropdown(){
      this.$emit('projectopened', {id: this.id, state: this.dropdown})
    }
  }
})
Vue.component('project-timed-action', {
  props: {
    title: String,
    description: String,
    id: Number,
    icongroup: Boolean,
    dropdown: Boolean,
    time: String,
    date: String,
    projectid: Number,
    l: Object
  },
  template: `
    <div class='action'>
      <div class='card'>
        <div @click='dropdown = !dropdown'>
          <i class='fa fa-sort icon-tiny draggable'></i>
          <span v-show='time != "" && date == undefined'><span class='faded'>{{getprojectname}}</span> | {{title}}<span class='faded'>| {{time}}</span></span>
          <span v-show='time == "" && date == undefined'><span class='faded'>{{getprojectname}}</span> | {{title}}</span>
          <span v-show='time != "" && date != undefined'><span class='faded'>{{getprojectname}}</span> | {{title}}<span class='faded'>| {{date}} | {{time}}</span></span>
          <span v-show='time == "" && date != undefined'><span class='faded'>{{getprojectname}}</span> | {{title}}<span class='faded'>| {{date}}</span></span>
        </div>
        <div>
          <span class='faded' v-if='$root.user.actions[id].place != null && $root.place == "show all"'>{{this.$root.user.actions[id].place}}</span>
          <icon-group :show='icongroup' @delete='deleteTimedProjectAction' @removeFromProject='removeProjectTimedActionFromProject' @editTag='editTimedProjectActionTag' @edit='editProjectTimedAction' @place='changePlace'>
            <action-icon icon='fa fa-times' event='delete' title='delete action'></action-icon>
            <action-icon icon='fa fa-edit' event='edit' :title='l.editAction'></action-icon>
            <action-icon icon='fa fa-tag' event='editTag' :title='l.editActionTag'></action-icon>
            <action-icon icon='fas fa-map-marked-alt' event='place' :title='l.addChangePlace'></action-icon>
            <action-icon icon='fa fa-sign-out-alt' event='removeFromProject' :title='l.removeFromProject'></action-icon>
          </icon-group>
        </div>
      </div>
      <transition name='pop-long'>
        <div class='card' v-show='dropdown'>
          <span>{{ description }}</span>
        </div>
      </transition>
    </div>
  `,
  methods: {
    changePlace(){
      this.$root.openActionForm('changePlace', this.id)
    },
    deleteTimedProjectAction(){
      let rt = this.$root
      let acts = rt.user.actions
      let pros = rt.user.projects

      let j = rt.getIndexOfProjectActionThatHasTheGivenActionId(this.projectid, this.id)
      pros[this.projectid].actions.splice(j, 1)
      acts.splice(this.id, 1)

      rt.decreaseProjectsActionsIdsByOneThatAreBiggerThan(this.id)
      rt.resetIds(acts)
      if (!this.$root.guest)
        this.$root.POSTrequest('/delete-project-action', 'id=' + this.id)
    },
    editTimedProjectActionTag(){
      this.$root.openActionForm('editTimedTag', this.id)
    },
    removeProjectTimedActionFromProject(){
      this.$root.removeActionFromProject(this.id)
    },
    editProjectTimedAction(){
      this.$root.openActionForm('editTimedAction', this.id)
    }
  },
  computed: {
    getprojectname(){
      return this.$root.user.projects[this.projectid].title
    }
  },
  watch: {
    dropdown(){
      this.$emit('changed-dropdown', {state: this.dropdown, id: this. id})
    }
  }
})
Vue.component('project-action', {
  props: {
    title: String,
    description: String,
    icongroup: Boolean,
    dropdown: false,
    id: Number,
    projectId: Number,
    showtagicon: false,
    showprojectname: true,
    tag: String,
    calendar: Object,
    l: Object
  },
  template: `
    <div class='action'>
      <div class='card'>
        <div @click='dropdown = !dropdown'>
          <i class='fa fa-sort icon-tiny draggable'></i>
          <span v-show='showprojectname'> <span class='faded'>{{ getprojectname }}</span><span class='faded'>|</span> {{ title }}</span>
          <span v-show='!showprojectname'> {{ title }} <span class='faded' v-if='tag == "calendar"'>| {{calendar.date}}<span v-show='calendar.time'>{{calendar.time}}</span></span></span>
        </div>
        <div>
          <span class='faded' v-if='$root.user.actions[id].place != null && $root.place == "show all"'>{{this.$root.user.actions[id].place}}</span>
          <icon-group :show='icongroup' @delete='deleteProjectAction' @edit='editAction' @editTag='editActionTag' @removeFromProject='removeActionFromProject' @place='changePlace'>
            <action-icon icon='fa fa-times' event='delete' :title='l.deleteAction'></action-icon>
            <action-icon icon='fa fa-edit' event='edit' :title='l.editAction'></action-icon>
            <action-icon icon='fa fa-tag' event='editTag' :title='l.editActionTag'></action-icon>
            <action-icon icon='fas fa-map-marked-alt' event='place' :title='l.addChangePlace'></action-icon>
            <action-icon icon='fa fa-sign-out-alt' event='removeFromProject' :title='l.removeFromProject'></action-icon>
            <faded-action-icon :icon='returnTheClassIcon'></faded-action-icon>
          </icon-group>
        </div>
      </div>
      <transition name='pop-long'>
        <div class='card' v-show='dropdown'>
          <span>{{ description }}</span>
        </div>
      </transition>
    </div>
  `,
  methods: {
    changePlace(){
      this.$root.openActionForm('changePlace', this.id)
    },
    deleteProjectAction(){
      let rt = this.$root
      let act = rt.user.actions
      let pro = rt.user.projects

      let j = rt.getIndexOfProjectActionThatHasTheGivenActionId(this.projectId, this.id)
      pro[this.projectId].actions.splice(j, 1)
      act.splice(this.id, 1)

      rt.decreaseProjectsActionsIdsByOneThatAreBiggerThan(this.id)
      rt.resetIds(act)
      if (!this.$root.guest)
        this.$root.POSTrequest('/delete-project-action', 'id=' + this.id)
    },
    removeActionFromProject(){
      let rt = this.$root

      rt.removeActionFromProject(this.id)
    },
    editAction(){
      if (!this.calendar)
        this.$root.openActionForm('editAction', this.id)
      else 
        this.$root.openActionForm('editTimedAction', this.id)
    },
    editActionTag(){
      if (!this.calendar)
        this.$root.openActionForm('editTag', this.id)
      else this.$root.openActionForm('editTimedTag', this.id)
    }
  },
  computed: {
    returnTheClassIcon(){
      let tag = this.tag
      if (tag == 'basket')
        return ''
      else if (tag == 'nextAction')
        return 'fa fa-forward icon-big'
      else if (tag == 'maybe')
        return 'fa fa-question icon-big'
      else if (tag == 'waiting')
        return 'fa fa-hourglass-half icon-big'
      else if (tag == 'calendar')
        return 'fa fa-calendar-alt icon-big'
    },
    getprojectname(){
      return this.$root.user.projects[this.projectId].title
    }
  },
  watch: {
    dropdown(){
      this.$emit('changed-dropdown', {state: this.dropdown, id: this. id})
    }
  }
})
Vue.component('timed-action', {
  props: {
    title: String,
    description: String,
    id: Number,
    icongroup: Boolean,
    dropdown: Boolean,
    time: String,
    date: String,
    l: Object
  },
  template: `
    <div class='action'>
      <div class='card'>
        <div @click='dropdown = !dropdown'>
          <i class='fa fa-sort icon-tiny draggable'></i>
          <span v-show='time == "" && date == undefined'> {{ title }}</span>
          <span v-show='time != "" && date == undefined'> {{ title }}<span class='faded'>| {{ time }}</span></span>
          <span v-show='time == "" && date != undefined'> {{ title }}<span class='faded'>| {{date}}</span><span class='faded'></span></span>
          <span v-show='time != "" && date != undefined'> {{ title }}<span class='faded'>| {{date}}</span><span class='faded'>| {{ time }}</span></span>
        </div>
        <div>
          <span class='faded' v-if='$root.user.actions[id].place != null && $root.place == "show all"'>{{this.$root.user.actions[id].place}}</span>
          <icon-group :show='icongroup' @delete='deleteAction' @edit='editAction' @tag='editTag' @project='manajeProject' @place='changePlace'>
            <action-icon icon='fa fa-times' event='delete' :title='l.deleteAction'></action-icon>
            <action-icon icon='fa fa-edit' event='edit' :title='l.editAction'></action-icon>
            <action-icon icon='fa fa-tag' event='tag' :title='l.editActionTag'></action-icon>
            <action-icon icon='fas fa-map-marked-alt' event='place' :title='l.addChangePlace'></action-icon>
            <action-icon icon='fa fa-project-diagram' event='project' :title='l.addCreateProject'></action-icon>
          </icon-group>
        </div>
      </div>
      <transition name='pop-long'>
        <div class='card' v-show='dropdown'>
          <span>{{ description }}</span>
        </div>
      </transition>
    </div>
  `,
  methods: {
    changePlace(){
      this.$root.openActionForm('changePlace', this.id)
    },
    editTag(){
      this.$root.openActionForm('editTimedTag', this.id)
    },
    deleteAction(){
      let data = this.$root
      let act = data.user.actions
      let rt = this.$root

      act.splice(this.id, 1)
    
      rt.decreaseProjectsActionsIdsByOneThatAreBiggerThan(this.id)
      rt.resetIds(act)

      if (!this.$root.guest)
        this.$root.POSTrequest('/delete-action', 'id=' + this.id)
    },
    editAction(){
      this.$root.openActionForm('editTimedAction', this.id)
    },
    manajeProject(){
      this.$root.openActionForm('actionToProject', this.id)
    }
  },
  watch: {
    dropdown() {
      this.$emit('changed-dropdown', {state: this.dropdown, id: this. id})
    }
  }
})
Vue.component('action',{
  props: {
    title: String,
    description: String,
    icongroup: Boolean,
    dropdown: false,
    id: Number,
    l: Object
  },
  template: `
    <div class='action'>
      <div class='card'>
        <div @click='dropdown = !dropdown'>
          <i class='fa fa-sort icon-tiny draggable'></i>
          <span> {{ title }}</span>
        </div>
        <div>
          <span class='faded' v-if='$root.user.actions[id].place != null && $root.place == "show all"'>{{this.$root.user.actions[id].place}}</span>
          <icon-group :show='icongroup' @delete='deleteAction' @edit='editAction' @editTag='editActionTag' @project='manajeProject' @place='changePlace'>
            <action-icon icon='fa fa-times' event='delete' :title='l.deleteAction'></action-icon>
            <action-icon icon='fa fa-edit' event='edit' :title='l.editAction'></action-icon>
            <action-icon icon='fa fa-tag' event='editTag' :title='l.editActionTag'></action-icon>
            <action-icon icon='fas fa-map-marked-alt' event='place' :title='l.addChangePlace'></action-icon>
            <action-icon icon='fa fa-project-diagram' event='project' :title='l.addCreateProject'></action-icon>
          </icon-group>
        </div>
      </div>
      <transition name='pop-long'>
        <div class='card' v-show='dropdown'>
          <span>{{ description }}</span>
        </div>
      </transition>
    </div>
  `,
  methods: {
    changePlace(){
      this.$root.openActionForm('changePlace', this.id)
    },
    deleteAction(){
      let data = this.$root
      let act = data.user.actions
      let rt = this.$root

      act.splice(this.id, 1)
    
      rt.decreaseProjectsActionsIdsByOneThatAreBiggerThan(this.id)
      rt.resetIds(act)

      if (!this.$root.guest)
        this.$root.POSTrequest('/delete-action', 'id=' + this.id)
    },
    editAction(){
      this.$root.openActionForm('editAction', this.id)
    },
    editActionTag(){
      this.$root.openActionForm('editTag', this.id)
    },
    manajeProject(){
      this.$root.openActionForm('actionToProject', this.id)
    }
  },
  watch: {
    dropdown(){
      this.$emit('changed-dropdown', {state: this.dropdown, id: this. id})
    }
  }
})
Vue.component('calendar-action-bar', {
  template: `
    <div class='calendar-action-bar'><slot></slot></div>
  `
})
Vue.component('graph', {
  props: {
    l: Object
  },
  data(){
    return {
      numberOfDaysInYear: 365,
      created: false
    }
  },
  mounted(){
    this.date = DateM.getCurrentDay()
    this.currentDate = this.date.stringify()

    this.currentYear = this.date.year
    this.date.year = this.date.year
    this.date.month = 1
    this.date.day = 1

    this.numberOfDaysUntilFirstMonday = new DateM('1/1/'+this.date.year).getWeekDay()

    this.created = true
    this.$emit('dateselected', this.currentDate)
  },
  template: `
    <div class='calendar-graph card'>
      <h2 v-if='created'>{{date.year}}</h2>
      <div>
        <div>
          <span>{{ l.mon }}</span>
          <span>{{ l.wed }}</span>
          <span>{{ l.fri }}</span>
        </div>
        <div>
          <span class='text'>{{ l.jan }}</span>
          <span class='text'>{{ l.feb }}</span>
          <span class='text'>{{ l.mar }}</span>
          <span class='text'>{{ l.apr }}</span>
          <span class='text'>{{ l.may }}</span>
          <span class='text'>{{ l.jun }}</span>
          <span class='text'>{{ l.jul }}</span>
          <span class='text'>{{ l.aug }}</span>
          <span class='text'>{{ l.sep }}</span>
          <span class='text'>{{ l.oct }}</span>
          <span class='text'>{{ l.nov }}</span>
          <span class='text'>{{ l.dec }}</span>
        </div>
        <div>
          <template v-if='created'>
            <template v-for='day in numberOfDaysUntilFirstMonday'>
              <dark-square></dark-square>
            </template>
            <template v-for='day in numberOfDaysInYear'>
              <square :date='returnDate()' :numberofactions='getNumberOfActionsWithTheSpecifiedDate(returnAndAddDate())' :l='l'></square>
            </template>
          </template>
        </div>
        <div>
          <span>{{ l.lessActions }}</span>
          <div style='width: 8px;display: inline-block'></div>
          <div class='square'></div>
          <div class='square one-action'></div>
          <div class='square four-actions'></div>
          <div class='square six-actions'></div>
          <div class='square nine-actions'></div>
          <div class='square twelve-actions'></div>
          <div style='width: 8px;display: inline-block'></div>
          <span>{{ l.moreActions }}</span>
        </div>
      </div>
    </div>
  `,
  methods: {
    returnDate(){
      let date = this.date.stringify()
      return date
    },
    returnAndAddDate(){
      let date = this.date.stringify()
      this.date.addDay(1)
      if (this.date.year == this.currentYear + 1){
        this.date.year = this.currentYear
        this.date.month = 1
        this.date.day = 1
      }
      return date
    },
    getNumberOfActionsWithTheSpecifiedDate(date){
      let acts = this.$root.user.actions
      let length = acts.length
      let numberOfActions = 0
      for (let i = 0;i < length;i++)
        if (acts[i].calendar && new DateM(acts[i].calendar.date).isEqual(new DateM(date)))
          numberOfActions += 1
      return numberOfActions
    },
  }
})
Vue.component('square', {
  props: {
    date: String,
    numberofactions: Number,
    l: Object
  },
  data(){
    return {
      d: false
    }
  },
  template: `
    <div :class='[isSelected() ? "selected-square" : "" , !d ? "square" : "", atLeastOneAction() ? "one-action": "", moreThanTwo() ? "four-actions": "", moreThanSix() ? "six-actions": "", moreThanNine() ? "nine-actions": "", moreThanTwelve() ? "twelve-actions": ""]' :data-title='date + " " + numberofactions + " " + l.actions' @click='$parent.$emit("dateselected",date)'></div>
  `,
  methods: {
    isSelected(){
      this.d = (this.date == this.$parent.$parent.date)
      return this.d
    },
    atLeastOneAction(){
      let n = this.numberofactions
      if (n > 0 && n < 4) return true
    },
    moreThanTwo(){
      let n = this.numberofactions
      if (n > 3 && n < 6) return true
    },
    moreThanSix(){
      let n = this.numberofactions
      if (n > 5 && n < 9) return true
    },
    moreThanNine(){
      let n = this.numberofactions
      if (n > 7 && n < 12) return true
    },
    moreThanTwelve(){
      let n = this.numberofactions
      if (n > 11) return true
    }
  }
})
Vue.component('dark-square', {
  template: `
    <div class='dark-square'></div>
  `
})
Vue.component('action-bar-option', {
  props: {
    icon: String,
    active: Boolean,
    title: String
  },
  template: `
    <i :class='[this.active ? "action-bar-active" : "", "" + icon + " icon-big act-bar-icon user-icon"]' @click='toggleOption' :data-title='title'></i>
  `,
  methods:{
    toggleOption(){
      if (this.active){
        this.active = false
        this.$emit('off')
      }
      else {
        this.active = true
        this.$emit('on')
      }
    },
    classIcon(){
      return '' + this.icon + 'icon-big user-icon'
    }
  }
})
Vue.component('text-box',{
  props: {
    placeholder: String,
    rows: Number,
    value: String
  },
  template: `
    <div class='text-box'>
      <span>{{placeholder}}</span>
      <textarea :rows='rows' v-model='value'>
      </textarea>
    </div>
  `,
  watch: {
    value: function(){
      this.$emit('change', this.value)
    }
  }
})
Vue.component('icon-selection', {
  props: {
    selected: String
  },
  template: `
    <div class='icon-selection'>
      <slot></slot>
    </div>
  `,
  watch: {
    selected(){
      this.$root.tempUser.action.tag = this.selected
    }
  }
})
Vue.component('icon-option',{
  props: {
    icon: String,
    option: String,
    title: String
  },
  template: `
    <div :class='{selected: selected}' @click='$parent.selected = option' :title='title'>
      <i :class='icon + " icon-extra-big"'></i>
    </div>
  `,
  computed: {
    selected(){
      return (this.option == this.$parent.selected) ? true : false
    }
  }
})
Vue.component('comp-option', {
  props: {
    compname: String
  },
  template: `
    {{selected}}
    <span :class='{selected: selected}' @click='$parent.selected = compname'><slot></slot></span>
  `,
  computed: {
    selected(){
      return (this.compname == this.$parent.selected) ? true : false
    }
  }
})
Vue.component('check-box', {
  props: {
    value: Boolean,
    placeholder: String
  },
  template: `
    <div class='checkbox' @click='$emit("change")'>
      <div>
        <i v-show='value' class='fa fa-check icon-extra-tiny'></i>
      </div>
      <span>{{placeholder}}</span>
    </div>
  `
})
Vue.component('faded-action-icon', {
  props: {
    icon: String
  },
  template: `
    <i :class='icon + " icon-big action-icon faded"'></i>
  `
})
Vue.component('massive-title',{
  template: `
    <h1 style='font-size:4em'><slot></slot></h1>
  `
})
Vue.component('double-icon', {
  props: {
    animation: String
  },
  data(){
    return {
      show: false
    }
  },
  mounted(){
    this.show = true
  },
  template: `
    <transition :name='animation'>
      <div class='double-icon' v-if='show'>
        <slot></slot>
      </div>
    </transition>
  `
})
