/**

 * Created by Jestin on 05-08-2015.

 */

angular.module('app.controllers.rankings', ["ionic"])

    .controller('RankingsCtrl', function($scope) {

        $scope.getListBackgroundColor = function(index){
            var col = ""
            if (index % 2 === 0){
                col = "#eeeeee"
            }
            return { backgroundColor : col };
        };

        $scope.toggleRankingType = function(type){
            $scope.rankingType = type;
        };

        $scope.rankingType = "roi";

        $scope.generateMockRankings = function(){
            var names = [
                "John", "Sarah", "Jake", "Bob", "Peter"
            ];
            var getChangeColor = function(change){
                if (change < 0){ return "#D32F2F"; }
                else if (change > 0){ return "#689F38"; }
                else { return "#212121"; }
            };
            var formatNetWorth = function(x){
                return x.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            };
            var formatRoi = function(x){
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }


            $scope.traders = [];
            for (var i = 0; i < 20; i++){
                $scope.traders.push({
                    rank: i+1,
                    name: names[parseInt(Math.random()*5)],
                    netWorth: parseInt(Math.random()*10000000),
                    roi: parseInt(Math.random()*20000000) - 10000000,
                    roiChange: parseInt(Math.random()*200) - 100,
                    netChange: parseInt(Math.random()*200) - 100
                });
                $scope.traders[i].changeRoiColor =
                    getChangeColor($scope.traders[i].roiChange);
                $scope.traders[i].changeNetColor =
                    getChangeColor($scope.traders[i].netChange);
                $scope.traders[i].absRoiChange =
                    Math.abs($scope.traders[i].roiChange);
                $scope.traders[i].absNetChange =
                    Math.abs($scope.traders[i].netChange);
                $scope.traders[i].formattedNetWorth =
                    formatNetWorth($scope.traders[i].netWorth);
                $scope.traders[i].formattedRoi =
                    formatRoi($scope.traders[i].roi);
            }
        };

        $scope.generateMockRankings();

    });

