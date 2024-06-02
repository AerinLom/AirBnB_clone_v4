$(document).ready(function() {
    var amenityObj = {};

    // Handle checkbox changes for amenities
    $('input[type="checkbox"]').change(function() {
        var amenityName = $(this).data('name');
        var amenityID = $(this).data('id');

        if ($(this).is(':checked')) {
            amenityObj[amenityName] = amenityID;
        } else {
            delete amenityObj[amenityName];
        }

        var names = Object.keys(amenityObj);
        $('div.Amenities > h4').text(names.sort().join(', '));
    });

    // Check API status
    $.get('http://0.0.0.0:5001/api/v1/status/', function(data) {
        if (data.status === 'OK') {
            $('#api_status').addClass('available');
        } else {
            $('#api_status').removeClass('available');
        }
    });

    $.ajax({
        type: 'POST',
        url: 'http://0.0.0.0:5001/api/v1/places_search/',
        contentType: 'application/json',
        data: JSON.stringify({})
      }).done(function (data) {
        for (const place of data) {
          const template = `<article>
    
            <div class="title">
    
              <h2>${place.name}</h2>
    
              <div class="price_by_night">
    
            $${place.price_by_night}
    
              </div>
            </div>
            <div class="information">
              <div class="max_guest">
            <i class="fa fa-users fa-3x" aria-hidden="true"></i>
    
            <br />
    
            ${place.max_guest} Guests
    
              </div>
              <div class="number_rooms">
            <i class="fa fa-bed fa-3x" aria-hidden="true"></i>
    
            <br />
    
            ${place.number_rooms} Bedrooms
              </div>
              <div class="number_bathrooms">
            <i class="fa fa-bath fa-3x" aria-hidden="true"></i>
    
            <br />
    
            ${place.number_bathrooms} Bathroom
    
              </div>
            </div>
            <div class="description">
    
              ${place.description}
    
            </div>
    
          </article> <!-- End 1 PLACE Article -->`;
          $('section.places').append(template);
        }
      });
    });
