
var app = angular.module('app.controllers.trade', []);

 app.controller('TradeCtrl', function($scope, ContractService, $state, $stateParams, $ionicHistory, PortfolioService) {

    $scope.contract = ContractService.getContract($stateParams.id);
    $scope.stockQuantity = 1;
    $scope.bundleQuantity = 1;
    $scope.tradeType = "stock";
    $scope.bundle = { name: 'OCR.10SEP15.U25', price: 10.56,
        contracts: [ ]
    };
    $scope.toggle = {
     buy: false,
     sell: false
    };
    $scope.toggleBuy = function(){ $scope.toggle.sell = !$scope.toggle.buy; };
    $scope.toggleSell = function(){ $scope.toggle.buy = !$scope.toggle.sell; };

    $scope.toggle = {
        one: true,
        two: false,
        step1:true,
        step2:false,
        step3:false,
        bunStep1:true,
        bunStep2:false,
        bunStep3:false,
        confirmButtonDisabled: true
    };

    // Now have two functions that change the ng-show based on the click
    $scope.showOne = function (type){
        $scope.toggle.one = true;
        $scope.toggle.two = false;
        $scope.toggle.step1 = true;
        $scope.toggle.step2 = false;
        $scope.toggle.step3 = false;
        $scope.tradeType = type;
    };

    $scope.showTwo = function (type) {
        $scope.toggle.one = false;
        $scope.toggle.two = true; // now show this one$scope.stockType = type;
        $scope.toggle.bunStep1 = true;
        $scope.toggle.bunStep2 = false;
        $scope.tradeType = type;
    };

    $scope.closeStep = function(){
        $scope.toggle.step1 = true;
        $scope.toggle.step2 = false;
        $scope.toggle.step3 = false;
        $scope.toggle.bunStep1 = true;
        $scope.toggle.bunStep2 = false;
        $scope.toggle.bunStep3 = false;
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $state.go('app.portfolio',{}, {reload: true});
    };
    $scope.enableStep2 = function(type) {
        $scope.toggle.confirmButtonDisabled = false;
        $scope.toggle.step1 = false;
        $scope.toggle.step2 = true;
        $scope.tradeType = type;

    };

     $scope.enableStep3 = function() {
         var totalCost = $scope.contract.buy * $scope.stockQuantity;
         if (totalCost <= PortfolioService.getMyInfo()[2].attr &&
                    $scope.toggle.sell || $scope.toggle.buy) {
             $scope.toggle.confirmButtonDisabled = false;
             $scope.toggle.step1 = false;
             $scope.toggle.step2 = false;
             $scope.toggle.step3 = true;

             $ionicHistory.clearCache();

             if ($scope.toggle.buy) {
                 PortfolioService.buyStock(
                     $scope.tradeType,
                     $scope.contract.id,
                     $scope.stockQuantity
                 );
             }
             else {
                 PortfolioService.sellStock(
                     $scope.tradeType,
                     $scope.contract.id,
                     $scope.stockQuantity
                 );
             }
             if ($scope.toggle.buy) {
                 PortfolioService.buyStock($scope.tradeType, $scope.contract.id, $scope.stockQuantity);
             } else if ($scope.toggle.sell) {
                 PortfolioService.sellStock($scope.tradeType, $scope.contract.id, $scope.stockQuantity);
             }
         }
     };

     $scope.enableBunStep2 = function() {
         $scope.toggle.bunStep1 = false;
         $scope.toggle.bunStep2 = true;
         $scope.toggle.bunStep3 = false;

     };

     $scope.enableBunStep3 = function() {
         $scope.toggle.bunStep1 = false;
         $scope.toggle.bunStep2 = false;
         $scope.toggle.bunStep3 = true;

     };

     $scope.incrStockQuantity = function(){
         $scope.stockQuantity++;
     };

     $scope.decrStockQuantity = function(){
        if ($scope.stockQuantity > 1){
            $scope.stockQuantity--;
        }
     };

     $scope.incrBundleQuantity = function(){
         $scope.bundleQuantity++;
     };

     $scope.decrBundleQuantity = function(){
         if ($scope.bundleQuantity > 1){
             $scope.bundleQuantity--;
         }
     };

});
