/**
 * Created by Jestin on 05-08-2015.
 */
angular.module('app.controllers.aboutUs', ["chart.js"])

    .controller('AboutUsCtrl', function($scope) {

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
    });