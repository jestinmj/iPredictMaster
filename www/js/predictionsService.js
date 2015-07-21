angular.module('app.services.predictions', [])
    .factory('PredictionsService', function(){

        var predictions = [
            { title: "Prediction A", value: "1" },
            { title: "Prediction B", value: "2" },
            { title: "Prediction C", value: "3" },
            { title: "Prediction D", value: "4" },
            { title: "Prediction E", value: "5" }
        ];

        var serviceFunctions = {

            getPredictions: function(){
                return predictions;
            },

            addPrediction: function(prediction){
                predictions.push(prediction);
            }

        };

        return serviceFunctions;
    });