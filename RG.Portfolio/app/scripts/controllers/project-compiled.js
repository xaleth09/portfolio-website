'use strict';

/**
 * @ngdoc function
 * @name rgportfolioApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the rgportfolioApp
 */

angular.module('portfolioApp').controller('ProjectCtrl', ['$scope', function ($scope) {

  $("#brickBreakthumb").photoroller({ jump_back: true });

  $("#bstthumb").photoroller({ jump_back: true });

  $("#connect4thumb").photoroller({ jump_back: true });
  $("#connect4pic").photoroller({ jump_back: true });

  $("#ionicthumb").photoroller({ jump_back: true });
  $("#ionicpic").photoroller({ jump_back: true });

  $("#3Dthumb").photoroller({ jump_back: true });
  $("#3Dpic").photoroller({ jump_back: true });

  $("#spathumb").photoroller({ jump_back: true });
  $("#spapic").photoroller({ jump_back: true });

  $("#photosharethumb").photoroller({ jump_back: true });
  $("#photosharepic").photoroller({ jump_back: true });

  setUp();
  BSTsetUp();
}]);

//# sourceMappingURL=project-compiled.js.map