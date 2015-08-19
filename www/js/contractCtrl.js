angular.module('app.controllers.contract', ["chart.js"])

    .controller('ContractCtrl', function($scope) {

        $scope.contractDetails={
            title:"Title",
            subtitle:"Subtitle",
            description: "Contract Description"
        };

        $scope.infoCol={
            content :[{title:"Last trade price", content:"$"+1.02},
        {title:"Last trade time",content:"$"+18.02},
        {title:"Todays Volume",content:1},
        {title:"Average Daily Volume",content:2},
        {title:"Todays Change",content:0},
        {title:"status",content:"Live"},
        {title:"Start Date",content:"00/00/00"},
        {title:"End Date",content:"99/99/99"}]
        };

        $scope.topBuyOrders = ["1: $0.3591","2: $0.4534","1: $3.3934","1: $1.9832"];

        $scope.topSellOrders = ["2: $0.3342","1: $0.4432","1: $1.2234","1: $1.4502"];

        $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];

        $scope.data = [
            [2, 5, 12, 14, 25, 20, 18],
            [1, 4, 6, 8, 15, 14, 8]
        ];


    });