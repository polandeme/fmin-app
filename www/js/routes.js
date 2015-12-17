define(['./app'], function(app) {
	'use strict';
	return app.config(function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('menu', {
				url: '/menu',
				abstract: 'true',
				templateUrl: 'templates/index.html'
			})
			//home page
			.state('home', {
				url: '/home',
				// views: {
				// 	'menuContent': {
				    templateUrl: 'templates/home.html'
					// }
				// }	
			});

		// $urlRouterProvider.otherwise('/menu/home');
        $urlRouterProvider.otherwise('/home');
	})
})