(function(){
	'use strict';

	//Declaring sub module
	var moduleName = "home";

	// Use app's registerModule function to register a new module
	app.registerModule(moduleName);

	//Defining home controller
	angular
	.module(moduleName)
	.controller("HomeController", ['$scope', '$location', '$window', function($scope, $location, $window){
		$scope.hello = "Hello Jainam..!!";
		$scope.courseName = "WebDev CS5610";
		$scope.user = {
			fname : "jnam",
			lname : "shah"
		};

		$scope.createEvent = function(){
			$location.path("/create/event");
		}

		$scope.gotoDocumentation = function(){
			$window.open('https://docs.google.com/document/d/197CFxx64LtC_VyLvU0O0UdNzAAYamC2radrpbvYZRhQ/edit?usp=sharing', '_blank');
		}
	}]);

	//Defining home controller
	angular
	.module(moduleName)
	.controller("MapViewController", ['$scope', function($scope){

		//Mock Data
		$scope.cities = [];

		//Defininf Map Options
		var mapOptions = {
			zoom: 4,
			center: new google.maps.LatLng(40.0000, -98.0000),
			mapTypeId: google.maps.MapTypeId.TERRAIN
		};

		$scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

		$scope.markers = [];

		var infoWindow = new google.maps.InfoWindow();

		//Create the marker
		var createMarker = function (info){

			var marker = new google.maps.Marker({
				map: $scope.map,
				position: new google.maps.LatLng(info.lat, info.long),
				title: info.city
			});
			marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';

			google.maps.event.addListener(marker, 'click', function(){
				infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
				infoWindow.open($scope.map, marker);
			});

			$scope.markers.push(marker);

		};

		var addMarkers = function(listOfcities){
			listOfcities = listOfcities || [];
			listOfcities.forEach(function(city){
				createMarker(city);
			});
		};

		$scope.openInfoWindow = function(e, selectedMarker){
			e.preventDefault();
			google.maps.event.trigger(selectedMarker, 'click');
		};

		var getUserLocation = function(){
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(getUserLocationCallback);
			} else {
				x.innerHTML = "Geolocation is not supported by this browser.";
			}
		};
		var getUserLocationCallback = function (position) {
			console.log("User location", position);
			var geocoder = new google.maps.Geocoder;
			var latlng = {
				lat: position.coords.latitude, 
				lng: position.coords.longitude
			};
			geocoder.geocode({'location': latlng}, function(results, status) {
				if (status === google.maps.GeocoderStatus.OK) {
					results = results || [];
					if (results[1]) {
						var cityObject = {
							city : results[1].address_components[0].long_name,//'New York',
							desc : results[1].formatted_address,
							lat : position.coords.latitude,
							long : position.coords.longitude
						};
						$scope.cities.push(cityObject);
						console.log("In CallBack", $scope.cities);
						/*map.setZoom(11);
						var marker = new google.maps.Marker({
							position: latlng,
							map: map
						});
						infowindow.setContent(results[1].formatted_address);
						infowindow.open(map, marker);*/
						console.log(results);
					} else {
						window.alert('No results found');
					}
				} else {
					console.log("reverse geocoding failed due to : "+status);
				}
			});
		};

		//Invoking functions
		getUserLocation();
	}]);

})();