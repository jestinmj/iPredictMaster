
var app = angular.module('app.controllers.trade', []);

app.controller('TradeCtrl', function($scope, ContractService, $state, $stateParams,
                      $ionicHistory, PortfolioService, $ionicPopup) {

    var tradeError = function(message, tradeType){
        var buttons = [
            { text: 'OK', type: 'button-calm button-clear' }
        ];

        if (tradeType === "buy"){
            buttons.push({
                text: 'Top Up',
                type: 'button-calm button-clear',
                onTap: function(){
                    $ionicHistory.nextViewOptions({
                        disableBack: true
                    });
                    $state.go("app.transaction");
                    $scope.quantity = { stock: 1, bundle: 1 };
                }
            });
        }

        $ionicPopup.alert({
            title: message,
            buttons: buttons
        });
    };

    $scope.contract = ContractService.getContract($stateParams.id);
    $scope.quantity = { stock: 1, bundle: 1 };
    $scope.tradeType = "";

    $scope.bundles = [
        { name: 'OCR.10SEP15.U25', price: 10.56,
            contracts: [ ] }
    ];

    $scope.selectedBundle = $scope.bundles[0];

    $scope.toggle = {
        buy: true
    };

    $scope.singleTrade = true;

    $scope.step = {
        one: true,
        two: false,
        three: false
    };

    $scope.stepOne = function(){
        $scope.step = { one: true, two: false, three: false };
        $scope.tradeType = "";
    };

    $scope.stepTwo = function(tradeType){
        $scope.step = { one: false, two: true, three: false };
        $scope.tradeType = tradeType;
    };

    $scope.stepThree = function(){
        $scope.step = { one: false, two: false, three: true };
    };

    $scope.tradeComplete = function(){
        $scope.stepOne();
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $state.go('app.portfolio',{}, {reload: true});
    };

    $scope.attemptStockTrade = function(){
        var tradeSuccessful = function(){
            $scope.toggle.confirmButtonDisabled = false;
            $scope.toggle.step1 = false;
            $scope.toggle.step2 = false;
            $scope.toggle.step3 = true;

            $ionicHistory.clearCache();
        };

        if ($scope.toggle.buy){
            var totalCost = $scope.contract.buy * $scope.quantity.stock;

            if (totalCost <= PortfolioService.getMyInfo()[2].attr){
                PortfolioService.buyStock(
                    $scope.tradeType,
                    $scope.contract.id,
                    $scope.quantity.stock
                );
                tradeSuccessful();
                $scope.stepThree();
            }
            else {
                tradeError("Not enough credit in your wallet", "buy");
            }
        }
        else {
            var stock;
            if ($scope.tradeType === "stock"){
                stock = PortfolioService.getOwnedStockById($scope.contract.id);
            }
            else if ($scope.tradeType === "short"){
                stock = PortfolioService.getShortedStockById($scope.contract.id);
            }

            if (!stock){
                tradeError("You cannot sell stock that you do not own");
            }
            else if (stock.amount >= $scope.quantity.stock){
                PortfolioService.sellStock(
                    $scope.tradeType,
                    $scope.contract.id,
                    $scope.quantity.stock
                );
                tradeSuccessful()
                $scope.stepThree();
            }
            else {
                tradeError("You cannot sell more stock than you own", "sell");
            }
        }
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
