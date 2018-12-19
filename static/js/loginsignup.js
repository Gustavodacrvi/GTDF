function show(el){
    el.css({
        'transition-duration': '0.4s',
        'opacity': '1',
        'visibility': 'visible'
    })
}

function hide(el){
    el.css({
        'opacity': '0',
        'visibility': 'hidden'
    })
}


var eye = {
    open: false,
    toggleEye: function(){
        if (!this.open){
            show($('.fa-eye'))
            hide($('.fa-eye-slash'))
            $('.password').attr('type', 'text')
        } else {
            show($('.fa-eye-slash'))
            hide($('.fa-eye'))
            $('.password').attr('type', 'password')
        }
        this.open = !this.open
    }
}