define(['angular',
		'home/homeService',
		'home/homeController'
		], function(angular, homeService, homeController) {
			var homeModule = angular.module('fmin.homeModule', []);
				homeModule.factory('fmin.homeService', [
														'$window',
														'$location',  '$cordovaDevice', 'fmin.maxScoreService', homeService]);
				homeModule.controller('fmin.homeController', ['$scope', '$location', '$window', '$ionicPopup', 'cssInjector','fmin.homeService', homeController]);

			return homeModule;
		})