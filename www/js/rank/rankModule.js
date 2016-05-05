define(['angular',
		'rank/rankService',
		'rank/rankController'
		], function(angular, rankService, rankController) {
			var rankModule = angular.module('fmin.rankModule', []);
				rankModule.factory('fmin.rankService', ['$http', rankService]);
				rankModule.controller('fmin.rankController', ['$scope', 'fmin.rankService', rankController]);

			return rankModule;
		})