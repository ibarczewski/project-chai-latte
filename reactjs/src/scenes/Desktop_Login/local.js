


 var map;
 var service;
 var infowindow;
 

export const SearchResultdd = (inputText) => {                                                                                                       

var sydney = new google.maps.LatLng(-33.867, 151.195);

infowindow = new google.maps.InfoWindow();

map = new google.maps.Map(
    document.getElementById('map'), {center: sydney, zoom: 15});

var request = {
  query: inputText,
  fields: ['name', 'geometry'],
};

service = new google.maps.places.PlacesService(map);

service.findPlaceFromQuery(request, function(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
      return results;
  }
});
};