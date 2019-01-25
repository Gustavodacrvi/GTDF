
class DateM {
  constructor(date_str){
      let splited = date_str.split('/')
      this.day = parseInt(splited[0])
      this.month = parseInt(splited[1])
      this.year = parseInt(splited[2])
  }
  static isValidDate(date_str){
      let splited = date_str.split('/')
      let day = parseInt(splited[0])
      let month = parseInt(splited[1])
      let year = parseInt(splited[2])

      if (isNaN(day) || isNaN(month) || isNaN(year))
          return false
      if (splited.length - 1 != 2)
          return false
      
      if (month > 12 || month <= 0 || day <= 0 || year < 1)
          return false
      
      if (month == 2){
          if (DateM.isLeapYear(year) && day > 29)
              return false
          if (!DateM.isLeapYear(year) && day > 28)
              return false 
      } else if (day > DateM.getDaysInMonth(month))
          return false
      return true
  }
  static isLeapYear(year){
      if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0))
          return true
      return false
  }
  static getDaysInMonth(month, leap_year_bool){
      if (month == 1) return 31
      if (month == 3) return 31
      if (month == 4) return 30
      if (month == 5) return 31
      if (month == 6) return 30
      if (month == 7) return 31
      if (month == 8) return 31
      if (month == 9) return 30
      if (month == 10) return 31
      if (month == 11) return 30
      if (month == 12) return 31
      if (month == 2 && leap_year_bool) return 29
      if (month == 2 && !leap_year_bool) return 28
  }
  static getCurrentDay(){
      let date = new Date()
      let datem = new DateM('' + date.getDate() + '/' + (parseInt(date.getMonth()) + parseInt(1)) + '/' + date.getFullYear())
      return datem
  }
  getWeekDay(){
      let a = Math.floor((14 - this.month) / 12)
      let y = this.year - a
      let m = this.month + 12*a - 2
      return (this.day + y + Math.floor(y/4) - Math.floor(y/100) + Math.floor(y/400) + Math.floor((31*m)/12)) % 7
  } 
  isEqual(date_obj){
      if (typeof(date_obj) == 'string'){
          date_obj = new DateM(date_obj)
      } 
      if (date_obj.day != this.day)
          return false
      if (date_obj.month != this.month)
          return false
      if (date_obj.year != this.year)
          return false
      return true
  }
  comesAfter(date_obj){
      if (this.year > date_obj.year) return true
      if (this.year == date_obj.year){
          if (this.month > date_obj.month) return true
          if (this.month == date_obj.month){
              if (this.day > date_obj.day) return true
              if (this.day == date_obj.day) return false
          }
      }
      return false
  }
  comesBefore(date_obj){
      if (!this.comesAfter(date_obj) && !this.isEqual(date_obj))
          return true
      return false
  }
  getCopy(){
      let datem = new DateM('' + this.day + '/' + this.month + '/' + this.year)
      return datem
  }

  stringify(){
      return '' + this.day + '/' + this.month + '/' + this.year
  }

  addDay(int){
      for (let i = 0;i < int;i++){
          if (this.day + 1 > DateM.getDaysInMonth(this.month, DateM.isLeapYear(this.year))){
              this.month += 1
              this.day = 1
          } else 
              this.day += 1
      }
  }
  addMonth(int){
      for (let i = 0;i < int;i++){
          if (this.month + 1 > 12){
              this.year += 1
              this.month = 1
          } else 
              this.month += 1
      }
  }
  addYear(int){
      this.year += int
  }

  subtractYear(int){
      this.year -= int
  }
  subtractMonth(int){
      for (let i = 0;i < int;i++){
          if (this.month - 1 == 0){
              this.year -= 1
              this.month = 12
          } else 
              this.month -= 1
      }
  }
  subtractDay(int){
      for (let i = 0;i < int;i++){
          if (this.day - 1 == 0){
              this.subtractMonth(1)
              this.day = DateM.getDaysInMonth(this.month, this.year)
          } else 
              this.day -= 1
      }
  }

  diference(date_obj){
      return new DateM('' + (this.day - date_obj.day) + '/' + (this.month - date_obj.month) + '/' + (this.year - date_obj.year))
  }
}

class TimeM {
  constructor(time_str){
      let splited = time_str.split(':')
      this.hour = parseInt(splited[0])
      this.min = parseInt(splited[1])
  }
  static isValidTime(time_str){
      let splited = time_str.split(':')
      let hour = parseInt(splited[0])
      let min = parseInt(splited[1])

      if (isNaN(hour) || isNaN(min))
          return false
      if (splited.length - 1 != 1)
          return false
      
      if (hour > 23 || hour < 0 || min < 0 || min > 59)
          return false
      return true
  }
  static getCurrentTime(){
      let date = new Date()
      return new TimeM('' + date.getHours() + ':' + date.getMinutes())
  }

  isEqual(time_obj){
      if (this.hour != time_obj.hour)
          return false
      if (this.min != time_obj.min)
          return false
      return true
  }
  comesBefore(time_obj){
      if (this.hour > time_obj.hour)
          return false
      if (this.hour == time_obj.hour){
          if (this.min >= time_obj.min){
              return false
          }
          if (this.min < time_obj.min)
              return true
      }
      return true
  }
  comesAfter(time_obj){
      if (this.hour < time_obj.hour)
          return false
      if (this.hour == time_obj.hour){
          if (this.min <= time_obj.min){
              return false
          }
          if (this.min > time_obj.min)
              return true
      }
      return true
  }

  sync(){
      let date = new Date()
      let init = () => {this.syncId = setInterval(() => {this.addMin(1)}, 60000)}
      setTimeout(() => {
          this.hour = date.getHours()
          this.min = date.getMinutes()
          this.addMin(1)
          init()
      }, 60000 - date.getSeconds() * 1000)
  }
  async(){
      clearInterval(this.syncId)
  }

  getCopy(){
      let timem = new TimeM('' + this.hour + ':' + this.min)
      return timem
  }

  stringify(){
      return '' + this.hour + ':' + this.min
  }

  addHour(int){
      for (let i = 0;i < int;i){
          if (this.hour + 1 == 24)
              this.hour = 0
          else
              this.hour += 1
      }
  }
  addMin(int){
      for (let i = 0;i < int;i++){
          if (this.min + 1 > 59){
              this.min = 0
              this.hour += 1
          } else {
              this.min += 1
          }
      }
  }
  subtractHour(int){
      for (let i = 0;i < int;i){
          if (this.hour - 1 < 0)
              this.hour = 23
          else
              this.hour -= 1
      }
  }
  subtractMin(int){
      for (let i = 0;i < int;i++){
          if (this.min -1 < 0){
              this.min = 59
              this.hour -= 1
          } else {
              this.min -= 1
          }
      }
  }

  diference(time_obj){
      return new TimeM('' + (this.hour - time_obj.hour) + ':' + (this.min - time_obj.min))
  }
}


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
  template: `
  <div>
    <div>
      <action-bar>
        <action-bar-icon icon='fa fa-plus' id='addAction' tag='basket' @click='openUserForm'></action-bar-icon>
      </action-bar>
      <h2>Non project actions</h2>
      <template v-if='!hasTagAction("basket")'>
        <span class='faded'>Your non project actions with the tag "basket" will be shown here.</br></br>Click on the plus icon to add an action.</span> 
      </template>
      <template v-if='user'>
        <draggable v-model='user.actions' :options="{handle:'.draggable'}">
          <transition-group name='flip-list' tag='div'>
            <action v-for='action in user.actions' v-if='!action.projectId && action.projectId != 0 && action.tag == "basket"' :title='action.title' :description='action.description' :key='action.id' :id='action.id' :dropdown='dropdowns[action.id]' :icongroup='icongroups' @changed-dropdown='changeDropdownState'>
            </action>
          </transition-group>
        </draggable>
        <h2>Project actions</h2>
        <template v-if='!thereIsAtLeastOneProjectAction("basket")'>
          <span class='faded'>Your project actions with the tag "basket" will be shown here.</br></br>Go to the project section to create projects.</span>
        </template>
        <draggable v-model='user.actions' :options="{handle:'.draggable'}">
          <transition-group name='flip-list' tag='div'>
          <template v-for='project in user.projects'>
            <project-action v-for='i in user.projects[project.id].actions' v-if='user.actions[i].tag == "basket"' :title='user.actions[i].title' :description='user.actions[i].description' :key='user.actions[i].id' :id='user.actions[i].id' :dropdown='dropdowns[user.actions[i].id]' :icongroup='icongroups' :projectId='user.actions[i].projectId' :showprojectname='true' @changed-dropdown='changeDropdownState'>
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
    hasTagAction(tag){
      let act = this.user.actions
      let length = act.length
      for (let i = 0;i < length;i++)
        if (act[i].tag == tag && !act[i].projectId && act[i].projectId != 0)
          return true
      return false
    },
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
    thereIsAtLeastOneProjectAction(tag){
      let act = this.$root.user.actions
      let length = act.length
      for (let i = 0;i < length;i++)
        if (act[i].projectId || act[i].projectId == 0)
          if (act[i].tag == tag)
            return true
      return false
    },
    changeDropdownState(data){
      this.$emit('dropdown-state', {state: data.state, id: data.id})
    }
  },
  watch: {
    'user.actions': function(){
      let ids = this.calculateIds()
      this.$emit('rearrange', ids)
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
Vue.component('datetime-form', {
  props: {
    date: String
  },
  data(){
    return {
      time: '',
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
  methods: {
    analise(){
      this.validDate = DateM.isValidDate(this.date)
      this.validTime = TimeM.isValidTime(this.time)
      if (this.time == '') this.validTime = true
      this.$emit('update', {date: this.validDate, time: this.validTime})
    }
  },
  watch: {
    date(){
      this.analise()
    },
    time(){
      this.analise()
    }
  }
})
Vue.component('date', {

})
Vue.component('calendar', {
  props: {
    user: Object,
    icongroups: Boolean,
    dropdowns: Boolean
  },
  data() {
    return {
      date: ''
    }
  },
  template: `
  <div>
    <div>
      <graph @dateselected='selectDate'>
      </graph>
      <calendar-action-bar>
        <action-bar-icon icon='fa fa-plus' id='addTimedAction' tag='calendar' @click='openUserForm'></action-bar-icon>
        <input class='calendar-input' v-model='date'></input>
      </calendar-action-bar>
      <h2>Non project actions</h2>
      <template v-if='!thereIsAtLeastOneNonProjectTimedActionWithTheSelectedDate()'>
        <span class='faded'>Your non project actions with the "calendar" tag with the date {{date}} will be shown here.</br></br>Click on the plus icon to add an action with the date {{date}}.</span>
      </template>
      <draggable v-model='user.actions' :options="{handle:'.draggable'}">
          <transition-group name='flip-list' tag='div'>
            <timed-action v-for='action in user.actions' v-if='action.calendar && action.calendar.date == date' :title='action.title' :description='action.description' :key='action.id' :id='action.id' :icongroup='icongroups' :dropdown='action.id'></timed-action>
          </transition-group>
        </draggable>
    </div>
  </div>
  `,
  methods: {
    selectDate(date){
      this.date = date
    },
    openUserForm(id){
      this.$emit('openform', id)
    },
    thereIsAtLeastOneNonProjectTimedActionWithTheSelectedDate(){
      let act = this.user.actions
      let selectedDate = this.date
      let length = act.length
      for (let i = 0;i < length;i++)
        if (!act[i].projectId && act[i].projectId != 0)
          if (act[i].calendar && act[i].calendar.date == selectedDate)
            return true
      return false
    }
  },
  watch: {
    date(){
      this.$root.tempUser.action.calendar.date = this.date
    }
  }
})
Vue.component('timed-action', {
  props: {
    title: String,
    description: String,
    id: Number,
    icongroup: Boolean,
    dropdown: Boolean
  },
  template: `
    <div class='action' :key='id'>
      <div class='card'>
        <div @click='dropdown = !dropdown'>
          <i class='fa fa-list icon-tiny draggable'></i>
          <span> {{ title }}</span>
        </div>
        <div>
          <icon-group :show='icongroup'>
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
  `
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
Vue.component('calendar-action-bar', {
  template: `
    <div class='calendar-action-bar'><slot></slot></div>
  `
})
Vue.component('graph', {
  data(){
    return {
      numberOfDaysInYear: 365,
      created: false
    }
  },
  mounted(){
    this.date = DateM.getCurrentDay()
    this.currentDate = this.date.stringify()

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
          <span>Mon</span>
          <span>Wed</span>
          <span>Fri</span>
        </div>
        <div>
          <span class='text'>Jan</span>
          <span class='text'>Feb</span>
          <span class='text'>Mar</span>
          <span class='text'>Apr</span>
          <span class='text'>May</span>
          <span class='text'>Jun</span>
          <span class='text'>Jul</span>
          <span class='text'>Aug</span>
          <span class='text'>Sep</span>
          <span class='text'>Oct</span>
          <span class='text'>Nov</span>
          <span class='text'>Dec</span>
        </div>
        <div>
          <template v-if='created'>
            <template v-for='day in numberOfDaysUntilFirstMonday'>
              <dark-square></dark-square>
            </template>
            <template v-for='day in numberOfDaysInYear'>
              <square :date='returnAndAddDate()'></square>
            </template>
          </template>
        </div>
      </div>
      <div>
      </div>
    </div>
  `,
  methods: {
    returnAndAddDate(){
      let date = this.date.stringify()
      this.date.addDay(1)
      return date
    }
  }
})
Vue.component('square', {
  props: {
    date: String
  },
  data(){
    return {
      d: false
    }
  },
  template: `
    <div :class='{"selected-square": isSelected(), square: !d}' :data-title='date' @click='$parent.$emit("dateselected",date)'></div>
  `,
  methods: {
    isSelected(){
      this.d = (this.date == this.$parent.$parent.date)
      return this.d
    }
  }
})
Vue.component('dark-square', {
  template: `
    <div class='dark-square'></div>
  `
})
Vue.component('next-actions', {
  props: {
    icongroups: Boolean,
    user: Object,
    dropdowns: Object
  },
  template: `
  <div>
    <div>
      <action-bar>
        <action-bar-icon icon='fa fa-plus' id='addAction' tag='nextAction' @click='openUserForm'></action-bar-icon>
      </action-bar>
      <h2>Non project actions</h2>
      <template v-if='!hasTagAction("nextAction")'>
        <span class='faded'>Your non project actions with the tag "next action" will be shown here.</br></br>Click on the plus icon to add an action.</span> 
      </template>
      <template v-if='user'>
        <draggable v-model='user.actions' :options="{handle:'.draggable'}">
          <transition-group name='flip-list' tag='div'>
            <action v-for='action in user.actions' v-if='!action.projectId && action.projectId != 0 && action.tag == "nextAction"' :title='action.title' :description='action.description' :key='action.id' :id='action.id' :dropdown='dropdowns[action.id]' :icongroup='icongroups' @changed-dropdown='changeDropdownState'>
            </action>
          </transition-group>
        </draggable>
        <h2>Project actions</h2>
        <template v-if='!thereIsAtLeastOneProjectAction("nextAction")'>
          <span class='faded'>Your project actions with the tag "next action" will be shown here.</br></br>Go to the project section to create projects.</span>
        </template>
        <draggable v-model='user.actions' :options="{handle:'.draggable'}">
          <transition-group name='flip-list' tag='div'>
          <template v-for='project in user.projects'>
            <project-action v-for='i in user.projects[project.id].actions' v-if='user.actions[i].tag == "nextAction"' :title='user.actions[i].title' :description='user.actions[i].description' :key='user.actions[i].id' :id='user.actions[i].id' :dropdown='dropdowns[user.actions[i].id]' :icongroup='icongroups' :projectId='user.actions[i].projectId' :showprojectname='true' @changed-dropdown='changeDropdownState'>
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
    hasTagAction(tag){
      let act = this.user.actions
      let length = act.length
      for (let i = 0;i < length;i++)
        if (act[i].tag == tag && !act[i].projectId && act[i].projectId != 0)
          return true
      return false
    },
    thereIsAtLeastOneProjectAction(tag){
      let act = this.$root.user.actions
      let length = act.length
      for (let i = 0;i < length;i++)
        if (act[i].projectId || act[i].projectId == 0)
          if (act[i].tag == tag)
            return true
      return false
    },
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
    changeDropdownState(data){
      this.$emit('dropdown-state', {state: data.state, id: data.id})
    }
  },
  watch: {
    'user.actions': function(){
      let ids = this.calculateIds()
      this.$emit('rearrange', ids)
    }
  }
})
Vue.component('projects', {
  props: {
    dropdowns: Object,
    icongroups: Boolean,
    user: Object,
    projectdropdowns: Object
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
      <template v-if='!thereIsAtLeastOneProject'>
        <span class='faded'>All of your projects and project actions will be shown here.</br></br>Click on the plus icon to create a project</span>
      </template>
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
    calculateIds(){
      let ids = []
      let length = this.user.projects.length
      for (let i = 0;i < length;i++)
        ids.push(this.user.projects[i].id)
      return ids
    },
  },
  watch: {
    'user.projects'(){
      let ids = this.calculateIds()
      this.$emit('rearrangeproject', ids)
    }
  },
  computed: {
    thereIsAtLeastOneProject(){
      return (this.$root.user.projects.length > 0)
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
                <project-action v-for='action in user.actions' v-if='isOnProject(action.id)' :title='action.title' :description='action.description' :key='action.id' :id='action.id' :dropdown='dropdowns[action.id]' :icongroup='icongroup' :projectId='action.projectId' @changed-dropdown='changeDropdownState' :showtagicon='true' :showprojectname='false' :tag='action.tag'>
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
    isOnProject(actionId){
      return this.user.projects[this.id].actions.some((el) => {
        return el == actionId
      })
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
    tag: String
  },
  template: `
    <div class='action' :key='id'>
      <div class='card'>
        <div @click='dropdown = !dropdown'>
          <i class='fa fa-list icon-tiny draggable'></i>
          <span v-show='showprojectname'> {{ getprojectname }}<span class='faded'>|</span> {{ title }}</span>
          <span v-show='!showprojectname'> {{ title }}</span>
        </div>
        <div>
          <icon-group :show='icongroup' @delete='deleteProjectAction' @edit='editAction' @editTag='editActionTag' @project='manajeProject' @removeFromProject='removeActionFromProject'>
            <action-icon icon='fa fa-times' event='delete'></action-icon>
            <action-icon icon='fa fa-edit' event='edit'></action-icon>
            <action-icon icon='fa fa-tag' event='editTag'></action-icon>
            <action-icon icon='fa fa-sign-out-alt' event='removeFromProject'></action-icon>
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
    removeActionFromProject(){
      let rt = this.$root

      rt.removeActionFromProject(this.id)
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
Vue.component('maybe', {
  props: {
    icongroups: Boolean,
    user: Object,
    dropdowns: Object
  },
  template: `
  <div>
    <div>
      <action-bar>
        <action-bar-icon icon='fa fa-plus' id='addAction' tag='maybe' @click='openUserForm'></action-bar-icon>
      </action-bar>
      <h2>Non project actions</h2>
      <template v-if='!hasTagAction("maybe")'>
        <span class='faded'>Your non project actions with the tag "someday/maybe" will be shown here.</br></br>Click on the plus icon to add an action.</span> 
      </template>
      <template v-if='user'>
        <draggable v-model='user.actions' :options="{handle:'.draggable'}">
          <transition-group name='flip-list' tag='div'>
            <action v-for='action in user.actions' v-if='!action.projectId && action.projectId != 0 && action.tag == "maybe"' :title='action.title' :description='action.description' :key='action.id' :id='action.id' :dropdown='dropdowns[action.id]' :icongroup='icongroups' @changed-dropdown='changeDropdownState'>
            </action>
          </transition-group>
        </draggable>
        <h2>Project actions</h2>
        <template v-if='!thereIsAtLeastOneProjectAction("maybe")'>
          <span class='faded'>Your project actions with the tag "someday/maybe" will be shown here.</br></br>Go to the project section to create projects.</span>
        </template>
        <draggable v-model='user.actions' :options="{handle:'.draggable'}">
          <transition-group name='flip-list' tag='div'>
          <template v-for='project in user.projects'>
            <project-action v-for='i in user.projects[project.id].actions' v-if='user.actions[i].tag == "maybe"' :title='user.actions[i].title' :description='user.actions[i].description' :key='user.actions[i].id' :id='user.actions[i].id' :dropdown='dropdowns[user.actions[i].id]' :icongroup='icongroups' :projectId='user.actions[i].projectId' :showprojectname='true' @changed-dropdown='changeDropdownState'>
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
    hasTagAction(tag){
      let act = this.user.actions
      let length = act.length
      for (let i = 0;i < length;i++)
        if (act[i].tag == tag && !act[i].projectId && act[i].projectId != 0)
          return true
      return false
    },
    thereIsAtLeastOneProjectAction(tag){
      let act = this.$root.user.actions
      let length = act.length
      for (let i = 0;i < length;i++)
        if (act[i].projectId || act[i].projectId == 0)
          if (act[i].tag == tag)
            return true
      return false
    },
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
    changeDropdownState(data){
      this.$emit('dropdown-state', {state: data.state, id: data.id})
    }
  },
  watch: {
    'user.actions': function(){
      let ids = this.calculateIds()
      this.$emit('rearrange', ids)
    }
  }
})
Vue.component('waiting', {
  props: {
    icongroups: Boolean,
    user: Object,
    dropdowns: Object
  },
  template: `
  <div>
    <div>
      <action-bar>
        <action-bar-icon icon='fa fa-plus' id='addAction' tag='waiting' @click='openUserForm'></action-bar-icon>
      </action-bar>
      <h2>Non project actions</h2>
      <template v-if='!hasTagAction("waiting")'>
        <span class='faded'>Your non project actions with the tag "waiting" will be shown here.</br></br>Click on the plus icon to add an action.</span> 
      </template>
      <template v-if='user'>
        <draggable v-model='user.actions' :options="{handle:'.draggable'}">
          <transition-group name='flip-list' tag='div'>
            <action v-for='action in user.actions' v-if='!action.projectId && action.projectId != 0 && action.tag == "waiting"' :title='action.title' :description='action.description' :key='action.id' :id='action.id' :dropdown='dropdowns[action.id]' :icongroup='icongroups' @changed-dropdown='changeDropdownState'>
            </action>
          </transition-group>
        </draggable>
        <h2>Project actions</h2>
        <template v-if='!thereIsAtLeastOneProjectAction("waiting")'>
          <span class='faded'>Your project actions with the tag "waiting" will be shown here.</br></br>Go to the project section to create projects.</span>
        </template>
        <draggable v-model='user.actions' :options="{handle:'.draggable'}">
          <transition-group name='flip-list' tag='div'>
          <template v-for='project in user.projects'>
            <project-action v-for='i in user.projects[project.id].actions' v-if='user.actions[i].tag == "waiting"' :title='user.actions[i].title' :description='user.actions[i].description' :key='user.actions[i].id' :id='user.actions[i].id' :dropdown='dropdowns[user.actions[i].id]' :icongroup='icongroups' :projectId='user.actions[i].projectId' :showprojectname='true' @changed-dropdown='changeDropdownState'>
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
    hasTagAction(tag){
      let act = this.user.actions
      let length = act.length
      for (let i = 0;i < length;i++)
        if (act[i].tag == tag && !act[i].projectId && act[i].projectId != 0)
          return true
      return false
    },
    openUserForm(id){
      this.$emit('openform', id)
    },
    thereIsAtLeastOneProjectAction(tag){
      let act = this.$root.user.actions
      let length = act.length
      for (let i = 0;i < length;i++)
        if (act[i].projectId || act[i].projectId == 0)
          if (act[i].tag == tag)
            return true
      return false
    },
    calculateIds(){
      let ids = []
      let length = this.user.actions.length
      for (let i = 0;i < length;i++)
        ids.push(this.user.actions[i].id)
      return ids
    },
    changeDropdownState(data){
      this.$emit('dropdown-state', {state: data.state, id: data.id})
    }
  },
  watch: {
    'user.actions': function(){
      let ids = this.calculateIds()
      this.$emit('rearrange', ids)
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
Vue.component('select-option', {
  props: {
    name: String,
    id: Number
  },
  template: `
    <div :class='{"option-selected": selected}' @click='select'>
      <span>{{name}}</span>
    </div>
  `,
  methods: {
    select(){
      this.$parent.selected = this.name
      this.$parent.id = this.id
      this.$parent.openedDropdown = false
    }
  },
  computed: {
    selected(){
      return this.$parent.selected == this.name
    }
  }
})
Vue.component('option-selection', {
  props: {
    selected: String
  },
  data(){
    return {
      openedDropdown: false,
      id: Number
    }
  },
  template: `
    <div class='option-selection' @mouseleave='openedDropdown = false' @mouseover='openedDropdown = true'>
      <span>{{selected}}</span>
        <div v-show='openedDropdown' class='card-shadow'>
          <slot></slot>
        </div>
    </div>
  `,
  watch: {
    selected(){
      this.$emit('change', {name: this.selected, id: this.id})
    }
  }
})
Vue.component('comp-selector', {
  props: {
    selected: undefined,
    user: Object,
    id: undefined
  },
  data(){
    return {
      selected2: 'select a project'      
    }
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
  `,
  watch: {
    select(){
      this.$emit('change', this.selected)
    }
  }
})
Vue.component('create-project', {
  data(){
    return {
      show: true
    }
  },
  template: `
    <div class='create-project'>
      <div style='height:30px'></div>
      <form-element animation='pop2'>
        <span>Create a project with the same title as this action.</span>
      </form-element>
      <form-element animation='pop3'>
        <check-box :value='$root.tempUser.project.delete' @change='invertValue' placeholder='delete action'></check-box>
      </form-element>
      <form-element class='centralizeContent' animation='pop4'>
        <form-button @click='$root.transformActionToProject'>Create project</form-button>
      </form-element>
    </div>
  `,
  methods: {
    invertValue(){
      this.$root.tempUser.project.delete = !this.$root.tempUser.project.delete
    }
  }
})
Vue.component('add-to-project', {
  data(){
    return {
      show: true
    }
  },
  template: `
    <div class='create-project'>
      <div style='height:30px'></div>
      <form-element animation='pop2'>
        <span>Add this action to a project.</span>
      </form-element>
      <form-element animation='pop3'>
        <option-selection :selected='$parent.selected2' @change='(v) => {this.$parent.selected2 = v.name;this.$parent.id = v.id}'>
          <select-option v-for='project in $parent.user.projects' :name='project.title' :id='project.id'></select-option>
        </option-selection>
      </form-element>
      <form-element class='centralizeContent' animation='pop4'>
        <form-button @click='addActionToProject'>Create project</form-button>
      </form-element>
    </div>
  `,
  methods: {
    addActionToProject() {
      let rt = this.$root
      let dt = rt.tempUser.action
      let p = this.$parent
      rt.user.actions[dt.id].projectId = p.id
      rt.user.projects[p.id].actions.push(dt.id)
      if (!rt.guest)
        rt.POSTrequest('/add-existing-action-project-from-action', 'actionId='+dt.id+'&projectId='+p.id)
      rt.closeActionForm()
    }
  }
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