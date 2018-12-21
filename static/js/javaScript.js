function hide(el){
    el.css({
        'transition-duration': '1.2s',
        'visibility': 'hidden',
        'opacity': '0',
    })
}
function show(el){
    el.css({
        'transition-duration': '1.2s',
        'visibility': 'visible',
        'opacity': '1',
    })
}
function slideEffect(){
    show($('.slide--effect').css('top', '0'))
}

// SLIDE EFFECT
slideEffect()