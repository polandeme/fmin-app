define(function () {
	return function ($scope, $location, $ionicPopup, maxScoreService) {
		console.log('maxscoreController');
		$scope.maxScore = maxScoreService.readMaxScore();
		$scope.curScore = maxScoreService.readCurScore();
		var type = maxScoreService.returnType();
		$scope.goHome = function() {
			$location.path('/home');

		}
		$scope.goBase = function() {
			$location.path('/' + type);

		}
	}
});