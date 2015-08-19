angular.module('app.services.login', [])
    .factory('LoginService', function(){
        var PASSWORD_MAXCHARACTERS = 8;
        var PASSWORD_MAXCAPITALLETTERS = 2;
        var PASSWORD_MAXNUMBERS = 2;

        // Possible states for the page to be in
        var STATES_LOGIN = 1;
        var STATES_REGISTER = 2;
        var STATES_FORGOTPASSWORD = 3;

        // Which state the page is currently in ( login/register/forgotpassword )
        var state = STATES_LOGIN;

        var serviceFunctions = {

            // Checks if we are currently in the login state
            inLoginState: function(){
                return (state === STATES_LOGIN);
            },

            reset: function(){
                console.log("RESET");
            },

            // Checks if we are currently registering
            inRegisterState: function(){
                return (state === STATES_REGISTER);
            },

            // Checks if we are currently registering
            inForgotPasswordState: function(){
                return (state === STATES_FORGOTPASSWORD);
            },

            toggleRegisterState: function(){
                state = STATES_REGISTER;
            },

            toggleLoginState: function(){
                state = STATES_LOGIN;
            },

            toggleForgotPasswordState: function(){
                state = STATES_FORGOTPASSWORD;
            },

            // Check if the given email is valid
            checkUsernameValidity: function(name){

                // Must contain @
                if( name.length == 0 ){
                    return false;
                }

                // Check for name restrictions ( only characters[a-z] and numbers? )

                // Check if username already exists

                
                return true;
            },

            // Check if the given email is valid
            checkEmailValidity: function(email){

                // Must contain @
                if( email.length == 0 ){
                    return false;
                }
                else if( email.indexOf("@") < 1 ){
                    return false;
                }

                return true;
            },

            // Check if the given email is valid
            checkPasswordValidity: function(password){
                if( password == undefined ){
                    return false;
                }

                if( password.length < PASSWORD_MAXCHARACTERS ){
                    return false;
                }

                // Must have at least 2 capital letters
                if( (password.split("/[A-Z]/").length-1) < PASSWORD_MAXCAPITALLETTERS ){
                    return false;
                }

                // Must have at least 2 numbers
                if( password.split("[0-9]").length-1 < PASSWORD_MAXNUMBERS ){
                    return false;
                }

                return true;
            },

            getPasswordRuleString: function(password){
                var rules = "";

                if( password.length < PASSWORD_MAXCHARACTERS ){
                    rules += "    - Password must be at least " + PASSWORD_MAXCHARACTERS + " characters in length. \n";
                    //console.log("Failed length");
                }
                
                var caps = 0;//$scope.countCaps(password);//password.split("[A-Z]");
                var nums = 0;//$scope.countNumbers(password);//password.match(/(\d+)/g);

                if( caps < PASSWORD_MAXCAPITALLETTERS ){
                    rules += "    - Must have more than " + PASSWORD_MAXCAPITALLETTERS + " capital letters. \n";
                    //console.log("Failed Caps: " + caps);
                }

                
                if( nums < PASSWORD_MAXNUMBERS){
                    rules += "    - Must have more than " + PASSWORD_MAXNUMBERS + " numbers.";
                }
                //console.log("Failed numbers: " + nums );
                
                
                return rules;
            },

            countNumbers: function(sentence){
                var count = 0;
                for( var i = 0; i < sentence; i++){
                    if( $scope.isInt(sentence[i]) ){
                        count++;
                    }
                }
                return count;
            },
            countCaps: function(sentence){
                var count = 0;
                for( var i = 0; i < sentence; i++){
                    if( $scope.isLetter(sentence[i]) ){
                        count++;
                    }
                }
                return count;
            },
            isInt: function(value){
                var x;
                if (isNaN(value)) {
                    return false;
                }
                x = parseFloat(value);
                return (x | 0) === x;
            },
            isLetter: function(value){
                var x = value.charCodeAt(0);
                if( ((code >= 97) && (code <= 122)) ){
                    return true;
                }
                return false;
            }
        }

        return serviceFunctions;
    });