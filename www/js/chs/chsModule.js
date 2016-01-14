define(['angular',
		'chs/chsController',
		'chs/chsService'
		], function(angular, chsController, chsService) {
			var chsModule = angular.module('fmin.chsModule', []);
				chsModule.factory('fmin.chsService', [chsService]);
				chsModule.controller('fmin.chsController', 
									[
									 '$scope',
									 'fmin.chsService',
									 chsController
									]);
			return chsModule;
		})