'use strict';

angular.module('portfolioApp').controller('HireCtrl', ['$rootScope', '$scope', '$uibModal', function ($rootScope, $scope, $uibModal) {

  $scope.open = function (size) {

    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'views/hireModal.html',
      controller: 'HireInstCtrl',
      size: size,
      resolve: {
        items: function items() {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      //stuff to do when modal is closed
    });
  };
}]).controller('HireInstCtrl', ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
  $scope.close = function () {
    $uibModalInstance.dismiss('cancel');
  };
}]);

//# sourceMappingURL=hire-compiled.js.map