angular.module('app.controllers.trade', [])

    .controller('TradeCtrl', function($scope) {

        $scope.things = [{
            id: 1,
            shown: true
        }, {
            id: 2,
            shown: false
        }, {
            id: 3,
            shown: true
        }, {
            id: 4,
            shown: false
        }, {
            id: 5,
            shown: true
        }, ];
        $scope.flipMode = function () {
            $scope.things.forEach(function (thing) {
                thing.shown = !thing.shown
            })
        };

    });

