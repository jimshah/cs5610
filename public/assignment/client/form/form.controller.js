(function(){
	'use strict';

	//Declaring sub module
	var moduleName = "form";

	// Use app's registerModule function to register a new module
	myFormApp.registerModule(moduleName);

	//Defining header controller
	angular
	.module(moduleName)
	.controller("FormController", ['$scope', '$location', '$rootScope', 'FormService', FormController]);
	
	//FormController function
	function FormController($scope, $location, $rootScope, FormService){
		$scope.$location = $location;
		$scope.user = $rootScope.user;
		console.log($scope);

		var initForms = function(){
			if ($scope.user){
				FormService.findAllFormsForUser($scope.user.id)
				.then(function(userForms){
					$scope.forms = userForms;
				})
				.catch(function(error){
					$scope.error = error;
				});
			}
		};
		initForms();
		
		$scope.addForm = function(formName){
			var _this = this;
			$scope.error = null;
			if (!formName){
				$scope.error = "Please provide the form name";
			} else if ($scope.user){
				FormService.findAllFormsForUser($scope.user.id)
				.then(function(userForms){
					$scope.forms = userForms;
					var exists = false;
					userForms.forEach(function(form, index){
						if (form.name === formName){
							exists = true;
						}
					});
					if (exists){
						$scope.error = "The entered form name for given user already exists. Please enter a different name";
					} else {
						var newFormObject = {
							name: formName
						}
						FormService.createFormForUser($scope.user.id, newFormObject)
						.then(function(newlyCreatedForm){
							$scope.forms.push(newlyCreatedForm);
							formName = _this.formName = "";
						})
						.catch(function(error){
							$scope.error = error;
						});
					}
				})
				.catch(function(error){
					$scope.error = error;
				});
			} else {
				$scope.error = "Please login to add a new form";
			}
		};

		$scope.updateForm = function(index){
			$scope.error = "";
			if (typeof index === "undefined"){
				$scope.error = "Please provide an index to select";
			} else {
				var selectedForm = $scope.forms[index];
				alert(selectedForm.name + " has to be updated in next assignment");
			}
		};

		$scope.deleteForm = function(formId){
			$scope.error = "";
			if (typeof formId === "undefined"){
				$scope.error = "Please provide an formId to delete";
			} else {
				FormService.deleteFormById(formId)
				.then(function(newFormList){
					$scope.forms = newFormList;
				})
				.catch(function(error){
					$scope.error = error;
				})
			}
		};

		$scope.selectForm = function(formName){
			$scope.error = "";
			if (!formName){
				$scope.error = "Please provide a formname for selecting";
			} else {
				var selectedForm;
				$scope.forms.forEach(function(form, index){
					if (form.name === formName){
						selectedForm = form;
					}
				});
				if (selectedForm){
					alert("Form Selected : " + JSON.stringify(selectedForm));
				} else {
					$scope.error = "no form found with name " + formName;
				}
			}			
		};

		$scope.gotoFormFields = function(form){
			//update rootscope user 
			$scope.selectedForm = $rootScope.selectedForm = form;
			//broadcast login auth event for listeners to update loggedin user 
			$rootScope.$broadcast('selectedForm', form);
			//Navigate to profile
			$location.path( "/user" );
		};

		//listen for login/sigin to grab logged in user
		$rootScope.$on("auth", function(event, user){
			$scope.error = null;
			$scope.user = $rootScope.user = user;
			if ($scope.user){
				FormService.findAllFormsForUser($scope.user.id)
				.then(function(userForms){
					$scope.forms = userForms;
				})
				.catch(function(error){
					$scope.error = error;
				});
			}
		});
		
	};

})();