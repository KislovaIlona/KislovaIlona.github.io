$(document).ready(function() {


	$('.header-slider').owlCarousel({
    loop:true,
    items: 1,
    nav:true,
    dots: true,
    navContainer: '.nav-arrow',
    dotsContainer: '.nav-dots',
    autoplay:true,
    navText : ["<img src='img/arrow-left.png'/>","<img src='img/arrow-right.png'/>"],
    animateOut: 'fadeOut',
    autoplaySpeed: 3000,
    navSpeed: true,
    dotsSpeed: true,
    mouseDrag: false,
    touchDrag: true,
	})

	$(window).scroll(function() {
		if($(document).scrollTop() > 50) {
			$('header').addClass('nav-menu-scroll');
		}

		else {
			$('header').removeClass('nav-menu-scroll');
		}
	});

    new WOW().init();

    $('#main-menu-header ul li').hover(
            function () {
                $('ul', this).stop().slideDown(400);
            }, 
            function () {
                $('ul', this).stop().slideUp(400);            
            }
        );

    $(".toggle-mnu").click(function() {
        $(this).toggleClass("on");
        $(".main-mnu").slideToggle();
        $("aside").toggleClass("left-pos");
        return false;
    });


})

