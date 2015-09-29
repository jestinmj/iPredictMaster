angular.module('app.controllers.menu', [])

    .controller('MenuCtrl', function($scope, $rootScope) {

    	$scope.userLoggedIn = false;

    	$rootScope.$on("loginComplete", function(){
    		$scope.userLoggedIn = true;
    	});

    });