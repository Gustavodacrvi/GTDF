let login = new Vue({
    el: '.loginBack',
    data: {
        wrong: ''
    }
})

function show(el){
    el.css({
        'transition-duration': '0.2s',
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
    closed: true,
    toggleEye: function(){
        if (!this.closed){
            hide($('.login__open__eye'))
            show($('.login__close__eye'))
            $('.login__password').attr('type', 'password')
        } else {
            hide($('.login__close__eye'))
            show($('.login__open__eye'))
            $('.login__password').attr('type', 'text')
        }
        this.closed = !this.closed
    }
}