angular.module('app.predictionsCtrl', [])

    .controller('PredictionsCtrl', function($scope, PredictionsService) {
        $scope.predictions = PredictionsService.getPredictions();

        $scope.addPrediction = function(){

            var val = parseInt(Math.random() * 100);

            var newPrediction = {
                title: "New Prediction " + val,
                value: val
            }
            PredictionsService.addPrediction(newPrediction);
        }
    });
