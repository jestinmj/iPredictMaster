angular.module('app.services.login', [])
    .factory('LoginService', function(){

        // Password requirements
        var PASSWORD_MAXCHARACTERS = 15;
        var PASSWORD_MINCHARACTERS = 6;
        var PASSWORD_MINLETTERS = 1;
        var PASSWORD_MINNUMBERS = 1;

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

            // Checks if we are currently registering
            inRegisterState: function(){
                return (state === STATES_REGISTER);
            },

            // Checks if we are currently registering
            inForgotPasswordState: function(){
                return (state === STATES_FORGOTPASSWORD);
            },

            // Displays the Register section
            toggleRegisterState: function(){
                state = STATES_REGISTER;
            },

            // Displays the Login section
            toggleLoginState: function(){
                state = STATES_LOGIN;
            },

            // Displays the I Forgot my password section
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

            //
            // Checks the given password against our requirements
            // Password is between 6-15 characters
            // Contains 1 alpha-character
            // Contains 1 number
            //
            getPasswordRuleString: function(password){
                
                var rules = "";

                // Check password is within length requirements
                if( password == undefined || password == ""){
                    rules += "    - Password enter a password. \n";
                }                
                else if( password.length < PASSWORD_MINCHARACTERS ){
                    rules += "    - Password must be at least " + PASSWORD_MINCHARACTERS + " characters in length. \n";
                }
                else if( password.length > PASSWORD_MAXCHARACTERS ){
                    rules += "    - Password must be not exceed " + PASSWORD_MAXCHARACTERS + " characters in length. \n";
                }

                // Must have at least 1 letters in the password
                var letters = password.replace(/[^A-Z]/gi, "");
                var letterslength = letters.length-1;
                if( letterslength < PASSWORD_MINLETTERS ){
                    rules += "    - Password must contain at least " + PASSWORD_MINLETTERS + " letter. \n";
                }

                // Must have at least 1 numbers in the password
                var numbers = password.replace(/[^0-9]/gi, "");
                var numberslength = numbers.length-1;
                if( numberslength < PASSWORD_MINNUMBERS ){
                    rules += "    - Password must contain at least " + PASSWORD_MINNUMBERS + " number. \n";
                }                
                
                return rules;
            }
        }

        return serviceFunctions;
    });