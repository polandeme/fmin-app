define(['angular',
		'base/baseService',
		'base/baseController'
		], function(angular, baseService, baseController) {
			var baseModule = angular.module('fmin.baseModule', []);
				baseModule.factory('fmin.baseService', [
														'$cordovaFileTransfer',
														'$http', '$location', 'fmin.maxScoreService', baseService]);
				baseModule.controller('fmin.baseController', ['$scope', '$location', '$ionicPopup', 'fmin.baseService', baseController]);

			return baseModule;
		})