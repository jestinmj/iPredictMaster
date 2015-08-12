angular.module('app.controllers.predictions', ['ionic'])

    .controller('PredictionsCtrl', function($scope, $ionicModal, PredictionsService) {

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


        $scope.addPrediction = function(){
            var val = parseInt(Math.random() * 100);

            var newPrediction = {
                title: "New Prediction " + val,
                value: val
            };
            PredictionsService.addPrediction(newPrediction);
        };

        $scope.searchPredictions = function(){
            if ($scope.predic.searchInput === ""){
                $scope.filteredPredictions = PredictionsService.getFilteredPredictions($scope.predic.selectedFilters);
                return;
            }

            //var searchTerms = $scope.predic.searchInput.toLowerCase().split(" ");
            var searchTerm = $scope.predic.searchInput.toLowerCase();

            //var predictionsToSearch = [];
            //for (var i = 0; i < $scope.filteredPredictions.length; i++){
            //    predictionsToSearch.push($scope.filteredPredictions[i].title.toLowerCase().split(" "));
            //}
            var predictionsToSearch = [];
            for (var i = 0; i < $scope.filteredPredictions.length; i++){
                predictionsToSearch.push($scope.filteredPredictions[i].title.toLowerCase());
            }

            //var foundBySearch = [];
            //for (var i = 0; i < predictionsToSearch.length; i++){
            //    for (var j = 0; j < searchTerms.length; j++){
            //        for (var k = 0; k < predictionsToSearch[i].length; k++){
            //            if (predictionsToSearch[i][k].indexOf(searchTerms[j]) !== -1){
            //                foundBySearch.push($scope.filteredPredictions[i]);
            //                break; break;
            //            }
            //        }
            //    }
            //}
            var foundBySearch = [];
            for (var i = 0; i < predictionsToSearch.length; i++){
                if (predictionsToSearch[i].indexOf(searchTerm) !== -1){
                    foundBySearch.push($scope.filteredPredictions[i]);
                }
            }

            $scope.filteredPredictions = foundBySearch;
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
    });
