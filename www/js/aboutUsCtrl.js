/**
 * Created by Jestin on 05-08-2015.
 */
angular.module('app.controllers.aboutUs', ["ionic"])

    .controller('AboutUsCtrl', function($scope, $ionicPopup) {

        $scope.errorPopup = function(subtitle){
            $ionicPopup.alert({
                title: "Oops",
                subTitle: subtitle,
                buttons: [
                    { text: 'OK', type: 'button-calm button-clear' }
                ]
            });
        };

        $scope.sendMessagePopup = function(){
            $ionicPopup.alert({
                title: "Sent",
                subTitle: "Your message has be sent, we'll get back to you soon!",
                buttons: [
                    { text: 'OK', type: 'button-calm button-clear' }
                ]
            });
        };

        $scope.people = [
            { name: "EMILY", position: "Operations Manager", img: "emilyMabinSutton" },
            { name: "DONALD", position: "Development", img: "donaldDingwall" },
            { name: "KATE", position: "Board Member", img: "kateMcGrath" },
            { name: "PROF LEWIS", position: "Board Member", img: "profLewisEvans" },
            { name: "IAN", position: "Board Member", img: "ianMcIntosh" }
        ];

        $scope.message = {
            email: "",
            text: ""
        };


        $scope.sendMessage = function(){
            var indexOfAtSymbol = $scope.message.email.indexOf("@");
            if ($scope.message.email === ""){
                $scope.errorPopup("You forgot to enter your email address!");
            }
            else if (indexOfAtSymbol === -1 ||
                $scope.message.email.substr(indexOfAtSymbol+1).length === 0){
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