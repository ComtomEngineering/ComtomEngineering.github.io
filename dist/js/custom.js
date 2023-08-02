$(document).ready(function () {
    $('.portfolio-slider').owlCarousel({
        loop: false,
        center: false,
        margin: 100,
        autoplay: true,
        items: 2,
        dots: false,
        nav: false,
        responsiveClass: true,
        responsive: {
            0: {
                items: 2,
                nav: false
            },
            600: {
                items: 2,
                nav: false
            },
            991: {
                items: 2,
                nav: false
            },
            1024: {
                items: 2,
                nav: false
            }
        }
    });

    $('.testimonial').owlCarousel({
        loop: true,
        center: true,
        autoplay: true,
        items: 1,
        dots: false,
        margin: 10,
        nav: false,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: false
            },
            600: {
                items: 1,
                nav: false
            },
            991: {
                items: 1,
                nav: false
            },
            1024: {
                items: 1,
                nav: false
            }
        }
    });

    $('.trusted-logos').owlCarousel({
        loop: false,
        items: 4,
        dots: false,
        autoplay: false,
        autoplayHoverPause: true,
        nav: false,
        responsiveClass: true,
        responsive: {
            0: {
                items: 2,
                nav: false
            },
            600: {
                items: 3,
                nav: false
            },
            991: {
                items: 3,
                nav: false
            },
            1024: {
                items: 4,
                nav: false
            }
        }
    });


    function send_form_register() {
        // validate data
        var email = $('#subscription-email').val();
        if (email == "" | !email.includes("@")) {
            $('#subscribe-failed').modal('show');
            return
        }

        // TODO: disable button
        // TODO: show spinner

        $.ajax({
            contentType: 'application/json',
            data: JSON.stringify({
                "email": email
            }),
            dataType: 'json',
            type: 'POST',
            url: 'https://comtomengineering-serverless.vercel.app/api/subscription',
            success: function () {
                $('#subscribed').modal('show');
            },
            error: function () {
                $('#subscribe-failed').modal('show');
            },
        }).always(function () {
            // TODO: enable button
            // TODO: hide spinner
        });
    }


    $('#register-form').on('submit', function (e) {
        e.preventDefault();

        send_form_register();
    });

    $('#register-btn').on('click', function (e) {
        e.preventDefault();

        send_form_register();
    });



    function send_form_contact() {
        // validate data
        var name = $('#contact-name').val();
        var email = $('#contact-email').val();
        var message = $('#contact-message').val();
        if (email == "" | !email.includes("@")) {
            $('#contact-failed').modal('show');
            return
        }
        if (message == "") {
            $('#contact-failed').modal('show');
            return
        }
        if (name == "") {
            $('#contact-failed').modal('show');
            return
        }

        // disable button & show spinner
        $('#contact-btn').addClass('disabled');

        console.log('sending request...')
        $.ajax({
            contentType: 'application/json',
            data: JSON.stringify({
                "name": name,
                "phone": "5555555",
                "email": email,
                "message": message,
            }),
            dataType: 'json',
            type: 'POST',
            url: 'https://comtomengineering-serverless.vercel.app/api/contact',
            success: function (response) {
                $('#contact-success').modal('show');
            }
        }).done(function () {
            console.log('message sent')
            $('#contact-success').modal('show');
        }).fail(function () {
            console.log('failed to send message')
            $('#contact-failed').modal('show');
        }).always(function () {
            // enable button & hide spinner
            console.log('restoring state')
            $('#contact-btn').removeClass('disabled');
        });
    }

    $('#contact-form').on('submit', function (e) {
        e.preventDefault();

        send_form_contact();
    });


    $('#contact-btn').on('click', function (e) {
        e.preventDefault();

        send_form_contact();
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $('header').addClass("sticky");
        }
        else {
            $('header').removeClass("sticky");
        }
    });
    // copyrights Year Auto-update
    function newDate() {
        return new Date().getFullYear();
    }
    document.onload = document.getElementById("autodate").innerHTML = + newDate();

});
