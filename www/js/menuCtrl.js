angular.module('app.controllers.menu', [])

    .controller('MenuCtrl', function($scope, $rootScope) {

    	$scope.userLoggedIn = false;
        $rootScope.loggedInUser=undefined;

    	$rootScope.$on("loginComplete", function(){
    		$scope.userLoggedIn = true;
    		
    	});

        $scope.logout = function() {
            console.log("log out");
            $scope.userLoggedIn = false;
            $rootScope.loggedInUser=undefined;}
   });