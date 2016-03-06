define(['angular',
		'speed/speedController',
		'speed/speedService'
		], function(angular, speedController, speedService) {
			var speedModule = angular.module('fmin.speedModule', []);
				speedModule.factory('fmin.speedService', ['$window', 'fmin.maxScoreService', speedService]);
				speedModule.controller('fmin.speedController', 
									[
									 '$scope',
									 'cssInjector',
									 'fmin.speedService',
									 speedController
									]);
			return speedModule;
		})