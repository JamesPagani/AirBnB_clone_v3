document.addEventListener('DOMContentLoaded', function () {
  const amenitiesDict = {};
  $("input[type='checkbox']").change(function () {
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
});
