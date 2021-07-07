
$(document).ready(function () {
  $('#autoWidth').lightSlider({
    autoWidth: false,
    loop: true,
    onSliderLoad: function () {
      $('#autoWidth').removeClass('cS-hidden');


    }

  });
  const mediaQuery = window.matchMedia('(max-width: 992px)')
  if (mediaQuery.matches) {
    console.log("query aktif")
    $('#autoWidth').lightSlider({
      autoWidth: true,
      loop: false,
      slideMargin: 650,
      speed: 8000,
      pause: 4000,
      auto: false,
      item: 1,

      onSliderLoad: function () {
        $('#autoWidth').removeClass('cS-hidden');

      }

    });
  }
});

// var swiper = new Swiper('.swiper-container', {
//     direction: 'horizontal',
//    
//     mousewheel: true,
//     freeMode: true,
//   });

var swiper = new Swiper('.swiper-container', {
  slidesPerView: 1,
  spaceBetween: 10,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  }
})




