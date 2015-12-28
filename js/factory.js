satanApp.factory('myService', function($http) {

    var checkLogin = function(login) {
    	return $http.post('http://grue.esy.es/pingpong.php', {"command": "CheckLogin","data": login})
			.then(function(result) {
            	return result.data;
       		});
    };

    var getSoctypes = function() {
    	return $http.post('http://grue.esy.es/pingpong.php', {"command": "GetSocTypes", "data": ""})
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
    	return $http.post('http://grue.esy.es/pingpong.php', tmpObj)
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
    	return $http.post('http://grue.esy.es/pingpong.php', tmpObj)
    		.then(function(result) {
    			return result.data;
    		});
    };

    return {checkLogin	: checkLogin,
    		getSoctypes : getSoctypes,
    		registration: registration,
    		login 		: login};
});
