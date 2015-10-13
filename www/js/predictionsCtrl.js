angular.module('app.controllers.predictions', ['ionic'])

    .controller('PredictionsCtrl', function($scope, $ionicModal, $http, $rootScope, $state, ContractService) {

        $scope.setupCategories = function(){
            var allCats = ContractService.getAllCatgegories();
            for (var i = 0; i < allCats.length; i++){
                allCats[i].isSelected = false;
            }
            return allCats;
        };

        $scope.predic = {
            searchInput: "",
            selectedToggle: "sortBy",
        };

        $scope.sortByOptions = [
            { title: "Featured" },
            { title: "Most Traded" },
            { title: "Closing Soon" },
            { title: "Just Launched" },
            { title: "Big Movers" },
            { title: "All" }
        ];

        $scope.noContractsToDisplay = 5;

        $scope.allContracts = ContractService.getAllContracts();
        $scope.filteredContracts = ContractService.getContractsInRange(0, $scope.noContractsToDisplay);
        $scope.refinedContracts = [];

        $scope.contractsLoaded = false;

        $scope.categories = $scope.setupCategories();




        $scope.sortBy = function(index){
            $scope.closeModal();
        };

        $scope.toggleCategoryFilter = function(id){
            for (var i = 0; i < $scope.categories.length; i++){
                var catId = $scope.categories[i].id;
                if (catId === id){
                    $scope.categories[i].isSelected = !$scope.categories[i].isSelected;
                }
            }
        };

        $scope.updateContractFilters = function(){
            $scope.filteredContracts = [];
            var i, catIds = [];

            for (i = 0; i < $scope.categories.length; i++){
                if ($scope.categories[i].isSelected){
                    catIds.push($scope.categories[i].id);
                }
            }

            if (catIds.length > 0){
                for (i = 0; i < $scope.allContracts.length; i++){
                    var catId = $scope.allContracts[i].catId;
                    if (catIds.indexOf(catId) > -1){
                        $scope.filteredContracts.push($scope.allContracts[i]);
                    }
                }
            }
            else {
                $scope.filteredContracts = ContractService.getContractsInRange(0, $scope.noContractsToDisplay);
            }

            $scope.setupContractsForCards();
        };

        $scope.searchContracts = function(){
            if (!$scope.predic.searchInput){
                $scope.updateContractFilters();
                return;
            }

            var searchTerm = $scope.predic.searchInput.toLowerCase();

            var contractTitlesToSearch = [];
            for (var i = 0; i < $scope.allContracts.length; i++){
                contractTitlesToSearch.push($scope.allContracts[i].shortDesc.toLowerCase());
            }

            var foundBySearch = [];
            for (var i = 0; i < contractTitlesToSearch.length; i++){
                if (contractTitlesToSearch[i].indexOf(searchTerm) !== -1){
                    foundBySearch.push($scope.allContracts[i]);
                }
            }

            $scope.filteredContracts = foundBySearch;
            $scope.setupContractsForCards();
        };

        $scope.loadMorePredictionCards = function(){
            $scope.noContractsToDisplay += 5;
            $scope.filteredContracts = ContractService.getContractsInRange(0, $scope.noContractsToDisplay);
            if (!$scope.predic.searchInput) {
                $scope.updateContractFilters();
            }
            else {
                $scope.searchContracts();
            }
            $scope.$broadcast('scroll.infiniteScrollComplete');
        };




        $scope.setupContractsForCards = function(){
            var getChangeType = function(change){
                change = parseFloat(change);
                if (change < 0){ return "neg"; }
                else if (change > 0){ return "pos"; }
                else { return "none"; }
            };

            $scope.refinedContracts = [];
            for (var i = 0; i < $scope.filteredContracts.length; i++){
                var contract = $scope.filteredContracts[i];
                var stats = {
                    id: contract.id,
                    title: contract.shortDesc,
                    price: parseFloat(contract.buy).toFixed(2),
                    change: parseFloat(contract.buy - contract.last).toFixed(2),
                    changeType: getChangeType((contract.buy - contract.last)),
                    probability: parseFloat(0).toFixed(1),
                    highestBuy: contract.buy,
                    lowestSell: contract.sell,
                    category : contract.catId,
                    img: contract.imageName,
                    imgPlaceholder: "test1"
                };

                if (stats.title.length > 70){
                    stats.title = stats.title.substr(0, 70) + "...";
                }

                $scope.refinedContracts.push(stats);
            }
            $scope.contractsLoaded = true;
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
        ////Cleanup the modal when we're done with it!
        //$scope.$on('$destroy', function() {
        //    $scope.modal.remove();
        //});
        //// Execute action on hide modal
        //$scope.$on('modal.hidden', function() {
        //    // Execute action
        //});
        //// Execute action on remove modal
        //$scope.$on('modal.removed', function() {
        //    // Execute action
        //});

        $scope.setupContractsForCards();



        $rootScope.$on("predictionsUpdated", function(){
            $scope.setupContractsForCards();
            $scope.contractsLoaded = true;
        });

        $rootScope.$on("categoriesUpdated", function(){
            //$scope.categories = PredictionsService.getCategories();
        });


    });
