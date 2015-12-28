satanApp.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
	
	$urlRouterProvider.otherwise("/home");
	//$locationProvider.html5Mode(true);

	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: 'templates/hello.html'
		})
		.state('login', {
			url: '/login',
			templateUrl: 'templates/login.html',
			controller: 'LoginController'
		})
		.state('registration', {
			url: '/registration',
			templateUrl: 'templates/registration.html',
			controller: 'LoginController'
		})
		.state('main', {
			url: '/main',
			templateUrl: 'templates/main.html',
			controller: 'MainController'
		})
		.state('test', {
			url: '/test',
			templateUrl: 'templates/test.html'
		});
});
