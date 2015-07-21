angular.module('app.services.predictions', [])
    .factory('PredictionsService', function(){

        var predictions = [
            {
                img: "test1",
                title: "New Zealand flag to be changed by 2018",
                price: "0.25",
                change: "0.15 (29.14%)",
                changeType: "pos",
                probability: "25.0",
                highestBuy: "0.2500",
                lowestSell: "0.2689"
            },
            {
                img: "test2",
                title: "Colin Craig to be leader of the Conservative Party on 1 August 2015.",
                price: "0.55",
                change: "0.18 (-24.64%)",
                changeType: "neg",
                probability: "55.0",
                highestBuy: "0.4500",
                lowestSell: "0.7503"
            },
            {
                img: "test1",
                title: "Average Auckland house price to be MORE than $820,000 in August 2015",
                price: "0.95",
                change: "NC (0.00%)",
                changeType: "none",
                probability: "95.0",
                highestBuy: "0.9478",
                lowestSell: "0.9500"
            },
            {
                img: "test2",
                title: "New Zealand flag to be changed by 2018",
                price: "0.25",
                change: "0.15 (29.14%)",
                changeType: "pos",
                probability: "25.0",
                highestBuy: "0.2500",
                lowestSell: "0.2689"
            },
            {
                img: "test2",
                title: "New Zealand flag to be changed by 2018",
                price: "0.25",
                change: "0.15 (29.14%)",
                changeType: "pos",
                probability: "25.0",
                highestBuy: "0.2500",
                lowestSell: "0.2689"
            },
            {
                img: "test1",
                title: "Colin Craig to be leader of the Conservative Party on 1 August 2015.",
                price: "0.55",
                change: "0.18 (-24.64%)",
                changeType: "neg",
                probability: "55.0",
                highestBuy: "0.4500",
                lowestSell: "0.7503"
            }
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