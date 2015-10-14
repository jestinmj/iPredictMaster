/**
 * Created by DanHenton on 23/09/15.
 */
angular.module('app.services.portfolio', [])
    .factory('PortfolioService', function($http, $rootScope, ContractService){

        var myInfo = [
            { title: "Rank",      attr: 1,     changeInAttr: 2    },
            { title: "Worth",     attr: 20.05, changeInAttr: 0.07 },
            { title: "Wallet",    attr: 12.74, changeInAttr: -4.0 },
            { title: "Portfolio", attr: 7.39,  changeInAttr: 0.07 }
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
             * Iterates through list of myStocks and returns the stock that matches the given ID
             * @param id - Stock ID
             */
            getOwnedStockById: function(id){
                for (var i = 0; i < stocks.length; i++){
                    if (stocks[i].id === id){
                        return stocks[i];
                    }
                }
            },

            /**
             * Iterates through list of myShorts and returns the stock that matches the given ID
             * @param id - Stock ID
             */
            getShortedStockById: function(id){
                for (var i = 0; i < shorts.length; i++){
                    if (shorts[i].id === id){
                        return shorts[i];
                    }
                }
            },

            /**
             * Used to remove stock item from owned/shorted stocks
             * when user sells all of the given stock
             *
             * @param id - Stock ID
             * @param stockType - 'stock' or 'short'
             */
            removeStockFromStocksOrShorts: function(id, stockType){
                var stockList;
                if (stockType === "stock"){ stockList = stocks; }
                else if (stockType === "short"){ stockList = shorts; }

                for (var i = 0; i < stockList.length; i++){
                    if (stockList[i].id === id){
                        stockList.splice(i, 1);
                    }
                }
            },

            /**
             * Checks if the user has enough money in their account, then buys stock
             *
             * API call will need to be added here
             *
             * @param type
             * @param contractID
             * @param amount
             */
            buyStock : function(type, contractID, amount){
                var purchaseCost = ContractService.getContract(contractID).buy * amount;
                var stock, stockList;

                if (myInfo[2].attr >= purchaseCost){
                    myInfo[2].attr -= purchaseCost;

                    if (type === "stock"){
                        stock = serviceFunctions.getOwnedStockById(contractID);
                        stockList = stocks;
                    }
                    else if (type === "short"){
                        stock = serviceFunctions.getShortedStockById(contractID);
                        stockList = shorts;
                    }

                    // User already owns some of this stock
                    if (stock){ stock.amount += amount; }
                    // User doesn't own any of this stock
                    else { stockList.push({id: String(contractID), amount: amount}); }
                }
            },

            /**
             * Checks if user has enough stock to sell, then sells stock
             *
             * API call will need to be added here
             *
             * @param type
             * @param contractID
             * @param amount
             */
            sellStock : function(type, contractID, amount) {
                var saleCost = ContractService.getContract(contractID).buy * amount;
                var stock;

                if (type === "stock") {
                    stock = serviceFunctions.getOwnedStockById(contractID);
                }
                else if (type === "short") {
                    stock = serviceFunctions.getShortedStockById(contractID);
                }

                if (stock.amount >= amount) {
                    stock.amount -= amount;

                    if (stock.amount === 0){
                        serviceFunctions.removeStockFromStocksOrShorts(stock.id, type);
                    }

                    myInfo[2].attr += saleCost;
                }
            }


        };

        return serviceFunctions;
    });