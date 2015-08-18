angular.module('app.services.predictions', [])
    .factory('PredictionsService', function($http, $rootScope){


        //var predictions = [
        //    {
        //        img: "test1",
        //        title: "New Zealand flag to be changed by 2018",
        //        price: "0.25",
        //        change: "0.15 (29.14%)",
        //        changeType: "pos",
        //        probability: "25.0",
        //        highestBuy: "0.2500",
        //        lowestSell: "0.2689",
        //        category: 0
        //    },
        //    {
        //        img: "test2",
        //        title: "Colin Craig to be leader of the Conservative Party on 1 August 2016.",
        //        price: "0.55",
        //        change: "0.18 (-24.64%)",
        //        changeType: "neg",
        //        probability: "55.0",
        //        highestBuy: "0.4500",
        //        lowestSell: "0.7503",
        //        category: 0
        //    },
        //    {
        //        img: "test1",
        //        title: "Average Auckland house price to be MORE than $820,000 in August 2015",
        //        price: "0.95",
        //        change: "NC (0.00%)",
        //        changeType: "none",
        //        probability: "95.0",
        //        highestBuy: "0.9478",
        //        lowestSell: "0.9500",
        //        category: 0
        //    },
        //    {
        //        img: "test2",
        //        title: "New Zealand flag to be changed by 2017",
        //        price: "0.25",
        //        change: "0.15 (29.14%)",
        //        changeType: "pos",
        //        probability: "25.0",
        //        highestBuy: "0.2500",
        //        lowestSell: "0.2689",
        //        category: 1
        //    },
        //    {
        //        img: "test2",
        //        title: "New Zealand flag to be changed by 2016",
        //        price: "0.25",
        //        change: "0.15 (29.14%)",
        //        changeType: "pos",
        //        probability: "25.0",
        //        highestBuy: "0.2500",
        //        lowestSell: "0.2689",
        //        category: 1
        //    },
        //    {
        //        img: "test1",
        //        title: "Colin Craig to be leader of the Conservative Party on 1 August 2015.",
        //        price: "0.55",
        //        change: "0.18 (-24.64%)",
        //        changeType: "neg",
        //        probability: "55.0",
        //        highestBuy: "0.4500",
        //        lowestSell: "0.7503",
        //        category: 1
        //    }
        //];
        var allPredictions = [];
        var predictionsPricing = [];
        var categories = [];

        var parseXML = function(xml){
            var x2js = new X2JS();
            return x2js.xml_str2json( xml );
        };

        var serviceFunctions = {

            getPredictions: function(){
                return allPredictions;
            },

            getPredictionsPricing: function(){
                return predictionsPricing;
            },

            getFilteredPredictions: function(filters){
                var category;
                var filteredPredictions = [];
                for (var i = 0; i < allPredictions.length; i++){
                    category = allPredictions[i].category;
                    if (filters.indexOf(category) !== -1){
                        filteredPredictions.push(predictions[i]);
                    }
                }
                return filteredPredictions;
            },

            requestSinglePrediction: function(predictionCode){
                return $http.get(
                    "https://www.ipredict.co.nz/app.php?do=api&action=stock&results=extended&stock="
                    + predictionCode
                )
                    .success(function (data) {
                        allPredictions.push(parseXML(data).stock.claims.claim);
                        console.log(allPredictions[0])
                        $rootScope.$broadcast("predictionsUpdated");
                    })
                    .error(function (data) {
                        console.log(data);
                    })
            },

            requestAllPredictions: function(){
                //var promises = [];
                //for (var i = 0; i < predictionsPricing.length; i++) {
                //    promises.push(
                //        $http.get(
                //            "https://www.ipredict.co.nz/app.php?do=api&action=stock&results=extended&stock=" +
                //            predictionsPricing[i]._stock
                //        )
                //            .success(function (data) {
                //                allPredictions = parseXML(data).stock.claims.claim;
                //            })
                //            .error(function (data) {
                //                console.log(data);
                //            })
                //    );
                //}
                //$q.all(promises).then(function(){
                //    return allPredictions;
                //});
                return $http.get(
                    "https://www.ipredict.co.nz/app.php?do=api&action=stock&allstock=true"
                )
                    .success(function(data){
                        allPredictions = parseXML(data).contracts.contracts.contract;
                        $rootScope.$broadcast("predictionsUpdated");
                    })
                    .error(function(data){
                        console.log(data);
                    })
            },

            requestAllPredictionPricing: function(){
                return $http.get(
                    "https://www.ipredict.co.nz/app.php?do=api&action=prices&allstock=true"
                )
                    .success(function(data){
                        predictionsPricing = parseXML(data).prices.claims.claim;
                    })
                    .error(function(data){
                        console.log(data);
                    })
            },

            requestAllCategories: function(){
                return $http.get(
                    "https://www.ipredict.co.nz/app.php?do=api&action=category"
                )
                    .success(function(data){
                        categories = parseXML(data).categories.categories.category;
                        $rootScope.$broadcast("categoriesUpdated");
                    })
                    .error(function(data){
                        console.log(data);
                    })
            },

            getCategories: function() {
                return categories;
            },

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