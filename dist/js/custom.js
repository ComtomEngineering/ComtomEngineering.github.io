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


    $('#button-register').on("click", function () {
        $('#subscribed').modal('show');

        //input class: subscription-email

        // if fails:
        //$('#subscribe-failed').modal('show');
    });


    $('#contact-form').on('submit', function (e) {
        e.preventDefault();
        // TODO: disable button
        // TODO: show spinner

        $.ajax({
            contentType: 'application/json',
            data: JSON.stringify({
                "name": $('#contact-name').val(),
                "phone": "5555555",
                "email": $('#contact-email').val(),
                "message": $('#contact-message').val(),
            }),
            dataType: 'json',
            type: 'POST',
            url: 'https://comtomengineering-serverless.vercel.app/api/contact'
        }).done(function () {
            $('#contact-success').modal('show');
        }).fail(function () {
            $('#contact-fail').modal('show');
        }).always(function () {
            // TODO: enable button
            // TODO: hide spinner
        });
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
