angular.module('app.services.predictions', [])
    .factory('PredictionsService', function(){

        var allPredictions = [
            {
                img: "test1",
                title: "New Zealand flag to be changed by 2018",
                price: "0.25",
                change: "0.15 (29.14%)",
                changeType: "pos",
                probability: "25.0",
                highestBuy: "0.2500",
                lowestSell: "0.2689",
                category: 0
            },
            {
                img: "test2",
                title: "Colin Craig to be leader of the Conservative Party on 1 August 2016.",
                price: "0.55",
                change: "0.18 (-24.64%)",
                changeType: "neg",
                probability: "55.0",
                highestBuy: "0.4500",
                lowestSell: "0.7503",
                category: 0
            },
            {
                img: "test1",
                title: "Average Auckland house price to be MORE than $820,000 in August 2015",
                price: "0.95",
                change: "NC (0.00%)",
                changeType: "none",
                probability: "95.0",
                highestBuy: "0.9478",
                lowestSell: "0.9500",
                category: 0
            },
            {
                img: "test2",
                title: "New Zealand flag to be changed by 2017",
                price: "0.25",
                change: "0.15 (29.14%)",
                changeType: "pos",
                probability: "25.0",
                highestBuy: "0.2500",
                lowestSell: "0.2689",
                category: 1
            },
            {
                img: "test2",
                title: "New Zealand flag to be changed by 2016",
                price: "0.25",
                change: "0.15 (29.14%)",
                changeType: "pos",
                probability: "25.0",
                highestBuy: "0.2500",
                lowestSell: "0.2689",
                category: 1
            },
            {
                img: "test1",
                title: "Colin Craig to be leader of the Conservative Party on 1 August 2015.",
                price: "0.55",
                change: "0.18 (-24.64%)",
                changeType: "neg",
                probability: "55.0",
                highestBuy: "0.4500",
                lowestSell: "0.7503",
                category: 1
            }
        ];

        var serviceFunctions = {

            getAllPredictions: function(){
                return allPredictions;
            },

            getFilteredPredictions: function(filters){
                var category;
                var filteredPredictions = [];
                for (var i = 0; i < allPredictions.length; i++){
                    category = allPredictions[i].category;
                    if (filters.indexOf(category) !== -1){
                        filteredPredictions.push(allPredictions[i]);
                    }
                }
                return filteredPredictions;
            },

            addPrediction: function(prediction){
                allPredictions.push(prediction);
            }

        };

        return serviceFunctions;
    });