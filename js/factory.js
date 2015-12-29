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
