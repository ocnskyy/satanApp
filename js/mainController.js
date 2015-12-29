satanApp.controller('MainController', ['$scope', '$http', '$state', 'myService',function($scope, $http, $state, myService){
	console.log('Its MainController');
	$scope.superId = 'c97618cdb5adcb6f00de7fc9bd5faa8c'; //myService.getString();
	$scope.superId == '' ? $state.go('home') : console.log('got phpseid', $scope.superId);
	$scope.helloImage = myService.getRandomImage();
	$scope.friendData = {};
	$scope.friendArray = [];
	$scope.socTypes = {};
	$scope.goHome = function() {$state.go('home');};

	myService.getSoctypes().then(function(res) {
		console.log('got soctypes');
		$scope.socTypes = res;
	});

	$scope.getFriends = function() {
		myService.getFriends($scope.superId)
		.then(function(res) {
			console.log(res);
			if (res.code == 200) {
				console.log('friend has added');
			}
			else
				alert(res.msg);

		});
	};

	$scope.addFriend = function() {
		console.log($scope.superId, $scope.friendData.login, $scope.friendData.soctype);
		myService.addFriend($scope.superId, $scope.friendData.login, $scope.friendData.soctype)
		.then(function(res) {
			console.log(res);
			if (res.code == 200) {
				console.log('friend has added');
			}
			else
				alert(res.msg);
		});
	};

	$scope.deleteFrind = function() {
		myService.deleteFriend($scope.superId )
		.then(function(res) {
			console.log(res);
			if (res.code == 200) {
				console.log('friend has added');
			}
			else
				alert(res.msg);
		});
	};

	$scope.logOut = function() {
		myService.logOut($scope.superId)
		.then(function(res) {
			console.log(res);
			if (res.code == 200) {
				myService.setString('');
				$state.go('login');
			}
			else
				alert(res.msg);
		});
	};
}]);