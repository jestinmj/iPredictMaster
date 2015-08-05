angular.module('app.controllers.login', [])

    .controller('LoginCtrl', function($scope, LoginService) {

        $scope.details_username = ''; // Add ng-model="details_username" to textfield
        $scope.details_password = ''; // Add ng-model="details_passworde" to textfield
        $scope.details_rememberme = false; // Add ng-model="details_rememberme" to checkbox

        // TODO
        // Get Email working
        $scope.details_email = '';
        $scope.details_acceptTerms = false;
        $scope.details_passworconfirm = "";
		$scope.loginButtonPressed = function(){
            console.log("Logging in...")
            console.log("Username: " + $scope.details_username);
            console.log("Password: " + $scope.details_password);
            console.log("Rememberme: " + $scope.details_rememberme);
        };

        $scope.registerButtonPressed = function(){
        	console.log("Registering...");
        	console.log("Username: " + $scope.details_username);
            console.log("Password: " + $scope.details_password);
            console.log("Rememberme: " + $scope.details_rememberme);
        };

        $scope.changeStateButtonPressed = function(){
            LoginService.toggleState();
        };

        $scope.isLoggingIn = function(){
        	//Add to div that we want to show on start: "isLoggingIn()"
        	return LoginService.inLoginState();
        };

        $scope.isRegistering = function(){
        	//Add to div that we want to HIDE on start: ng-hide="isRegistering())"
        	return LoginService.inRegisterState();
        }
    });