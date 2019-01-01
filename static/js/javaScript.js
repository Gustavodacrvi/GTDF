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
        if (leap_year_bool) {
            if (month == 2 && leap_year_bool) return 29
            if (month == 2 && !leap_year_bool) return 28
        }
    }
    static getCurrentDay(){
        let date = new Date()
        let datem = new DateM('' + date.getDate() + '/' + (parseInt(date.getMonth()) + parseInt(1)) + '/' + date.getFullYear())
        return datem
    }

    isEqual(date_obj){
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
            if (this.month + 1 > 12){
                this.year += 1
                this.month = 1
            } else 
                this.month += 1
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
            forms: {
                addAction: {
                    title: '',
                    description: '',
                    tag: ''
                },
                editAction: {
                    title: '',
                    description: '',
                    id: ''
                },
                editTag: {
                    Id: '',
                    newTag: 'basket'
                },
                project: {
                    action: {
                        delete: true,
                        projectId: ''
                    },
                    title: ''
                }
            },
            user: {
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
            $.post('/user/add-action', { title: this.v.forms.addAction.title, description: this.v.forms.addAction.description, tag: this.v.forms.addAction.tag}, (data, status, xhr) => {
                this.v.user = JSON.parse(data).actions
            }).then(() => {
                this.$forceUpdate()
                this.actionsInit()
            })
        },
        editTag: function(){
            $.post('/user/edit-tag', { actionId: this.v.forms.editTag.id, tag: this.v.forms.editTag.newTag}, (data, status, xhr) => {
                this.v.user = JSON.parse(data).actions
            }).then(() => {
                this.$forceUpdate()
                this.actionsInit()
            })
        },
        editAction: function(){
            $.post('/user/edit-action', { title: this.v.forms.editAction.title, description: this.v.forms.editAction.description, actionId: this.v.forms.editAction.id}, (data, status, xhr) => {
                this.v.user = JSON.parse(data).actions
            }).then(() => {
                this.$forceUpdate()
                this.actionsInit()
            })
        },
        getUser: function(){
            $.get('/user/get-user', (data, status) => {
                this.v.user = JSON.parse(data).actions
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
        hideAllActionContentAndApplyEventHandler: function(){
            this.v.actions().children('.action__content').slideUp(0)
            for (let i = 0;i < this.v.actions().length;i++)
                if (this.v.actions().find('.action__title').eq(i).data('alreadyApplied') !== true)
                    this.v.actions().find('.action__title').eq(i).on('click', function(){
                        $(this).parent().parent().children('.action__content').slideToggle()
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
        selectTagForm: function(id){
            $('.icon--selector').removeClass('icon--selector--selected')
            $('#' + id).addClass('icon--selector--selected')
            this.v.forms.editTag.newTag = id
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
            $('#selectionBar_actionToProject_main').parent().children('.selectionBar--link').addClass('selectionBar--selected')
            show($('#selectionBar_actionToProject_main'))
        }
    }
})

actions.getUser()


slideEffect()
dropdowns()
actions.applySelectionBarEventHandlers()
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