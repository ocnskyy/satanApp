'use strict'
var satanApp = angular.module('satanApp', ['ui.router']);

satanApp.service('shareId', function() {
    var stringValue = '';    
    return {
        getString: function() {
            return stringValue;
        },
        setString: function(value) {
            stringValue = value;
        },
        getRandomImage: function() {
        	return 'app/img/' + Math.floor((Math.random()*6)+1) + '.jpg';
        }
    }
});
satanApp.factory('myService', function($http) {
    //var url = 'http://grue.esy.es/pingpong.php';
    var url = "http://grup/backend/pingpong.php"; 

    var checkLogin = function(login) {
    	return $http.post(url, {"command": "CheckLogin","data": login})
			.then(function(result) {
            	return result.data;
       		});
    };

    var getSoctypes = function() {
    	return $http.post(url, {"command": "GetSocTypes", "data": ""})
    		.then(function(result) {
    			return result.data;
    		});
    };

    var registration = function(login, password, soctype) {
    	var tmpObj = {
    		'command': 'Registration',
    		'data': {
    			'login': login,
    			'password': password,
    			'soctype': soctype
    		}
    	};
    	return $http.post(url, tmpObj)
    		.then(function(result) {
    			return result.data;
    		});
    };

    var login = function(login, password) {
    	var tmpObj = {
    		'command': 'LogIn',
    		'data': {
    			'login': login,
    			'password': password
    		}
    	};
    	return $http.post(url, tmpObj)
    		.then(function(result) {
    			return result.data;
    		});
    };

    return {checkLogin	: checkLogin,
    		getSoctypes : getSoctypes,
    		registration: registration,
    		login 		: login,
            superId     : ''};
});

satanApp.controller('MainController', ['$scope', '$http', '$state', 'myService', 'shareId',function($scope, $http, $state, myService, shareId){
	console.log('Its MainController');
	$scope.superId = 'c97618cdb5adcb6f00de7fc9bd5faa8c'; //shareId.getString();
	$scope.superId == '' ? $state.go('home') : console.log('got phpseid', $scope.superId);
	$scope.helloImage = shareId.getRandomImage();
	$scope.goHome = function() {$state.go('home');};

	
}]);
satanApp.controller('LoginController', ['$scope', '$http', 'myService', '$state', 'shareId', function($scope, $http, myService, $state, shareId){
	console.log('Its LoginController');
	$scope.goToLogin 		= function() {$state.go('login');};
	$scope.goToRegistration	= function() {$state.go('registration');};
	$scope.goHome = function() {$state.go('home');};
	$scope.helloImage = shareId.getRandomImage();

	$scope.regData = {};
	$scope.socTypes = {};
	$scope.logData = {};
	$scope.tmp = 0;
	var url = 'http://grue.esy.es/pingpong.php';

	myService.getSoctypes().then(function(res) {
		console.log('got soctypes');
		$scope.socTypes = res;
	});

	$scope.logIn = function() {
		//console.log('this is what i wanna send', tmpObj);
		myService.login($scope.logData.login, $scope.logData.password)
		.then(function(res) {
			console.log(res);
			if (res.code == 200) {
				shareId.setString(res.data);
				$state.go('main');
			}
			else
				alert(res.msg);
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
satanApp.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
	
	$urlRouterProvider.otherwise("/home");
	//$locationProvider.html5Mode(true);

	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: '../app/templates/hello.html'
		})
		.state('login', {
			url: '/login',
			templateUrl: '../app/templates/login.html',
			controller: 'LoginController'
		})
		.state('registration', {
			url: '/registration',
			templateUrl: '../app/templates/registration.html',
			controller: 'LoginController'
		})
		.state('main', {
			url: '/main',
			templateUrl: '../app/templates/main.html',
			controller: 'MainController'
		})
		.state('test', {
			url: '/test',
			templateUrl: '../app/templates/test.html'
		});
});
