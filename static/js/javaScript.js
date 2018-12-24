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
function slideEffect(){
    show($('.slide--effect').css('top', '0'), '1.2s')
}
function dropdownEffect(){
    $('.dropdown').on('mouseenter', function(){
        show($(this).children('div'), 300)
    }).on('mouseleave', function(){
        hide($(this).children('div'), 300)
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
    minDesktopWidth: 979,
    isDesktop: function() {return $(window).width() >= this.minDesktopWidth}
}



slideEffect()
dropdownEffect()


