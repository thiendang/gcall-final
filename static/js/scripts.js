﻿
(function($) {
	'use strict';
	
	jQuery(document).on('ready', function(){
	
		/*PRELOADER JS*/
		$(window).on('load', function() { 
			$('.status').fadeOut();
			$('.preloader').delay(350).fadeOut('slow'); 
		}); 
		/*END PRELOADER JS*/

		/*START MENU JS*/
			$('a.page-scroll, .page-scroll, .popup-with-zoom-anim, .navbar-brand, a.btn-try, a.btn-lgs, a.btn-primary').on('click', function(e){
				var anchor = $(this);
				$('html, body').stop().animate({
					scrollTop: $(anchor.attr('href')).offset().top - 50
				}, 1200);
				e.preventDefault();
			});		

			$(window).on('scroll', function() {
			  if ($(this).scrollTop() > 100) {
				$('.menu-top').addClass('menu-shrink');
			  } else {
				$('.menu-top').removeClass('menu-shrink');
			  }
			});
			
			$(document).on('click','.navbar-collapse.in',function(e) {
			if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) {
				$(this).collapse('hide');
			}
			});				
		/*END MENU JS*/ 		
		/*START SLIDER JS*/
			$('.carousel').carousel({
				interval:8000,
				pause:'false',
			});
		/*END SLIDER JS*/

		/*START PARTNER LOGO*/
		$('.partner').owlCarousel({
		  autoPlay: 3000, //Set AutoPlay to 3 seconds
		  items : 4,
		  itemsDesktop : [1199,3],
		  itemsDesktopSmall : [979,3]
		});
		/*END PARTNER LOGO*/		

		/* START COUNTDOWN JS*/
		$('.counter_feature').on('inview', function(event, visible, visiblePartX, visiblePartY) {
			if (visible) {
				$(this).find('.timer').each(function () {
					var $this = $(this);
					$({ Counter: 0 }).animate({ Counter: $this.text() }, {
						duration: 2000,
						easing: 'swing',
						step: function () {
							$this.text(Math.ceil(this.Counter));
						}
					});
				});
				$(this).unbind('inview');
			}
		});
		/* END COUNTDOWN JS */
	
	  /*START PROGRESS BAR*/
	  $('.progress-bar > span').each(function(){
			var $this = $(this);
			var width = $(this).data('percent');
			$this.css({
				'transition' : 'width 2s'
			});
			
			setTimeout(function() {
				$this.appear(function() {
						$this.css('width', width + '%');
				});
			}, 500);
		});
		/*END PROGRESS BAR*/
			
		/*START GOOGLE MAP*/
		// function initialize() {
		//   var mapOptions = {
		// 	zoom: 15,
		// 	scrollwheel: false,
		// 	center: new google.maps.LatLng(40.7127837, -74.00594130000002)
		//   };
		//   var map = new google.maps.Map(document.getElementById('map'),
		// 	  mapOptions);
		//   var marker = new google.maps.Marker({
		// 	position: map.getCenter(),
		// 	icon: 'img/map_pin.png',
		// 	map: map
		//   });
		// }
		// google.maps.event.addDomListener(window, 'load', initialize);	
		/*END GOOGLE MAP*/
	}); 		
		
	/*START MIXITUP JS*/
		$('.work_all_item').mixItUp();
		// jQuery Lightbox
		$('.lightbox').venobox({
			numeratio: true,
			infinigall: true
		});	
	/*END MIXITUP JS*/
		
	/*START WOW ANIMATION JS*/
	  new WOW().init();	
	/*END WOW ANIMATION JS*/	
})(jQuery);

$(document).ready(function() {
	$('#video-item').magnificPopup({
			  items: {
				     src: 'https://www.youtube.com/watch?v=w0DShKQm1Ks'
			     },
			  type: 'iframe',
			  iframe: {
				    	markup: '<div class="mfp-iframe-scaler">'+
			            		'<div class="mfp-close"></div>'+
			            		'<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
			            		'</div>', 
			        patterns: {
			            youtube: {
				              index: 'youtube.com/', 
				              id: 'v=', 
				              src: '//www.youtube.com/embed/%id%?autoplay=1' 
					        }
					     },
					     srcAction: 'iframe_src', 
			     }
			});
	});

	setTimeout(function(){        
        // $('#preloader').fadeOut();
        $('.preloader').delay(150).fadeOut('fast'); 
    }, 1000);

//	============================= Accordion  =============================

    var hideAccordion = $(".accordion > .accordion-content").hide(),
		accordionLink = $(".accordion > .accordion-title > a");
    
    hideAccordion.first().slideDown();
    accordionLink.first().addClass("active");
	
	accordionLink.on("click", function (e) {
		
        var accordionContent = $(this).parent().next(".accordion-content");
        accordionLink.removeClass("active");
        $(this).addClass("active");
        hideAccordion.not(accordionContent).slideUp();
        $(this).parent().next().slideDown();
        e.preventDefault();
		
	});


