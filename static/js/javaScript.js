
function hide(el, time){
    el.css({
        'transition-duration': time,
        'visibility': 'hidden',
        'opacity': '0',
    })
}
function show(el, time){
    el.css({
        'transition-duration': time,
        'visibility': 'visible',
        'opacity': '1',
    })
}
function rotate(deg, time, el){
    el.css({
        'transition-duration': time,
        'transform': 'rotate(' + deg + 'deg)'
    })
}

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

    stringfy(){
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

    stringfy(){
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

function slideEffect(){
    show($('.slide--effect').css('top', '0'), '1.2s')
    show($('.slide--effect--left').css('left', '0'), '1,2s')
    show($('.slide--effect--right').css('right', '0'), '1,2s')
}
function abrirIconeLeft(){
    show($('#navBarMobile__toggle__left > button > .fa-times'), '0.4s')
    hide($('#navBarMobile__toggle__left > button > .fa-user'), '0.4s')
    rotate(0, '0.3s', $('#navBarMobile__toggle__left > button > .fa-times'))
    rotate(180, '0.3s', $('#navBarMobile__toggle__left > button > .fa-user'))
}
function fecharIconeLeft(){
    show($('#navBarMobile__toggle__left > button > .fa-user'), '0.4s')
    hide($('#navBarMobile__toggle__left > button > .fa-times'), '0.4s')
    rotate(0, '0.3s', $('#navBarMobile__toggle__left > button > .fa-user'))
    rotate(360, '0.3s', $('#navBarMobile__toggle__left > button > .fa-times'))
}
function dropdowns(){
    function abrirIcone(){
        show($('#navBarMobile__toggle > button > .fa-times'), '0.4s')
        hide($('#navBarMobile__toggle > button > .fa-bars'), '0.4s')
        rotate(0, '0.3s', $('#navBarMobile__toggle > button > .fa-times'))
        rotate(180, '0.3s', $('#navBarMobile__toggle > button > .fa-bars'))
    }
    function fecharIcone(){
        show($('#navBarMobile__toggle > button > .fa-bars'), '0.4s')
        hide($('#navBarMobile__toggle > button > .fa-times'), '0.4s')
        rotate(0, '0.3s', $('#navBarMobile__toggle > button > .fa-bars'))
        rotate(360, '0.3s', $('#navBarMobile__toggle > button > .fa-times'))
    }

    $('.dropdownDesktop').on('mouseenter', function(){
        show($(this).children('div'), 300)
    }).on('mouseleave', function(){
        hide($(this).children('div'), 300)
    })
    $('#navBarMobile__toggle').on('mouseenter', function(){
        show($(this).children('div'), '0.3s')
        abrirIcone()
    }).on('mouseleave', function(){
        hide($(this).children('div'), '0.3s')
        fecharIcone()
    })
    $('#navBarMobile__toggle__left').on('mouseenter', function(){
        show($('#navColumn'), '0.3s')
        abrirIconeLeft()
    })
    $('#navColumn').on('mouseenter', function(){
        show($(this))
        abrirIconeLeft()
    })
    if (!menu.isDesktop()){
        hide($('#navColumn'), '0s')
        $('#navBarMobile__toggle__left').on('mouseleave', function(){
            hide($('#navColumn'))
            fecharIconeLeft()
        })
    }
    $('#navColumn').on('mouseleave', function(){
        hide($(this), '0.3s')
        fecharIconeLeft()
    })
    $('.navBarMobile__subDropdown').on('click', function(){
        if ($(this).data('clicked') == 0 || $(this).data('clicked') == undefined) {
            show($(this).children('div'), 300)
            $(this).data('clicked', 1)
        } else {
            hide($(this).children('div'), 300)
            $(this).data('clicked', 0)
        }
    })
}
function strIsInteger(str){
    if (str == undefined)
        return false
    if (str.length == 0)
        return false
    let containsLetter = false
    for (let i = 0;i < str.length;i++){
        if (str.charCodeAt(i) < 48 || str.charCodeAt(i) > 57){
            containsLetter = true
            break
        }
    }
    if (containsLetter)
        return false
    return true
}


let formEyes = {
    opened: false,
    toggleEyes: function(time){
        if (!this.opened){
            show($('.fa-eye'), time)
            hide($('.fa-eye-slash'), time)
            $('.passwordEye > input').attr('type', 'text')
        } else {
            show($('.fa-eye-slash'), time)
            hide($('.fa-eye'), time)
            $('.passwordEye > input').attr('type', 'password')
        }
        this.opened = !this.opened
    }
}

let menu = {
    minDesktopWidth: 768,
    isDesktop: function() {return $(window).width() >= this.minDesktopWidth}
}

let checkbox = {
    applyEventHandlers: function(){
        let v = $('.checkBox')
        for (let i = 0;i < v.length;i++){
            v.eq(i).data('clicked', true)
            v.eq(i).on('click', function(){
                if ($(this).data('clicked') == undefined || $(this).data('clicked') == false){
                    show($(this).find('i'), '0.2s')
                    $(this).data('clicked', true)
                } else {
                    hide($(this).find('i'), '0.2s')
                    $(this).data('clicked', false)
                }
            })
        }
    }
}

// CONTENT


let actions = new Vue({
    el: '#background',
    data: {
        v: {
            actionData:{
                title: '',
                description: '',
                tag: '',
                id: '',
                calendar: {
                    time: '',
                    date: ''
                },
                project: {
                    order: '',
                    id: '',
                    title: ''
                }
            },
            projectData: {
                id: '',
                title: '',
                delete: true
            },
            user: {
            },
            projects: {

            },
            graph: {
                square_title: '',
                editActionDate: DateM.getCurrentDay().stringfy(),
                date: DateM.getCurrentDay().stringfy(),
                columns: function(){return $('.graphTableSquares__column')},
                squares: function(){return $('.graphTableSquaresColumn__square')},
                lastSelectedDate: DateM.getCurrentDay().day+'-'+DateM.getCurrentDay().month+'-'+DateM.getCurrentDay().year,
                selectedDate: DateM.getCurrentDay().day+'-'+DateM.getCurrentDay().month+'-'+DateM.getCurrentDay().year,
                createGraph: function(){
                    let graph = $('.graphTable__squares')
                    let date = DateM.getCurrentDay()
                    date.day = 1         
                    date.month = 1
        
                    let week = 0
                    while (week < 52){
                        graph.append($("<div class='graphTableSquares__column' id='"+(week+1)+"'></div>"))
                        for (let d = 0;d < 7;d++){
                            graph.children('#' + (week+1)).append($("<div class='graphTableSquaresColumn__square' id='"+date.day+'-'+date.month+'-'+date.year+"' data-title='"+date.stringfy()+"'></div>"))
                            date.addDay(1)
                        }
                        week++
                    }
                    graph.append($("<div class='graphTableSquares__column' id='"+(week+1)+"'></div>"))
                    for (let d = 0;d < 365 - (7 * 52);d++){
                        graph.children('#' + (week+1)).append($("<div class='graphTableSquaresColumn__square' id='"+date.stringfy()+"' data-title='"+date.stringfy()+"'></div>"))
                        date.addDay(1)
                    }
                },
                applyEventHandlers: function(){
                    let squares = this.squares()
                    for (let i = 0;i < squares.length;i++){
                        if (squares.eq(i).data('alreadyApplied') != true){
                            squares.eq(i).on('mouseenter',function(){
                                $(this).css('top', '-1px')
                            }).on('mouseleave', function(){
                                $(this).css('top', 'initial')
                            }).on('click', function() {
                                actions.v.graph.selectedDate = $(this).attr('id')
                                actions.v.actionData.calendar.date = $(this)
                                .attr('id').replace(/-/g, '/')
                                actions.v.graph.date = actions.v.actionData.calendar.date
                                actions.v.graph.unpaintLastSelectedDate()
                                actions.v.graph.paintSelectedDate()
                                actions.v.graph.lastSelectedDate = $(this).attr('id')
                                setTimeout(actions.actionsInit, 10)
                            }).data('alreadyApplied', true)
                        }
                    }
                },
                unpaintLastSelectedDate: function(){
                    if ($('#' + this.lastSelectedDate).data('numberOfActions') >= 1)
                        $('#' + this.lastSelectedDate).css('background-color', '#caff75')
                    if ($('#' + this.lastSelectedDate).data('numberOfActions') >= 4)
                        $('#' + this.lastSelectedDate).css('background-color', '#8ce981')
                    if ($('#' + this.lastSelectedDate).data('numberOfActions') >= 6)
                        $('#' + this.lastSelectedDate).css('background-color', '#007a02')
                    if ($('#' + this.lastSelectedDate).data('numberOfActions') >= 10)
                        $('#' + this.lastSelectedDate).css('background-color', '#003800')
                    if ($('#' + this.lastSelectedDate).data('numberOfActions') == 0)
                        $('#' + this.lastSelectedDate).css('background-color', 'rgb(225,225,225)')                        
                },
                paintSelectedDate: function(){
                    $('#' + this.selectedDate).css('background-color', '#0080FF')
                }
            },
            actionIcons: function() {return $('.action--icon')},
            closeIcons: function() {return $('.close--icon')},
            userIcons: function() {return $('.user--icon')},
            actions: function() {return $('.action')},
            userForms: function() {return $('.userForm')},
        },
    },
    methods: {
        addAction: function(){
            $.post('/user/add-action', { description: this.v.actionData.description, title: this.v.actionData.title, tag: this.v.actionData.tag}, (data, status, xhr) => {
                this.v.user = JSON.parse(data).actions
            }).then(() => {
                this.actionsInit()
            })
        },
        createProject: function(){
            $.post('/user/create-project', { title: this.v.projectData.title}, (data, status, xhr) => {
                this.v.projects = JSON.parse(data).projects
            }).then(() => {
                this.actionsInit()
            })
        },
        editTag: function(){
            let i = this.v.user.findIndex((el) => {
                return '' + el.id === '' + this.v.actionData.id
            })
            if (this.v.user[i].tag == 'calendar'){
                $.post('/user/remove-calendar-tag-action', { actionId: this.v.actionData.id, tag: this.v.actionData.tag}, (data, status, xhr) => {
                    this.v.user = JSON.parse(data)
                }).then(() => {
                    this.actionsInit()
                })
            } else if (this.v.actionData.tag != 'calendar'){
                $.post('/user/edit-tag', { tag: this.v.actionData.tag, actionId: this.v.actionData.id}, (data, status, xhr) => {
                    this.v.user = JSON.parse(data).actions
                }).then(() => {
                    this.actionsInit()
                })
            } else {
                if (!DateM.isValidDate(this.v.actionData.calendar.date)){
                    $('.invalidTime').css('display', 'none')
                    $('.invalidDate').css('display', 'block')
                } else if (this.v.actionData.calendar.time != '' && !TimeM.isValidTime(this.v.actionData.calendar.time)){
                    $('.invalidDate').css('display', 'none')    
                    $('.invalidTime').css('display', 'block')
                } else {
                    $.post('/user/add-calendar-tag', { actionId: this.v.actionData.id, date: this.v.actionData.calendar.date, time: this.v.actionData.calendar.time }, (data, status, xhr) => {
                        this.v.user = JSON.parse(data)
                    }).then(() => {
                        this.actionsInit()
                    })
                }
            }
        },
        editAction: function(){
            $.post('/user/edit-action', { actionId: this.v.actionData.id, title: this.v.actionData.title, description: this.v.actionData.description}, (data, status, xhr) => {
                this.v.user = JSON.parse(data).actions
            }).then(() => {
                this.actionsInit()
            })
        },
        createAndAddActionProject: function(){
            if (!strIsInteger(this.v.actionData.project.order) || parseInt(this.v.actionData.project.order) < 1){
                $('.createAndAddActionProjectAlert').css('display', 'block')
            } else {
                $('.createAndAddActionProjectAlert').css('display', 'none')
                $.post('/user/create-add-action-project', { title: this.v.actionData.title, description: this.v.actionData.description, projectId: this.v.projectData.id, order: parseInt(this.v.actionData.project.order)}, (data, status, xhr) => {
                    let user = JSON.parse(data)
                    this.v.user = user.actions
                    this.v.projects = user.projects
                }).then(() => {
                    this.actionsInit()
                })
            }
        },
        transformActionToProject: function(){
            $.post('/user/transform-action-to-project', { actionId: this.v.actionData.id, delete: this.v.projectData.delete}, (data, status, xhr) =>{
                let user = JSON.parse(data)
                this.v.user = user.actions
                this.v.projects = user.projects
            }).then(() =>{
                this.actionsInit()
            })
        },
        addAlreadyExistingActionToProject: function(){
            $.post('/user/add-already-existing-action', { actionId: this.v.actionData.id, projectId: this.v.projectData.id, order: this.v.actionData.project.order}, (data, status, xhr) => {
                let user = JSON.parse(data)
                this.v.user = user.actions
                this.v.projects = user.projects
            }).then(() =>{
                this.actionsInit()
            })
        },
        editActionProject: function(){
            if (!strIsInteger(this.v.actionData.project.order) || parseInt(this.v.actionData.project.order) < 1){
                $('.createAndAddActionProjectAlert').css('display', 'block')
            } else {
                $('.createAndAddActionProjectAlert').css('display', 'none')
                $.post('/user/edit-action-project', { actionId: this.v.actionData.id, title: this.v.actionData.title, description: this.v.actionData.description, order: this.v.actionData.project.order}, (data, status, xhr) => {
                    let user = JSON.parse(data)
                    this.v.user = user.actions
                    this.v.projects = user.projects
                }).then(() => {
                    this.actionsInit()
                })
            }
        },
        getUser: function(){
            $.get('/user/get-user', (data, status) => {
                let user = JSON.parse(data)
                this.v.user = user.actions
                this.v.projects = user.projects
            }).then(() => {
                this.actionsInit()
            })
        },
        actionsInit: function(){
            this.addActionIconsEffect()
            this.hideAllActionContentAndApplyEventHandler()
            this.hideAllUserForms()
            this.applyEventHandlersUserForms()
            if (!menu.isDesktop())
                this.hideAllActionMobileElipsesAdnApplyEventHandler()
            this.hideAllProjectActionsAndApplyEventHandler()
            this.calculateNumberOfActionsAndPaintAllSquares()
            this.hideAllSelectionBars()
        },
        hideAllActionMobileElipsesAdnApplyEventHandler: function(){
            hide($('.actionButtonDropdown div'))
            for (let i = 0;i < $('.actionButtonDropdown').length;i++)
                if ($($('.actionButtonDropdown').eq(i).data('alreadyApplied') != true))
                    $('.actionButtonDropdown').eq(i).on('mouseenter', function(){
                        show($(this).find('div'), '0.2s')
                    }).on('mouseleave', function(){
                        hide($(this).find('div'), '0.2s')
                    }).data('alreadyApplied', true)
        },
        addActionIconsEffect: function(){
            for (let i = 0;i < this.v.userIcons().length;i++)
                this.v.userIcons().eq(i).on('mouseenter', function(){
                    rotate(15, '0.2s', $(this))
                    $(this).css('font-size', '35px')
                }).on('mouseleave', function(){
                    rotate(0, '0.2s', $(this))
                    $(this).css('font-size', '30px')
                })
        },
        returnRespectiveTagIcon: function(tag_str){
            if (tag_str == 'nextAction')
                return 'fas fa-forward icon icon--dark'
            if (tag_str == 'calendar')
                return 'fas fa-calendar-alt icon icon--dark'
            if (tag_str == 'waiting')
                return 'fas fa-hourglass-half icon icon--dark'
            if (tag_str == 'maybe')
                return 'fas fa-question icon icon--dark' 
        },
        applySelectFormEventHandlers: function(){
            let v = $('.selectForm')
            for (let i = 0;i < v.length;i++)
                if (v.eq(i).data('alreadyApplied') != true)
                    v.eq(i).on('mouseenter', function(){
                        show($(this).find('.selectForm__content'), '.2s')
                    }).on('mouseleave', function(){
                        hide($(this).find('.selectForm__content'), '.2s')
                    }).data('alreadyApplied', true)
        },
        addAlreadyExistingAction: function(){
            if (!strIsInteger(this.v.actionData.project.order) || parseInt(this.v.actionData.project.order) < 1){
                $('.createAndAddActionProjectAlert').css('display', 'block')
            } else {
                $('.createAndAddActionProjectAlert').css('display', 'none')
                $.post('/user/add-already-existing-action', { projectId: this.v.projectData.id, actionId: this.v.actionData.id, order: this.v.actionData.project.order }, (data, status, xhr) => {
                    let user = JSON.parse(data)
                    this.v.user = user.actions
                    this.v.projects = user.projects
                }).then(() =>{
                    this.actionsInit()
                })
            }
        },
        hideAllActionContentAndApplyEventHandler: function(){
            this.v.actions().children('.action__content').slideUp(0)
            for (let i = 0;i < this.v.actions().length;i++)
                if (this.v.actions().find('.action__title').eq(i).data('alreadyApplied') !== true)
                    this.v.actions().find('.action__title').eq(i).on('click', function(){
                        $(this).parent().parent().children('.action__content').slideToggle()
                    }).data('alreadyApplied', true)
        },
        hideAllProjectActionsAndApplyEventHandler: function(){
            $('.project .project__actions').slideUp(0)
            let v = $('.project')
            for (let i = 0;i < v.length;i++)
                if (v.eq(i).find('.action__title').data('alreadyApplied') !== true)
                    v.eq(i).find('.action__title').on('click', function(){
                        $(this).parent().parent().children('.project__actions').slideToggle()
                    }).data('alreadyApplied', true)
        },
        hideAllUserForms: function(){
            hide(this.v.userForms(), '0.3s')
            hide($('#userForms > div'), '0.3s')
        },
        applyEventHandlersUserForms: function(){
            for (let i = 0;i < this.v.closeIcons().length;i++)
                this.v.closeIcons().eq(i).on('click', function(){
                    hide($(this).parent().parent(), '0.2s')
                    hide($('#userForms > div'))
                    actions.cleanActionData()
                })
        },
        openUserForm: function(id){
            this.hideAllUserForms()
            show($('#' + id), '0.3s')
            show($('#userForms > div'), '0.3s')
        },
        deleteAction: function(id){
            $.post('/user/delete-action', { actionId: id }, (data, status) => {
                this.v.user = JSON.parse(data).actions
            }).then(() => {
                this.actionsInit()
            })
        },
        deleteProjectAction: function(id){
           $.post('/user/delete-project-action', { actionId: id}, (data, status) => {
                let user = JSON.parse(data)
                this.v.user = user.actions
                this.v.projects = user.projects
            }).then(() => {
                this.actionsInit()
            })
        },
        deleteProject: function(id){
            $.post('/user/delete-project', { projectId: id}, (data, status) => {
                let user = JSON.parse(data)
                this.v.projects = user.projects
                this.v.user = user.actions
            }).then(() => {
                this.actionsInit()
            })
        },
        editProjectTitle: function(){
            $.post('/user/edit-project-title', { projectId: this.v.projectData.id, title: this.v.projectData.title}, (data, status) => {
                this.v.projects = JSON.parse(data)
            }).then(() => {
                this.actionsInit()
            })
        },
        removeFromProject(actionId, projectId){
            $.post('/user/remove-from-project', { actionId: actionId, projectId: projectId }, (data, status) => {
                let user = JSON.parse(data)
                this.v.projects = user.projects
                this.v.user = user.actions
            }).then(() => {
                this.actionsInit()
            })
        },
        selectTagForm: function(id){
            $('.icon--selector').removeClass('icon--selector--selected')
            $('#' + id).addClass('icon--selector--selected')
            this.v.actionData.tag = id
        },
        initAfterSomeTime: function(){
            setTimeout(this.actionsInit, 10)
        },
        applySelectionBarEventHandlers: function(){
            let v = $('.selectionBar--link')
            for (let i = 0;i < v.length;i++)
                v.eq(i).on('click', function(){
                    $(this).parent().parent().find('.selectionBar--link').removeClass('selectionBar--selected')
                    $(this).addClass('selectionBar--selected')
                    hide($(this).parent().parent().find('.selectionBar__content'), '0.2s')
                    show($(this).parent().children('.selectionBar__content'), '0.2s')
                })
        },
        hideAllSelectionBars: function(){
            hide($('.selectionBar--link').parent().parent().find('.selectionBar__content'), '0.2s')
        },
        showMainOptionSelectionBars: function(){
            $('.selectionBar--link').removeClass('selectionBar--selected')
            $('.selectionBar__main').parent().children('.selectionBar--link').addClass('selectionBar--selected')
            show($('.selectionBar__main'))
        },
        displayProjectAction: function(actionId){
            return this.v.user[this.v.user.findIndex(function(el){
                return el.id == actionId
            })]
        },
        cleanActionData: function(){
            this.v.actionData.title = ''
            this.v.actionData.description = ''
            this.v.actionData.tag = ''
            this.v.actionData.id = ''

            this.v.actionData.calendar.time = ''
            this.v.actionData.calendar.date = ''

            this.v.actionData.project.order = ''
            this.v.actionData.project.id = ''
            this.v.actionData.project.title = ''
        },
        getDataFromAction: function(el){
            this.v.actionData.title = el.title
            this.v.actionData.description = el.description
            this.v.actionData.id = el.id
            this.v.actionData.tag = el.tag
            if (el.calendar){
                this.v.actionData.calendar.time = el.calendar.time
                this.v.actionData.calendar.date = el.calendar.date
            }
            if (el.project){
                this.v.actionData.project.order = el.project.order
                this.v.actionData.project.id = el.project.id
                this.v.actionData.project.title = el.project.title
            }
        },
        cleanProjectData: function(){
            this.v.projectData.id = ''
            this.v.projectData.title = ''
            this.v.projectData.delete = true
        },
        getDataFromProject: function(el){
            this.v.projectData.id = el.id
            this.v.projectData.title = el.title
        },

        getCurrentDay: function(){
            this.v.actionData.calendar.date = DateM.getCurrentDay().stringfy()
        },
        getCurrendYear: function(){
            return DateM.getCurrentDay().year
        },
        isTheSelectedDate: function(user){
            let givenDate = new DateM(user.calendar.date)
            let selected = new DateM(this.v.graph.date)

            if (selected.isEqual(givenDate))
                return true
            return false
        },
        editTimedAction: function(){
            if (!DateM.isValidDate(this.v.graph.editActionDate)){
                $('.invalidTime').css('display', 'none')
                $('.invalidDate').css('display', 'block')
            } else if (this.v.actionData.calendar.time != '' && !TimeM.isValidTime(this.v.actionData.calendar.time)){
                $('.invalidDate').css('display', 'none')    
                $('.invalidTime').css('display', 'block')
            } else {
                $('.invalidDate').css('display', 'none')
                $('.invalidTime').css('display', 'none')
                $.post('/user/edit-timed-action', { actionId: this.v.actionData.id, time: this.v.actionData.calendar.time, date: this.v.graph.editActionDate, title: this.v.actionData.title, description: this.v.actionData.description}, (data, status, xhr) =>{
                    this.v.user = JSON.parse(data)
                }).then(() =>{
                    this.actionsInit()
                })
            }
        },
        editProjectTimedAction: function(){
            if (!DateM.isValidDate(this.v.graph.editActionDate)){
                $('.invalidTime').css('display', 'none')
                $('.invalidDate').css('display', 'block')
            } else if (this.v.actionData.calendar.time != '' && !TimeM.isValidTime(this.v.actionData.calendar.time)){
                $('.invalidDate').css('display', 'none')    
                $('.invalidTime').css('display', 'block')
            } else if (!strIsInteger(this.v.actionData.project.order) || parseInt(this.v.actionData.project.order) < 1){
                    $('.createAndAddActionProjectAlert').css('display', 'block')
            } else {
                $('.invalidDate').css('display', 'none')
                $('.invalidTime').css('display', 'none')
                $('.createAndAddActionProjectAlert').css('display', 'none')
                $.post('/user/edit-timed-project-action', { actionId: this.v.actionData.id, title: this.v.actionData.title, description: this.v.actionData.description, time: this.v.actionData.calendar.time, date: this.v.graph.editActionDate, order: this.v.actionData.project.order, projectId: this.v.projectData.id}, (data, status, xhr) =>{
                    let user = JSON.parse(data)
                    this.v.user = user.actions
                    this.v.projects = user.projects
                }).then(() =>{
                    this.actionsInit()
                })
            }
        },
        addTimedAction: function(){
            if (!DateM.isValidDate(this.v.graph.date)){
                $('.invalidTime').css('display', 'none')
                $('.invalidDate').css('display', 'block')
            } else if (this.v.actionData.calendar.time != '' && !TimeM.isValidTime(this.v.actionData.calendar.time)){
                $('.invalidDate').css('display', 'none')    
                $('.invalidTime').css('display', 'block')
            } else {
                $('.invalidDate').css('display', 'none')
                $('.invalidTime').css('display', 'none')
                $.post('/user/add-timed-action', { actionId: this.v.actionData.title, title: this.v.actionData.title, description: this.v.actionData.description, time: this.v.actionData.calendar.time, date: this.v.graph.date,}, (data, status, xhr) =>{
                    this.v.user = JSON.parse(data)
                }).then(() =>{
                    this.actionsInit()
                })
            }
        },

        calculateNumberOfActionsAndPaintAllSquares: function(){
            setTimeout(() => {
                let actions = this.v.user
                let squares = this.v.graph.squares()
                for (let i = 0;i < squares.length;i++){
                    squares.eq(i).data('numberOfActions', 0)
                    actions.forEach(function(el){
                        if (el.calendar){
                            if (new DateM(el.calendar.date).isEqual(new DateM(squares.eq(i).attr('id').replace(/-/g, '/')))){
                                squares.eq(i).data('numberOfActions', squares.eq(i).data('numberOfActions') + 1)
                            }
                        }
                    })
                }
                for (let i = 0;i < squares.length;i++){
                    let square = squares.eq(i)
                    if (square.data('numberOfActions') >= 1)
                        square.css('background-color', '#caff75')
                    if (square.data('numberOfActions') >= 4)
                        square.css('background-color', '#8ce981')
                    if (square.data('numberOfActions') >= 6)
                        square.css('background-color', '#007a02')
                    if (square.data('numberOfActions') >= 10)
                        squares.eq(i).css('background-color', '#003800')
                    if (square.data('title') != true || square.data('lastNumberOfActions') != square.data('numberOfActions')){
                        square.attr('data-title', '' + square.attr('id').replace(/-/g, '/') + '  ' + square.data('numberOfActions') + ' ' + this.v.graph.square_title)
                        square.data('title', true)
                        square.data('lastNumberOfActions', square.data('numberOfActions'))
                    }
                }
                this.v.graph.paintSelectedDate()
            }, 100)
        }
    },
    computed: {
        changedValue: function(){
            let i = this.v.actionData.calendar.date + ''
            this.initAfterSomeTime()
            return ''
        }
    }
})

slideEffect()
dropdowns()
actions.applySelectionBarEventHandlers()
actions.applySelectFormEventHandlers()
actions.getCurrentDay()
checkbox.applyEventHandlers()

if (menu.isDesktop()){
    $('#navColumn').off('mouseleave')
}

$(window).on('resize', function(){
    if (menu.isDesktop()){
        show($('#navColumn'), '0s')
        $('#navColumn').off('mouseleave')
        show($('.actionButtonDropdown').find('div'))
        $('.actionButtonDropdown ').off('mouseenter')
        $('.actionButtonDropdown ').off('mouseleave')
    } else {
        hide($('#navColumn'), '0s')
        $('#navColumn').on('mouseleave', function(){
            hide($(this), '0.3s')
            fecharIconeLeft()
        })
        actions.hideAllActionMobileElipsesAdnApplyEventHandler()
    }
})
