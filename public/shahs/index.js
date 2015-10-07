(function(){

  var myMap;

  //Loads a map on screen
  function initializeMap(){

  //gets users current location
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPositionCallBack);
    } else { 
      console.log("Geolocation is not supported by this browser.");
    }
  }

  //stores user coords and invokes drawMap
  function showPositionCallBack(position) {
    var lat = position.coords.latitude || 51.508742;
    var long = position.coords.longitude || -0.120850;
    drawMap(lat, long);
  }

    /*
     * paints google maps with given (lat, long)
     */
     function drawMap(lat, long) {
      var mapProp = {
        center:new google.maps.LatLng(lat,long),
        zoom:10,
        mapTypeId:google.maps.MapTypeId.ROADMAP
      };
      myMap = new google.maps.Map(document.getElementById("googleMap"), mapProp);
    }

    /*
     * retrieving the location, initiates the process
     */
     getLocation();
   };

  /*
   * geoCode given Address
   */
   function geoCodeAddress() {
    var address = "79 Florence Street Malden MA 02148 USA"; //document.getElementById("address").value;
    var geocoder = new google.maps.Geocoder();

    function codeAddress() {
      geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          console.log("geoLocated Address is : "+ JSON.stringify(results));

          myMap.setCenter(results[0].geometry.location);
          var marker = new google.maps.Marker({
            map: myMap,
            position: results[0].geometry.location
          });
        } else {
          alert("Geocode was not successful for the following reason: " + status);
        }});
    }

    codeAddress();
  };

  function callStaticGeoLocation(){

    //This is Takis
    //var apiKey = "AIzaSyBS9GLNX5kK5hyCpWYio22DECKEFnlJPcY";
    var apiKey = "AIzaSyDPwM_LNXRqi9LKlQVgfhoqOHxUqls47dA";
    var geoCodeRequestUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=Toledo&region=es&key="+apiKey;

    function loadDoc() {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          console.log("staticGeoResponse", xhttp.responseText);
          //document.getElementById("demo").innerHTML = xhttp.responseText;
        }
      }
      xhttp.open("GET", geoCodeRequestUrl, true);
      xhttp.send();
    };

    loadDoc();
  };

  //Invokes
  initializeMap();
  geoCodeAddress();

})();