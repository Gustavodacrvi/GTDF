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

(function() {
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



slideEffect()
dropdowns()

if (menu.isDesktop()){
    $('#navColumn').off('mouseleave')
} 

$(window).on('resize', function(){
    if (menu.isDesktop()){
        show($('#navColumn'), '0s')
        $('#navColumn').off('mouseleave')
    } else {
        hide($('#navColumn'), '0s')
        $('#navColumn').on('mouseleave', function(){
            hide($(this), '0.3s')
            fecharIconeLeft()
        })
    }
})
})();

// CONTENT
let actions = {
    actionIcons: function() {return $('.action--icon')},
    closeIcons: function() {return $('.close--icon')},
    userIcons: function() {return $('.user--icon')},
    actions: function() {return $('.action')},
    userForms: function() {return $('.userForm')},

    addActionIconsEffect: function(){
        for (let i = 0;i < this.userIcons().length;i++)
            this.userIcons().eq(i).on('mouseenter', function(){
                rotate(15, '0.2s', $(this))
                $(this).css('font-size', '35px')
            }).on('mouseleave', function(){
                rotate(0, '0.2s', $(this))
                $(this).css('font-size', '30px')
            })
    },
    hideAllActionContentAndApplyEventHandler: function(){
        this.actions().children('.action__content').slideUp(0)
        for (let i = 0;i < this.actions().length;i++)
            this.actions().find('.action__title').eq(i).on('click', function(){
                $(this).parent().parent().children('.action__content').slideToggle()
            })
    },
    hideAllUserForms: function(){
        hide(this.userForms())
        hide($('#userForms > div'))
    },
    applyEventHandlersUserForms: function(){
        for (let i = 0;i < this.closeIcons().length;i++)
            this.closeIcons().eq(i).on('click', function(){
                hide($(this).parent().parent(), '0.2s')
                hide($('#userForms > div'))
            })
    },
    openUserForm: function(id){
        this.hideAllUserForms()
        show($('#' + id), '0.2s')
        show($('#userForms > div'))
    }
}


actions.addActionIconsEffect()
actions.hideAllActionContentAndApplyEventHandler()
actions.applyEventHandlersUserForms()
actions.hideAllUserForms()