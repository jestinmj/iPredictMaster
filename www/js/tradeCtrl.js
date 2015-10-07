
var app = angular.module('app.controllers.trade', []);

app.controller('TradeCtrl', function($scope, ContractService, $state, $stateParams,
                      $ionicHistory, PortfolioService, $ionicPopup) {

    $scope.contract = ContractService.getContract($stateParams.id);
    $scope.quantity = { stock: 1, bundle: 1 };
    $scope.tradeType = "stock";
    $scope.bundle = { name: 'OCR.10SEP15.U25', price: 10.56,
        contracts: [ ]
    };

    $scope.toggle = {
        one: true,
        two: false,
        step1: true,
        step2: false,
        step3: false,
        bunStep1: true,
        bunStep2: false,
        bunStep3: false,
        confirmButtonDisabled: true,
        buy: true,
        sell: false
    };

    $scope.toggleBuy = function(){ $scope.toggle.sell = !$scope.toggle.buy; };
    $scope.toggleSell = function(){ $scope.toggle.buy = !$scope.toggle.sell; };



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
         var totalCost = $scope.contract.buy * $scope.quantity.stock;

         // Ensures user has enough money in their account to buy stock
         if (totalCost <= PortfolioService.getMyInfo()[2].attr) {
             $scope.toggle.confirmButtonDisabled = false;
             $scope.toggle.step1 = false;
             $scope.toggle.step2 = false;
             $scope.toggle.step3 = true;

             $ionicHistory.clearCache();

             if ($scope.toggle.buy) {
                 PortfolioService.buyStock(
                     $scope.tradeType,
                     $scope.contract.id,
                     $scope.quantity.stock
                 );
             }
             else {
                 PortfolioService.sellStock(
                     $scope.tradeType,
                     $scope.contract.id,
                     $scope.quantity.stock
                 );
             }
             if ($scope.toggle.buy) {
                 PortfolioService.buyStock($scope.tradeType, $scope.contract.id, $scope.quantity.stock);
             } else if ($scope.toggle.sell) {
                 PortfolioService.sellStock($scope.tradeType, $scope.contract.id, $scope.quantity.stock);
             }
             $scope.quantity = { stock: 1, bundle: 1 };
         }
         else {
             $ionicPopup.alert({
                 title: "Not enough credit in your wallet",
                 buttons: [
                     {
                         text: 'OK',
                         type: 'button-calm button-clear'
                     },
                     {
                         text: 'Top Up',
                         type: 'button-calm button-clear',
                         onTap: function(){
                             $state.go("app.deposit_withdrawal");
                             $scope.quantity = { stock: 1, bundle: 1 };
                         }
                     }
                 ]
             });
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
         $scope.quantity.stock++;
     };

     $scope.decrStockQuantity = function(){
        if ($scope.quantity.stock > 1){
            $scope.quantity.stock--;
        }
     };

     $scope.incrBundleQuantity = function(){
         $scope.quantity.bundle++;
     };

     $scope.decrBundleQuantity = function(){
         if ($scope.quantity.bundle > 1){
             $scope.quantity.bundle--;
         }
     };

});
