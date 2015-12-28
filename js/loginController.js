satanApp.controller('LoginController', ['$scope', '$http', 'myService', '$state', function($scope, $http, myService, $state){
	console.log('Its LoginController');
	$scope.regData = {};
	$scope.socTypes = {};
	$scope.logData = {};
	$scope.phpsesid = '';
	$scope.tmp = 0;
	var url = 'http://grue.esy.es/pingpong.php';

	myService.getSoctypes().then(function(res) {
		console.log('got soctypes');
		$scope.socTypes = res;
	});

	// $scope.checkLogin = function(login) {
	// 	var tmp;
	// 	$http.post(url, {"command": "CheckLogin","data": login}, function(data, textStatus, xhr) {})
	// 		.success(function(data) {
	// 			if (data.data == 0) {
	// 				console.log('имя свободно');
	// 				tmp = 0;
	// 				// console.log('here', $scope.tmp);
	// 			}
	// 			else {
	// 				console.log('имя занято');
	// 				tmp = 1;
	// 				// console.log('here', $scope.tmp);
	// 			}
	// 		});
	// 	return tmp;
	// }

	$scope.logIn = function() {
		//console.log('this is what i wanna send', tmpObj);
		myService.login($scope.logData.login, $scope.logData.password)
		.then(function(res) {
			console.log(res);
			res.code == 200 ? $state.go('main') : alert(res.msg);
		});
	};

	$scope.registration = function() {
		if ($scope.regData.password1 == $scope.regData.password2) {
			myService.checkLogin($scope.regData.login).then(function(res) {
				if (res.data == 0) {
					//console.log('this is what i wanna send', tmpObj);
					myService.registration($scope.regData.login, $scope.regData.password1, $scope.regData.soctype)
					.then(function(res) {
						console.log(res);
						res.code == 200 ? $state.go('login') : alert(res.msg);
					});
				}
				else
					alert('Такой логин уже существует!');
			});
		}
		else
			alert('Пароли не совпадют!');
	};
}]);