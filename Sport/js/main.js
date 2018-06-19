$(document).ready(function() {


	$('.slider').owlCarousel({
    loop:true,
    items: 1,
    nav:true,
    dots: true,
    navContainer: '.nav-arrow',
    dotsContainer: '.nav-dots',
    autoplay: false,
    navText : ["вліво", "вправо"],
    animateOut: 'fadeOut',
    navSpeed: true,
    dotsSpeed: true,
    mouseDrag: false,
    touchDrag: false,
	});
    

    $(function() {
        var n_slide = 1;
        var sliders = $('.sport-girls').length;
         $('div.owl-prev').on('click',  function prew() {
            n_slide--;
            if(n_slide == -1) {
                n_slide = 4;
            }
            $('.sport-girls').eq(n_slide).removeClass('visible');
            $('.sport-girls').eq(n_slide).removeClass('animated bounceInRight');

            $('.sport-girls').eq(n_slide-1).addClass('visible');
            $('.sport-girls').eq(n_slide-1).addClass('animated bounceInRight');
            //console.log(n_slide);
            return n_slide;

        });

          $('div.owl-next').on('click', function next() {
            if(n_slide == 5) {
                n_slide = 0;
            };
            var n = n_slide++;
            $('.sport-girls').eq(n - 1).removeClass('visible');
            $('.sport-girls').eq(n -1).removeClass('animated bounceInRight');
            $('.sport-girls').eq(n).addClass('visible');
            $('.sport-girls').eq(n).addClass('animated bounceInRight');
            //console.log(n);
            return n;
        });

        $('div.dot').on('click', function sw() {
            var active = $('div.dot').hasClass('active');
            //console.log(active);
            if(active) {
                var at_num = $(this).attr('data-slide');
                //console.log(at_num);
                $('img.sport-girls').removeClass('visible');
                $('img.sport-girls').removeClass('animated bounceInRight');
                $('.sport-girls').eq(at_num).addClass('visible');
                $('.sport-girls').eq(at_num).addClass('animated bounceInRight');
                n_slide = parseInt(at_num) + 1;
                if(at_num == 4) {
                    n_slide = 0;
                }
                //console.log(n_slide);
                return n_slide;
            }
        })

    });


    $(function() {
        $('input#legs_name, input#legs_email').blur(function() {
            var id = $(this).attr('id');
            var val = $(this).val(); 
            switch(id) {
                case 'legs_name': 
                    var rv_name = /^[a-zA-Zа-яА-Я]+$/;
                    if(val.length > 2 && val != '' && rv_name.test(val)){
                         $(this).removeClass('error').addClass('not_error');
                    }
                    else{
                        $(this).removeClass('not_error').addClass('error');
                    }
                break;

                case 'legs_email': 
                    var rv_email = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
                    if(val != '' && rv_email.test(val)){
                         $(this).removeClass('error').addClass('not_error');
                    }
                    else{
                        $(this).removeClass('not_error').addClass('error'); 
                    }
                break;
            }
        });

        $('form[name="want_sports_legs"]').submit(function(e){
         e.preventDefault();

         if($('.not_error').length == 2)
         {

             $.ajax({
                    url: 'form.php',
                    type: 'post',
                    data: $(this).serialize(),

                    beforeSend: function(xhr, textStatus){ 
                         $('form[name="want_sports_legs"] :input').attr('disabled','disabled');
                    },

                    success: function(response){
                        $('form[name="want_sports_legs"] :input').removeAttr('disabled');
                   }
            }); 
        }

       else
       {
          return false;
       }

        });

    });

    $(function() {
        $('input#week_name, input#week_email').blur(function() {
            var id = $(this).attr('id');
            var val = $(this).val(); 
            switch(id) {
                case 'week_name': 
                    var rv_name = /^[a-zA-Zа-яА-Я]+$/;
                    if(val.length > 2 && val != '' && rv_name.test(val)){
                         $(this).removeClass('error').addClass('not_error');
                    }
                    else{
                        $(this).removeClass('not_error').addClass('error');
                    }
                break;

                case 'week_email': 
                    var rv_email = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
                    if(val != '' && rv_email.test(val)){
                         $(this).removeClass('error').addClass('not_error');
                    }
                    else{
                        $(this).removeClass('not_error').addClass('error'); 
                    }
                break;
            }
        });

        $('form[name="free_week"]').submit(function(e){
         e.preventDefault();

         if($('.not_error').length == 3)
         {

             $.ajax({
                    url: 'form.php',
                    type: 'post',
                    data: $(this).serialize(),

                    beforeSend: function(xhr, textStatus){ 
                         $('form[name="free_week"] :input').attr('disabled','disabled');
                    },

                    success: function(response){
                        $('form[name="free_week"] :input').removeAttr('disabled');
                   }
            }); 
        }

       else
       {
          return false;
       }

    });


    });

    $(function() {
        $('input#fit_name, input#fit_email').blur(function() {
            var id = $(this).attr('id');
            var val = $(this).val(); 
            switch(id) {
                case 'fit_name': 
                    var rv_name = /^[a-zA-Zа-яА-Я]+$/;
                    if(val.length > 2 && val != '' && rv_name.test(val)){
                         $(this).removeClass('error').addClass('not_error');
                    }
                    else{
                        $(this).removeClass('not_error').addClass('error');
                    }
                break;

                case 'fit_email': 
                    var rv_email = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
                    if(val != '' && rv_email.test(val)){
                         $(this).removeClass('error').addClass('not_error');
                    }
                    else{
                        $(this).removeClass('not_error').addClass('error'); 
                    }
                break;
            }
        });

         $('form[name="fitness_free"]').submit(function(e){
         e.preventDefault();

         if($('.not_error').length == 3)
         {

             $.ajax({
                    url: 'form.php',
                    type: 'post',
                    data: $(this).serialize(),

                    beforeSend: function(xhr, textStatus){ 
                         $('form[name="fitness_free"] :input').attr('disabled','disabled');
                    },

                    success: function(response){
                        $('form[name="fitness_free"] :input').removeAttr('disabled');
                   }
            }); 
        }

       else
       {
          return false;
       }

        });


    });




});


$('form#feedback-form').submit(function(e){

         // Запрещаем стандартное поведение для кнопки submit
         e.preventDefault();

         // После того, как мы нажали кнопку "Отправить", делаем проверку,
         // если кол-во полей с классом .not_error равно 3 (так как у нас всего 3 поля), то есть все поля заполнены верно,
         // выполняем наш Ajax сценарий и отправляем письмо адресату

         if($('.not_error').length == 3)
         {
            // Eще одним моментом является то, что в качестве указания данных для передачи обработчику send.php, мы обращаемся $(this) к нашей форме,
            // и вызываем метод .serialize().
            // Это очень удобно, т.к. он сразу возвращает сгенерированную строку с именами и значениями выбранных элементов формы.

             $.ajax({
                    url: 'send.php',
                    type: 'post',
                    data: $(this).serialize(),

                    beforeSend: function(xhr, textStatus){ 
                         $('form#feedback-form :input').attr('disabled','disabled');
                    },

                   success: function(response){
                        $('form#feedback-form :input').removeAttr('disabled');
                        $('form#feedback-form :text, textarea').val('').removeClass().next('.error-box').text('');
                        alert(response);
                   }
            }); // end ajax({...})
        }

        // Иначе, если количество полей с данным классом не равно значению 3, мы возвращаем false,
        // останавливая отправку сообщения в невалидной форме
       else
       {
          return false;
       }

   }); // end submit()




