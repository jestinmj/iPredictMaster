angular.module('app.controllers.login', [])

    .controller('LoginCtrl', function($scope, LoginService) {

        $scope.showWarning = false;
        $scope.warningMessage = '';

        // Login
        $scope.details_rememberme = false; // Add ng-model="details_rememberme" to checkbox

        // Login & Register
        $scope.details_username = ''; // Add ng-model="details_username" to textfield
        $scope.details_password = ''; // Add ng-model="details_passworde" to textfield

        // Register
        $scope.details_email = '';
        $scope.details_acceptTerms = false;
        $scope.details_passwordconfirm = ""; // Modify login.html to use this!

        // I Forgot my password
        $scope.details_forgotmypassword_email = '';

		$scope.login = function(){
            //console.log("Logging in...")
            //console.log("Username: " + $scope.details_username);
            //console.log("Password: " + $scope.details_password);
            //console.log("Rememberme: " + $scope.details_rememberme);
        };

        $scope.register = function(scope, element){
        	//console.log("Registering...");
            //console.log("Username: " + $scope.details_username);
            //console.log("Password: " + $scope.details_password);
            //console.log("Password Confirmation: " + $scope.details_passwordconfirm);
            //console.log("Email: " + $scope.details_email);
            //console.log("Terms: " + $scope.details_acceptTerms);

            var INVALID_ACCEPT_TERMS = 0;
            var INVALID_PASSWORDS_UNMATCH = 1;
            var INVALID_EMAIL_WRONG = 2;
            var INVALID_USERNAME = 4;
            var INVALID_PASSWORDS_INVALID = 5;
            var invalid = [];

            // Check acceptTerms
            if( $scope.details_acceptTerms == false ){
                // Must accept terms and conditions
                invalid.push(INVALID_ACCEPT_TERMS);
            }

            // Username
            if( $scope.checkUsernameValidity($scope.details_username) == false ){

                // Invalid Username
                invalid.push(INVALID_USERNAME);
                var x = angular.element(document.querySelector('#user'));
                //console.log(x);
                //x[0].css.backgroundColor = "red";
            }

            // Passwords
            if( $scope.checkPasswordValidity($scope.details_password) == false){
                // Passwords are not equal
                invalid.push(INVALID_PASSWORDS_INVALID);
                console.log("Invalid Password: " + $scope.details_password);
            }
            if( $scope.details_password != $scope.details_passwordconfirm ){
                // Passwords are not equal
                invalid.push(INVALID_PASSWORDS_UNMATCH);

                console.log("Unmatching Passwords: " + $scope.details_password + " " + $scope.details_passwordconfirm);
            }

            // Check emails
            if( $scope.checkEmailValidity($scope.details_email) == false){
                // Email is not acceptable
                invalid.push(INVALID_EMAIL_WRONG);
            }

            // Check if we have a valid registration!
            if( invalid.length > 0 ){

                // FAILED REGISTRATION!
                //console.log("Invalid: " + invalid.length);
                $scope.showWarning = true;
                $scope.warningMessage = "WARNING! There are errors in your form!";

                // Display each error
                for(var i = 0; i < invalid.length; i++ ){

                    // Add a new line
                    if( $scope.warningMessage.length > 0 ){
                        $scope.warningMessage += '\n';
                    }

                    // Warning message for THIS error
                    var warning = "";
                    if( invalid[i] == INVALID_ACCEPT_TERMS ){
                        warning = "You must accept the terms and conditions before continuing!"; 
                    }
                    if( invalid[i] == INVALID_PASSWORDS_UNMATCH ){
                        warning = "The passwords do not match!";
                    }
                    if( invalid[i] == INVALID_USERNAME ){
                        warning = "That username is already being used!";
                    }
                    if( invalid[i] == INVALID_PASSWORDS_INVALID ){
                        warning = "Password must reach these requirements:\n";
                        var rules = $scope.getRulesForPasswordAsString();
                        warning += rules;
                    }

                    if( warning != "" ){
                        $scope.warningMessage += (i+1) + ". " + warning;
                    }
                }
                //console.log("Final Warning: " + $scope.warningMessage);


                // Undo passwords and acceptance
                // Prove that we are trying to sign up legitimately.
                $scope.details_password = '';
                $scope.details_passwordconfirm = '';
                $scope.details_acceptTerms = false;
            }
            else{
                // Successful registration!
                $scope.showWarning = false;
            }
        };

        // Check if the given username is valid
        $scope.checkUsernameValidity = function(name){
            return LoginService.checkUsernameValidity(name);
        };

        // Get rules of password
        $scope.getRulesForPasswordAsString = function(){
            return LoginService.getPasswordRuleString($scope.details_password);
        };

        // Check if the given email is valid
        $scope.checkEmailValidity = function(email){

            return LoginService.checkEmailValidity(email);
        };

        // Check if the given password is valid
        $scope.checkPasswordValidity = function(pass){

            return LoginService.checkPasswordValidity(pass);
        };

        $scope.changeToLogin = function(){
            LoginService.toggleLoginState();
        };

        $scope.changeToRegister = function(){
            LoginService.toggleRegisterState();
        };

        $scope.changeToForgotPassword = function(){
            LoginService.toggleForgotPasswordState();
        };

        $scope.retrievePassword = function(){
            // User has asked to retrieve their password by going
            //    to "I forgot my password" and have types in their password
            //    then pressed "send"

                        
            // Email given to retriev password
            var email = $scope.details_forgotmypassword_email;


            if( !checkEmailValidity(email) ){
                $scope.warningMessage = "WARNING! There are errors in your form!" + '\n';
                $scope.warningMessage += "Please enter a valid email!";
                $scope.showWarning = true;
            }
        };

        // Function that returns true/false if we are currently logging in.
        $scope.isLoggingIn = function(){
        	return LoginService.inLoginState();
        };

        // Function that returns true/false if we are currently registating
        $scope.isRegistering = function(){
        	return LoginService.inRegisterState();
        }

        // Function that returns true/false if we are currently getting our password
        $scope.isRetreivingPassword = function(){
            return LoginService.inForgotPasswordState();
        }
    });