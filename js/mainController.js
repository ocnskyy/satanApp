satanApp.controller('MainController', ['$scope', '$http', '$state', function($scope, $http, $state){
	console.log('Its MainController');

	$scope.goToLogin 		= function() {$state.go('login');};
	$scope.goToRegistration	= function() {$state.go('registration');};

}]);