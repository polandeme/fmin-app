define(['angular',
		'base/baseService',
		'base/baseController'
		], function(angular, baseService, baseController) {
			var baseModule = angular.module('fmin.baseModule', []);
				baseModule.factory('fmin.baseService', [baseService]);
				baseModule.controller('fmin.baseController', ['$scope', 'fmin.baseService', baseController]);

			return baseModule;
		})