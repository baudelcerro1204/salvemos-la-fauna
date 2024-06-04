$(document).ready(function () {
  $(".custom-carousel").owlCarousel({
    autoWidth: true,
    loop: true,
    items: 1,
    margin: 10,
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

  $(".custom-carousel .item").click(function () {
    $(".custom-carousel .item").not($(this)).removeClass("active");
    $(this).toggleClass("active");
  });
});
