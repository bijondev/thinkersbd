/* ------------------------------------- */
/*  TABLE OF CONTENTS
 /* ------------------------------------- */
/*   Preloader                           */
/*   WOW                                 */
/*   Menu                                */
/*   Contact form functions              */
/*   Newsletter                          */
/*   Animated progress bars              */
/*   counter                             */
/*   owl-carousel                        */
/*   isotope                             */
/*   pricing table                       */
/*   Lightbox popup                      */
/*   bgndVideo hero                      */
/*   canvas.snow                         */


(function ($) {

    "use strict";


    $(window).load(function () {
        /* ------------------------------------- */
        /*   Preloader
         /* ------------------------------------- */
        $("#loading").delay(100).fadeOut("slow");

        /* ------------------------------------- */
        /*   wow
         /* ------------------------------------- */
        new WOW().init();
    });



    /* ------------------------------------- */
    /*   Menu
     /* ------------------------------------- */
    //open navigation clicking the menu icon
    $('.cd-nav-trigger').on('click', function (event) {
        event.preventDefault();
        toggleNav(true);
    });
    //close the navigation
    $('.cd-close-nav, .cd-overlay').on('click', function (event) {
        event.preventDefault();
        toggleNav(false);
    });
    //select a new section
    $('.cd-nav li').on('click', function (event) {
        var target = $(this),
            //detect which section user has chosen
            sectionTarget = target.data('menu');
        if (!target.hasClass('cd-selected')) {
            //if user has selected a section different from the one alredy visible
            //update the navigation -> assign the .cd-selected class to the selected item
            target.addClass('cd-selected').siblings('.cd-selected').removeClass('cd-selected');
            //load the new section
            loadNewContent(sectionTarget);
        } else {
            // otherwise close navigation
            toggleNav(false);
        }
    });

    function toggleNav(bool) {
        $('.cd-nav-container, .cd-overlay').toggleClass('is-visible', bool);
        $('main').toggleClass('scale-down', bool);
    }

    function loadNewContent(newSection) {
        //create a new section element and insert it into the DOM
        var section = $('<section class="cd-section ' + newSection + '"></section>').appendTo($('main'));
        //load the new content from the proper html file
        section.load(newSection + '.html .cd-section > *', function (event) {
            //add the .cd-selected to the new section element -> it will cover the old one
            section.addClass('cd-selected').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
                //close navigation
                toggleNav(false);
            });
            section.prev('.cd-selected').removeClass('cd-selected');
        });

        $('main').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
            //once the navigation is closed, remove the old section from the DOM
            section.prev('.cd-section').remove();
        });

        if ($('.no-csstransitions').length > 0) {
            //if browser doesn't support transitions - don't wait but close navigation and remove old item
            toggleNav(false);
            section.prev('.cd-section').remove();
        }
    }

    /* Menu color effect */
    $(window).scroll(function () {
        var navbarHeight = $('.hero').outerHeight();
        if ($(this).scrollTop() > navbarHeight && !$('.navigation').hasClass('nav-up')) {
            $('.navigation').addClass('nav-up');
        } else if ($(this).scrollTop() <= navbarHeight) {
            $('.navigation').removeClass('nav-up');
        }
    });


    /* Smooth scroll function */
    $(document).on('click', 'ul.cd-nav a', function (e) {
        if ($(e.target).is('a[href*="#"]:not([href="#"]')) {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
                || location.hostname == this.hostname) {

                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        }
    });


    /* ------------------------------------- */
    /*  Contact form functions
     /* ------------------------------------- */
    /* E-mail validation via regular expression */
    function isValidEmailAddress(emailAddress) {
        var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
        return pattern.test(emailAddress);
    };

    $(function () {
        $("#contactform").on('submit', function (event) {

            var input = $('.message-contactform');

            if (!input.is(':empty')) {
                input.stop(true);
            }
            event.preventDefault();
            event.stopImmediatePropagation();

            var name = $("input#contact-name");
            var email = $("input#contact-email");
            var title = $("input#contact-title");
            var message = $("textarea#contact-message");

            if (name.val() == "" || email.val() == "" || title.val() == "" || message.val() == "") {
                input.stop(true).html('<i class="fa fa-warning"></i> All fields are required.');
                $("#contactform").find("input[type=text],textarea").filter(function () {
                    if ($(this).val() == "") {
                        event.preventDefault();
                        return true;
                    }
                }).first().focus();
            } else if (!isValidEmailAddress(email.val())) {
                input.stop(true).html('<i class="fa fa-warning"></i> E-mail address is not valid.');
                email.focus();
            } else {
                $.ajax({
                    type: "POST",
                    url: "./assets/php/send-contact.php",
                    data: {
                        contact_name: name.val(),
                        contact_email: email.val(),
                        contact_title: title.val(),
                        contact_message: message.val()
                    },
                    success: function () {
                        input.html('<i class="fa fa-check"></i> Thank you for your message!');
                        name.val('');
                        email.val('');
                        title.val('');
                        message.val('');
                    }
                });
            }
        });
    });

    /* ------------------------------------- */
    /*  Newsletter
     /* ------------------------------------- */
    $("#notifyMe").notifyMe();


    $(document).ready(function () {

        /* ------------------------------------- */
        /*   Animated progress bars
         /* ------------------------------------- */
        $('.progress-bars').waypoint(function () {
            $('.progress').each(function () {
                $(this).find('.progress-bar').animate({
                    width: $(this).attr('data-percent')
                }, 200);
            });
        }, {
            offset: '100%',
            triggerOnce: true
        });

        /* ------------------------------------- */
        /*  counter
         /* ------------------------------------- */
        $('.counter').counterUp({
            delay: 10,
            time: 1000
        });

        /* ------------------------------------- */
        /*  owl-carousel
         /* ------------------------------------- */
        $(".owl-about").owlCarousel({
            autoplay: true,
            stopOnHover: true,
            dots: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                1000: {
                    items: 3
                }
            }
        });

        $(".owl-clients").owlCarousel({
            items: 1,
            autoplay: true,
            stopOnHover: true,
            dots: true,
        });

        $(".client").owlCarousel({
            autoPlay: 4000,
            margin: 10,
            stopOnHover: true,
            dots: true,
            responsive: {
                0: {
                    items: 1
                },
                400: {
                    items: 2
                },
                600: {
                    items: 3
                },
                1000: {
                    items: 3
                }
            }
        });

        $(".news").owlCarousel({
            autoPlay: false,
            stopOnHover: true,
            dots: false,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                1000: {
                    items: 4
                }
            }
        });

        $(".slider-wrapper").owlCarousel({
            singleItem: true,
            loop: true,
            nav: true,
            autoplay: true,
            autoplayTimeout: 5000,
            autoplayHoverPause: true,
            navText: ['<span class="prev"></span>', '<span class="next"></span>'],
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                1000: {
                    items: 1
                }
            }
        });
        /* ------------------------------------- */
        /*   portfolio-filter
         /* ------------------------------------- */
        // filter items on button click
        $('.portfolio-filter').on('click', 'a', function (e) {
            e.preventDefault();
            var filterValue = $(this).attr('data-filter');
            $container.isotope({
                filter: filterValue
            });
            $('.portfolio-filter a').removeClass('active');
            $(this).closest('a').addClass('active');
        });


        // isotope Masonry
        var $container = $('.masonry');
        $container.imagesLoaded(function () {
            $container.isotope({
                itemSelector: '.masonry-item',
                layoutMode: 'masonry',
                resizesContainer: false,
                percentPosition: true,
                masonry: {
                    columnWidth: '.work-img',
                    gutter: 6
                }
            });
        });

        $('.masonry-posts').isotope({
            masonry: {
                itemSelector: '.post',
                percentPosition: true,
                gutter: 15
            }
        });

        /* ------------------------------------- */
        /*   pricing table
         /* ------------------------------------- */
        $('.pricing').waypoint(function () {
            $('.pricing-best').addClass('depth');
        });


        /* ------------------------------------- */
        /*  Lightbox popup
         /* ------------------------------------- */
        $('.lightbox-gallery').magnificPopup({
            type: 'image',
            tLoading: 'Loading image #%curr%...',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0, 1]
            },
            image: {
                titleSrc: 'title',
                verticalFit: true
            }
        });

        $('.lightbox-video').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false,
            iframe: {
                patterns: {
                    youtube: {
                        index: 'youtube.com/',
                        id: 'v=',
                        src: 'http://www.youtube.com/embed/%id%?autoplay=1'
                    }
                }
            }
        });

        /* ------------------------------------- */
        /*   google map 
         /* ------------------------------------- */
        var map;
        var myCenter=new google.maps.LatLng(51.316098, 9.481401);
        var marker=new google.maps.Marker({
            icon: "assets/images/map_icon.png",
            position:myCenter
        });


        function initialize() {
            var mapProp = {
                center:myCenter,
                zoom: 14,
                draggable: false,
                scrollwheel: false,
                mapTypeId:google.maps.MapTypeId.ROADMAP,
                styles: [{
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [{"color": "#e9e9e9"}, {"lightness": 17}]
                }, {
                    "featureType": "landscape",
                    "elementType": "geometry",
                    "stylers": [{"color": "#f5f5f5"}, {"lightness": 20}]
                }, {
                    "featureType": "road.highway",
                    "elementType": "geometry.fill",
                    "stylers": [{"color": "#ffffff"}, {"lightness": 17}]
                }, {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [{"color": "#ffffff"}, {"lightness": 29}, {"weight": 0.2}]
                }, {
                    "featureType": "road.arterial",
                    "elementType": "geometry",
                    "stylers": [{"color": "#ffffff"}, {"lightness": 18}]
                }, {
                    "featureType": "road.local",
                    "elementType": "geometry",
                    "stylers": [{"color": "#ffffff"}, {"lightness": 16}]
                }, {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [{"color": "#f5f5f5"}, {"lightness": 21}]
                }, {
                    "featureType": "poi.park",
                    "elementType": "geometry",
                    "stylers": [{"color": "#dedede"}, {"lightness": 21}]
                }, {
                    "elementType": "labels.text.stroke",
                    "stylers": [{"visibility": "on"}, {"color": "#ffffff"}, {"lightness": 16}]
                }, {
                    "elementType": "labels.text.fill",
                    "stylers": [{"saturation": 36}, {"color": "#333333"}, {"lightness": 40}]
                }, {"elementType": "labels.icon", "stylers": [{"visibility": "off"}]}, {
                    "featureType": "transit",
                    "elementType": "geometry",
                    "stylers": [{"color": "#f2f2f2"}, {"lightness": 19}]
                }, {
                    "featureType": "administrative",
                    "elementType": "geometry.fill",
                    "stylers": [{"color": "#fefefe"}, {"lightness": 20}]
                }, {
                    "featureType": "administrative",
                    "elementType": "geometry.stroke",
                    "stylers": [{"color": "#fefefe"}, {"lightness": 17}, {"weight": 1.2}]
                }]
            };

            map=new google.maps.Map(document.getElementById("map-canvas"),mapProp);
            marker.setMap(map);

            google.maps.event.addListener(marker, 'click', function() {

                infowindow.setContent(contentString);
                infowindow.open(map, marker);

            });
        };
        google.maps.event.addDomListener(window, 'load', initialize);

        google.maps.event.addDomListener(window, "resize", resizingMap());

        $('#map-popup').on('show.bs.modal', function() {
            resizeMap();
        })

        function resizeMap() {
            if(typeof map =="undefined") return;
            setTimeout( function(){resizingMap();} , 400);
        }

        function resizingMap() {
            if(typeof map =="undefined") return;
            var center = map.getCenter();
            google.maps.event.trigger(map, "resize");
            map.setCenter(center);
        }
        /* ------------------------------------- */
        /*  bgndVideo hero
         /* ------------------------------------- */
        jQuery("#bgndVideo").YTPlayer();

        /*---------------------------------------*/
        /*	Tweeter feed
         /*--------------------------------------*/
        $('.tweet').twittie({
            username: 'EnvatoStudio',
            hideReplies: true,
            dateFormat: '%b. %d, %Y',
            template: '{{screen_name}} {{tweet}} <div class="date">{{date}}</div>',
            count: 1,
            loadingText: 'Loading!'
        });



    });
})(jQuery);