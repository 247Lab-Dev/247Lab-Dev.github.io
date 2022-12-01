function initializeSite() {
    "use strict";
    $('#scene').parallax();

    (function () {
        function centerInit() {
            var hero = $('#hero'),
                sphere = $('.sphere'),
                sphereMargin = ($(window).height() - sphere.height()) / 2,
                heroContent = $('.hero-content'),
                contentMargin = ($(window).height() - heroContent.height()) / 2,
                
                bgText = $(".247-bg");
                
            hero.css({
                height: $(window).height() + "px"
            });
            sphere.css({
                "margin-top": sphereMargin + "px"
            });
            heroContent.css({
                "margin-top": contentMargin + "px"
            });
            
            bgText.css({
//               "margin-top": contentMargin + "px" 
            });
        }
        $(document).ready(centerInit);
        $(window).resize(centerInit);
    })();
    $('#hero').localScroll({
        duration: 1000
    });
    
    
    
    $('.lightbox').magnificPopup({
        type: 'image',
        mainClass: 'mfp-with-zoom mfp-fade',
        zoom: {
            enabled: true,
            duration: 300,
            easing: 'ease-in-out',
            opener: function (openerElement) {
                return openerElement.is('img') ? openerElement : openerElement.find('img');
            }
        }
    });
    $('body').panelSnap();
      $(function(){
          $("span.text-typed").typed({
            strings: ["HELLO!", "BONJOUR!"],
            backDelay: 2000,
            typeSpeed: 100
          });
      });
    $(function () {
        $('#contact').validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                email: {
                    required: true,
                    email: true
                },
                message: {
                    required: true
                }
            },
            messages: {
                name: {
                    required: "come on, you have a name don't you?",
                    minlength: "your name must consist of at least 2 characters"
                },
                email: {
                    required: "no email, no message"
                },
                message: {
                    required: "um...yea, you have to write something to send this form.",
                    minlength: "thats all? really?"
                }
            },
            submitHandler: function (form) {
                $(form).ajaxSubmit({
                    type: "POST",
                    data: $(form).serialize(),
                    url: "contact.php",
                    success: function () {
                        $('#contact :input').attr('disabled', 'disabled');
                        $('#contact').fadeTo("slow", 0.15, function () {
                            $(this).find(':input').attr('disabled', 'disabled');
                            $(this).find('label').css('cursor', 'default');
                            $('#success').fadeIn();
                        });
                    },
                    error: function () {
                        $('#contact').fadeTo("slow", 0.15, function () {
                            $('#error').fadeIn();
                        });
                    }
                });
            }
        });
    });
    
    
    

    ajaxMailChimpForm($("#subscribe-form"), $("#subscribe-result"));

    function ajaxMailChimpForm($form, $resultElement) {
        $form.submit(function (e) {
            e.preventDefault();
            if (!isValidEmail($form)) {
                var error = "A valid email address must be provided.";
                $resultElement.hide();
                $resultElement.html(error);
                $resultElement.fadeIn();
                $resultElement.removeClass('notification-success');
                $resultElement.addClass('notification-error');
            } else {
                submitSubscribeForm($form, $resultElement);
            }
        });
    }

    function isValidEmail($form) {
        var email = $form.find("input[type='email']").val();
        if (!email || !email.length) {
            return false;
        } else if (email.indexOf("@") == -1) {
            return false;
        }
        return true;
    }

    function submitSubscribeForm($form, $resultElement) {
        $.ajax({
            type: "GET",
            url: $form.attr("action"),
            data: $form.serialize(),
            cache: false,
            dataType: "jsonp",
            jsonp: "c",
            contentType: "application/json; charset=utf-8",
            error: function (error) {},
            success: function (data) {
                if (data.result != "success") {
                    var message = data.msg || "Sorry. Unable to subscribe. Please try again later.";
                    if (data.msg && data.msg.indexOf("already subscribed") >= 0) {
                        message = "You're already subscribed. Thank you.";
                    }
                    $resultElement.hide();
                    $resultElement.html(message);
                    $resultElement.fadeIn();
                    $resultElement.removeClass('notification-error');
                    $resultElement.addClass('notification-success');
                } else {
                    $resultElement.hide();
                    $resultElement.html("Thank you! You must confirm the subscription in your inbox.");
                    $resultElement.fadeIn();
                    $resultElement.removeClass('notification-error');
                    $resultElement.addClass('notification-success');
                }
            }
        });
    }
};


    $(function() {
      var wow = new WOW(
        {
          boxClass:'a',      // animated element css class (default is wow)
          animateClass:'animated', // animation css class (default is animated)
          offset:-150,
          mobile:false,
          live:true,
          callback:     function(box) {
            // the callback is fired every time an animation is started
            // the argument that is passed in is the DOM node being animated
          },
          scrollContainer: null // optional scroll container selector, otherwise use window
        }
      );
    });
$(window).load(function () {

    initializeSite();

});
$(window).load(function () {
    if (Modernizr.touch) {
        skrollr.init().destroy();
    } else {
        skrollr.init({
            forceHeight: false
        });
    }
});