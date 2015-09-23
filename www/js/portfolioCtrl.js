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

        var svcPortfolio = [
            {title:"Rank", attr:1, changeInAttr: 2},
            {title:"Worth", attr:20.05, changeInAttr:0.07},
            {title:"Wallet", attr:12.74, changeInAttr:0.0},
            {title:"Portfolio", attr:7.39, changeInAttr:-0.07}
        ];

        var svcMyShorts = [
            {title:"GOLD.15APR15.HI",amount:1, value:0.10, profit:0.433, averageCost:0.00023, lastPrice:0.07500, difference:0.01409},
            {title:"GOLD.15APR15.LOW",amount:3, value:0.02, profit:0.653, averageCost:0.00023, lastPrice:0.07500, difference:0.01409},
            {title:"GOLD.15APR15.MID",amount:4, value:0.34, profit:0.064, averageCost:0.00023, lastPrice:0.07500, difference:0.01409},
            {title:"GOLD.15APR15.VHI",amount:6, value:0.32, profit:0.567, averageCost:0.00023, lastPrice:0.07500, difference:0.01409}
        ];

        var svcMyStocks = [
            {title:"GOLD.15APR15.HI", amount:2, value:0.09, profit:0.051, averageCost:0.045, lastPrice:0.07500, difference:0.01409},
            {title:"GOLD.15APR15.LOW",amount:1, value:0.23, profit:0.032, averageCost:0.034, lastPrice:0.07500, difference:0.01409},
            {title:"GOLD.15APR15.MID",amount:3, value:0.65, profit:0.454, averageCost:0.056, lastPrice:0.07500, difference:0.01409},
            {title:"GOLD.15APR15.VHI",amount:5, value:0.86, profit:0.934, averageCost:0.065, lastPrice:0.07500, difference:0.01409}
        ];


        // Gets stocks owned by user from service, generates background color based on
        // stock price change and does any other necessary formatting
        $scope.setupMyStocks = function(serviceStocks){
            var myStocks = [];
            var stock;

            for (var i = 0; i < serviceStocks.length; i++){
                stock = {};
                stock.title = serviceStocks[i].title;
                stock.amount = serviceStocks[i].amount;
                stock.value = "$" + serviceStocks[i].value.toFixed(2);
                stock.profit = "$" + serviceStocks[i].profit.toFixed(2);
                stock.averageCost = "$" + serviceStocks[i].averageCost.toFixed(4);
                stock.lastPrice = "$" + serviceStocks[i].lastPrice.toFixed(4);
                stock.difference = "$" + serviceStocks[i].difference.toFixed(4);
                stock.toggle = false;
                stock.profitColor = generateColorStyle(serviceStocks[i].profit);
                stock.differenceColor = generateColorStyle(serviceStocks[i].difference);
                myStocks.push(stock);
            }
            return myStocks;
        };

        // Gets shorted stocks from service, generates background color based on
        // stock price change and does any other necessary formatting
        $scope.getShortedStocks = function(){
            var shortedStocks = [];
            var stock;

            for (var i = 0; i < svcMyShorts.length; i++){
                stock = {};
                stock.title = svcMyShorts[i].title;
                stock.amount = svcMyShorts[i].amount;
                stock.value = "$" + svcMyShorts[i].value.toFixed(2);
                stock.profit = "$" + svcMyShorts[i].profit.toFixed(2);
                stock.averageCost = "$" + svcMyShorts[i].averageCost.toFixed(4);
                stock.lastPrice = "$" + svcMyShorts[i].lastPrice.toFixed(4);
                stock.difference = "$" + svcMyShorts[i].difference.toFixed(4);
                stock.toggle = false;
                stock.profitColor = generateColorStyle(svcMyShorts[i].profit);
                stock.differenceColor = generateColorStyle(svcMyShorts[i].difference);
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
                    stat.attr = "$" + serviceStats[i].attr;
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

        $scope.tradeClick = function (value) {
          console.log("Trade Click :" + value);
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