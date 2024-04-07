
jQuery(document).ready(function($) {

    // --------------------------------------------------------------------------------------------------
    // Activate property when a property is clicked
    // --------------------------------------------------------------------------------------------------
    $('.snippet .property, .toggle').click(function() {
        $(this).parents('p').toggleClass('active');
        $(this).parents('p').find('.toggle').toggleClass('fa-plus-circle').toggleClass('fa-minus-circle');

        // if input is disabled, enabled it or if input is enabled, disable it
        $(this).siblings().find('select, input').prop('disabled', function(i, v) { return !v; });

        // Get the property name
        var p = $(this).siblings().find('select, input').attr('name');
        // Get the input value (the property value)
        var v = $(this).siblings().find('select, input').val();
        // if the property is animation-duration or animation-delay, add an "s" to the value
        if($(this).siblings().find('select, input').attr('name') == "animation-duration" || $(this).siblings().find('select, input').attr('name') == "animation-delay") { d = "s"; } else { d = ""; }

        // If this property is active, apply its value to the animated element, else set the property's value to "initial"
        if($(this).parents('p').hasClass('active')) {
            $('.anim-element').css(p, v+d);
        } else {
            $('.anim-element').css(p, 'initial');
        }
    });

    
    // --------------------------------------------------------------------------------------------------
    // Show the "plus" icon when hovering over a property
    // --------------------------------------------------------------------------------------------------
    $('.snippet .property').hover(function() {
        $(this).parent().siblings('.toggle').toggleClass('hover');
    });


    // --------------------------------------------------------------------------------------------------
    // When a property value is changed, apply this to the animated element
    // --------------------------------------------------------------------------------------------------
    $('.snippet select, .snippet input').change(function() {
        var v = $(this).val();
        var p = $(this).attr('name');
        if($(this).attr('name') == "animation-duration" || $(this).attr('name') == "animation-delay") { d = "s"; } else { d = ""; }
        $('.anim-element').css(p, v+d);
    });


    // --------------------------------------------------------------------------------------------------
    // Populate the shorthand value with the animation-name and animation-duration values to start with
    // --------------------------------------------------------------------------------------------------
    var a = $('.active input[name="animation-name"]').val();
    var b = $('.active input[name="animation-duration"]').val();
    $('input[name="animation"]').val(a+" "+b+"s");


    // --------------------------------------------------------------------------------------------------
    // When shorthand property is activated, deactivate all other properties
    // --------------------------------------------------------------------------------------------------
    $('.shorthand .property, .shorthand .toggle').click(function() {
        $(this).parents('p').siblings('p:not(.req)').removeClass('active');
        $(this).parents('p').siblings('.req').toggleClass('active');
        $(this).parents('p').siblings().find('.toggle').removeClass('fa-minus-circle').addClass('fa-plus-circle');
        $(this).parents('p').siblings('p:not(.req)').find('select, input').prop('disabled', true);
        $(this).parents('p').siblings('.req').find('input, select').prop('disabled', function(i, v) { return !v; });

        if($(this).parents('p').hasClass('active')) {
        } else {
            $('.anim-element').css('animation', 'initial');

            $('.anim-element').css('animation-duration', $('input[name="animation-duration"]').val()+"s");

            var a = $('input[name="animation-name"]').val();
            var b = $('input[name="animation-duration"]').val();
            if (a == null) { var a = ""; } else { var a = a+" "; }
            if (b == null || b == "") { var b = "3s "; $('input[name="animation-duration"]').val('3'); } else { var b = b+"s "; }
            $('input[name="animation"]').val(a+b);
        }
    });


    // --------------------------------------------------------------------------------------------------------------------------------
    // When a property or toggle is clicked that isn't the shorthand property, activate that property and deactivate the shorthand
    // --------------------------------------------------------------------------------------------------------------------------------
    $('.snippet > p:not(.shorthand) .property, .snippet > p:not(.shorthand) .toggle').click(function() {
        $('.shorthand').removeClass('active');
        $('.shorthand').find('.toggle').removeClass('fa-minus-circle').addClass('fa-plus-circle');
        $('.shorthand').find('input, select').prop('disabled', true);
        $('.req').addClass('active');
        $('.req').find('input, select').prop('disabled', false);
    });


    // --------------------------------------------------------------------------------------------------
    // Restart animation when restart button is clicked by removing and re-adding element
    // --------------------------------------------------------------------------------------------------
    $('.restart').click(function() {
        var el = $('.anim-element');
        el.before( el.clone(true) ).remove();
    });


    // --------------------------------------------------------------------------------------------------
    // Info popups
    // --------------------------------------------------------------------------------------------------
    var items = 9;

    for (var i=0; i<=items; i++) {
        (function(i){
            $('.snippet > p:nth-child('+(i+1)+') .info').click(function(event) {
                $('.popup:nth-child('+i+')').toggleClass('on');
                $('.overlay').toggleClass('on');
                $(this).toggleClass('fa-info-circle').toggleClass('fa-times-circle');
            });
        })(i);
    }

    $('.overlay').click(function() {
        $('.popup').removeClass('on');
        $('.overlay').removeClass('on');
        $('.info').addClass('fa-info-circle').removeClass('fa-times-circle');
    });


    // --------------------------------------------------------------------------------------------------
    // animate.css options
    // --------------------------------------------------------------------------------------------------
    $('.fadeIn').click(function() {
        $('.keyframes-text').val('@keyframes fadeIn { \n\n  from { \n    opacity: 0; \n  } \n\n  to { \n    opacity: 1;\n  } \n\n}');
        $("input[name='animation-name']").val('fadeIn');
    });
    $('.fadeOut').click(function() {
        $('.keyframes-text').val('@keyframes fadeOut { \n\n  from { \n    opacity: 1; \n  } \n\n  to { \n    opacity: 0;\n  } \n\n}');
        $("input[name='animation-name']").val('fadeOut');
    });
    $('.fadeInUp').click(function() {
        $('.keyframes-text').val('@keyframes fadeInUp { \n\n  from { \n    opacity: 0; \n    transform: translateY(100%);\n  } \n\n  to { \n    opacity: 1;\n  } \n\n}');
        $("input[name='animation-name']").val('fadeInUp');
    });
    $('.fadeInDown').click(function() {
        $('.keyframes-text').val('@keyframes fadeInDown {\n\n  from {\n    opacity: 0;\n    transform: translateY(-100%);\n  }\n\n  to {\n    opacity: 1;\n    transform: none;\n  }\n\n}');
        $("input[name='animation-name']").val('fadeInDown');
    });
    $('.zoomIn').click(function() {
        $('.keyframes-text').val('@keyframes zoomIn {\n\n  from {\n    opacity: 0;\n    transform: scale(.3);\n  }\n\n  50% {\n    opacity: 1;\n  }\n\n}');
        $("input[name='animation-name']").val('zoomIn');
    });
    $('.zoomOut').click(function() {
        $('.keyframes-text').val('@keyframes zoomOut {\n\n  from {\n    opacity: 1;\n  }\n\n  50% {\n    opacity: 0;\n    transform: scale(.3);\n  }\n\n  to {\n    opacity: 0;\n  }\n}');
        $("input[name='animation-name']").val('zoomOut');
    });
    $('.lightSpeedIn').click(function() {
        $('.keyframes-text').val('@keyframes lightSpeedIn {\n\n  from {\n    transform: translate3d(100%, 0, 0) skewX(-30deg);\n    opacity: 0;\n  }\n\n  60% {\n    transform: skewX(20deg);\n    opacity: 1;\n  }\n\n  80% {\n    transform: skewX(-5deg);\n    opacity: 1;\n  }\n\n  to {\n    transform: none;\n    opacity: 1;\n  }\n\n}');
        $("input[name='animation-name']").val('lightSpeedIn');
    });
    $('.wobble').click(function() {
        $('.keyframes-text').val('@keyframes wobble {\n\n  from {\n    transform: none;\n  }\n\n  15% {\n    transform: translateX(-25%) rotate(-5deg);\n  }\n\n  30% {\n    transform: translateX(20%) rotate(3deg);\n  }\n\n  45% {\n    transform: translateX(-15%) rotate(-3deg);\n  }\n\n  60% {\n    transform: translateX(10%) rotate(2deg);\n  }\n\n  75% {\n    transform: translateX(-5%) rotate(-1deg);\n  }\n\n  to {\n    transform: none;\n  }\n\n}');
        $("input[name='animation-name']").val('wobble');
    });
    $('.hinge').click(function() {
        $('.keyframes-text').val('@keyframes hinge {\n\n  0% {\n    transform-origin: top left;\n    animation-timing-function: ease-in-out;\n  }\n\n  20%, 60% {\n    transform: rotate(80deg);\n    transform-origin: top left;\n    animation-timing-function: ease-in-out;\n  }\n\n  40%, 80% {\n    transform: rotate(60deg);\n    transform-origin: top left;\n    animation-timing-function: ease-in-out;\n    opacity: 1;\n  }\n\n  to {\n    transform: translateY(700px);\n    opacity: 0;\n  }\n\n}');
        $("input[name='animation-name']").val('hinge');
    });
    $('.headBang').click(function() {
        $('.keyframes-text').val('@keyframes headBang {\n\n  50% {\n    transform-origin: 75% bottom;\n    animation-timing-function: ease-in-out;\n    transform: rotate(90deg);\n  }\n\n}');
        $("input[name='animation-name']").val('headBang');
    });
    $('.restore').click(function() {
        $('.keyframes-text').val('@keyframes myAnim {\n\n    0% {\n        max-width: 80px;\n        margin-left: 0;\n        left: -80px;\n    }\n\n    25% {\n        left: 25%;\n        bottom: 35%;\n    }\n\n    50% {\n        left: 50%;\n        bottom: 18%;\n    }\n\n    75% {\n        left: 75%;\n        bottom: 35%;\n    }\n\n    100% {\n        max-width: 80px;\n        margin-left: 0;\n        left: 100%;\n        bottom: 18%;\n    }\n\n}');
        $("input[name='animation-name']").val('myAnim');
    });

    $('.more-options .apply-keyframes').click(function() {
        $('.anim-element').css('animation-name', $('input[name="animation-name"]').val());
        $('.anim-element').css('animation-duration', "1s");
        $('input[name="animation-duration"]').val('1');
        $(this).siblings('button').removeClass('active');
        $(this).addClass('active');
        $('.keyframes-text + button').addClass('saved').removeClass('unsaved');
        $('.anim-element').css('animation-iteration-count', 'initial');
    });
    $('.code-block + .apply-keyframes').click(function() {
        $('.more-options button').removeClass('active');
    });
    $('.headBang').click(function() {
        $('.anim-element').css('animation-duration', ".5s");
        $('input[name="animation-duration"]').val('.5');
        $('input[name="animation-iteration-count"] option[value="infinite"]').attr('selected','selected');
        $('.anim-element').css('animation-iteration-count', 'infinite');
    })
    $('.restore').click(function() { $('.anim-element').css('animation-duration', "4s"); $('input[name="animation-duration"]').val('4'); })


    // --------------------------------------------------------------------------------------------------
    // When keyframes/styles are edited, add "unsaved" class to "Apply" button
    // --------------------------------------------------------------------------------------------------
    $('.code-block').keyup(function() {
        $(this).next('button').removeClass('saved').addClass('unsaved');
    });

    $('.code-block + button').click(function() {
        $(this).removeClass('unsaved').addClass('saved');
    });


    // --------------------------------------------------------------------------------------------------
    // Apply keyframes from textarea when "Apply Keyframes" button is clicked
    // --------------------------------------------------------------------------------------------------
    $('.apply-keyframes').click(function() {
        var sheet = (function() {
            // Create the <style> tag
            var style = document.createElement("style");

            // Add a media (and/or media query) here if you'd like!
            // style.setAttribute("media", "screen")
            // style.setAttribute("media", "only screen and (max-width : 1024px)")

            // WebKit hack :(
            style.appendChild(document.createTextNode(""));

            // Add the <style> element to the page
            document.head.appendChild(style);

            return style.sheet;
        })();
        var userInputStyles = $('.keyframes-text').val();
        sheet.insertRule(userInputStyles, 0);

        var el = $('.anim-element');
        el.before( el.clone(true) ).remove();
    });


    // --------------------------------------------------------------------------------------------------
    // Apply styles from textarea when "Apply Styles" is clicked
    // --------------------------------------------------------------------------------------------------
    $('.apply-styles').click(function() {
        var sheet = (function() {
            // Create the <style> tag
            var style = document.createElement("style");

            // Add a media (and/or media query) here if you'd like!
            // style.setAttribute("media", "screen")
            // style.setAttribute("media", "only screen and (max-width : 1024px)")

            // WebKit hack :(
            style.appendChild(document.createTextNode(""));

            // Add the <style> element to the page
            document.head.appendChild(style);

            return style.sheet;
        })();
        var userInputStyles = $('.element-styles').val();
        sheet.insertRule(userInputStyles, 0);
    });


    // --------------------------------------------------------------------------------------------------
    // Update shorthand animation property value
    // --------------------------------------------------------------------------------------------------
    $('.apply-keyframes, p:not(.shorthand) .property, p:not(.shorthand) select, p:not(.shorthand) input, p:not(.shorthand) .toggle').on('click change',function() {
        var a = $('input[name="animation-name"]').val();
        var b = $('input[name="animation-duration"]').val();
        var c = $('.active select[name="animation-iteration-count"]').val();
        var d = $('.active input[name="animation-delay"]').val();
        var e = $('.active select[name="animation-direction"]').val();
        var f = $('.active select[name="animation-play-state"]').val();
        var g = $('.active select[name="animation-fill-mode"]').val();
        var h = $('.active select[name="animation-timing-function"]').val();


        if (a == null) { var a = ""; } else { var a = a+" "; }
        if (b == null || b == "") { var b = "3s "; $('input[name="animation-duration"]').val('3'); } else { var b = b+"s "; }
        if (c == null || c == "1") { var c = ""; } else { var c = c+" "; }
        if (d == null || d == "0") { var d = ""; } else { var d = d+"s "; }
        if (e == null || e == "normal") { var e = ""; } else { var e = e+" "; }
        if (f == null || f == "running") { var f = ""; } else { var f = f+" "; }
        if (g == null || g == "none") { var g = ""; } else { var g = g+" "; }
        if (h == null || h == "ease") { var h = ""; } else { var h = h+" "; }

        $('input[name="animation"]').val(a+b+c+d+e+f+g+h);

        if(h === "cubic-bezier(.4,-0.92,.54,1.68) ") { $('.c-b').show(); }
    });


});


