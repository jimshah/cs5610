(function(){
	'use strict';

	//Declaring sub module
	var moduleName = "field";

	// Use app's registerModule function to register a new module
	myFormApp.registerModule(moduleName);

	//Defining header controller
	angular
	.module(moduleName)
	.controller("FieldController", ['$scope', '$location', '$rootScope', 'FormService', FieldController]);
	
	//FieldController function
	function FieldController($scope, $location, $rootScope, FormService){
		$scope.$location = $location;
		$scope.user = $rootScope.user;
		$scope.fields = [];
		$scope.newFieldType = "";

		var slt = {
				"id": null, 
				"label": "New Text Field", 
				"type": "TEXT", 
				"placeholder": "New Field"
			},
			mltf = {
				"id": null, 
				"label": "New Text Field", 
				"type": "TEXTAREA", 
				"placeholder": "New Field"
			},
			date = {
				"id": null, 
				"label": "New Date Field", 
				"type": "DATE"
			},
			dropdown = {
				"id": null, 
				"label": "New Dropdown", 
				"type": "OPTIONS", 
				"options": []
			},
			checkboxes = {
				"id": null, 
				"label": "New Checkboxes", 
				"type": "CHECKBOXES", 
				"options": []
			},
			radio = {
				"id": null, 
				"label": "New Radio Buttons", 
				"type": "RADIOS", 
				"options": []
			},
			options = {
				"label": "", 
				"value": ""
			};

		$scope.newField = {
			"type": $scope.newFieldType,
			"slt": clone(slt),
			"mltf": clone(mltf),
			"date": clone(date),
			"dropdown": clone(dropdown),
			"checkboxes": clone(checkboxes),
			"radio": clone(radio)
			};

		function clone(source){
			if (source && typeof source === "object"){
				return JSON.parse(JSON.stringify(source));
			} else {
				return null;
			}
		}

		/*$scope.newField = {
			"options": ["No Fields Selected","Single Line Text Field","Multi Line Text Field","Date Field",
			"Dropdown Field","Checkboxes Field", "Radio Buttons Field"]
		};*/

		$scope.addField = function(fieldType){
			$scope.error = "";
			if (fieldType){
				console.log("fieldType",fieldType);
				$scope.newField.type = fieldType;
				var newFieldObject = clone($scope.newField[fieldType]);
				$scope.fields.push(newFieldObject);
				console.log("$scope.fields", $scope.fields);
			} else {
				$scope.error = "Please select a field type to add";
			}
		};

		//listen for login/sigin to grab logged in user
		$rootScope.$on("auth", function(event, user){
			$scope.error = null;
			$scope.user = $rootScope.user = user;

			
			/*if ($scope.user){
				FormService.findAllFormsForUser($scope.user.id)
				.then(function(userForms){
					$scope.forms = userForms;
				})
				.catch(function(error){
					$scope.error = error;
				});
	}*/
});
		
	};

})();