var didScroll;
var lastScrollTop = 0;
var delta = 10;
var navbarHeight = $('nav').outerHeight();

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(this).scrollTop();
    
    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;
    
    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
        $('nav').removeClass('nav-down').addClass('nav-up');
    } else {
        // Scroll Up
        if (st + $(window).height() * 3 < $(document).height()) {
            $('nav').removeClass('nav-up').addClass('nav-down');
        }
    }
    
    lastScrollTop = st;
}

$("#blue #button").click(function() {
    $('html,body').animate({
        scrollTop: $("#target").offset().top},
        'slow');
    $('#hunter').removeClass('background-red');
    $('#program').addClass('background-blue');
});

$("#red #button").click(function() {
    $('html,body').animate({
        scrollTop: $("#target").offset().top},
        'slow');
    $('#program').removeClass('background-blue');
    $('#hunter').addClass('background-red');
});

$("#bug-bounty-guide").hover(
    function () {
        var rand = Math.floor(Math.random() * 10).toString()
        var randStyle = {
            "-webkit-text-fill-color": "transparent",
            "background": "-webkit-linear-gradient(transparent, transparent), url('assets/img/" + rand + ".gif')",
            "-webkit-background-clip": "text"
        }
        $('#bug-bounty-guide').css(randStyle);
    },
    function () {
        var normStyle = {
            "background": "#fff",
            "color": "#222",
            "-webkit-text-fill-color": "#222"
        }
        $('#bug-bounty-guide').css(normStyle);
    }
);