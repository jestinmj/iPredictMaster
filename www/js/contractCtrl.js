angular.module('app.controllers.contract', ["chart.js"])

    .controller('ContractCtrl', function($scope, $stateParams, PredictionsService) {

        var parseXML = function(xml){
            var x2js = new X2JS();
            return x2js.xml_str2json( xml );
        };

        $scope.topBuyOrders = ["1: $0.3591","2: $0.4534","1: $3.3934","1: $1.9832"];
        $scope.topSellOrders = ["2: $0.3342","1: $0.4432","1: $1.2234","1: $1.4502"];
        $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
        $scope.data = [
            [2, 5, 12, 14, 25, 20, 18],
            [1, 4, 6, 8, 15, 14, 8]
        ];


        $scope.pageLoaded = false;

        $scope.id = $stateParams.id;
        PredictionsService.requestSinglePrediction($scope.id)
            .success(function(data){
                $scope.contract = parseXML(data).stock.claims.claim;
                $scope.contract.dateCreated = new Date($scope.contract.dateCreated);
                $scope.contract.dateDue = new Date($scope.contract.dateDue);
                $scope.contract.lastTrade = new Date($scope.contract.lastTrade);
                $scope.pageLoaded = true;
            });



    });