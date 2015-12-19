'use strict'
satanApp.controller('MainController', ['$scope', '$http', function($scope, $http){
	
	// $scope.regg = false;
	// $scope.logg = false;
	console.log('its me');

	$scope.regData = {};
	$scope.logData = {};
	$scope.boolTmp = false;
	//$scope.tmpObj = {};

	$scope.logIn = function() {
		var tmpObj = {
			"command": "LogIn",
			"data": {
				"login": $scope.logData.login,
				"password": $scope.logData.password
			}
		};

		console.log('this is what i wanna send', tmpObj);
		$http.post('http://grue.esy.es/pingpong.php', tmpObj, function(data, textStatus, xhr) {
			console.log('data', data);
		})
			.error(function(data) {
		     	console.log('this is error', data);
		    })
		    .success(function(data) {
		    	console.log('success', data);
		    	data.code != '200' ? alert('Incorrect data!') : console.log('its OK');
		    });
	};

	$scope.loginCheck = function() {
		//login check
		$http.post('http://grue.esy.es/pingpong.php', $scope.regData.login, function(data){})
			.success(function(data) {
				console.log('login check result', data.code);
				data.code != '200' ? $scope.boolTmp = false : $scope.boolTmp = true;
			});
	}

	$scope.registration = function() {
		$scope.loginCheck();
		console.log('boolTmp', $scope.boolTmp, typeof $scope.boolTmp);
		if ($scope.boolTmp != false)	{
			console.log('login check', $scope.boolTmp);
			var tmpObj = {
				"command": "Registration",
				"data": {
					"login": $scope.regData.login,
					"password": $scope.regData.password
				}
			};

			console.log('this is what i wanna send', tmpObj);
			$http.post('http://grue.esy.es/pingpong.php', tmpObj, function(data, textStatus, xhr) {
				console.log('data', data);
			})
				.error(function(data) {
			     	console.log('this is error', data);
			    })
			    .success(function(data) {
			    	console.log('success', data);
			    	data.code != '200' ? alert('Incorrect data in registration!') : console.log('its OK');
			    });
		}
		else
			alert('This login is already in use!');
	};


}]);