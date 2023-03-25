jQuery(function ($) {
	// var wow = new WOW({
	// 	boxClass: 'wow',
	// 	animateClass: 'animated',
	// 	offset: 0,
	// 	mobile: true,
	// 	live: true
	// });

	// wow.init();

	// Hover add class
	// =========================
	$('.js-item-hover').hover(function() {
	  // Thêm class hover vào item được hover
	  $(this).addClass('active');

	  // Xóa class hover ở các item khác
	  $(this).siblings('.js-item-hover').removeClass('active');
	});

	//
	$('.home-testimonials__slider').slick({
		centerMode: true,
		variableWidth: true,
	    slidesToShow: 2,
	    infinite: true,
	    slidesToScroll: 1,
	    arrows: false,
	    dots: true,
	    touchMove: false,
	});

	/*Back to top*/
	var back_to_top = $(".back-to-top"),
		offset = 220,
		duration = 500;
	$(window).scroll(function () {
		$(this).scrollTop() > offset ? back_to_top.addClass("active") : back_to_top.removeClass("active")
	}), $(document).on("click", ".back-to-top", function (o) {
		return o.preventDefault(), $("html, body").animate({
			scrollTop: 0
		}, duration), !1
	});
	/*---- Stick menu mobie---*/


	// Sticky navbar
	// =========================
	// Custom function which toggles between sticky class (is-sticky)
	var stickyToggle = function (sticky, stickyWrapper, scrollElement, stickyHeight) {
		var stickyTop = stickyWrapper.offset().top;
		if (scrollElement.scrollTop() >= stickyTop && scrollElement.scrollTop() > 0) {
			// stickyWrapper.height(stickyHeight);
			sticky.addClass("is-sticky");
		} else {
			sticky.removeClass("is-sticky");
			// stickyWrapper.height('auto');
		}
	};
	$('[data-toggle="sticky-onscroll"]').each(function () {
		var sticky = $(this);
		var stickyWrapper = $('<div>').addClass('sticky-wrapper'); // insert hidden element to maintain actual top offset on page
		sticky.before(stickyWrapper);
		sticky.addClass('sticky');
		var stickyHeight = sticky.outerHeight();
		// Scroll & resize events
		$(window).on('scroll.sticky-onscroll resize.sticky-onscroll', function () {
			stickyToggle(sticky, stickyWrapper, $(this), stickyHeight);
		});
		// On page load
		stickyToggle(sticky, stickyWrapper, $(window), stickyHeight);
		// Check scroll top
		var winSt_t = 0;
		$(window).scroll(function () {
			var winSt = $(window).scrollTop();
			if (winSt >= winSt_t) {
				sticky.removeClass("top_show")
			} else {
				sticky.addClass("top_show")
			}
			winSt_t = winSt
		});
	});
	//-------------------------------------------------
	// Menu
	//-------------------------------------------------
	$.fn.dnmenu = function (options) {
		let thiz = this
		let menu = $(this).attr('id')
		let menu_id = '#' + menu
		var button = $('a[href="#' + menu + '"]')
		var activePage = $('a[href="#' + menu + '"]')
		// Default options
		var settings = $.extend({
			name: 'John Doe'
		}, options);
		// get ScrollBar Width
		function getScrollBarWidth() {
			var $outer = $('<div>').css({
				visibility: 'hidden',
				width: 100,
				overflow: 'scroll'
			}).appendTo('body'),
				widthWithScroll = $('<div>').css({
					width: '100%'
				}).appendTo($outer).outerWidth();
			$outer.remove();
			return 100 - widthWithScroll;
		};
		let ScrollBarWidth = getScrollBarWidth() + 'px';
		$('.nav__mobile--ul a.is-active').on('click', function (e) {
			e.preventDefault()
			buttonAction()
		});
		// Button click
		button.click(function (e) {
			e.preventDefault()
			console.log(button)
			buttonAction()
		});
		// ボタンアクション
		function buttonAction() {
			if (button.hasClass('active')) {
				$('body').removeClass('modal-open').css("padding-right", "")
				button.removeClass('active')
				$(menu_id).removeClass('active')
			} else {
				// $('body').addClass('modal-open').css("padding-right",ScrollBarWidth)
				$('body').addClass('modal-open').css("overflow:hidden")
				button.addClass('active')
				$(menu_id).addClass('active')
			}
		}
		// Menu
		var el = $(thiz).find(".nav__mobile--ul");
		el.find(".menu-item-has-children>a").after('<button class="nav__mobile__btn"><i></i></button>'),
			el.find(".nav__mobile__btn").on("click", function (e) {
				e.stopPropagation(),
					$(this).parent().find('.sub-menu').first().is(":visible") ? $(this).parent().removeClass("sub-active") : $(this).parent().addClass("sub-active"),
					$(this).parent().find('.sub-menu').first().slideToggle()
			})
		// Apply options
		return;
	};
	$('#menu__mobile').dnmenu()

});