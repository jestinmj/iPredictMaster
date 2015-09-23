
angular.module('app', [
  'ionic',
  'chart.js',
  'app.controllers.predictions',
  'app.controllers.portfolio',
  'app.controllers.login',
  'app.controllers.menu',
  'app.controllers.contract',
  'app.controllers.aboutUs',
  'app.controllers.rankings',
  'app.controllers.termsOfService',
  'app.controllers.trade',
  'app.controllers.deposit_withdrawal',
  'app.services.predictions',
  'app.services.portfolioServices',
  'app.services.contractServices',
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
        controller: 'LoginCtrl',
        cache: false
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
    url: '/contract/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/contract.html',
        controller: 'ContractCtrl'
      }
    }
  })

  .state('app.rankings', {
     url: '/rankings',
     views: {
        'menuContent': {
        templateUrl: 'templates/rankings.html',
        controller: 'RankingsCtrl'
       }
     }
  })

  .state('app.trade', {
      url: '/trade',
      views: {
          'menuContent': {
              templateUrl: 'templates/trade.html',
              controller: 'TradeCtrl'
          }
      }
  })
  .state('app.termsOfService', {
      url: '/termsOfService',
      views: {
          'menuContent': {
              templateUrl: 'templates/termsOfService.html',
              controller: 'TermsOfServiceCtrl'
          }
      }
  })

  .state('app.aboutUs', {
      url: '/aboutUs',
      views: {
          'menuContent': {
              templateUrl: 'templates/aboutUs.html',
              controller: 'AboutUsCtrl'
          }
      }
  })

  .state('app.deposit_withdrawal', {
      url: '/deposit_withdrawal',
      views: {
          'menuContent': {
              templateUrl: 'templates/deposit_withdrawal.html',
              controller: 'Deposit_withdrawal'
          }
      }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/predictions');
});
