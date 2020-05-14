// Google Map
function initMap() {
  var location = { lat: 43.64316, lng: -79.37626 };
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 14,
    center: location,
    styles: [
      {
        featureType: "all",
        elementType: "labels.text.fill",
        stylers: [
          {
            saturation: 36,
          },
          {
            color: "#000000",
          },
          {
            lightness: 40,
          },
        ],
      },
      {
        featureType: "all",
        elementType: "labels.text.stroke",
        stylers: [
          {
            visibility: "on",
          },
          {
            color: "#000000",
          },
          {
            lightness: 16,
          },
        ],
      },
      {
        featureType: "all",
        elementType: "labels.icon",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "administrative",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#000000",
          },
          {
            lightness: 20,
          },
        ],
      },
      {
        featureType: "administrative",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#000000",
          },
          {
            lightness: 17,
          },
          {
            weight: 1.2,
          },
        ],
      },
      {
        featureType: "landscape",
        elementType: "geometry",
        stylers: [
          {
            color: "#000000",
          },
          {
            lightness: 20,
          },
        ],
      },
      {
        featureType: "poi",
        elementType: "geometry",
        stylers: [
          {
            color: "#000000",
          },
          {
            lightness: 21,
          },
        ],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#000000",
          },
          {
            lightness: 17,
          },
        ],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#000000",
          },
          {
            lightness: 29,
          },
          {
            weight: 0.2,
          },
        ],
      },
      {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [
          {
            color: "#000000",
          },
          {
            lightness: 18,
          },
        ],
      },
      {
        featureType: "road.local",
        elementType: "geometry",
        stylers: [
          {
            color: "#000000",
          },
          {
            lightness: 16,
          },
        ],
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [
          {
            color: "#000000",
          },
          {
            lightness: 19,
          },
        ],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [
          {
            color: "#000000",
          },
          {
            lightness: 17,
          },
        ],
      },
    ],
  });

  var contentString =
    '<div id="content">' +
    '<div id="inner-content">' +
    "<h6>GOOD TIMES</h6>" +
    "<p>12 Yonge Street, Toronto, ON, Canada</p>" +
    "</div>" +
    "</div>";

  var infoWindow = new google.maps.InfoWindow({
    content: contentString,
  });

  var marker = new google.maps.Marker({
    position: location,
    map: map,
    icon: "img/marker.svg",
    infoWindow: infoWindow,
  });

  google.maps.event.addListener(marker, "click", function () {
    infoWindow.open(map, marker);
  });
}

// Helper function to get form data in the supported format
function getFormDataString(formEl) {
  var formData = new FormData(formEl),
    data = [];

  for (var keyValue of formData) {
    data.push(
      encodeURIComponent(keyValue[0]) + "=" + encodeURIComponent(keyValue[1])
    );
  }

  return data.join("&");
}

// Newsletter Steps Form
var theForm = document.getElementById("newsletter-form");

new stepsForm(theForm, {
  onSubmit: function (form) {
    // hide form
    classie.addClass(theForm.querySelector(".simform-inner"), "hide");

    /*
      form.submit()
      or
      AJAX request (maybe show loading indicator while we don't have an answer..)
      */
    // Override the submit event

    // let's just simulate something...
    var messageEl = theForm.querySelector(".final-message");
    messageEl.innerHTML = "Thank you! We'll be in touch.";
    classie.addClass(messageEl, "show");

    // SEND EMAIL
    var request = new XMLHttpRequest();

    request.addEventListener("load", function () {
      if (request.status === 302) {
        // CloudCannon redirects on success
        // It worked
        console.log("Worked");
      }
    });

    request.open(theForm.method, theForm.action);
    request.setRequestHeader(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );
    request.send(getFormDataString(theForm));
  },
});

$(".owl-carousel").owlCarousel({
  loop: true,
  margin: 10,
  items: 1,
});
$(function () {
  var dtToday = new Date();

  var month = dtToday.getMonth() + 1;
  var day = dtToday.getDate();
  var year = dtToday.getFullYear();
  if (month < 10) month = "0" + month.toString();
  if (day < 10) day = "0" + day.toString();

  var maxDate = year + "-" + month + "-" + day;
  $("#date").attr("min", maxDate);
});

let telInput = $("#phone");

// initialize
telInput.intlTelInput({
  initialCountry: "auto",
  separateDialCode: true,
  hiddenInput: "Full Phone",
  preferredCountries: ["us", "gb", "br", "ru", "cn", "es", "it"],
  autoPlaceholder: "aggressive",
  utilsScript:
    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/12.1.6/js/utils.js",
  geoIpLookup: function (callback) {
    fetch(
      "https://api.ipdata.co/?api-key=a86af3a7a4a375bfa71f9259b5404149d1eabb74adcc275e4faf9dfe",
      {
        cache: "reload",
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Failed: " + response.status);
      })
      .then((ipjson) => {
        callback(ipjson.country_code);
      })
      .catch((e) => {
        callback("us");
      });
  },
});

// Preloader
(function ($) {
  "use strict";
  $(".animsition").animsition({
    inClass: "fade-in",
    outClass: "fade-out",
    linkElement:
      'a:not([target="_blank"]):not([href^="#"]):not([href$=".jpg"]):not([href$=".png"])',
    loading: true,
    loadingParentElement: "body",
    loadingClass: "animsition-loading2",
    loadingInner:
      '<div class="spinner">\n        <div class="double-bounce1"></div>\n      <div class="double-bounce2"></div>\n      </div>',
    timeout: false,
    onLoadEvent: true,
    browser: ["animation-duration", "-webkit-animation-duration"],
    overlay: false,
    overlayClass: "animsition-overlay-slide",
    overlayParentElement: "body",
    transition: function transition(url) {
      window.location.href = url;
    },
  });
})(jQuery);


if ($('#reservation-form').length) {
  $('#reservation-form').each(function(){
      $(this).validate({
          errorClass: 'error wobble-error',
          submitHandler: function(form){
              $.ajax({
                  type: "POST",
                  url:"./includes/mail.php",
                  data: $(form).serialize(),
                  success: function() {
                      document.getElementById('alert-success').style.display = 'block';
                  },

                  error: function(){
                      document.getElementById('alert-error').style.display = 'block';
                     
                  }
              });
          }
      });
  });
} 