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
				templateUrl: 'templates/home.html'
			})
			.state('base', {
				url: '/base',
				templateUrl: 'templates/base.html'
			});

        $urlRouterProvider.otherwise('/home');
	})
})