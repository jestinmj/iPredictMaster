angular.module('app.controllers.portfolio', ["chart.js"])

    .controller('PortfolioCtrl', function($scope, $state, PortfolioService) {

        var generateColorStyle = function(val){
            if(val > 0){
                return "#689F38";
            }else if(val< 0){
                return "#D32F2F";
            }else{
                return "#6a6a6a";
            }
        };

        // Gets stocks owned by user from service, generates background color based on
        // stock price change and does any other necessary formatting
        $scope.setupMyStocks = function(serviceStocks){
            var myStocks = [];
            var stock;

            for (var i = 0; i < serviceStocks.length; i++){
                stock = {};
                stock.id              = serviceStocks[i].id;
                stock.title           = serviceStocks[i].title;
                stock.amount          = serviceStocks[i].amount;
                stock.value           = "$" + serviceStocks[i].value.toFixed(2);
                stock.profit          = "$" + serviceStocks[i].profit.toFixed(2);
                stock.averageCost     = "$" + serviceStocks[i].averageCost.toFixed(4);
                stock.lastPrice       = "$" + serviceStocks[i].lastPrice.toFixed(4);
                stock.difference      = "$" + serviceStocks[i].difference.toFixed(4);
                stock.toggle          = false;
                stock.profitColor     = generateColorStyle(serviceStocks[i].profit);
                stock.differenceColor = generateColorStyle(serviceStocks[i].difference);
                myStocks.push(stock);
            }
            return myStocks;
        };

        // Gets shorted stocks from service, generates background color based on
        // stock price change and does any other necessary formatting
        $scope.getShortedStocks = function(serviceStocks){
            var shortedStocks = [];
            var stock;

            for (var i = 0; i < serviceStocks.length; i++){
                stock = {};
                stock.id              = serviceStocks[i].id;
                stock.title           = serviceStocks[i].title;
                stock.amount          = serviceStocks[i].amount;
                stock.value           = "$" + serviceStocks[i].value.toFixed(2);
                stock.profit          = "$" + serviceStocks[i].profit.toFixed(2);
                stock.averageCost     = "$" + serviceStocks[i].averageCost.toFixed(4);
                stock.lastPrice       = "$" + serviceStocks[i].lastPrice.toFixed(4);
                stock.difference      = "$" + serviceStocks[i].difference.toFixed(4);
                stock.toggle          = false;
                stock.profitColor     = generateColorStyle(serviceStocks[i].profit);
                stock.differenceColor = generateColorStyle(serviceStocks[i].difference);
                shortedStocks.push(stock);
            }
            return shortedStocks;
        };

        // Gets portfolio stats from service, generates background color based on
        // stat change and does any other necessary formatting
        $scope.setupPortfolioStats = function(serviceStats){
            var portfolio = [];
            var stat;

            for (var i = 0; i < 4; i++){
                stat = {};
                stat.title = serviceStats[i].title;
                if (i === 0){
                    stat.attr = "" + serviceStats[i].attr;
                    if (serviceStats[i].changeInAttr === 0){
                        stat.changeInAttr = "NC";
                    }
                    else {
                        stat.changeInAttr = "" + Math.abs(serviceStats[i].changeInAttr);
                    }
                }
                else {
                    stat.attr = "$" + serviceStats[i].attr.toFixed(2);
                    if (serviceStats[i].changeInAttr === 0){
                        stat.changeInAttr = "NC";
                    }
                    else {
                        stat.changeInAttr = "$" + Math.abs(serviceStats[i].changeInAttr);
                    }
                }
                stat.bgColor = generateColorStyle(serviceStats[i].changeInAttr);
                portfolio.push(stat);
            };
            return portfolio;
        };

        $scope.portfolioStats = $scope.setupPortfolioStats(PortfolioService.getMyInfo());
        $scope.myStocks = $scope.setupMyStocks(PortfolioService.getMyStocks());
        $scope.shortedStocks = $scope.getShortedStocks(PortfolioService.getMyShorts());


        $scope.toggle = {
            ownStock: true,
            shortStock: true,
            graph: true
        };

        $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
        $scope.data = [
            [12, 10, 7, 6, 5, 3, 1]
        ];
        $scope.onClick = function (points, evt) {
            console.log(points, evt);
        };

        $scope.toggleOwnStock = function() {
            $scope.toggle.ownStock = !$scope.toggle.ownStock;
        };

        $scope.toggleShortStock = function(){
            $scope.toggle.shortStock = !$scope.toggle.shortStock;
        };

        $scope.toggleGraph = function(){
            $scope.toggle.graph = !$scope.toggle.graph;
        };

        $scope.toggleStockAttr = function(stock) {
          stock.toggle = !stock.toggle;
        };

        $scope.tradeClick = function (contractId) {
            $state.go('app.contract', {id: contractId});
        };

        $scope.toggle_short_attr = function (short) {
            short.toggle = !short.toggle;
        };

        $scope.goToRankPage = function(index){
            if (index === 0){
                $state.go("app.rankings");
            }
        };



    });