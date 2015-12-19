satanApp.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
	
	$urlRouterProvider.otherwise("/home");
	//$locationProvider.html5Mode(true);

	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: 'templates/hello.html'
		})
		.state('test', {
			url: '/test',
			templateUrl: 'templates/test.html'
		});
	// $stateProvider
	//     .state('', {
	//     	url: '/home',
	//       	templateUrl: "templates/hello.html"
	//     })
	//     .state('home', {
	//       	url: '/home',
	//       	templateUrl: "templates/hello.html"
	//      	//controller: 'MainController'
	//     });


	// $routeProvider
	// 	.when('/', {
	// 		templateUrl : 'templates/hello.html',
	// 		controller 	: 'MainController' 
	// 	})
	// 	.when('/home', {
	// 		templateUrl : 'templates/hello.html',
	// 		controller 	: 'MainController' 
	// 	})
	// 	.otherwise({redirectTo: '/home'});

	// 	$locationProvider.html5Mode(true);
});
