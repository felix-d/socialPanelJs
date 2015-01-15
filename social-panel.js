var socialPanel = (function socialBanner($) {

    //check if jQuery is installed
    if ($ === undefined) throw new Error("jQuery dependency missing");

    //check if font-awesome is installed
    var fa = false;
    $('link').each(function() {
        if (/font-awesome.*\.css/.test(this.href)) {
            fa = true;
            //stop the loop
            return false;
        }
    });
    if (!fa) throw new Error("Font awesome dependency missing");

    //Initialize setup values
    var breakingPoint = 797,
        yOffset = 150,
        container = $('body'),
        mobileWidth;

    //animation handlers
    var mouseEnter, mouseLeave;

    //Colors
    var defaultColors = {
        'facebook': "rgb(48, 88, 145)",
        'twitter': "rgb(44, 168, 210)",
        'instagram': "rgb(65, 151, 111)",
        'google-plus': "rgb(255, 101, 59)"
    };

    //Initialize the container that will hold the social icons
    var socialPanel = $('<div id="social-panel"></div>');

    //check screen width and set css
    //We use divs argument for first call since the divs aren't appened to the dom yet
    var checkScreen = function(divs) {

        //Social icons divs
        var si;

        //We create cache
        if (!arguments.callee.cache) arguments.callee.cache = {};

        //check if data is cached and set si variable
        if (!arguments.callee.cache.si) {
            si = arguments.callee.cache.si = (divs !== undefined) ? divs : $('.social-icon');
        } else {
            si = arguments.callee.cache.si;
        }

        //set css
        if ($(window).width() < breakingPoint) {
            var padding;
            //we remove any mouse events
            si.off('mouseover mouseleave');
            si.css({
                'display': 'inline-block'
            });
            socialPanel.css({
                'top': '',
                'bottom': '0px',
                'left': '50%',
                'margin-left': -mobileWidth / 2
            });

            if (!arguments.callee.cache.padding) {
                padding = arguments.callee.cache.padding = socialPanel.outerHeight();

            } else {
                padding = arguments.callee.cache.padding;
            }
            //We add padding to the container
            if ($('#padding-div').length === 0) {

                var paddingDiv = $('<div id="padding-div"></div>');
                paddingDiv.css({
                    "height": padding
                });
                $('body').append(paddingDiv);
            }

        } else {
            if($('#padding-div')){
            $('#padding-div').remove();
            }
            // }
            //We add event listeners
            si.mouseover(function() {
                $(this).css('width', '64px');
            });
            si.mouseleave(function() {
                $(this).css('width', '48px');
            });
            si.css({
                'display': 'block',
            });
            socialPanel.css({
                'top': yOffset,
                'bottom': '',
                'left': '0px',
                'margin-left': ''
            });
        }
    };

    //bind checkScrenn to resizing event
    $(window).resize(function() {
        checkScreen();
    });


    var setupIcons = function(icons) {

        for (var p in icons) {

            //The whole icon element
            var e = $(
                '<a href="' + icons[p].url + '">' +
                '<div class="social-icon">' +
                '<i class="fa fa-' + p + '"></i></div></a>'
            );

            //We add it to the container
            socialPanel.append(e);

            //We get the div
            var d = e.find('div');

            //We set the default styles for the div
            d.css({
                "padding": "8px 0px",
                "width": "48px",
                "transition": "width 0.2s",
                "font-size": "1.9em",
                "color": "white",
                "text-align": "center",
                "background-color": defaultColors[p]
            });

            //We override with custom styles if there are any
            if (icons[p].style) {
                var cssObj = {};
                for (var k in icons[p].style) {
                    cssObj[k] = icons[p].style[k];
                    d.css(cssObj);
                }
            }
        }


        return socialPanel.find('div');
    };

    return function(params) {

        //Setup with user options
        // yOffset = params.options.yOffset || yOffset;
        // breakingPoint = params.options.breakingPoint || breakingPoint;
        // container = params.options.container || container;

        //Add social icons divs to socialPanel
        var divs = setupIcons(params.icons);
        mobileWidth = Object.keys(params.icons).length * 48;

        //Add css to panel
        socialPanel.css({
            "position": "fixed",
            "left": "0px",
            "top": yOffset + "px",
            "z-index": 999,
            "line-height": ""
        });

        $('body').append(socialPanel);
        //checkScreen
        checkScreen($(divs));

        //we get all social icons
        var socialIcons = socialPanel.find('.social-icon');


        //We append the panel to the container
    };

})(jQuery);
