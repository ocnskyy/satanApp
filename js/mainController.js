satanApp.controller('MainController', ['$scope', '$http', '$state', 'myService', 'shareId',function($scope, $http, $state, myService, shareId){
	console.log('Its MainController');
	$scope.superId = 'c97618cdb5adcb6f00de7fc9bd5faa8c'; //shareId.getString();
	$scope.superId == '' ? $state.go('home') : console.log('got phpseid', $scope.superId);
	$scope.helloImage = shareId.getRandomImage();
	$scope.goHome = function() {$state.go('home');};

	
}]);