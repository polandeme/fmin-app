define(function () {
	return function ($scope, $location, $ionicPopup, maxScoreService) {
		$scope.maxScore = maxScoreService.readMaxScore();
		$scope.curScore = maxScoreService.readCurScore();
		var type = maxScoreService.returnType();
		$scope.goHome = function() {
			$location.path('/home');
		}
		maxScoreService.postScore();
		$scope.goBase = function() {
			$location.path('/' + type);

		}
	}
});