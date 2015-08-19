/**
 * Created by Jestin on 05-08-2015.
 */
angular.module('app.controllers.aboutUs', ["ionic"])

    .controller('AboutUsCtrl', function($scope, $ionicPopup, $timeout) {

        $scope.toggle={
            ownStock:true,
            shortStock: true,
            graph: true
        };

        $scope.portfolio={
            myRank:1,
            changeInRank:2,
            myWorth:20.05,
            changeInWorth:0.07,
            myWallet:12.74,
            changeInWallet:"NC",
            myPortfolio:7.39,
            changeInPortfolio:0.07
        };

        $scope.onClickSubmit=function(){
            var alertPopup = $ionicPopup.alert({
                title: 'Messsage Sent!!',
                subTitle: 'Will get back to you soon <i class="icon ion-person-stalker"></i>'
            });
        };
    });