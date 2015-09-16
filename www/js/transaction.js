angular.module('app.controllers.deposit_withdrawal', [])

    .controller('Deposit_withdrawal', function($scope) {

        $scope.view = {
            deposit: true,
            withdrawal: true,
            card_input: true,
            payment_method: true
        };

        $scope.card = {
            name: "",
            number: "",
            date: "",
            ccv: ""
        };

        $scope.deposit_amount = null;
        $scope.withdrawal_amount = null;

        $scope.portfolio=[
            {title:"Rank", attr:1, changeInAttr:2},
            {title:"Worth", attr:+20.05, changeInAttr:0.07},
            {title:"Wallet", attr:12.74, changeInAttr:0.0},
            {title:"Portfolio", attr:7.39, changeInAttr:0.07}
        ];

        $scope.view_page = function(page){
            if(page == "deposit"){
                $scope.view.deposit = true;
                $scope.view.withdrawal = false;
            }else{
                $scope.view.withdrawal = true;
                $scope.view.deposit = false;
            }
        };

        $scope.purchase_button_press = function (amount) {
            if(amount != null) {
                console.log(" Deposited $" + amount);
            }
        };

        $scope.withdrawal_button_press = function (amount){
            if(amount != null) {
                console.log("Withdrawal $" + amount);
            }
        };

        $scope.toggle_payment_method = function(bool){
            $scope.view.payment_method = bool;
        }


    });