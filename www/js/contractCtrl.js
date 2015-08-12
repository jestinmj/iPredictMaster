angular.module('app.controllers.contract', ["chart.js"])

    .controller('ContractCtrl', function($scope) {

        $scope.contractDetails={
            title:"Title",
            subtitle:"Subtitle",
            lastTradePrice:1.02,
            lastTradeTime:18.02,
            todaysVolume:1.00,
            averageDailyVolume:2,
            todaysChange:0.00,
            status:"Live",
            startDate:"00/00/00",
            endDate:"99/99/99",
            description: "Contract Description"
        };

        $scope.topBuyOrders = ["1: $0.3591","2: $0.4534","1: $3.3934","1: $1.9832"];

        $scope.topSellOrders = ["2: $0.3342","1: $0.4432","1: $1.2234","1: $1.4502"];

        $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];

        $scope.data = [
            [2, 5, 12, 14, 25, 20, 18],
            [1, 4, 6, 8, 15, 14, 8]
        ];


    });