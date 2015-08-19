angular.module('app.controllers.predictions', ['ionic'])

    .controller('PredictionsCtrl', function($scope, $ionicModal, PredictionsService, $http, $rootScope, $state) {

        $scope.predic = {
            searchInput: "",
            selectedToggle: "sortBy",
            selectedFilters: [ 0, 1 ]
        };

        $scope.browseOptions = [
            { title: "NZ Foreign Affairs" },
            { title: "NZ Politics" },
            { title: "NZ Economics" },
            { title: "NZ Election 2017" },
            { title: "NZ Property" },
            { title: "NZ Vote Share 2017" },
            { title: "International Politics" },
            { title: "NZ Head of State" },
            { title: "NZ Pay Gaps" },
            { title: "NZ Misc Issues" },
            { title: "Pay-the-Searcher" },
            { title: "Commodities" },
            { title: "Financial Markets" },
            { title: "US Politics" },
            { title: "US Election 2016" },
            { title: "US President 2016" },
            { title: "US Economics" },
            { title: "AUS Politics" },
            { title: "Argentina Election" },
            { title: "Canadian Election" },
            { title: "European Election" },
            { title: "British Election" },
            { title: "British Politics" },
            { title: "Eurozone Crisis" },
            { title: "Science & Tech" },
            { title: "North Korea" },
            { title: "Student Issues" },
            { title: "NZ Long-Term Econ" },
            { title: "NZ Fonterra" }
        ];

        $scope.sortByOptions = [
            { title: "Featured" },
            { title: "Most Traded" },
            { title: "Closing Soon" },
            { title: "Just Launched" },
            { title: "Big Movers" },
            { title: "All" }
        ];

        $scope.categories = [];

        $scope.allPredictions = [];
        $scope.filteredPredictions = [];
        $scope.refinedPredictions = [];
        $scope.predictionsLoaded = false;


        $scope.filteredPredictions = PredictionsService.getFilteredPredictions($scope.predic.selectedFilters);


        $scope.changeSelectedPredToggle = function(changeTo){
            $scope.predic.selectedToggle = changeTo;
        };

        $scope.sortBy = function(index){
            console.log($scope.sortByOptions[index].title);
            $scope.closeModal();
        };

        $scope.filterIsSelected = function(index){
            if ($scope.predic.selectedFilters.indexOf(index) !== -1){
                return true;
            }
            return false;
        };

        $scope.toggleFilterSelector = function(index){
            var indexOfVal = $scope.predic.selectedFilters.indexOf(index);

            if (indexOfVal === -1){
                $scope.predic.selectedFilters.push(index);
            }
            else {
                $scope.predic.selectedFilters.splice(indexOfVal, 1);
            }
        };

        $scope.refilterPredictions = function(){
            $scope.filteredPredictions = PredictionsService.getFilteredPredictions($scope.predic.selectedFilters);
            $scope.closeModal();
        };

        $scope.sortBy = function(index){
            console.log($scope.sortByOptions[index].title);
            $scope.closeModal();
        };


        $scope.filterIsSelected = function(index){
            if ($scope.predic.selectedFilters.indexOf(index) !== -1){
                return true;
            }
            return false;
        };

        $scope.toggleFilterSelector = function(index){
            var indexOfVal = $scope.predic.selectedFilters.indexOf(index);

            if (indexOfVal === -1){
                $scope.predic.selectedFilters.push(index);
            }
            else {
                $scope.predic.selectedFilters.splice(indexOfVal, 1);
            }
        };

        $scope.refilterPredictions = function(){
            $scope.filteredPredictions = PredictionsService.getFilteredPredictions($scope.predic.selectedFilters);
            $scope.closeModal();
        };


        $scope.searchPredictions = function(){
            if ($scope.predic.searchInput === ""){
                $scope.filteredPredictions = $scope.allPredictions.slice(0, 10);
                $scope.setupPredictionsForCards();
                return;
            }

            var searchTerm = $scope.predic.searchInput.toLowerCase();

            var predictionTitlesToSearch = [];
            for (var i = 0; i < $scope.allPredictions.length; i++){
                predictionTitlesToSearch.push($scope.allPredictions[i].contractDetails.shortDesc.toLowerCase());
            }

            var foundBySearch = [];
            for (var i = 0; i < predictionTitlesToSearch.length; i++){
                if (predictionTitlesToSearch[i].indexOf(searchTerm) !== -1){
                    foundBySearch.push($scope.allPredictions[i]);
                }
            }

            $scope.filteredPredictions = foundBySearch;
            $scope.setupPredictionsForCards();
        };

        $scope.loadMorePredictionCards = function(){
            var listLength = $scope.refinedPredictions.length;
            for (var i = listLength; i < (listLength + 10); i++){
                $scope.filteredPredictions.push($scope.allPredictions[i]);
            }
            $scope.setupPredictionsForCards();
            $scope.$broadcast('scroll.infiniteScrollComplete');
        };




        $scope.setupPredictionsForCards = function(){
            var getChangeType = function(change){
                change = parseFloat(change);
                if (change < 0){ return "neg"; }
                else if (change > 0){ return "pos"; }
                else { return "none"; }
            };

            var calculateChangePercentage = function(price, change){
                price = parseFloat(price);
                change = parseFloat(change);
                var initialPrice = price - change;
                return Math.abs(price / (initialPrice / 100) - 100).toFixed(2);
            };

            $scope.refinedPredictions = [];
            for (var i = 0; i < $scope.filteredPredictions.length; i++){
                var stock = $scope.filteredPredictions[i];
                var stats = {
                    id: stock.name,
                    title: stock.contractDetails.shortDesc,
                    price: parseFloat(stock.bid).toFixed(2),
                    change: parseFloat(stock.todaysChange).toFixed(2),
                    changeType: getChangeType(stock.todaysChange),
                    probability: parseFloat((stock.bid) * 100).toFixed(1),
                    highestBuy: stock.bid,
                    lowestSell: stock.ask,
                    category : 0,
                    img: stock.contractDetails.imageName,
                    imgPlaceholder: "test1"
                }

                if (stats.title.length > 70){
                    stats.title = stats.title.substr(0, 70) + "...";
                }

                var changePercent = calculateChangePercentage(stats.price, stock.todaysChange);
                stats.change = Math.abs(parseFloat(stats.change)) + " (" + changePercent + "%)";
                if (stats.change === "0 (0.00%)"){ stats.change = "NC (0.00%)" }

                $scope.refinedPredictions.push(stats);
            }
        };


        $scope.openContract = function(contractId){
            $state.go('app.contract', {id: contractId});
        };



        $ionicModal.fromTemplateUrl('templates/predictionsSearch.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });
        $scope.openModal = function() {
            $scope.modal.show();
        };
        $scope.closeModal = function() {
            $scope.modal.hide();
        };
        //Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });
        // Execute action on hide modal
        $scope.$on('modal.hidden', function() {
            // Execute action
        });
        // Execute action on remove modal
        $scope.$on('modal.removed', function() {
            // Execute action
        });



        $rootScope.$on("predictionsUpdated", function(){
            $scope.allPredictions = PredictionsService.getPredictions();
            $scope.filteredPredictions = $scope.allPredictions.slice(0, 10);
            $scope.setupPredictionsForCards();
            $scope.predictionsLoaded = true;
        });

        $rootScope.$on("categoriesUpdated", function(){
            $scope.categories = PredictionsService.getCategories();
        });


        PredictionsService.requestAllPredictions();
        PredictionsService.requestAllCategories();

    });
