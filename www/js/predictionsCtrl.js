angular.module('app.controllers.predictions', ['ionic'])

    .controller('PredictionsCtrl', function($scope, $ionicModal, PredictionsService) {

        $scope.predic = {
            searchInput: "",
            selectedToggle: "browse"
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

        //$scope.selectedPredToggle = "browse";

        $scope.predictions = PredictionsService.getPredictions();

        $scope.updateSearch = function(){
            console.log($scope.predic.searchInput);
        };


        $scope.changeSelectedPredToggle = function(changeTo){
            $scope.predic.selectedToggle = changeTo;
        }


        $scope.addPrediction = function(){

            var val = parseInt(Math.random() * 100);

            var newPrediction = {
                title: "New Prediction " + val,
                value: val
            };
            PredictionsService.addPrediction(newPrediction);
        }



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
