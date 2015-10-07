angular.module('app.services.login', [])
    .factory('LoginService', function(){

        // Password requirements
        var PASSWORD_MAXCHARACTERS = 15;
        var PASSWORD_MINCHARACTERS = 6;
        var PASSWORD_MINLETTERS = 1;
        var PASSWORD_MINNUMBERS = 1;

        // Username requirements
        var USERNAME_MINCHARACTERS = 3;


        // Possible states for the page to be in
        var STATES_LOGIN = 1;
        var STATES_REGISTER = 2;
        var STATES_FORGOTPASSWORD = 3;

        // Which state the page is currently in ( login/register/forgotpassword )
        var state = STATES_REGISTER;

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

            // Check if the given username is valid
            checkUsernameValidity: function(username){

                // Must have at least 3 characters
                if( username == undefined || Object.prototype.toString.call(username) !== '[object String]'
                        || username == "" || username.length < USERNAME_MINCHARACTERS ){
                    return false;
                }

                return true;
            },

            // Check if the given email is valid
            checkEmailValidity: function(email){

                // Must contain @
                // must contain 1 full stop ( name@server.domtain )
                if( email == undefined || Object.prototype.toString.call(email) !== '[object String]' 
                        || email == "" || email.length <= 0){
                    // Make sure we are given an email
                    return false;
                }
                else if( (email.match(new RegExp("@", "g")) || []).length != 1){ 
                    // Make sure we only have 1 @
                    return false;
                }
                else if( email.indexOf("@") < 1 ){
                    // If @ is in the first position of the array
                    // We require something before the @ symbol
                    return false;
                }
                else if( email.indexOf(".") == 0 ){
                    // Should not have a fullstop at the start of the email
                    return false;
                }
                else if( email.lastIndexOf(".") == email.length-1 ){
                    // Should not have a fullstop at the end of the email
                    return false;
                }
                else if( email.indexOf("..") > -1 ){
                    // Should not have 2 full stops
                    return false;
                }
                else if( email.substring(email.indexOf("@")).indexOf(".") < 0 ){
                    // We require having a full stop after @
                    return false;
                }
                else if( email.substring(email.indexOf("@")).indexOf(".") == email.substring(email.indexOf("@")).length-1){
                    // Can not have a full stop as the last character in an email
                    return false; 
                }

                return true;
            },

            //
            // Checks the given username against our requirements
            // Username must have at least 3 characters
            //
            getUsernameRuleString: function(username){
                
                var rules = "";

                if( username == undefined || Object.prototype.toString.call(username) !== '[object String]' 
                                          || username == ""){
                    rules += "<br>    - Must enter a Username.";
                }       
                // Check password is within length requirements
                else if( username == undefined || username == "" || username.length < USERNAME_MINCHARACTERS ){
                    rules += "<br>    - Trading Names must contain at least " + USERNAME_MINCHARACTERS + " characters.";
                }   

                // Check if the username is already in the database
                var isInDatabase = false;
                if( isInDatabase == true ){
                    rules += "<br>    - That Trading Name is already taken.";
                }                          
                
                return rules;
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
                if( password == undefined || Object.prototype.toString.call(password) !== '[object String]'
                                          || password == ""){
                    rules += "<br>    - Must enter a password.";
                }                
                else if( password.length < PASSWORD_MINCHARACTERS ){
                    rules += "<br>    - Must be at least " + PASSWORD_MINCHARACTERS + " characters in length.";
                }
                else if( password.length > PASSWORD_MAXCHARACTERS ){
                    rules += "<br>    - Must be not exceed " + PASSWORD_MAXCHARACTERS + " characters in length.";
                }

                // Must have at least 1 letters in the password
                var letters = password.replace(/[^A-Z]/gi, "");
                var letterslength = letters.length;
                if( letterslength < PASSWORD_MINLETTERS ){
                    rules += "<br>    - Must contain at least " + PASSWORD_MINLETTERS + " letter.";
                }

                // Must have at least 1 numbers in the password
                var numbers = password.replace(/[^0-9]/gi, "");
                var numberslength = numbers.length;
                if( numberslength < PASSWORD_MINNUMBERS ){
                    rules += "<br>    - Must contain at least " + PASSWORD_MINNUMBERS + " number.";
                }                
                
                return rules;
            }
        }

        return serviceFunctions;
});