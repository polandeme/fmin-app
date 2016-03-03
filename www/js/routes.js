define(['./app'], function(app) {
	'use strict';
	return app.config(function($stateProvider, $urlRouterProvider) {
		// $state.transitionTo($state.current, $state.$current.params, { reload: true, inherit: true, notify: true });//reloa
		$stateProvider
			.state('menu', {
				url: '/menu',
				abstract: 'true',
				cache: false,
				templateUrl: 'templates/index.html'
			})
			//home page
			.state('home', {
				url: '/home',
				cache: false,
				templateUrl: 'templates/home.html'
			})
			.state('base', {
				url: '/base',
				cache: false,
				templateUrl: 'templates/base.html'
			})
			.state('max-score', {
				url: '/max-score',
				cache: false,
				templateUrl: 'templates/max-score.html'
			})
			.state('chs', {
				url: '/chs',
				cache: false,
				templateUrl: 'templates/chs.html'
			});

        $urlRouterProvider.otherwise('/home');
	})
})