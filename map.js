

 

var map;
var service;
var infowindow;
function initMap() {
       var center = new google.maps.LatLng(54.5949592,-5.9966718);
       map = new google.maps.Map(document.getElementById("map"), {
           center: center,
           zoom: 12,
           
       });
//

       var request = {
           location: center,
           radius: 8047,
           type: []
                  
       };

       infowindow = new google.maps.InfoWindow();
       var service = new google.maps.places.PlacesService(map);

       service.nearbySearch(request, callback);

google.maps.event.addListener(map, "rightclick", function(event) {
    map.setCenter(event.LatLng)
    clearResults(markers)

    var request = {
        location: event.LatLng,
        radius: 8047,
        types: []
    };
    service.nearbySearch(request, callback);
})
}

   function callback(results, status) {
       if(status == google.maps.places.PlacesServiceStatus.OK){
           for (var i = 0; i < results.length; i++){
               createMarker(results[i]);
           }
       }
   }

   function createMarker(place) {
       var placeLoc = place.geometry.location;
       var marker = new google.maps.Marker({
           map: map,
           position: place.geometry.location
       });

       google.maps.event.addListener(marker, "click", function(){
           infowindow.setContent(place.name);
           infowindow.open(map, this);
       });
       return marker;
   }

   google.maps.event.addDomListener(window, "load", initMap);
   

 