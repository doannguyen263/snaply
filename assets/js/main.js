jQuery(function ($) {
  var wow = new WOW({
    boxClass: "wow",
    animateClass: "animated",
    offset: 0,
    mobile: true,
    live: true,
  });

  wow.init();

  // Hover add class
  // =========================
  $(".js-item-hover").hover(function () {
    let data = $(this).attr("data-id");
    $(this).addClass("active").siblings(".js-item-hover").removeClass("active");

    $("#" + data)
      .addClass("active")
      .siblings(".js-item-content")
      .removeClass("active");
    setTimeout(function () {
      $("#" + data)
        .addClass("show")
        .siblings(".js-item-content")
        .removeClass("show");
    }, 200);
  });

  //
  $(".home-testimonials__slider").slick({
    centerMode: true,
    variableWidth: true,
    slidesToShow: 2,
    infinite: true,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    touchMove: false,
    // autoplay: true,
    responsive: [
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          variableWidth: false,
          centerMode: false,
        },
      },
    ],
  });

  // Tìm item có height lớn nhất
  let maxHeight = 0;
  $(".slick-slide").each(function () {
    let slideHeight = $(this).height();
    if (slideHeight > maxHeight) {
      maxHeight = slideHeight;
    }
  });

  // Set height cho các item khác bằng height của item lớn nhất
  $(".slick-slide").css("height", maxHeight);

  /*Back to top*/
  var back_to_top = $(".back-to-top"),
    offset = 220,
    duration = 500;
  $(window).scroll(function () {
    $(this).scrollTop() > offset
      ? back_to_top.addClass("active")
      : back_to_top.removeClass("active");
  }),
    $(document).on("click", ".back-to-top", function (o) {
      return (
        o.preventDefault(),
        $("html, body").animate(
          {
            scrollTop: 0,
          },
          duration
        ),
        !1
      );
    });
  /*---- Stick menu mobie---*/

  // Sticky navbar
  // =========================
  // Custom function which toggles between sticky class (is-sticky)
  var stickyToggle = function (
    sticky,
    stickyWrapper,
    scrollElement,
    stickyHeight
  ) {
    var stickyTop = stickyWrapper.offset().top;
    if (
      scrollElement.scrollTop() >= stickyTop &&
      scrollElement.scrollTop() > 0
    ) {
      // stickyWrapper.height(stickyHeight);
      sticky.addClass("is-sticky");
    } else {
      sticky.removeClass("is-sticky");
      // stickyWrapper.height('auto');
    }
  };
  $('[data-toggle="sticky-onscroll"]').each(function () {
    var sticky = $(this);
    var stickyWrapper = $("<div>").addClass("sticky-wrapper"); // insert hidden element to maintain actual top offset on page
    sticky.before(stickyWrapper);
    sticky.addClass("sticky");
    var stickyHeight = sticky.outerHeight();
    // Scroll & resize events
    $(window).on("scroll.sticky-onscroll resize.sticky-onscroll", function () {
      stickyToggle(sticky, stickyWrapper, $(this), stickyHeight);
    });
    // On page load
    stickyToggle(sticky, stickyWrapper, $(window), stickyHeight);
    // Check scroll top
    var winSt_t = 0;
    $(window).scroll(function () {
      var winSt = $(window).scrollTop();
      if (winSt >= winSt_t) {
        sticky.removeClass("top_show");
      } else {
        sticky.addClass("top_show");
      }
      winSt_t = winSt;
    });
  });
  //-------------------------------------------------
  // Menu Mobile
  //-------------------------------------------------
  $.fn.dnmenu = function (options) {
    let thiz = this;
    let menu = $(this).attr("data-id");
    let menu_id = "#" + menu;

    // Default options
    var settings = $.extend(
      {
        name: "Menu",
      },
      options
    );

    // get ScrollBar Width
    function getScrollBarWidth() {
      var $outer = $("<div>")
          .css({ visibility: "hidden", width: 100, overflow: "scroll" })
          .appendTo("body"),
        widthWithScroll = $("<div>")
          .css({ width: "100%" })
          .appendTo($outer)
          .outerWidth();
      $outer.remove();
      return 100 - widthWithScroll;
    }
    let ScrollBarWidth = getScrollBarWidth() + "px";

    // Create wrap
    // Button click
    thiz.click(function (e) {
      e.preventDefault();
      console.log(this);
      if ($(this).hasClass("active")) {
        $(".menu-mb__btn").removeClass("active");
        $("body").removeClass("modal-open");
        $(menu_id).removeClass("active");
      } else {
        $(".menu-mb__btn").addClass("active");
        $("body").addClass("modal-open");
        $(menu_id).addClass("active");
      }
    });

    // Custom close
    $(".js-menu__close").click(function () {
      $("body").removeClass("modal-open");
      $(thiz).removeClass("active");
      $(menu_id).removeClass("active");
    });

    // Menu
    var el = $(menu_id).find(".nav-mobile--ul");
    el
      .find(".menu-item-has-children>a")
      .after(
        '<button class="nav-mobile__btn"><i class="icon-arrow-down"></i></button>'
      ),
      el.find(".nav-mobile__btn").on("click", function (e) {
        e.stopPropagation(),
          $(this).parent().find(".sub-menu").first().is(":visible")
            ? $(this).parent().removeClass("sub-active")
            : $(this).parent().addClass("sub-active"),
          $(this).parent().find(".sub-menu").first().slideToggle();
      });

    $(".nav-mobile, .menu-mb__btn").mousedown(function (e) {
      e.stopPropagation();
    });
    $(document).mousedown(function (e) {
      $(".nav-mobile").removeClass("active");
      $(thiz).removeClass("active");
      $("body").removeClass("modal-open");
    });

    // Apply options
    return;
  };

  $(".menu-mb__btn").dnmenu();
  /*=====  End of Menu  ======*/
});
