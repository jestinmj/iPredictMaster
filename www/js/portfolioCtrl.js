angular.module('app.controllers.portfolio', ["chart.js"])

    .controller('PortfolioCtrl', function($scope) {

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

        $scope.myStocks = ["Stock One", "Stock Two", "Stock Three"];

        $scope.myShorts = ["Short One","Short Two","Short Three"];

        $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
        $scope.data = [
            [65, 59, 80, 81, 56, 55, 40],
            [28, 48, 40, 19, 86, 27, 90]
        ];

        $scope.onClick = function (points, evt) {
            console.log(points, evt);
        };

        $scope.toggleOwnStock = function() {
            $scope.toggle.ownStock = !$scope.toggle.ownStock;
        };

        $scope.toggleShortStock = function(){
            $scope.toggle.shortStock = !$scope.toggle.shortStock;
        };

        $scope.togglePerformanceGraph = function(){
            $scope.toggle.graph = !$scope.toggle.graph;
        };

    });