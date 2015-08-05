
angular.module('app', [
  'ionic',
  'chart.js',
  'app.controllers.predictions',
  'app.controllers.portfolio',
  'app.controllers.login',
  'app.controllers.menu',
  'app.controllers.contract',
  'app.services.predictions',
  'app.services.login'
])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'MenuCtrl'
  })

  .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      }
    }
  })

  .state('app.predictions', {
    url: '/predictions',
    views: {
      'menuContent': {
        templateUrl: 'templates/predictions.html',
        controller: 'PredictionsCtrl'
      }
    }
  })

  .state('app.portfolio', {
    url: '/portfolio',
    views: {
      'menuContent': {
        templateUrl: 'templates/portfolio.html',
        controller: 'PortfolioCtrl'
      }
    }
  })

  .state('app.contract', {
    url: '/contract',
    views: {
      'menuContent': {
        templateUrl: 'templates/contract.html',
        controller: 'ContractCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/predictions');
});
