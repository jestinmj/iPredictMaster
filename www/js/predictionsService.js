angular.module('app.services.predictions', [])
    .factory('PredictionsService', function($http, $rootScope){

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

            //requestSinglePrediction: function(predictionCode){
            //    return $http.get(
            //        "https://www.ipredict.co.nz/app.php?do=api&action=stock&results=extended&stock="
            //        + predictionCode
            //    )
            //        .success(function (data) {
            //
            //        })
            //        .error(function (data) {
            //            console.log(data);
            //        })
            //},
            //
            //requestAllPredictions: function(){
            //    return $http.get(
            //        "https://www.ipredict.co.nz/app.php?do=api&action=stock&allstock=true"
            //    )
            //        .success(function(data){
            //            allPredictions = parseXML(data).contracts.contracts.contract;
            //            $rootScope.$broadcast("predictionsUpdated");
            //        })
            //        .error(function(data){
            //            console.log(data);
            //        })
            //},
            //
            //requestAllPredictionPricing: function(){
            //    return $http.get(
            //        "https://www.ipredict.co.nz/app.php?do=api&action=prices&allstock=true"
            //    )
            //        .success(function(data){
            //            predictionsPricing = parseXML(data).prices.claims.claim;
            //        })
            //        .error(function(data){
            //            console.log(data);
            //        })
            //},
            //
            //requestAllCategories: function(){
            //    return $http.get(
            //        "https://www.ipredict.co.nz/app.php?do=api&action=category"
            //    )
            //        .success(function(data){
            //            categories = parseXML(data).categories.categories.category;
            //            $rootScope.$broadcast("categoriesUpdated");
            //        })
            //        .error(function(data){
            //            console.log(data);
            //        })
            //},

            getCategories: function() {
                return categories;
            },

            getAllPredictions: function(){
                return allPredictions;
            },

            getSinglePrediction: function(name){
                console.log(name);
                for (var i = 0; i < allPredictions.length; i++){
                    console.log(allPredictions[i].name);
                    if (allPredictions[i].name === name){
                        return allPredictions[i];
                    }
                }
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