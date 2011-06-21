/**
 * Create a slideshow style similar to itunes
 * @developer Eric Casequin
 * @date June 14 2011
 *
 * This is a slideshow similar to itunes original store slideshow
 * The current slide will be in the large view while the optional
 * slides will be in the sidebar.
 * 
 * Expected usage:
 * - Slide show is auto animated on a timer
 * - If user mouses over slideshow in any area, slide show stops
 *   when users mouse exits, timer begins again
 * 
 */

jQuery.fn.extend({

    sliderton: function(options){

        var options =  $.extend({
            debug: false,
            sliderton_id: "sliderton",
            slides_container_id: "slide-container",
            slides_class: "slide",
            slides_nav_id: "slide-navigation",
            slides_nav_class: "slide-nav",
            slide_next_button: "next-slide",
            wrapper: 'wrapper',
            nav_items_visible: 3,
            slide_container_width: 600,
            slide_container_height: 300,
            slide_width: 600,
            slide_height:300,
            nav_container_width: 100,
            nav_container_height: 300,
            nav_item_width: 100,
            nav_item_height: 100,
            next_button: true
            }, options); 

        var $this        = $("#" + options.sliderton_id);
        var slideWrapper = $("#" + options.slides_container_id + " ." + options.wrapper);
        var slides       = slideWrapper.find('.' + options.slides_class);
        var navWrapper   = $("#" + options.slides_nav_id + " ." + options.wrapper);
        var navSlides    = $("." + options.slides_nav_class);
        var index        = new Array();
        var nextButton;
        var current;
        var previous;
        
        var slideWrapperHeight = 0;
        var navWrapperHeight   = 0;
        
        // Testing wether the current browser supports the canvas element:
        var supportCanvas = 'getContext' in document.createElement('canvas');

        var init = function() 
        {

       
            // slides
            slides.each(function(i, el){
                
                // index all the slides and panels
                index[i] = {
                    slide: slides[i],
                    navSlide: navSlides[i]
                };
                
            });

            for (var i=0; i < index.length; i++) 
            {
                // Slight navigation effect
                $(index[i].navSlide)
                .css({opacity: .5})
                .hover(function() {
                    $(this).stop().animate({opacity: 1}, 'fast');
                }, function() {
                    $(this).stop().animate({opacity: .5}, 'fast');
                });
                
                
            };
            
            current = 0;
            $(index[current].slide).fadeIn();
            
            // getSlideSizes();
            
            adjustPositions();

            // trigger next-slide button bind
            if (options.next_button == true) 
            {
                addNextButton();
            };


        };

        var adjustPositions = function() {
            position = 0;
            offset = options.nav_item_height;
            navWrapper.css('top', position - offset);
        };

        var addNextButton = function()
        {
                                    
            if (supportCanvas) 
            {
                setupCanvasButton();
            } else {
                setupHTMLbutton();
            }
            
            addButtonEvent(nextButton); 
            
        };

        var setupHTMLbutton = function()
        {
            nextButton = $('<div></div>')
            .hide()
            .addClass('next-button')
            .html("V");

            $this.append(nextButton.show());

        };

        var setupCanvasButton = function(elID)
        {

            var el = {
                radius: 16,
                shadowBlur: 5,
                stroke: 1		      
            };

            var o = {
                w: ( el.radius + el.stroke + el.shadowBlur) * 2,
                h: ( el.radius + el.stroke + el.shadowBlur) * 2,
                c: ( el.radius + el.stroke + el.shadowBlur)
            };

            var canvasElement = $('<canvas></canvas>')
                                .hide()
                                .attr({ 
                                    id: "next-button",
                                    width: o.w,
                                    height: o.h                         
                                })
                                .addClass('next-button-c');
                                
            $this.append(canvasElement.show());

            var canvas = document.getElementById("next-button");
            var ctx = canvas.getContext("2d");

            var gradient = ctx.createLinearGradient(0, 0, 0, el.radius * 2);
            
            gradient.addColorStop(0, '#666');
            gradient.addColorStop(1, '#222');
            
            ctx.strokeStyle = "#666";
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(o.c, o.c,el.radius,0,Math.PI*2,true);
            
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.shadowBlur    = 5;
            ctx.shadowColor   = 'rgba(0, 0, 0, 0.5)';
   
            ctx.closePath();
            ctx.stroke();
            ctx.fill();
            
            // Arrow
            ctx.beginPath();
            ctx.moveTo(o.c, o.c + el.radius / 2);
            ctx.lineTo(o.c - (el.radius / 2), o.c - (el.radius / 3));
            ctx.moveTo(o.c, o.c + el.radius / 2);
            ctx.lineTo(o.c + (el.radius / 2), o.c - (el.radius / 3));
            ctx.strokeStyle = "#DDD";
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 1;
            ctx.shadowBlur    = 0;
            ctx.shadowColor   = 'rgba(0, 0, 0, 0.5)';
            ctx.stroke();
            
            nextButton = $('#next-button');
            nextButton.css('opacity', .5);
            
        };

        var addButtonEvent = function(el)
        {
            el.hover(function(){
                el.css('cursor', 'pointer');
                $(el).stop().animate({opacity: 1});
                
            }, function() {
                $(el).stop().animate({opacity: .4});
            });
            
            el.click(function() {
                // if not currently animating
                if (animating() == false) 
                {
                    cycle();
                };
                
            });
        };
        
        /*
            Checks to see if somethign specific is animating
        */
        var animating = function()
        {
            a = (navWrapper.filter(':animated')).length;
            return a ? true : false;
        };
        
        
        var generateClones = function() 
        {
           
            if (options.debug) { console.log(navSlides.length); };
            navSlides.each(function(i, el){
                $(this)
                    .clone(true)
                    .addClass('slide-clone')
                    .prependTo(navWrapper);
            });
            
            navSlides = $("." + options.slides_nav_class);
            
            // index slides and add some animated properties
            navSlides.each(function(i, el) {
               index[i] = $(this);
               $(this)
                    .css({opacity: .5})
                    .hover(function() {
                        $(this).stop().animate({opacity: 1});
                    }, function() {
                        $(this).stop().animate({opacity: .5});
                   
                    });
            });
            
        };
        
        

        /*
            Calculate the total height in pixels
            for the slides and nav slides
        */
        var getSlideSizes = function() 
        {
            // Navigation Slides
            navSlides.each(function() {
               navWrapperHeight += $(this).height();
            });
            
            // Panels
            slides.each(function() {
                slideWrapperHeight += $(this).height();
            });
            
            navWrapper.css('height', navWrapperHeight + "px");
        
            slideWrapper.css('height', slideWrapperHeight + "px");
        };

        var getNavPosition = function(el)
        {

            if (el.css('top') == "auto") 
            {
                return +options.nav_item_height;
            } else {
                return parseInt(el.css('top')) + options.nav_item_height;
            };

        };


        var getSlidePosition = function(el)
        {

            if (el.css('top') == "auto") 
            {
                return -options.slide_height;
            } else {
                return parseInt(el.css('top')) - options.slide_height;
            };

        };

        var getCurrent = function() 
        {
            
            previous = current;
            // total count, current, next
            if (current == index.length - 1) {
                current = 0;
            } else {
                current++;
            };
        };
        /*
            cycle : Animates and cycle from one slide to another
        */
        var cycle = function() 
        {
            
            getCurrent();
            
            if (options.debug) { 
                 console.log("CURRENT: " + current + " PREVIOUS: " + previous);
            };
            
            $(index[previous].slide).fadeOut();
            $(index[current].slide).fadeIn();
            
            
            var ns = $('.slide-nav');
            newest = ns
                .last()
                .clone(true)
                .addClass('slide-clone')
                .prependTo(navWrapper)
                .css({
                    height: 0
                })
                .stop()
                .animate({
                    height: 100
                }, function() {
                    ns.last().remove();
                    
            });
            
            
           
        };

        /*
        start up the engine
        */
        this.each(function(){
            init();
        });


	}
	
});