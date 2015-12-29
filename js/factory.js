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
            deleteFriend: deleteFriend
        };
});
