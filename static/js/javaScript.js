function hide(el){
    el.css({
        'visibility': 'hidden',
        'opacity': '0',
    })
}
function show(el){
    el.css({
        'visibility': 'visible',
        'opacity': '1',
    })
}
function slideEffect(){
    show($('.slide--effect').css('top', '0'))
}

// SLIDE EFFECT
slideEffect()