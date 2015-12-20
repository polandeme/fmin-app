define(function () {
	return function ($scope, baseService) {
		console.log(baseService);
		baseService.initInsertNum();
		baseService.handleClick();
		baseService.start();
		// $scope.profile = baseService.profile;
		// $scope.login = baseService.login;
	}
});