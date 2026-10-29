/*
	Spectral by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

$(function() {
    // $("#header").load("header.html");
    $("#sociallink").load("../../pre-set/sociallink.html");
    $("#footer").load("../../pre-set/footer.html");
    $("#publication").load("../../pre-set/publication.html");

});

(function($) {

    var $window = $(window),
        $body = $('body'),
        $wrapper = $('#page-wrapper'),
        $banner = $('#banner'),
        $header = $('#header'),
        $sidebar = $('#sidebar'),
        $main = $('#mainI'),
        $intro = $('#intro');



    // Breakpoints.
    breakpoints({
        xlarge: ['1281px', '1680px'],
        large: ['981px', '1280px'],
        medium: ['737px', '980px'],
        small: ['481px', '736px'],
        xsmall: [null, '480px']
    });

    // Play initial animations on page load.
    $window.on('load', function() {
        window.setTimeout(function() {
            $body.removeClass('is-preload');
        }, 100);
    });

    // Mobile?
    if (browser.mobile)
        $body.addClass('is-mobile');
    else {

        breakpoints.on('>medium', function() {
            $body.removeClass('is-mobile');
        });

        breakpoints.on('<=medium', function() {
            $body.addClass('is-mobile');
        });

    }

    // Scrolly.
    $('.scrolly')
        .scrolly({
            speed: 1500,
            offset: $header.outerHeight()
        });

    var $menu = $('#menu');

    $menu.wrapInner('<div class="inner"></div>');

    $menu._locked = false;

    $menu._lock = function() {

        if ($menu._locked)
            return false;

        $menu._locked = true;

        window.setTimeout(function() {
            $menu._locked = false;
        }, 350);

        return true;

    };

    $menu._show = function() {

        if ($menu._lock())
            $body.addClass('is-menu-visible');

    };

    $menu._hide = function() {

        if ($menu._lock())
            $body.removeClass('is-menu-visible');

    };

    $menu._toggle = function() {

        if ($menu._lock())
            $body.toggleClass('is-menu-visible');

    };

    $menu
        .appendTo($body)
        .on('click', function(event) {
            event.stopPropagation();
        })
        .on('click', 'a', function(event) {

            var href = $(this).attr('href');

            event.preventDefault();
            event.stopPropagation();

            // Hide.
            $menu._hide();

            // Redirect.
            if (href == '#menu')
                return;

            window.setTimeout(function() {
                window.location.href = href;
            }, 350);

        })
        .append('<a class="close" href="#menu">Close</a>');
    $body
        .on('click', 'a[href="#menu"]', function(event) {
            event.stopPropagation();
            event.preventDefault();

            // Toggle.
            $menu._toggle();

        })
        .on('click', function(event) {

            // Hide.
            $menu._hide();

        })
        .on('keydown', function(event) {

            // Hide on escape.
            if (event.keyCode == 27)
                $menu._hide();

        });

    // Header.
    if ($banner.length > 0 &&
        $header.hasClass('alt')) {

        $window.on('resize', function() { $window.trigger('scroll'); });

        $banner.scrollex({
            bottom: $header.outerHeight() + 1,
            terminate: function() { $header.removeClass('alt'); },
            enter: function() { $header.addClass('alt'); },
            leave: function() { $header.removeClass('alt'); }
        });

    }
    //The popup doc for wechat QR-code
    // Get the modal
    var modal = document.getElementById("comingsoon");
    // var modal = document.getElementById("wechat");

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");
    // Get the <span> element that closes the modal
    var close = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal
    // btn.onclick = function() {
    //     modal.style.display = "block";
    // }

    // When the user clicks on <span> (x), close the modal
    close.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    //The popup window with link
    $(document).ready(function() {
        $(document).on("click", "clickable", function() {
            showModalPopUp();
        });
    });
})(jQuery);


window.addEventListener('load', function() {
    var preloader = document.getElementById('preloader');
    var mainContent = document.getElementById('main-content');

    // Hide preloader
    preloader.style.display = 'none';

    // Show main content
    mainContent.style.display = 'block';
});

// Additional check if the window load event didn't fire
document.addEventListener('DOMContentLoaded', function() {
    if (document.readyState === 'complete') {
        var preloader = document.getElementById('preloader');
        var mainContent = document.getElementById('main-content');

        // Hide preloader
        preloader.style.display = 'none';

        // Show main content
        mainContent.style.display = 'block';
    }
});

document.cookie = "name=value; SameSite=None; Secure";