'use strict';

/**
 * @ngdoc function
 * @name portfolioApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the portfolioApp
 */
angular
  .module(
    'portfolioApp'
  )

  .controller('IndexCtrl', ['$rootScope', '$scope',function ($rootScope, $scope) {
    $scope.isActive = function(checkNav){
      return (checkNav === $rootScope.actualLocation);
    };

    $(document).on('click','.navbar-collapse.in', function(e){
      if($(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle'){
        $(this).collapse('hide');
      }
    })

  }])
;
