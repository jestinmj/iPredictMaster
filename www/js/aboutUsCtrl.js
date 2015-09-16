/**
 * Created by Jestin on 05-08-2015.
 */
angular.module('app.controllers.aboutUs', ["ionic"])

    .controller('AboutUsCtrl', function($scope, $ionicPopup) {

        $scope.errorPopup = function(subtitle){
            $ionicPopup.alert({
                title: "Oops",
                subTitle: subtitle
            });
        };

        $scope.sendMessagePopup = function(){
            $ionicPopup.alert({
                title: "Sent",
                subTitle: "Your message has be sent, we'll get back to you soon!"
            });
        };

        $scope.people = [
            { name: "DANIEL", position: "CEO", img: "" },
            { name: "JESSICA", position: "Advertising", img: "" },
            { name: "JACOB", position: "Support", img: "" },
            { name: "TESS", position: "Product Development", img: "" }
        ];

        $scope.message = {
            email: "",
            text: ""
        };


        $scope.sendMessage = function(){
            var indexOfAt = $scope.message.email.indexOf("@");
            if ($scope.message.email === ""){
                $scope.errorPopup("You forgot to enter your email address!");
            }
            else if (indexOfAt === -1 ||
                $scope.message.email.substr(indexOfAt+1).length === 0){
                $scope.errorPopup("Please enter a valid email address!");
            }
            else if ($scope.message.text === ""){
                $scope.errorPopup("You forgot to enter your message!");
            }
            else {
                $scope.sendMessagePopup();
            }
        }


    });