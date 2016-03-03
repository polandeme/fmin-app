define(function() {
	return function($scope, cssInjector, chsService) {
		// $scope.updateCell = function() {
		// 	console.log('test updateCell');
		// }
		// cssInjector.add('../css/cell.css');
		cssInjector.add('../css/chs.css');
		chsService.unbindHandleClick();
		chsService.init();
	}
})