'use strict'
var satanApp = angular.module('satanApp', ['ui.router']);

satanApp.factory('myService', function($http) {
    //var url = 'http://grue.esy.es/pingpong.php';
    var url = "http://grup/backend/pingpong.php"; 

    var checkLogin = function(login) {
    	return $http.post(url, {"command": "CheckLogin","data": login})
			.then(function(result) {
            	return result.data;
       		});
    };

    var info = function(superid) {
        var tmpObj = {
            'command': 'Info',
            'data': '',
            'phpsesid': superid
        };
        return $http.post(url, tmpObj)
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

    var getFriends = function(superid) {
        var tmpObj = {
            'command': 'GetFriends',
            'data': '',
            'phpsesid': superid
        };
        console.log('iw anna send', tmpObj);
        return $http.post(url, tmpObj)
            .then(function(result) {
                return result.data;
            });
    };

    var addFriend = function(superid, name, soctype) {
        var tmpObj = {
            'command': 'AddFriend',
            'data': {
                'name': name,
                'soctype': soctype
            },
            'phpsesid': superid
        };
        return $http.post(url, tmpObj)
            .then(function(result) {
                return result.data;
            });
    };

    var deleteFriend = function(superid, name) {
        var tmpObj = {
            'command': 'DeleteFriend',
            'data': name,
            'phpsesid': superid
        };
        return $http.post(url, tmpObj)
            .then(function(result) {
                return result.data;
            });
    };

    var logOut = function(superid) {
        var tmpObj = {
            'command': 'LogOut',
            'data': '',
            'phpsesid': superid
        };
        return $http.post(url, tmpObj)
            .then(function(result) {
                return result.data;
            });
    };

    var pushFriend = function(friend, array) {
        array.push(friend);
    };

    var stringValue = '';    
    return {checkLogin	: checkLogin,
    		getSoctypes : getSoctypes,
    		registration: registration,
    		login 		: login,
            superId     : '',
            getFriends  : getFriends,
            addFriend   : addFriend,
            getString   : function() {return stringValue;},
            setString   : function(value) {stringValue = value;},
            getRandomImage: function() {return 'app/img/' + Math.floor((Math.random()*6)+1) + '.jpg';},
            logOut      : logOut,
            pushFriend  : pushFriend,
            deleteFriend: deleteFriend,
            info        : info
        };
});

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

satanApp.controller('MainController', ['$scope', '$http', '$state', 'myService',function($scope, $http, $state, myService){
	console.log('Its MainController');
	//$scope.superId = 'c97618cdb5adcb6f00de7fc9bd5faa8c'; 
	$scope.superId = myService.getString();
	$scope.superId == '' ? $state.go('home') : console.log('got phpseid', $scope.superId);
	$scope.helloImage = myService.getRandomImage();
	$scope.friendData = {};
	$scope.infoData = {};
	$scope.friendArray = [];
	$scope.socTypes = {};
	$scope.message = '';
	$scope.goHome = function() {$state.go('home');};

	myService.getSoctypes().then(function(res) {
		console.log('got soctypes');
		$scope.socTypes = res;
	});

	myService.getFriends($scope.superId).then(function (res) {
		console.log('got friends', res.data);
		$scope.friendArray = res.data;
		$scope.friendArray.length == 0 ? $scope.message = "Вы пока не добавили ни одного друга" : console.log('друзья есть');
		console.log('array friends', $scope.friendArray);
	});

	myService.info($scope.superId).then(function (res) {
		console.log('got info', res.data);
		$scope.infoData = res.data;
	});

	// $scope.getFriends = function() {
	// 	myService.getFriends($scope.superId)
	// 	.then(function(res) {
	// 		console.log(res);
	// 		if (res.code == 200) {
	// 			console.log('friend has added');
	// 		}
	// 		else
	// 			alert(res.msg);

	// 	});
	// };

	$scope.addFriend = function() {
		console.log($scope.superId, $scope.friendData.login, $scope.friendData.soctype);
		myService.addFriend($scope.superId, $scope.friendData.login, $scope.friendData.soctype)
		.then(function(res) {
			console.log(res);
			if (res.code == 200) {
				console.log('friend has added');
				$scope.friendData.login = '';
				$scope.friendData.soctype = '';
				$scope.message = '';
				myService.getFriends($scope.superId).then(function (res) {
					console.log('got friends', res.data);
					$scope.friendArray = res.data;
					console.log('array friends', $scope.friendArray);
				});
			}
			else
				alert(res.msg);
		});
	};

	$scope.deleteFriend = function(name) {
		myService.deleteFriend($scope.superId, name)
		.then(function(res) {
			console.log(res);
			if (res.code == 200) {
				console.log('friend has deleted');
				myService.getFriends($scope.superId).then(function (res) {
					console.log('got friends', res.data);
					$scope.friendArray = res.data;
					$scope.friendArray.length == 0 ? $scope.message = "Вы пока не добавили ни одного друга" : console.log('друзья есть');
					console.log('array friends', $scope.friendArray);
				});
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
satanApp.controller('LoginController', ['$scope', '$http', 'myService', '$state', function($scope, $http, myService, $state){
	console.log('Its LoginController');
	$scope.goToLogin 		= function() {$state.go('login');};
	$scope.goToRegistration	= function() {$state.go('registration');};
	$scope.goHome = function() {$state.go('home');};
	// $scope.helloImage = myService.getRandomImage();
	$scope.backgroundStyle = myService.getRandomImage();
	console.log($scope.backgroundStyle);

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
				myService.setString(res.data);
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
			templateUrl: '../app/templates/hello.html',
			controller: 'LoginController'
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
