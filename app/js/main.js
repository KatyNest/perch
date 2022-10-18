$(function () {
  $(".menu-btn").on("click", function () {
    $('.mobile-menu').toggleClass('active');
  })
  $('.suggest__items').slick({

    responsive: [
      {
        breakpoint: 9999,
        settings: "unslick",
      },
     {
        breakpoint: 768,
        settings: {
          dots: true,
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
    ]
  });


  $('ul.tabs__items').on('click', 'li:not(.active)', function () {
    $(this)
      .addClass('active').siblings().removeClass('active')
      .closest('div.tabs').find('div.tabs__block').removeClass('active').eq($(this).index()).addClass('active');
  });
})
$(window).on('load', function () {
  $('.menu').slick({

    responsive: [
      {
        breakpoint: 9999,
        settings: "unslick",
      },
      {
        breakpoint: 852,
        settings: {
          dots: true,
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
    ]
  });

  /*map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 54.840226226432776, lng: 83.10895777372535},
    zoom: 17,
    mapId: 'efc0a6b52a2e0355'
    });
  const marker = new google.maps.Marker({
    position: coordinates,
    map: map,
    animation: google.maps.Animation.BOUNCE
  });    */


    // The location of Uluru
   const perch = { lat: 54.840226226432776, lng: 83.10895777372535 };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 17,
      mapId: 'efc0a6b52a2e0355',
      center: perch,
    });
    const image = "img/marker.svg";
    const marker = new google.maps.Marker({
      position: perch,
      map: map,
      icon: image,
      title="Perch",
    });
    
  
  });