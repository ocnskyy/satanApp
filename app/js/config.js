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
