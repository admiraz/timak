
(function ($) {
  "use strict";

  $.fn.isInViewport = function () {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
  };

  // =======Sticky-header========>>>>>
  $(window).on('scroll', function () {
    var scroll = $(window).scrollTop();
    if (scroll < 90) {
      $(".sticky-navbar").removeClass("sticky");
      $('.back-to-top').hide();
    } else {
      $(".sticky-navbar").addClass("sticky");
      $('.back-to-top').show();
    }
  });
  // =======Sticky-header========>>>>>

  // dynamic-year js
  let dynamicyearElm = $(".dynamic-year");
  if (dynamicyearElm.length) {
    let currentYear = new Date().getFullYear();
    dynamicyearElm.html(currentYear);
  }


  $(window).on("load", function () {
    $(".preloader").delay(600).fadeOut("slow");
  });

  // =======CounterUp JS-Odometer========>>>>>   
  if ($('.odometer').length > 0) {
    $(window).on('scroll', function () {
      let preloaderTimeout = 2500;
      function winScrollPosition() {
        var scrollPos = $(window).scrollTop(),
          winHeight = $(window).height();
        var scrollPosition = Math.round(scrollPos + (winHeight / .07));
        return scrollPosition;
      }
      var elemOffset = $('.odometer').offset().top;
      if (elemOffset < winScrollPosition()) {

        setTimeout(function () {
          $('.odometer').each(function () {
            $(this).html($(this).data('count-to'));
          });
        }, preloaderTimeout + 200);
      }
    });
  }
  // =======CounterUp JS-Odometer========>>>>>


  // =======Swiper .blog-swiper========>>>>>
  if ($('.blog-swiper').length > 0) {
    new Swiper(".blog-swiper", {
      loop: true,      
      spaceBetween: 20,
      slidesPerGroup: 1,
      speed: 700,
      breakpoints: {
        380: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1200: {
          slidesPerView: 3,
        }
      },
      pagination: {
        el: ".blog-swiper-pagination",
        type: "progressbar",
      },
      navigation: {
        nextEl: ".blog-progress-button-next",
        prevEl: ".blog-progress-button-prev",
      },
    });
  }
  // =======Swiper .blog-swiper========>>>>>


    // =======Swiper .contact-swiper========>>>>>
    if ($('.contact-swiper').length > 0) {
      new Swiper(".contact-swiper", {
        loop: true,
        spaceBetween: 20,
        breakpoints: {
          380: {
            slidesPerView: 1,
            slidesPerGroup: 1,
          },
          750: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1000: {
            slidesPerView: 3,
            spaceBetween: 40,
          }
        },
  
        pagination: {
          el: ".swiper-pagination",
          type: "progressbar",
        },
      });
    }
    // =======Swiper .contact-swiper========>>>>>


  // =======Swiper .project-swiper-2========>>>>>
  if ($('.project-swiper-2').length > 0) {
    new Swiper(".project-swiper-2", {
      loop: true,      
      spaceBetween: 20,
      slidesPerGroup: 1,
      speed: 1000,
      breakpoints: {
        320: {
          slidesPerView: 1,
        },
        576: {
          slidesPerView: 1.5,
        },
        768: {
          slidesPerView: 2.5,
        },
        992: {
          slidesPerView: 1.5,
        },
        1200: {
          slidesPerView: 2,
        },
        1350: {
          slidesPerView: 2.5,
        }
      },        
      navigation: {
        nextEl: ".project-swiper-button-next",
        prevEl: ".project-swiper-button-prev",
      },
    });
  }
  // =======Swiper .project-swiper-2========>>>>>


  // =======Swiper .gallery-swiper========>>>>>
  if ($('.gallerySwiper').length > 0) {
    var swiper = new Swiper(".gallerySwiper", {
      loop: true,
      spaceBetween: 30,
      slidesPerView: 3,
      freeMode: true,
      watchSlidesProgress: true,
      breakpoints: {
        300: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        750: {
          spaceBetween: 20,
        },
        1320: {
          slidesPerView: 3,
          spaceBetween: 30,
        }
      },
    });
  }
  if ($('.gallerySwiper2').length > 0) {
    var swiper2 = new Swiper(".gallerySwiper2", {
      loop: true,
      spaceBetween: 10,
      navigation: {
        nextEl: ".project-gallery-button-next",
        prevEl: ".project-gallery-button-prev",
      },
      thumbs: {
        swiper: swiper,
      },
    });
  }
  // =======Swiper .gallery-swiper========>>>>>


  // =======Swiper .project-swiper========>>>>>
  if ($('.project-gallery-swiper').length > 0) {
    new Swiper(".project-gallery-swiper", {
      loop: false,
      spaceBetween: 20,
      breakpoints: {
        380: {
          slidesPerView: 1,
          slidesPerGroup: 1,
        },
        750: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1320: {
          slidesPerView: 3,
          spaceBetween: 40,
        }
      },

      pagination: {
        el: ".project-swiper-pagination",
        type: "progressbar",
      },
      navigation: {
        nextEl: ".project-progress-button-next",
        prevEl: ".project-progress-button-prev",
      },
    });
  }
  // =======Swiper .project-swiper========>>>>>


  // =======Swiper .shop-2-swiper========>>>>>
  if ($('.shop-2-swiper').length > 0) {
    new Swiper(".shop-2-swiper", {
      loop: true,      
      spaceBetween: 20,
      slidesPerGroup: 1,
      breakpoints: {
        380: {
          slidesPerView: 1,
        },
        600: {
          slidesPerView: 2,
        },
        1000: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      },
      pagination: {
        el: ".shop-swiper-pagination",
        type: "progressbar",
      },      
    });
  }

  if ($('.shop-swiper').length > 0) {
    new Swiper(".shop-swiper", {
      loop: true,      
      spaceBetween: 20,
      slidesPerGroup: 1,
      breakpoints: {
        380: {
          slidesPerView: 1,
        },
        600: {
          slidesPerView: 2,
        },
        1000: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1365: {
          slidesPerView: 4,
          spaceBetween: 30,
        }
      },

      pagination: {
        el: ".shop-swiper-pagination",
        type: "progressbar",
      },
      navigation: {
        nextEl: ".shop-progress-button-next",
        prevEl: ".shop-progress-button-prev",
      },
    });
  }
  // =======Swiper .shop-swiper========>>>>>


  // =======Magnific-PopUp========>>>>>    
  $('.image-link').magnificPopup({
    type: 'image',
    gallery: {
      enabled: true
    },
    zoom: {
      enabled: true,
      duration: 300, // don't foget to change the duration also in CSS
      opener: function (element) {
        return element.find('img');
      }
    }
  });

  // Video popup
  $('.video-popup-link').magnificPopup({
    disableOn: 200,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false
  });
  // =======Magnific-PopUp========>>>>>


  // =========Button(Increse-Decrese)=========>>>>>
  var buttonPlus = $(".plus-icon");
  var buttonMinus = $(".dash-icon");
  var incrementPlus = buttonPlus.click(function () {
    var $n = $(this)
      .parent(".cart-btn")
      .find(".input-number");
    $n.val(Number($n.val()) + 1);
  });
  var incrementMinus = buttonMinus.click(function () {
    var $n = $(this)
      .parent(".cart-btn")
      .find(".input-number");
    var amount = Number($n.val());
    if (amount > 1) {
      $n.val(amount - 1);
    }
  });
  // =========Button(Increse-Decrese)=========>>>>>


  // =========Leaflet map=========>>>>>
  if ($('#map').length > 0) {
    var map = L.map('map').setView([35.76428892315803, -40.45770338684278], 3);
    var locationsArray = [];
  
    function clickZoom(e) {
      map.setView(e.target.getLatLng(), 16);
    }  
    $.each(industriaLocations, function(index, location) {
      var marker = L.marker(location.markerPoint, {
        title: location.title,
        className: "marker-usa"  // Class for the marker
      }).addTo(map);  
      marker.bindPopup(`<div class="card card-map architronix-map-card"><div class="card-body">
                          <h5 class="card-title service-title">${location.title}</h5><p class="mb-0 fw-semibold">${location.subtitle}</p><p class="mb-0 contact-home">${location.address}</p>                          
                        </div></div>`).on('click', clickZoom);
  
      locationsArray.push({ marker: marker, location: location });
    }); 
    $('.btn-map-direction').on('click', function(e) {
      e.preventDefault();
      var markerTitle = $(this).data('title');
      var selectedMarker = locationsArray.find(function(item) {
        return item.location.title === markerTitle;
      });
      if (selectedMarker) {
        selectedMarker.marker.openPopup();
        map.setView(selectedMarker.marker.getLatLng(), 12);
      }
    });  
    L.tileLayer('https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}', {
      maxZoom: 26,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);  
    $(document).on('click', function(e) {
      var mapContainer = $('#map');
      var isClickInsideMap = mapContainer.has(e.target).length > 0 || mapContainer.is(e.target); 
     
    });
  }
  // =========Leaflet map=========>>>>>


  // ========= Scrool stroke-text on Mouse-Wheel=========>>>>>
  if ($('.scroll-move').length > 0){  
    gsap.registerPlugin(ScrollTrigger);
    let scrollMoveRight = document.querySelectorAll(".scrolling-text");
    scrollMoveRight.forEach((scrollMoveRight) => {
        gsap.to(scrollMoveRight, {
            x: 200,
            duration: 1.5,
            scrollTrigger: {
                trigger: scrollMoveRight,
                start: "top 75%",
                scrub: 2
            }
        });
    });
  }
  // ========= Scrool stroke-text on Mouse-Wheel=========>>>>>


  // ========= Stroke-animation When visible on view-port=========>>>>>
  if ($('.stroke-heading').length > 0){
    $(document).ready(function () {
      function isInViewport(element) {
          var elementTop = $(element).offset().top;
          var elementBottom = elementTop + $(element).outerHeight();
          var viewportTop = $(window).scrollTop();
          var viewportBottom = viewportTop + $(window).height();
          return elementBottom > viewportTop && elementTop < viewportBottom;
      }
      function handleVisibility() {
          $(".stroke-heading , .stroke-heading-2, .service-svg-icon, .about-svg-icon, .strategy-svg-icon").each(function (i, listItem) {
              if (isInViewport(listItem)) {
                  $(listItem).find('.text-line-2').addClass('text-line-animation');
              } else {
                  $(listItem).find('.text-line-2').removeClass('text-line-animation');
              }
          });
      }      
      handleVisibility();      
      $(window).on("scroll", handleVisibility);
    });
  }    
  // ========= Stroke-animation When visible on view-port=========>>>>>


  //===============smooth scrolling ===================
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
    direction: 'vertical', 
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 2,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  })

  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)

  if (typeof ScrollTrigger !== 'undefined') {
    lenis.on('scroll', ScrollTrigger.update);
  }
  window.lenis = lenis;

  // =======Smooth-scroll for in-page anchor links (e.g. category jump nav)========>>>>>
  // .js-group-nav links are handled by page-specific scripts instead (e.g. products.html's scroll-grouped catalog)
  $('a[href^="#"]:not([href="#"]):not(.js-group-nav)').on('click', function (e) {
    var targetId = $(this).attr('href');
    var $target = $(targetId);
    if ($target.length) {
      e.preventDefault();
      lenis.scrollTo($target[0], { offset: -110, duration: 1.4 });
    }
  });
  // =======Smooth-scroll for in-page anchor links========>>>>>

  $(document).on('submit', '#contactForm, #callRequestForm, #downloadForm, #jobApplicationForm',function(e) {
    e.preventDefault();
    var form = $(this);
    var formData = new FormData(form.get(0));
    var responseDiv = form.find('.response');
    form.find('[type="submit"]').prop('disabled', true);
    formData.append('id', form.attr('id'));
    formData.append('lang', window.TIMAK_I18N_ENGINE ? window.TIMAK_I18N_ENGINE.getLang() : 'en');
    responseDiv.html('<p>Working....</p>');
    $.ajax({
      type: 'POST',
      url: 'mail.php',
      data: formData,
      processData: false,
      contentType: false,
      success: function(response) {
       var data = JSON.parse(response);
        if (data.error) {
          responseDiv.empty().html('<div class="alert alert-error">'+data.msg+'</div>');
        } else {
          responseDiv.empty().html('<div class="alert alert-sucess">'+data.msg+'</div>');
          form.get(0).reset();
        }
        form.find('[type="submit"]').prop('disabled', false);
      },
      error: function(error) {
        console.log('Error:', error);
        form.find('[type="submit"]').prop('disabled', false);
      }
    });
  });

  // =================  Back-To-Top =============
  if ($('.progressCounter').length > 0){
    $(".progressCounter").progressScroll();
    $(".progressCounter").on("click", function () {
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    });
    $(document).ready(function() {
      var progressElements = $('.progressScroll');
      $(window).scroll(function() {
          if ($(this).scrollTop() >= 50) {
              progressElements.addClass('progress-scroll-opacity-1');
          } else {
              progressElements.removeClass('progress-scroll-opacity-1');
          }
      });
    });
  }
  // =================  Back-To-Top =============


  // =================  Coustomizer closing =============
  if ($('[data-toggle="tooltip"]').length > 0){
    $(function () {
      $('[data-toggle="tooltip"]').tooltip({delay: { "show": 300, "hide": 300 }})
    })
  }
  // =================  Coustomizer closing ============= 

  new WOW().init();
})(jQuery);

document.addEventListener("DOMContentLoaded", function () {  
  if (window.innerWidth > 992) {
      document.querySelectorAll('.hover-menu .nav-item.dropdown').forEach(function (everyitem) {
          everyitem.addEventListener('mouseover', function (e) {
              let el_link = this.querySelector('a[data-bs-toggle]');
              if (el_link !== null) {
                  let nextEl = el_link.nextElementSibling;
                  el_link.classList.add('show');
                  if (nextEl !== null && this.contains(nextEl)) {
                      nextEl.classList.add('show');
                  }
              }
          }.bind(everyitem)); 
          everyitem.addEventListener('mouseleave', function (e) {
              let el_link = this.querySelector('a[data-bs-toggle]');
              if (el_link !== null) {
                  let nextEl = el_link.nextElementSibling;
                  if (nextEl !== null && this.contains(nextEl)) {
                      el_link.classList.remove('show');
                      nextEl.classList.remove('show');
                  }
              }
          }.bind(everyitem)); 
      });
  }  
});