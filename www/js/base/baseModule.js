define(['angular',
		'base/baseService',
		'base/baseController',
		'../maxScore/maxScoreService'
		], function(angular, baseService, baseController, maxScoreService) {
			console.log(maxScoreService);
			var baseModule = angular.module('fmin.baseModule', ['fmin.maxScoreModule']);
				baseModule.factory('fmin.baseService', ['maxScoreService']);
				baseModule.controller('fmin.baseController', ['$scope', '$location', '$ionicPopup', 'fmin.baseService', baseController]);

			return baseModule;
		})