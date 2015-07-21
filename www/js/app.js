
angular.module('app', [
  'ionic',
  'app.controllers.predictions',
  'app.controllers.portfolio',
  'app.controllers.menu',
  'app.services.predictions'
])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'MenuCtrl'
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
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/predictions');
});
