$(document).ready(function() {
    var amenityObj = {};

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

    $.get('http://0.0.0.0:5001/api/v1/status/', function(data) {
        if (data.status === 'OK') {
            $('#api_status').addClass('available');
        } else {
            $('#api_status').removeClass('available');
        }
    });
});

