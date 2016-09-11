'use strict';

/**
 * @ngdoc overview
 * @name portfolioApp
 * @description
 * # portfolioApp
 *
 * Main module of the application.
 */

angular.module('portfolioApp', ['ui.router', 'ngResource', 'ngAnimate', 'ui.bootstrap', 'ngScrollTo']).run(function ($rootScope, $location) {
  $rootScope.$on('$locationChangeSuccess', function () {
    $rootScope.actualLocation = $location.path();
  });

  $rootScope.$watch(function () {
    return $location.path();
  }, function (newLocation, oldLocation) {
    if ($rootScope.actualLocation === newLocation) {//hit back or forwards

    }
  });
}).config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider.state('app', {
    url: '/',
    views: {
      'header': {
        templateUrl: 'views/header.html',
        controller: 'IndexCtrl'
      },
      'content': {
        templateUrl: 'views/main.html'
      },
      'footer': {
        templateUrl: 'views/footer.html'
      }
    }
  }).state('app.projects', {
    url: 'projects',
    views: {
      'content@': {
        templateUrl: 'views/projects.html',
        controller: 'ProjectCtrl'
      }
    }
  }).state('app.resume', {
    url: 'resume',
    views: {
      'content@': {
        templateUrl: 'views/resume.html',
        controller: 'ResumeCtrl'
      }
    }
  });

  $urlRouterProvider.otherwise('/');
});

//# sourceMappingURL=app-compiled.js.map