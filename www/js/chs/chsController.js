define(function() {
	return function($scope, cssInjector, chsService) {
		// $scope.updateCell = function() {
		// 	console.log('test updateCell');
		// }
		// cssInjector.add('../../css/chs.css?v=0117');
		chsService.unbindHandleClick();
		chsService.init();
		chsService.handleBack();
	}
})