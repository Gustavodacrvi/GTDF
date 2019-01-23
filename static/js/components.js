
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
      <div class='formElement' v-show='$parent.show' :tabindex='tabindex'>
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
    tabindex: String
  },
  template: `
    <div class='form-input centralizeContent'>
      <input :name='name' autocomplete='off' class='passwordField' type='password' autocomplete='off' :placeholder='placeholder' :tabindex='tabindex' />
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
    icongroups: Boolean,
    user: Object,
    dropdowns: Object
  },
  data(){
    return {
      func: Function,
      sent: false,
      changed: Boolean,
      first: true,
      oldids: Array,
      isEqual(arr1, arr2){
        let length = arr1.length
        for (let i = 0;i < length;i++)
          if (arr1[i] != arr2[i])
            return false
        return true
      }
    }
  },
  template: `
  <div>
    <div>
      <action-bar>
        <action-bar-icon icon='fa fa-plus' id='addAction' tag='basket' @click='openUserForm'></action-bar-icon>
      </action-bar>
      <h1>Non project actions</h1>
      <template v-if='user'>
        <draggable v-model='user.actions' :options="{handle:'.draggable'}">
          <transition-group name='flip-list' tag='div'>
            <action v-for='action in user.actions' v-if='action.tag == "basket"' v-if='!action.projectId && action.projectId != 0' :title='action.title' :description='action.description' :key='action.id' :id='action.id' :dropdown='dropdowns[action.id]' :icongroup='icongroups' @changed-dropdown='changeDropdownState'>
            </action>
          </transition-group>
        </draggable>
        <h1>Project actions</h1>
        <draggable v-model='user.actions' :options="{handle:'.draggable'}">
          <transition-group name='flip-list' tag='div'>
          <template v-for='project in user.projects'>
            <project-action v-for='i in user.projects[project.id].actions' :title='user.actions[i].title' :description='user.actions[i].description' :key='user.actions[i].id' :id='user.actions[i].id' :dropdown='dropdowns[user.actions[i].id]' :icongroup='icongroups' :projectId='user.actions[i].projectId'>
            </project-action>
        </template>
          </transition-group>
        </draggable>
      </template>
      <div class='space'></div>
    </div>
  </div>
  `,
  methods: {
    openUserForm(id){
      this.$emit('openform', id)
    },
    calculateIds(){
      let ids = []
      let length = this.user.actions.length
      for (let i = 0;i < length;i++)
        ids.push(this.user.actions[i].id)
      return ids
    },
    setHttpTimeOut(seconds){
      this.func = setTimeout(() => {
        let ids = this.calculateIds()
        if (!this.first)
          this.changed = !this.isEqual(ids, this.oldids)
        else
          this.changed = true
          this.first = false
        this.oldids = ids
        ids.push(this.changed)
        this.$emit('rearrange', ids)
        this.sent = false
      }, seconds)
      this.sent = true
    },
    changeDropdownState(data){
      this.$emit('dropdown-state', {state: data.state, id: data.id})
    }
  },
  watch: {
    'user.actions': function(){
      // wait some seconds before sending the https request
      let seconds = 3000
      if (!this.sent){
        this.setHttpTimeOut(seconds)
      } else {
        clearTimeout(this.func)
        this.setHttpTimeOut(seconds)
      }
    }
  }
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
    event: String
  },
  template: `
    <i :class='icon + " icon-big user-icon action-icon"' @click='$parent.$emit(event)'></i>
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
      <div class='card-shadow form action-form' v-show='display()'>
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
  props: {
    dropdowns: Object,
    icongroups: Boolean,
    user: Object,
    projectdropdowns: Object
  },
  data() {
    return {
      funcp: Function,
      sent: false,
      changed: Boolean,
      oldids: Array,
      first: true,
      isEqual(arr1, arr2){
        let length = arr1.length
        for (let i = 0;i < length;i++)
          if (arr1[i] != arr2[i])
            return false
        return true
      }
    }
  },
  template: `
  <div>
    <div>
      <action-bar>
        <action-bar-icon icon='fa fa-plus' id='addProject' tag='projects' @click='openUserForm'></action-bar-icon>
      </action-bar>
      <template v-if='user'>
      <draggable v-model='user.projects' :options="{handle:'.draggable'}">
        <transition-group name='flip-list' tag='div'>
          <project v-for='prj in user.projects' :title='prj.title' :icongroup='icongroups' :dropdowns='dropdowns' :dropdown='projectdropdowns[prj.id]' :id='prj.id' :key='prj.id' :user='user'></project>
        </transition-group>
      </draggable>
      </template>
    </div>
  </div>
  `,
  methods: {
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
    setHttpTimeOutProject(seconds){
      this.funcp = setTimeout(() => {
        let ids = this.calculateProjectIds()
        if (!this.first)
          this.changed = !this.isEqual(ids, this.oldids)
        else
          this.changed = true
          this.first = false
        this.oldids = ids
        ids.push(this.changed)
        this.$emit('rearrangeproject', ids)
        this.sent = false
      }, seconds)
      this.sent = true
    },
  },
  watch: {
    'user.projects'(){
      // wait some seconds before sending the https request
      let seconds = 3000
      if (!this.sent){
        this.setHttpTimeOutProject(seconds)
      } else {
        clearTimeout(this.funcp)
        this.setHttpTimeOutProject(seconds)
      }
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
    user: Object
  },
  template: `
    <div class='project' :key='id'>
      <div class='card'>
        <div @click='dropdown = !dropdown'>
          <i class='fa fa-list icon-tiny draggable'></i>
          <span>{{ title }}</span>
        </div>
        <div>
          <icon-group :show='icongroup' @delete='deleteProject' @edit='editProject' @project='addActionToProject'>
            <action-icon icon='fa fa-times' event='delete'></action-icon>
            <action-icon icon='fa fa-edit' event='edit'></action-icon>
            <action-icon icon='fa fa-plus' event='project'></action-icon>
          </icon-group>
        </div>
      </div>
      <transition name='pop-long'>
        <div v-show='dropdown'>
          <div>
            <draggable v-model='user.actions' :options="{handle:'.draggable'}">
              <transition-group name='flip-list' tag='div'>
                <project-action v-for='i in user.projects[this.id].actions' :title='user.actions[i].title' :description='user.actions[i].description' :key='user.actions[i].id' :id='user.actions[i].id' :dropdown='dropdowns[user.actions[i].id]' :icongroup='icongroup' :projectId='user.actions[i].projectId'>
                </project-action>
              </transition-group>
            </draggable>
          </div>
        </div>
      </transition>
    </div>
  `,
  methods: {
    deleteProject(){
      let rt = this.$root
      let pro = rt.user.projects

      rt.removeActionsFromProject(this.id)
      rt.user.projects.splice(this.id, 1)
      rt.resetIds(pro)
      if (!this.$root.guest){
        this.$root.POSTrequest('/delete-project', 'id='+this.id)
      }
    },
    openActionForm(id){
      this.$root.openUserForm({id: '' + id})
      this.$root.getDataFromProject(this.$root.user.projects[this.id])
    },
    editProject(){

    },
    addActionToProject(){
      this.openActionForm('addActionToProject')
    },
  },
})
Vue.component('project-action', {
  props: {
    title: String,
    description: String,
    icongroup: Boolean,
    dropdown: false,
    id: Number,
    projectId: Number
  },
  template: `
    <div class='action' :key='id'>
      <div class='card'>
        <div @click='dropdown = !dropdown'>
          <i class='fa fa-list icon-tiny draggable'></i>
          <span> {{ title }}</span>
        </div>
        <div>
          <icon-group :show='icongroup' @delete='deleteProjectAction' @edit='editAction' @editTag='editActionTag' @project='manajeProject'>
            <action-icon icon='fa fa-times' event='delete'></action-icon>
            <action-icon icon='fa fa-edit' event='edit'></action-icon>
            <action-icon icon='fa fa-tag' event='editTag'></action-icon>
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
    deleteProjectAction(){
      let rt = this.$root
      let act = rt.user.actions
      let pro = rt.user.projects

      let j = rt.getIndexOfProjectActionThatHasTheGivenActionId(this.projectId, this.id)
      pro[this.projectId].actions.splice(j, 1)
      act.splice(this.id, 1)

      let oldActionIds = rt.getIds(act)
      rt.resetIds(act)
      rt.updateProjectActionIds(oldActionIds)
      if (!this.$root.guest)
        this.$root.POSTrequest('/delete-project-action', 'id=' + this.id)
    },
    openActionForm(id){
      this.$root.openUserForm({id: '' + id})
      this.$root.getDataFromAction(this.$root.user.actions[this.id])
    },
    editAction(){
      this.openActionForm('editAction')
    },
    editActionTag(){
      this.openActionForm('editTag')
    },
    manajeProject(){
      this.openActionForm('actionToProject')
    }
  },
  watch: {
    dropdown(){
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
    id: Number
  },
  template: `
    <div class='action' :key='id'>
      <div class='card'>
        <div @click='dropdown = !dropdown'>
          <i class='fa fa-list icon-tiny draggable'></i>
          <span> {{ title }}</span>
        </div>
        <div>
          <icon-group :show='icongroup' @delete='deleteAction' @edit='editAction' @editTag='editActionTag' @project='manajeProject'>
            <action-icon icon='fa fa-times' event='delete'></action-icon>
            <action-icon icon='fa fa-edit' event='edit'></action-icon>
            <action-icon icon='fa fa-tag' event='editTag'></action-icon>
            <action-icon icon='fa fa-project-diagram' event='project'></action-icon>
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
    deleteAction(){
      let data = this.$root
      let act = data.user.actions

      act.splice(this.id, 1)
    
      let oldActionIds = data.getIds(act)
      data.resetIds(act)
      data.updateProjectActionIds(oldActionIds)

      if (!this.$root.guest)
        this.$root.POSTrequest('/delete-action', 'id=' + this.id)
    },
    openActionForm(id){
      this.$root.openUserForm({id: '' + id})
      this.$root.getDataFromAction(this.$root.user.actions[this.id])
    },
    editAction(){
      this.openActionForm('editAction')
    },
    editActionTag(){
      this.openActionForm('editTag')
    },
    manajeProject(){
      this.openActionForm('actionToProject')
    }
  },
  watch: {
    dropdown(){
      this.$emit('changed-dropdown', {state: this.dropdown, id: this. id})
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
    option: String
  },
  template: `
    <div :class='{selected: selected}' @click='$parent.selected = option'>
      <i :class='icon + " icon-extra-big"'></i>
    </div>
  `,
  computed: {
    selected(){
      return (this.option == this.$parent.selected) ? true : false
    }
  }
})
Vue.component('comp-selector', {
  props: {
    selected: undefined
  },
  template: `
    <div class='comp-selector'>
      <div>
        <slot></slot>
      </div>
      <div>
        <component :is='selected'></component>
      </div>
    </div>
  `
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
Vue.component('create-project', {
  template: `
    <div class='create-project'>
      <div style='height:30px'></div>
      <form-element animation='pop2'>
        <check-box :value='$root.tempUser.project.delete' @change='invertValue' placeholder='delete action'></check-box>
      </form-element>
      <div class='centralizeContent'>
        <form-button @click='$root.transformActionToProject'>Create project</form-button>
      </div>
    </div>
  `,
  methods: {
    invertValue(){
      this.$root.tempUser.project.delete = !this.$root.tempUser.project.delete
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