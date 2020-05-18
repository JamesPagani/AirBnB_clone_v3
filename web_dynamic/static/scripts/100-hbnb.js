document.addEventListener('DOMContentLoaded', function () {
  const amenitiesDict = {};
  $("DIV.amenities DIV.popover input[type='checkbox']").change(function () {
    if (amenitiesDict[($(this).data('id'))] === undefined) {
      amenitiesDict[($(this).data('id'))] = ($(this).data('name'));
    } else {
      delete amenitiesDict[($(this).data('id'))];
    }
    if (Object.keys(amenitiesDict).length > 0) {
      $('div.amenities > h4').text(Object.values(amenitiesDict).join(', '));
    } else {
      $('div.amenities > h4').html('&nbsp;');
    }
  });
  const statesObj = {};
  $("DIV.locations DIV.popover ul li input[type='checkbox']").change(function () {
    if (statesObj[($(this).data('id'))] === undefined) {
      statesObj[($(this).data('id'))] = ($(this).data('name'));
    } else {
      delete statesObj[($(this).data('id'))];
    }
    if (Object.keys(statesObj).length > 0) {
      $('DIV.locations > h4').text(Object.values(statesObj).join(', '));
    } else {
      $('DIV.locations > h4').html('&nbsp;');
    }
  });
//  const citiesObj = {};
//  $("DIV.locations DIV.popover ul li ul li input[type='checkbox']").change(function () {
//    if (citiesObj[($(this).data('id'))] === undefined) {
//      citiesObj[($(this).data('id'))] = ($(this).data('name'));
//    } else {
//      delete citiesObj[($(this).data('id'))];
//    }
//    if (Object.keys(citiesObj.length > 0)) {
//      $('DIV.locations > h4').text(Object.values(citiesObj).join(', '));
//    } else {
//      $('DIV.locations > h4').html('&nbsp;');
//    }
//  });

  // This code run in LocalHost Localhost!
  /*
  $.get('http://localhost:5001/api/v1/status/', function (data, textStatus) {
    if (textStatus === 'success') {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
        console.log(data.status);
      } else {
        $('#api_status').removeClass('available');
      }
    }
  });
*/
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data, textStatus) {
    if (textStatus === 'success') {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
        console.log(data.status);
      } else {
        $('#api_status').removeClass('available');
      }
    }
  });

  $.ajax({
    type: 'POST',
    url: 'http://localhost:5001/api/v1/places_search',
    data: '{}',
    contentType: 'application/json',
    success: function (data) {
      $.each(data, function (index, place) {
        $('SECTION.places').append('<article><div class="title_box"><h2>' + place.name + '</h2> <div class="price_by_night">$' + place.price_by_night + '</div></div><div class="information"><div class="max_guest">' + place.max_guest + (place.max_guest > 1 ? ' Guests' : ' Guest') + '</div><div class="number_rooms">' + place.number_rooms + (place.number_rooms > 1 ? ' Bedrooms' : ' Bedroom') + '</div><div class="number_bathrooms">' + place.number_bathrooms + (place.number_bathrooms > 1 ? ' Bathrooms' : ' Bathroom') + '</div></div><div class="description">' + place.description + '</div></article>');
      });
    }
  });

  $('BUTTON').click(function () {
    let amenities_ids = [];
    for (id in amenitiesDict) {
      amenities_ids.push(id);
    }
    const update_data = {'amenities': amenities_ids};
    $.ajax({
      type: 'POST',
      url: 'http://localhost:5001/api/v1/places_search',
      data: JSON.stringify(update_data),
      contentType: 'application/json',
      error: function (jqXHR, textStatus, errorThrown) {
	console.log('Fail: ' + textStatus + ' because you tried to pass this: ' + update_data)
      },
      success: function (data) {
	$('ARTICLE').detach();
        $.each(data, function (index, place) {
          $('SECTION.places').append('<article><div class="title_box"><h2>' + place.name + '</h2> <div class="price_by_night">$' + place.price_by_night + '</div></div><div class="information"><div class="max_guest">' + place.max_guest + (place.max_guest > 1 ? ' Guests' : ' Guest') + '</div><div class="number_rooms">' + place.number_rooms + (place.number_rooms > 1 ? ' Bedrooms' : ' Bedroom') + '</div><div class="number_bathrooms">' + place.number_bathrooms + (place.number_bathrooms > 1 ? ' Bathrooms' : ' Bathroom') + '</div></div><div class="description">' + place.description + '</div></article>');
        });
      }
    });
  });
});
