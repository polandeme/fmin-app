define(['angular',
		'chs/chsController',
		'chs/chsService'
		], function(angular, chsController, chsService) {
			var chsModule = angular.module('fmin.chsModule', []);
				chsModule.factory('fmin.chsService', ['$window', 'fmin.maxScoreService', chsService]);
				chsModule.controller('fmin.chsController', 
									[
									 '$scope',
									 '$window', 
									 '$ionicPopup',
									 'cssInjector',
									 'fmin.chsService',
									 chsController
									]);
			return chsModule;
		})