$(document).ready(function() {
    var amenityObj = {};

    $('input[type="checkbox"]').change(function() {
        var amenityName = $(this).data('amenity-name');
        var amenityID = $(this).data('amenity-id');

        if ($(this).is(':checked')) {
            amenityObj[amenityName] = amenityID;
        } else {
            delete amenityObj[amenityName];
        }

        var names = Object.keys(amenityObj);
        $('div.Amenities > h4').text(names.sort().join(', '));
    });
});
