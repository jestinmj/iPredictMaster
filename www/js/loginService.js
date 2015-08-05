angular.module('app.services.login', [])
    .factory('LoginService', function(){
        var IsLoginHidden = false;
        var IsRegisterHidden = true;

        var serviceFunctions = {

            inLoginState: function(){
                return !IsLoginHidden;
            },

            inRegisterState: function(){
                return !IsRegisterHidden;
            },

            toggleState: function(){
                IsLoginHidden = !IsLoginHidden;
                IsRegisterHidden = !IsRegisterHidden;
                console.log("Toggled State to IsLoginHidden=" + IsLoginHidden + ", IsRegisterHidden=" + IsRegisterHidden);
            }

        };

        return serviceFunctions;
    });