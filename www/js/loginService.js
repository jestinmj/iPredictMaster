angular.module('app.services.login', [])
    .factory('LoginService', function(){


        var serviceFunctions = {

            login: function(){
                console.log("Login button pressed");

            },

            register: function(){
                console.log("Register button pressed");                
            },

            viewContracts: function(){
                console.log("View Contracts button pressed");
            }

        };

        return serviceFunctions;
    });