angular.module('app.controllers.contract', ["chart.js"])

    .controller('ContractCtrl', function($scope, $stateParams, ContractService) {

        $scope.pageLoaded = false;

        $scope.id = $stateParams.id;

        $scope.contract = ContractService.getContract($scope.id);
        $scope.contract.change = parseFloat(
            $scope.contract.buy - $scope.contract.last).toFixed(2);
        $scope.contract.status = "Active";
        $scope.pageLoaded = true;



    });