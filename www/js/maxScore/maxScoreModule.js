define(['angular',
		'maxScore/maxScoreController',
		'maxScore/maxScoreService'
		], function(angular, maxScoreController, maxScoreService) {
			var maxScoreModule = angular.module('fmin.maxScoreModule', []);
				maxScoreModule.factory('fmin.maxScoreService', [maxScoreService]);
				maxScoreModule.controller('fmin.maxScoreController', 
										[
										 '$scope', 
										 '$location', 
										 '$ionicPopup', 
										 'fmin.maxScoreService',
										  maxScoreController
										]);

			return maxScoreModule;
})