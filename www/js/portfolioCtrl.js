angular.module('app.controllers.portfolio', ["chart.js"])

    .controller('PortfolioCtrl', function($scope) {

        $scope.toggle={
            ownStock:true,
            shortStock: true,
            graph: true
        };

        $scope.portfolio=[
            {title:"Rank", attr:1, changeInAttr:2},
            {title:"Worth", attr:"$"+20.05, changeInAttr:"$"+0.07},
            {title:"Wallet", attr:"$"+12.74, changeInAttr:"$"+0.0},
            {title:"Portfolio", attr:7.39, changeInAttr:0.07}
        ];

        $scope.myStocks = [
            {title:"GOLD.15APR15.HI",amount:2, value:"$"+0.09, profit:"+$"+0.051, averageCost:"+$"+0.045, lastPrice:"$"+0.07500, difference:"+$"+0.01409, toggle:false},
            {title:"GOLD.15APR15.LOW",amount:1, value:"$"+0.23, profit:"+$"+0.032, averageCost:"+$"+0.034, lastPrice:"$"+0.07500, difference:"+$"+0.01409, toggle:false},
            {title:"GOLD.15APR15.MID",amount:3, value:"$"+0.65, profit:"+$"+0.454, averageCost:"+$"+0.056, lastPrice:"$"+0.07500, difference:"+$"+0.01409, toggle:false},
            {title:"GOLD.15APR15.VHI",amount:5, value:"$"+0.86, profit:"+$"+0.934, averageCost:"+$"+0.065, lastPrice:"$"+0.07500, difference:"+$"+0.01409, toggle:false}
        ];

        $scope.myShorts = [
            {title:"GOLD.15APR15.HI",amount:1, value:"$"+0.10, profit:"+$"+0.433, averageCost:"+$"+0.00023, lastPrice:"$"+0.07500, difference:"+$"+0.01409, toggle:false},
            {title:"GOLD.15APR15.LOW",amount:3, value:"$"+0.02, profit:"+$"+0.653, averageCost:"+$"+0.00023, lastPrice:"$"+0.07500, difference:"+$"+0.01409, toggle:false},
            {title:"GOLD.15APR15.MID",amount:4, value:"$"+0.34, profit:"+$"+0.064, averageCost:"+$"+0.00023, lastPrice:"$"+0.07500, difference:"+$"+0.01409, toggle:false},
            {title:"GOLD.15APR15.VHI",amount:6, value:"$"+0.32, profit:"+$"+0.567, averageCost:"+$"+0.00023, lastPrice:"$"+0.07500, difference:"+$"+0.01409, toggle:false}
        ];

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

        $scope.togglePerformanceGraph = function(){
            $scope.toggle.graph = !$scope.toggle.graph;
        };

        $scope.toggle_stock_attr = function (stock) {
          stock.toggle = !stock.toggle;
        };

        $scope.trade_click = function (value) {
          console.log("Trade Click :" + value);
        };

        $scope.toggle_short_attr = function (short) {
            short.toggle = !short.toggle;
        };


        $scope.gen_color = function(val){
          if(val > 0){
              return "#fa55fa"
          }else if(val< 0){
              return "#55fafa"
          }else{
              return "#6a6a6a"
          }
        };
    });