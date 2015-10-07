/**
 * Created by DanHenton on 23/09/15.
 */
angular.module('app.services.portfolio', [])
    .factory('PortfolioService', function($http, $rootScope, ContractService){

        //Vars go here

        var myInfo = [
            { title : "Rank",      attr:1,     changeInAttr: 2    },
            { title : "Worth",     attr:20.05, changeInAttr: 0.07 },
            { title : "Wallet",    attr:12.74, changeInAttr: -4.0 },
            { title : "Portfolio", attr:7.39,  changeInAttr: 0.07 }
        ];


        var stocks = [
            { id : "0004", amount : 8 },
            { id : "0001", amount : 2 },
            { id : "0003", amount : 3 },
            { id : "0006", amount : 1 },
            { id : "0010", amount : 2 },
            { id : "0012", amount : 4 }
        ];

        var shorts = [
            { id : "0005", amount : 2 },
            { id : "0002", amount : 1 },
            { id : "0004", amount : 3 },
            { id : "0009", amount : 3 },
            { id : "0011", amount : 1 }
        ];

        var myStocks = function() {

            var contracts = [];
            for (var i = 0; i < stocks.length; i++){
                var stock_contract = ContractService.getContract(stocks[i].id);
                contracts.push({
                    id          : stocks[i].id,
                    title       : stock_contract.name,
                    amount      : stocks[i].amount,
                    value       : stock_contract.buy,
                    profit      : stock_contract.buy-stock_contract.sell,
                    averageCost : 0.0,
                    lastPrice   : stock_contract.last,
                    difference  : stock_contract.buy - stock_contract.last
                });
            }
            return contracts;
        };

        var myShorts = function() {

            var contracts = [];
            for (var i = 0; i < shorts.length; i++) {
                var stock_contract = ContractService.getContract(shorts[i].id);
                contracts.push({
                    id          : shorts[i].id,
                    title       : stock_contract.name,
                    amount      : shorts[i].amount,
                    value       : stock_contract.buy,
                    profit      : stock_contract.buy - stock_contract.sell,
                    averageCost : 0.0,
                    lastPrice   : stock_contract.last,
                    difference  : stock_contract.buy - stock_contract.last
                });
            }
            return contracts;
        };


        var serviceFunctions = {

            getMyInfo: function() {
                return myInfo;
            },

            getMyStocks: function() {
                return myStocks();
            },

            getMyShorts: function() {
                return myShorts();
            },

            /**
             * Check if the user has enough money in their account, if they do
             * @param type
             * @param contractID
             * @param amount
             */
            buyStock : function(type, contractID, amount){
                var purchase_cost = ContractService.getContract(contractID).buy * amount;
                if(myInfo[2].title === "Wallet" && (myInfo[2].attr - purchase_cost >= 0)){
                    myInfo[2].attr -= purchase_cost;
                    if(type == "stock"){
                        for(i = 0; i < stocks.length; i++) {
                            if(contractID == stocks[i].id) {
                                stocks[i].amount += amount;
                                return;
                            }
                        }
                        stocks.push({id: String(contractID), amount: amount});

                    }else if(type == "short"){
                        for(i = 0 ; i < shorts.length; i++) {
                            if (contractID == shorts[i].id) {
                                shorts[i].amount += amount;
                                return;
                            }
                        }
                        shorts.push({id: String(contractID), amount: amount});
                    }
                }


            },

            /**
             *
             * @param type
             * @param contractID
             * @param amount
             * @returns the amount of stock being removed, if the amount being removed is greater than the amount of stock
             * Return the amount of stock that the user had.
             */
            sellStock : function(type, contractID, amount) {
                if (type == "stock") {
                    for (i = 0; i < stocks.length; i++) {
                        if (contractID == stocks[i].id) {
                            if (stocks[i].amount  - amount > 0) {
                                stocks[i].amount -= amount;
                                return amount;
                            } else {
                                var amt = stocks[i].amount;
                                stocks.splice(i, 1);
                                return amt;
                            }
                        }
                    }

                }else {
                    for (i = 0; i < shorts.length; i++) {
                        if (contractID == shorts[i].id) {
                            if (shorts[i].amount  - amount > 0) {
                                shorts[i].amount -= amount;
                                return amount;
                            } else {
                                var amt = stocks[i].amount;
                                shorts.splice(i, 1);
                                return amt;
                            }
                        }
                    }
                }
            }
        };

        return serviceFunctions;
    });