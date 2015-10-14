angular.module('app.controllers.login', [])

    .controller('LoginCtrl', function($scope, $ionicNavBarDelegate, $rootScope, $ionicPopup, $state,
                          $ionicScrollDelegate, LoginService,$ionicHistory) {

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

       
        //
        // User presses the login button
        //
        $scope.login = function(){
            var INVALID_USERNAME_LENGTH = 0;
            var INVALID_PASSWORD_LENGTH = 1;
            var INVALID_ALREADY_LOGGEDIN = 2;

            //console.log("Logging in...")
            var tradename = $scope.details_username;
            var password = $scope.details_password;
            var rememberme = $scope.details_rememberme;

            // invalid will contain all invalid filled forms.
            var invalid = [];


            // Already Logged in
            if( $rootScope.loggedInUser != undefined ){

                // Already logged in
                invalid.push(INVALID_ALREADY_LOGGEDIN);
            }
            else{
                //
                // We are currently not logged in!


                // Username
                if( $scope.checkUsernameValidity($scope.details_username) == false ){

                    // Invalid Username
                    invalid.push(INVALID_USERNAME_LENGTH);
                }

                // Passwords
                if( password.length <= 0 ){

                    // Passwords are not equal
                    invalid.push(INVALID_PASSWORD_LENGTH);
                }
            }


            //
            // Check if the forms we filled out are valid
            //
            if( invalid.length > 0 ){

                // FAILED LOGIN!
                //$scope.showWarning = true;
                $scope.warningMessage = "";

                for(var i = 0; i < invalid.length; i++){

                    // Add a new line
                    if( i > 0 ){
                        $scope.warningMessage += '<br>';
                    }

                     // Warning message for THIS error
                    var warning = "";
                    if( invalid[i] == INVALID_USERNAME_LENGTH ){
                        warning = 'Your Tradename is too short.'; 
                    }
                    if( invalid[i] == INVALID_PASSWORD_LENGTH ){
                        warning = 'You must enter a password.';
                    }
                    if( invalid[i] == INVALID_ALREADY_LOGGEDIN ){
                        warning = 'You are already logged in.';
                    }

                    if( warning != "" ){
                        $scope.warningMessage += (i+1) + ". " + warning;
                    }
                    else{
                        $scope.warningMessage += (i+1) + ". Unknown ID " + invalid[i];
                    }

                }

                // Undo passwords and acceptance
                // Prove that we are trying to sign up legitimately.
                $scope.details_password = '';
                $scope.details_passwordconfirm = '';
                $scope.displayError($scope.warningMessage);
            }
            else{

                // Acceptable details entered

                // Fake client that is received from the server 
                var fakeClient = {
                  "customData": "string",
                  "email": "string",
                  "id": "string",
                  "marketId": 0,
                  "newUser": "string",
                  "password": "string",
                  "privateKey": "string",
                  "publicKey": "string",
                  "roleGroups": "string",
                  "userProfile": "string",
                  "username": "string"
                };

                // Tell the app who is logged in
                $rootScope.loggedInUser = fakeClient;

                // Tell the app that we ARE logged in
                $rootScope.$broadcast("loginComplete");

                // Remove entered details
                $scope.details_username   = "";
                $scope.details_password   = "";
                $scope.details_rememberme = false;

                // Display notice of successfully logged in
                $scope.displayNotice("Login Successful", "portfolio");
            }
           
        };

        // 
        // User presses the register button
        //
        $scope.register = function(scope, element){
            var INVALID_ACCEPT_TERMS = 0;
            var INVALID_PASSWORDS_UNMATCH = 1;
            var INVALID_ALREADY_LOGGEDIN = 3;
            var INVALID_EMAIL_WRONG = 2;
            var INVALID_USERNAME = 4;
            var INVALID_PASSWORDS_INVALID = 5;


            // Go through the process of checking this is a valid registration


            // invalid will contain all invalid filled forms.
            var invalid = [];

            if( $rootScope.loggedInUser != undefined ){

                // Already logged in
                invalid.push(INVALID_ALREADY_LOGGEDIN);
            }
            else{
                // Not logged in alreyad!

                // Check acceptTerms
                if( $scope.details_acceptTerms == false ){

                    // Must accept terms and conditions
                    invalid.push(INVALID_ACCEPT_TERMS);
                }

                // Username
                if( $scope.checkUsernameValidity($scope.details_username) == false ){

                    // Invalid Username
                    invalid.push(INVALID_USERNAME);
                }

                // Passwords
                if( $scope.checkPasswordValidity($scope.details_password) == false){

                    // Password does not meet the requirements
                    invalid.push(INVALID_PASSWORDS_INVALID);
                }
                if( $scope.details_password != $scope.details_passwordconfirm ){

                    // Passwords are not equal
                    invalid.push(INVALID_PASSWORDS_UNMATCH);
                }

                // Check emails
                if( $scope.checkEmailValidity($scope.details_email) == false){

                    // Email is not acceptable
                    invalid.push(INVALID_EMAIL_WRONG);
                }
            }

            // Check if we have a valid registration!
            if( invalid.length > 0 ){

                // FAILED REGISTRATION!
                //$scope.showWarning = true;
                $scope.warningMessage = "";

                // Display each error
                for(var i = 0; i < invalid.length; i++ ){

                    // Add a new line
                    if( i > 0 ){
                        $scope.warningMessage += '<br><br>';
                    }

                    // Warning message for THIS error
                    var warning = "";
                    if( invalid[i] == INVALID_ACCEPT_TERMS ){
                        warning = 'Must accept the terms and conditions before continuing!'; 
                    }
                    if( invalid[i] == INVALID_PASSWORDS_UNMATCH ){
                        warning = "Passwords do not match!";
                    }
                    if( invalid[i] == INVALID_EMAIL_WRONG ){
                        warning = "Email is valid!";
                    }
                    if( invalid[i] == INVALID_ALREADY_LOGGEDIN ){
                        warning = 'You have already signed up!';
                    }
                    if( invalid[i] == INVALID_USERNAME ){
                        warning = 'Trading Name is invalid:';
                        var rules = $scope.getRulesForUsernameAsString();
                        warning += rules;
                    }
                    if( invalid[i] == INVALID_PASSWORDS_INVALID ){
                        warning = "Password must reach these requirements:";
                        var rules = $scope.getRulesForPasswordAsString();
                        warning += rules;
                    }

                    if( warning != "" ){
                        $scope.warningMessage += (i+1) + ". " + warning;
                    }
                    else{
                        $scope.warningMessage += (i+1) + ". Unknown ID " + invalid[i];
                    }
                }
                //console.log("Final Warning: " + $scope.warningMessage);


                // Undo passwords and acceptance
                // Prove that we are trying to sign up legitimately.
                $scope.details_password = '';
                $scope.details_passwordconfirm = '';
                $scope.details_acceptTerms = false;
                $scope.displayError($scope.warningMessage);
            }
            else{
                // Successful registration!
                $scope.showWarning = false;


                // Send to server
                // Waiting for API


                // Reset details
                $scope.details_acceptTerms = false;
                $scope.details_username = "";
                $scope.details_password = "";
                $scope.details_passwordconfirm = "";
                $scope.details_email = "";

                // Redirect so we can log into our new account
                $scope.changeToLogin();
                $scope.displayNotice("An email has been sent to your email for confirmation.", "predictions");
            }
        };

        // Displays a popup error message when a form is displayed incorrectly
        $scope.displayError = function(errorMessage){
            var title = "There are errors in your form!";


            var alertPopup = $ionicPopup.alert({
                title: title,
                template: errorMessage
            });
        }


        // Displays a popup error message when a form is displayed incorrectly
        $scope.displayNotice = function(note, changeView){
            var title = "";


            var alertPopup = $ionicPopup.alert({
                title: note,
                buttons: [
                    {
                        text: "OK",
                        type: "button-positive button-clear",
                        onTap: function(){
                            if (changeView === "portfolio"){
                                $state.go("app.portfolio");
                                $ionicHistory.nextViewOptions({
                                    disableBack: true
                                });
                            }
                            else if (changeView === "predictions"){
                                $state.go("app.predictions");
                                $ionicHistory.nextViewOptions({
                                    disableBack: true
                                });
                            }
                        }
                    }
                ]
            });
        }

        // Check if the given username is valid
        $scope.checkUsernameValidity = function(name){
            return LoginService.checkUsernameValidity(name);
        };

        // Get rules of password
        $scope.getRulesForPasswordAsString = function(){
            return LoginService.getPasswordRuleString($scope.details_password);
        };

        // Get rules of username
        $scope.getRulesForUsernameAsString = function(){
            return LoginService.getUsernameRuleString($scope.details_username);
        };

        // Check if the given email is valid
        $scope.checkEmailValidity = function(email){
            return LoginService.checkEmailValidity(email);
        };

        //
        // Check if the given password is valid
        //
        $scope.checkPasswordValidity = function(pass){

            // Check if we have an invalid password
            var getRules = LoginService.getPasswordRuleString(pass);

            // If we haven't received any failed rules
            //    this is a valid password.
            if( getRules == undefined || getRules == ""){
                return true;
            }

            // We received some invalid rules about the string.
            //    this password is invalid.
            return false;
        };

        //
        // We want to change the view to the login page
        // So the user is able to log in to their account
        //
        $scope.changeToLogin = function(){
            LoginService.toggleLoginState();
            $scope.showWarning = false;
            $scope.warningMessage = "";
            $ionicNavBarDelegate.title("Login");
            $ionicScrollDelegate.resize();
        };

        //
        // We want to change the view to the register page
        // The user wants to register/create a new account
        //
        $scope.changeToRegister = function(){
            LoginService.toggleRegisterState();
            $scope.showWarning = false;
            $scope.warningMessage = "";
            $ionicNavBarDelegate.title("Register");
            $ionicScrollDelegate.resize();
        };

        //
        // Change the view to 'I Forgot My Password'
        // The user can't remember their password and wants to reset
        //
        $scope.changeToForgotPassword = function(){
            LoginService.toggleForgotPasswordState();
            $scope.showWarning = false;
            $scope.warningMessage = "";
            $ionicNavBarDelegate.title("Forgot Password");
            $ionicScrollDelegate.resize();
        };

        //
        // User has asked to retrieve their password by going
        //    to "I forgot my password" and have types in their password
        //    then pressed "send"
        //
        $scope.retrievePassword = function(){
           
            // Email given to retriev password
            var email = $scope.details_forgotmypassword_email;


            if( !$scope.checkEmailValidity(email) ){
                $scope.warningMessage = "Please enter a valid email!";
                //$scope.showWarning = true;
                $scope.displayError($scope.warningMessage);
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